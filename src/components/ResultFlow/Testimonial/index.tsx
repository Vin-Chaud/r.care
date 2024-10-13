import Image from "next/image";

import { MarkdownText } from "@/components/MarkdownText";
import persona from "./persona.png";

const interview = [
  {
    question: "How did binge eating impact your life before R.care?",
    answer:
      "Binge eating took over my life in ways I never expected. I was **constantly out of control around food**, eating way more than I needed, and then feeling **incredibly sick and guilty afterward.** It really took a toll on my **self-esteem, messed with my relationships, and even disrupted my sleep.** The more I stressed about food, the more I struggled to feel normal around it—I just couldn’t **break the cycle on my own.**",
  },
  {
    question: "How has R.care helped you?",
    answer:
      "This program has been **a total game-changer** for me. It opened my eyes to all the **different reasons behind my binge eating**—things I never even realized before! I also got **practical tools to help manage my emotions** and understand my hunger cues better. I’ve learned to recognize my triggers and eat more mindfully. For the first time in a long while, I **actually feel in control again.** It’s also made a big difference in how I show up in my relationships and at work.",
  },
  {
    question: "What would you tell someone curious about trying out R.care?",
    answer:
      "I’d tell them to definitely give it a shot. It’s not just about stopping binge eating—it’s about really **getting to know yourself** and **finding that sense of control and focus again.** The program is supportive, practical, and helps you improve your life in a holistic way. When your relationship with food is a mess, it can **throw everything—your mind, body, and life—into chaos. This is your chance to take back control.**",
  },
];

export function Testimonial({ onNext }: { onNext: () => void }) {
  return (
    <article>
      <header>
        <p>{"Jenni’s personal story"}</p>
        <h2>{"From chaos to control"}</h2>
      </header>
      <Image
        src={persona}
        width={500}
        height={500}
        alt="Picture of testimonial's author"
      />
      {interview.map(({ question, answer }, itemIndex) => (
        <Interview key={itemIndex} question={question} answer={answer} />
      ))}
      <button type="button" onClick={onNext}>
        {"Continue"}
      </button>
    </article>
  );
}

function Interview({ answer, question }: { answer: string; question: string }) {
  return (
    <section>
      <header>
        <h3>{question}</h3>
      </header>
      <MarkdownText>{answer}</MarkdownText>
    </section>
  );
}
