import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { CheckCircle2, AlertCircle, Loader2, Lock } from "lucide-react";
import PageShell from "@/components/PageShell";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

/**
 * Branded Firebase email-action handler. Verification emails from the app
 * link here instead of the stock Google page (the Cloud Function rewrites
 * the generated link's host/path, keeping its query string).
 *
 * The oobCode in the query is applied through the Identity Toolkit REST API,
 * so no Firebase SDK is needed. Handles mode=verifyEmail (applied on mount)
 * and mode=resetPassword (validate code, then new-password form) — the
 * latter so the Firebase console's action URL can also point here.
 */

// No hardcoded Firebase key: every Firebase action link carries the project's
// public web apiKey in its query string, and this page only ever runs from
// such links. (The key is a public client identifier, not a secret — it ships
// in the app binary too — but hardcoding it here trips secret scanners.)
const IDENTITY_API = "https://identitytoolkit.googleapis.com/v1";

type Status = "working" | "success" | "error" | "reset-form" | "reset-done";

const FRIENDLY_ERRORS: Record<string, string> = {
  EXPIRED_OOB_CODE: "This link has expired. Request a new one from the app and try again.",
  INVALID_OOB_CODE:
    "This link is invalid or has already been used. If you already verified, just head back to the app.",
  USER_DISABLED: "This account has been disabled. Contact support@blastoivf.com.",
  EMAIL_NOT_FOUND: "We couldn't find an account for this link. It may have been deleted.",
};

function friendlyError(apiMessage: string | undefined): string {
  if (!apiMessage) return "Something went wrong. Request a new link from the app and try again.";
  const key = Object.keys(FRIENDLY_ERRORS).find((k) => apiMessage.startsWith(k));
  return key ? FRIENDLY_ERRORS[key] : "Something went wrong. Request a new link from the app and try again.";
}

async function identityPost(path: string, apiKey: string, body: Record<string, string>) {
  const res = await fetch(`${IDENTITY_API}/${path}?key=${encodeURIComponent(apiKey)}`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(body),
  });
  const data = await res.json().catch(() => ({}));
  if (!res.ok) throw new Error(data?.error?.message ?? "UNKNOWN");
  return data;
}

function passwordProblem(password: string, confirm: string): string | null {
  if (password.length < 8) return "Password must be at least 8 characters.";
  if (!/[A-Z]/.test(password)) return "Password must contain at least one uppercase letter.";
  if (!/[0-9]/.test(password)) return "Password must contain at least one number.";
  if (!/[!@#$%^&*()_+\-=[\]{};':"\\|,.<>/?]/.test(password))
    return "Password must contain at least one special character.";
  if (password !== confirm) return "The passwords don't match.";
  return null;
}

const VerifyEmail = () => {
  const [params] = useSearchParams();
  const mode = params.get("mode") ?? "";
  const oobCode = params.get("oobCode") ?? "";
  const apiKey = params.get("apiKey") ?? "";

  const [status, setStatus] = useState<Status>("working");
  const [error, setError] = useState("");
  const [resetEmail, setResetEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (!oobCode || !apiKey || !["verifyEmail", "resetPassword"].includes(mode)) {
      setError("This link is missing its verification code. Use the full link from your email.");
      setStatus("error");
      return;
    }
    (async () => {
      try {
        if (mode === "verifyEmail") {
          await identityPost("accounts:update", apiKey, { oobCode });
          setStatus("success");
        } else {
          // Validate the code before showing the form, so an expired link
          // fails now rather than after the user has typed a new password.
          const data = await identityPost("accounts:resetPassword", apiKey, { oobCode });
          setResetEmail(data.email ?? "");
          setStatus("reset-form");
        }
      } catch (e) {
        setError(friendlyError((e as Error).message));
        setStatus("error");
      }
    })();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const submitNewPassword = async () => {
    const problem = passwordProblem(password, confirm);
    if (problem) {
      setError(problem);
      return;
    }
    setError("");
    setSubmitting(true);
    try {
      await identityPost("accounts:resetPassword", apiKey, { oobCode, newPassword: password });
      setStatus("reset-done");
    } catch (e) {
      setError(friendlyError((e as Error).message));
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <PageShell className="flex min-h-[60vh] items-center justify-center">
      <div className="w-full max-w-md rounded-2xl border border-border bg-card p-8 text-center shadow-sm sm:p-10">
        {status === "working" && (
          <>
            <Loader2 className="mx-auto mb-5 h-12 w-12 animate-spin text-blasto-rose" />
            <h1 className="mb-2 text-2xl font-bold text-foreground">One moment…</h1>
            <p className="text-muted-foreground">Checking your link.</p>
          </>
        )}

        {status === "success" && (
          <>
            <CheckCircle2 className="mx-auto mb-5 h-14 w-14 text-blasto-rose" />
            <h1 className="mb-2 text-2xl font-bold text-foreground">Your email is verified</h1>
            <p className="mb-6 text-muted-foreground">
              You're all set. Head back to the blasto app on your phone and tap{" "}
              <span className="font-semibold text-foreground">"I've Verified"</span> to continue.
            </p>
            <p className="text-sm text-muted-foreground">You can close this tab.</p>
          </>
        )}

        {status === "reset-form" && (
          <>
            <Lock className="mx-auto mb-5 h-12 w-12 text-blasto-rose" />
            <h1 className="mb-2 text-2xl font-bold text-foreground">Choose a new password</h1>
            <p className="mb-6 text-muted-foreground">
              {resetEmail ? (
                <>
                  for <span className="font-semibold text-foreground">{resetEmail}</span>
                </>
              ) : (
                "for your blasto account"
              )}
            </p>
            <div className="space-y-3 text-left">
              <Input
                type="password"
                autoComplete="new-password"
                placeholder="New password (min 8, A-Z, 0-9, special)"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <Input
                type="password"
                autoComplete="new-password"
                placeholder="Confirm new password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
              {error && <p className="text-sm text-destructive">{error}</p>}
              <Button className="w-full" onClick={submitNewPassword} disabled={submitting}>
                {submitting ? <Loader2 className="h-4 w-4 animate-spin" /> : "Set New Password"}
              </Button>
            </div>
          </>
        )}

        {status === "reset-done" && (
          <>
            <CheckCircle2 className="mx-auto mb-5 h-14 w-14 text-blasto-rose" />
            <h1 className="mb-2 text-2xl font-bold text-foreground">Password updated</h1>
            <p className="mb-6 text-muted-foreground">
              Open the blasto app and log in with your new password.
            </p>
            <p className="text-sm text-muted-foreground">You can close this tab.</p>
          </>
        )}

        {status === "error" && (
          <>
            <AlertCircle className="mx-auto mb-5 h-14 w-14 text-blasto-gold" />
            <h1 className="mb-2 text-2xl font-bold text-foreground">This link didn't work</h1>
            <p className="text-muted-foreground">{error}</p>
          </>
        )}
      </div>
    </PageShell>
  );
};

export default VerifyEmail;
