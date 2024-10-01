import { OnboardingFlow } from "../context/GlobalContext";
import styles from "./page.module.css";
import { Root } from "./root";

export default async function Home() {
  const flow: OnboardingFlow = await { foo: "here" };

  return (
    <div className={styles.page}>
      <Root flow={flow} />
    </div>
  );
}
