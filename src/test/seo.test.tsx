import { describe, expect, it, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import {
  canonicalFor,
  getRouteMeta,
  indexableRoutes,
  prerenderRoutes,
  renderHead,
  renderSitemap,
  routeMeta,
} from "@/lib/seo";
import { faqs } from "@/lib/faqs";
import { calculatorFaqs } from "@/lib/calculatorFaqs";
import { featurePages } from "@/lib/featurePages";
import { guides, publishBlockers, type Guide } from "@/lib/guides";

const Probe = () => {
  useDocumentMeta();
  return null;
};

const head = (selector: string, attr = "content") =>
  document.head.querySelector(selector)?.getAttribute(attr);

describe("route metadata", () => {
  it("gives every route its own canonical", () => {
    const canonicals = Object.keys(routeMeta).map((p) =>
      canonicalFor(getRouteMeta(p))
    );
    expect(new Set(canonicals).size).toBe(canonicals.length);
    expect(canonicalFor(getRouteMeta("/privacy"))).toBe(
      "https://blastoivf.com/privacy"
    );
  });

  it("normalizes trailing slashes", () => {
    expect(getRouteMeta("/privacy/")).toBe(getRouteMeta("/privacy"));
  });

  it("falls back to the homepage for unknown routes", () => {
    expect(getRouteMeta("/nope")).toBe(routeMeta["/"]);
  });

  it("targets the head keyword on the homepage", () => {
    const home = routeMeta["/"];
    expect(home.title.toLowerCase()).toContain("ivf app");
    expect(home.description.toLowerCase()).toContain("ivf app");
  });
});

describe("renderHead", () => {
  it("emits exactly one title and canonical per route", () => {
    const html = renderHead("/privacy");
    expect(html.match(/<title>/g)).toHaveLength(1);
    expect(html.match(/rel="canonical"/g)).toHaveLength(1);
    expect(html).toContain('href="https://blastoivf.com/privacy"');
  });

  it("puts app markup on the homepage only", () => {
    expect(renderHead("/")).toContain("MobileApplication");
    expect(renderHead("/privacy")).not.toContain("MobileApplication");
  });

  it("emits FAQ markup only where a visible FAQ is rendered", () => {
    expect(renderHead("/")).toContain("FAQPage");
    expect(renderHead("/ivf-due-date-calculator")).toContain("FAQPage");
    expect(renderHead("/privacy")).not.toContain("FAQPage");
    expect(renderHead("/guides")).not.toContain("FAQPage");
  });

  it("gives the calculator its own FAQ set, not the homepage's", () => {
    const ld = renderHead("/ivf-due-date-calculator").match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
    )![1];
    const graph = JSON.parse(ld.replace(/\\u003c/g, "<"))["@graph"];
    const faq = graph.find((n: { "@type": string }) => n["@type"] === "FAQPage");
    expect(faq.mainEntity).toHaveLength(calculatorFaqs.length);
    expect(faq.mainEntity[0].name).toBe(calculatorFaqs[0].q);
  });

  it("leaves no literal '<' inside the JSON-LD payload", () => {
    // The guarantee: content can never smuggle in a "</script>" and break out
    // of the tag. Escaping every "<" is what enforces it.
    const ld = renderHead("/").match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
    )![1];
    expect(ld).not.toContain("<");
    expect(JSON.parse(ld.replace(/\\u003c/g, "<"))["@graph"]).toBeInstanceOf(Array);
  });

  it("emits one FAQ question per visible FAQ", () => {
    const ld = renderHead("/").match(
      /<script type="application\/ld\+json">([\s\S]*?)<\/script>/
    )![1];
    const graph = JSON.parse(ld.replace(/\\u003c/g, "<"))["@graph"];
    const faq = graph.find((n: { "@type": string }) => n["@type"] === "FAQPage");
    expect(faq.mainEntity).toHaveLength(faqs.length);
  });
});

describe("feature pages", () => {
  it("registers every feature page as its own indexable route", () => {
    for (const page of featurePages) {
      const meta = getRouteMeta(page.slug);
      expect(meta.path).toBe(page.slug);
      expect(meta.noindex).toBeFalsy();
    }
  });

  it("keeps the target phrase in each title", () => {
    for (const page of featurePages) {
      expect(page.title.toLowerCase()).toContain("ivf");
    }
  });

  it("only links related slugs that exist", () => {
    const slugs = new Set(featurePages.map((p) => p.slug));
    for (const page of featurePages) {
      for (const rel of page.related) expect(slugs.has(rel)).toBe(true);
    }
  });
});

describe("guides", () => {
  it("keeps drafts out of the index and the sitemap", () => {
    const sitemap = renderSitemap();
    for (const guide of guides.filter((g) => g.status === "draft")) {
      const path = `/guides/${guide.slug}`;
      expect(getRouteMeta(path).noindex).toBe(true);
      expect(renderHead(path)).toContain('content="noindex');
      expect(sitemap).not.toContain(path);
    }
  });

  it("still prerenders drafts so they are previewable", () => {
    for (const guide of guides) {
      expect(prerenderRoutes).toContain(`/guides/${guide.slug}`);
    }
  });

  it("emits no article schema for an unreviewed guide", () => {
    // Faking reviewedBy on content nobody reviewed is the one thing this
    // scaffold must never do.
    for (const guide of guides.filter((g) => !g.reviewer)) {
      expect(renderHead(`/guides/${guide.slug}`)).not.toContain("reviewedBy");
    }
  });

  it("blocks publishing until content, sources, and a reviewer exist", () => {
    const bare = guides[0];
    expect(publishBlockers(bare)).toEqual([
      "body content",
      "references",
      "a named medical reviewer",
      "a review date",
    ]);

    const ready: Guide = {
      ...bare,
      sections: [{ heading: "H", body: "B" }],
      references: [{ label: "Source", url: "https://example.org" }],
      reviewer: { name: "Dr. X", credentials: "MD" },
      reviewedOn: "2026-08-12",
    };
    expect(publishBlockers(ready)).toEqual([]);
  });
});

describe("sitemap", () => {
  it("lists exactly the indexable routes, once each", () => {
    const locs = [...renderSitemap().matchAll(/<loc>(.*?)<\/loc>/g)].map((m) => m[1]);
    expect(locs).toHaveLength(indexableRoutes.length);
    expect(new Set(locs).size).toBe(locs.length);
    expect(locs).toContain("https://blastoivf.com/ivf-medication-tracker");
  });

  it("gives every listed URL a prerendered route", () => {
    for (const meta of indexableRoutes) {
      expect(prerenderRoutes).toContain(meta.path);
    }
  });
});

describe("useDocumentMeta", () => {
  beforeEach(() => {
    document.head.innerHTML = "";
    document.title = "";
  });

  it("populates a bare head (the `vite dev` case)", () => {
    render(
      <MemoryRouter initialEntries={["/privacy"]}>
        <Probe />
      </MemoryRouter>
    );
    expect(document.title).toBe(routeMeta["/privacy"].title);
    expect(head('link[rel="canonical"]', "href")).toBe(
      "https://blastoivf.com/privacy"
    );
    expect(head('meta[name="description"]')).toBe(
      routeMeta["/privacy"].description
    );
    expect(head('meta[property="og:url"]')).toBe("https://blastoivf.com/privacy");
  });

  it("overwrites prerendered tags rather than duplicating them", () => {
    document.head.innerHTML = renderHead("/");
    render(
      <MemoryRouter initialEntries={["/terms"]}>
        <Probe />
      </MemoryRouter>
    );
    expect(document.head.querySelectorAll('link[rel="canonical"]')).toHaveLength(1);
    expect(document.head.querySelectorAll("title")).toHaveLength(1);
    expect(head('link[rel="canonical"]', "href")).toBe(
      "https://blastoivf.com/terms"
    );
  });
});
