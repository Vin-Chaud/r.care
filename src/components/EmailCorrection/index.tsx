"use client";

import { saveEmailField } from "@/actions/saveEmailCorrection";
import { AppHeader } from "@/components/AppHeader";
import { FreeTextInputStep } from "@/components/OnboardingFlow/FreeTextInputStep";
import { Greys } from "@/design_components/design_system";
import { PageLayout } from "@/design_components/PageLayout";
import { useRouter } from "next/navigation";

export function EmailCorrection() {
  const router = useRouter();
  return (
    <PageLayout background={Greys.White}>
      <AppHeader withBackButton onClickBack={() => router.back()}>
        {{ branding: true }}
      </AppHeader>
      <FreeTextInputStep
        stepDefinition={{
          type: "free_text",
          format: "email",
          title: "What email address would you like to use for R.care?",
          placeholder: "Please enter your email",
        }}
        stepId="" // not used here
        setResponse={async (_, value) => {
          await saveEmailField(value);
          router.push("/onboarding_complete");
        }}
      />
    </PageLayout>
  );
}
