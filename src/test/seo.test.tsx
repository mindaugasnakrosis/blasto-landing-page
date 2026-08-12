import { describe, expect, it, beforeEach } from "vitest";
import { render } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { useDocumentMeta } from "@/hooks/useDocumentMeta";
import { canonicalFor, getRouteMeta, renderHead, routeMeta } from "@/lib/seo";
import { faqs } from "@/lib/faqs";

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

  it("puts FAQ and app markup on the homepage only", () => {
    expect(renderHead("/")).toContain("FAQPage");
    expect(renderHead("/privacy")).not.toContain("FAQPage");
    expect(renderHead("/privacy")).not.toContain("MobileApplication");
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
