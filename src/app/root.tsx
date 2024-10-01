"use client";
import { saveDocument } from "@/actions/saveDocument";
import {
  GlobalProvider,
  OnboardingFlow,
  useGlobalContext,
} from "@/context/GlobalContext";

export function Root(props: { flow: OnboardingFlow }) {
  return (
    <GlobalProvider flow={props.flow}>
      <Onboarding />
    </GlobalProvider>
  );
}

export function Onboarding() {
  return (
    <div>
      <pre>{JSON.stringify(useGlobalContext())}</pre>
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
  debugger;

  if (!res.ok) throw new Error("Failed to create checkout session");
  const json = await res.json();
  const sessionUrl = json.session_url;
  window.location.href = sessionUrl;
};
