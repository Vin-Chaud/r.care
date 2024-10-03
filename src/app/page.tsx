"use client";

import { defaultOnboardingFlow } from "@/assets/default_flow";
import { OnboardingFlow } from "@/components/OnboardingFlow";
import styles from "./page.module.css";

export default function Home() {
  return (
    <div className={styles.page}>
      <OnboardingFlow spec={defaultOnboardingFlow} />
    </div>
  );
}
