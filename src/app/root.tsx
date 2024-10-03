"use client";
import { saveDocument } from "@/actions/saveDocument";

export function Onboarding() {
  return (
    <div>
      <button onClick={() => saveDocument({ hello: "world" })}>Save</button>
      <button onClick={() => handleSubscribe("quarterly")}>
        Subscribe quarterly
      </button>
      <button onClick={() => handleSubscribe("anually")}>
        Subscribe annually
      </button>
    </div>
  );
}

const handleSubscribe = async (kind: "anually" | "quarterly") => {
  const res = await fetch("/api/checkout?type=" + kind, {
    method: "POST",
  });

  if (!res.ok) throw new Error("Failed to create checkout session");
  const json = await res.json();
  const sessionUrl = json.session_url;
  window.location.href = sessionUrl;
};
