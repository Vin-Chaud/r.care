import { Experience, Impact, Symptom } from "@/models/Metric";
import { OnboardingFlow } from "@/models/OnboardingFlow/model";

export const defaultOnboardingFlow: OnboardingFlow = {
  step_definitions: {},
  sections: [
    {
      title: "intro",
      subsections: [
        {
          step_definitions: {
            intro: {
              type: "info",
              contents: [
                {
                  type: "title",
                  text: ["Built by psychologists &", "binge eating experts"],
                },
                {
                  type: "text",
                  text: [
                    "Our quiz will help you learn more",
                    "about yourself and provide you with a",
                    "personal binge eating score.",
                  ],
                  variant: "subtle",
                },
                {
                  type: "image",
                  graphic_id: "intro",
                  max_height: 285,
                },
                {
                  type: "text",
                  text: "Created with experts from",
                  variant: "subtle",
                },
                {
                  type: "image",
                  graphic_id: "harvard",
                  max_height: 50,
                },
              ],
            },
          },
          step_order: ["intro"],
        },
      ],
    },
    {
      title: "Profile",
      subsections: [
        {
          step_definitions: {
            q1: {
              type: "single_select",
              title: "Which gender do you identify with?",
              options: [
                {
                  text: "Female",
                  value: "FEMALE",
                },
                {
                  text: "Male",
                  value: "MALE",
                },
                {
                  text: "Non-binary",
                  value: "NON_BINARY",
                },
                {
                  text: "Prefer not to answer",
                  value: "UNDISCLOSED",
                },
              ],
            },
            q2: {
              type: "single_select",
              title:
                "Have you ever been diagnosed with Binge Eating Disorder (BED)?",
              help_text:
                "It helps us enhance your experience, but rest assured, everyone is welcome, diagnosis or not.",
              options: [
                {
                  text: "I’m diagnosed by a doctor.",
                  value: "FORMAL_DIAGNOSIS",
                },
                {
                  text: "I'm self-diagnosed.",
                  value: "SELF_DIAGNOSIS",
                },
                {
                  text: "I suspect I might have BED.",
                  value: "SUSPICION",
                },
                {
                  text: "Not with BED, but another eating disorder.",
                  value: "FORMAL_DIAGNOSIS_OTHER_ED",
                },
                {
                  text: "Something else",
                  value: "OTHER",
                },
              ],
            },
            r1: {
              type: "story",
              panes: [
                {
                  title: "Glad you are here!",
                  body: "If you are trying to get more insight into your binge eating behavior, our quiz is a great first step.",
                  graphic_id: "r1_1",
                },
                {
                  title: "Glad you are here!",
                  body: "This quiz will help you understand yourself better and discover if R.care is the right fit for you. ",
                  graphic_id: "r1_2",
                },
              ],
            },
          },
          step_order: ["q1", "q2", "r1"],
        },
      ],
    },
    {
      title: "Understanding you",
      subsections: [
        {
          step_definitions: {
            q3: {
              type: "scale",
              preset: "frequency",
              title: "Do you feel in control of how much you eat?",
              scoring: {
                target_metric: Symptom.SelfControlChallenge,
                reverse: true,
              },
            },
            q4: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you eat meals much more quickly than other and seem to eat a lot more than others as well?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            q5: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you have a strong habit of eating when you’re bored such that nothing else can distract you?",
              scoring: { target_metric: Symptom.SelfControlChallenge },
            },
            q6: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you often feel desperate that you can’t be more in control of what you eat?",
              scoring: { target_metric: Symptom.SelfControlChallenge },
            },
            q7: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you often eat, even though you are not hungry, because of habit?",
              scoring: { target_metric: Symptom.SelfControlChallenge },
            },
            r2: {
              type: "story",
              panes: [
                {
                  body: "Binge eating symptoms can be exhausting.",
                  graphic_id: "r2_1",
                },
                {
                  body: "You’ve got some hurdles ahead, but you’re on the right path.",
                  graphic_id: "r2_2",
                },
                {
                  body: " Let’s continue to explore further - you’ve got this!",
                  graphic_id: "r2_3",
                },
              ],
            },
          },
          step_order: ["q3", "q4", "q5", "q6", "q7", "r2"],
        },
        {
          step_definitions: {
            q8: {
              type: "yes_no",
              title:
                "Is it easy for you to get back on track with a diet or healthy eating regime?",
              feedbacks: {
                no: {
                  type: "embedded",
                  text: "🍃 It's okay to struggle; we're here to help you get back up to practice mindful eating, one step at a time!",
                },
                yes: {
                  type: "embedded",
                  text: "🌟 Your resilience is your strength—keep using it to stay on track with your recovery goal.",
                },
              },
              scoring: {
                target_metric: Symptom.SelfControlChallenge,
                mode: "1_5",
                yes_high: true,
              },
            },
            q9: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you sometimes make yourself sick because you are so uncomfortably full?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            q10: {
              type: "scale",
              preset: "frequency",
              title:
                "Does your life seem to be ‘feast’ or ‘famine’ with very little moderation?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            q11: {
              type: "scale",
              preset: "frequency",
              title: "Do you tend to eat all day with no defined meal times?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            q12: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you eat about the same amount of food every day and rarely binge?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
                reverse: true,
              },
            },
            q13: {
              type: "scale",
              preset: "intensity",
              preamble_text: "Do you relate to following statement?",
              title:
                "“I feel in control of my urge to eat and can distract myself.”",
              min_label: "Not at all",
              max_label: "Totally",
              scoring: {
                target_metric: Symptom.SelfControlChallenge,
                reverse: true,
              },
            },
            q14: {
              type: "scale",
              preset: "intensity",
              preamble_text: "Do you relate to following statement?",
              title:
                "“I will keep eating, even when I am full, and it has become uncomfortable.”",
              min_label: "Not at all",
              max_label: "Totally",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            r3: {
              type: "story",
              panes: [
                {
                  body: "Now we’re going to explore how **binge eating** might be impacting your _feelings_ and _emotions_.",
                  graphic_id: "r3_1",
                },
                {
                  body: "Exploring the deeper emotional aspects of binge eating can be challenging and personal.",
                  graphic_id: "r3_2",
                },
                {
                  body: "It’s important to remember that **you’re not alone** and that you’re taking a step towards emotional healing.",
                  graphic_id: "r3_3",
                },
              ],
            },
          },
          step_order: ["q8", "q9", "q10", "q11", "q12", "q13", "q14", "r3"],
        },
        {
          step_definitions: {
            q15: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you have strong feelings of self-hate or guilt if you overeat?",
              scoring: { target_metric: Symptom.EmotionalEating },
            },
            q16: {
              type: "yes_no",
              title: "Are you your harshest critic?",
              feedbacks: {
                no: {
                  type: "embedded",
                  title: "🌼 Your self-assurance is impressive!",
                  text: "Great job practicing self-compassion—keep nurturing that kindness toward yourself!",
                },
                yes: {
                  type: "embedded",
                  title: "💪 It’s normal to feel this way.",
                  text: "Being tough on yourself is common, but remember, you deserve the same kindness you give others—we're here to help with that!",
                },
              },
              scoring: {
                target_metric: Impact.MentalHealth,
                mode: "1_5",
                yes_high: true,
              },
            },
            q17: {
              type: "yes_no",
              title: "Do you feel self-conscious eating around other people?",
              scoring: {
                target_metric: Impact.Relationship,
                mode: "1_5",
                yes_high: true,
              },
            },
            q18: {
              type: "scale",
              preset: "frequency",
              title:
                "How frequently do you eat as a way to cope with difficult emotions?",
              scoring: { target_metric: Symptom.EmotionalEating },
            },
            c1: {
              type: "info",
              contents: [
                {
                  type: "title",
                  text: "R.care empowers you to separate emotions from food and help you maintain balanced eating patterns throughout the day.",
                },
                {
                  type: "image",
                  graphic_id: "c1",
                },
                {
                  type: "text",
                  text: "R.care helps you feeling more grounded and able to emotionally self-regulate throughout your day.",
                },
              ],
            },
            q19: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you feel very self-conscious about your weight and body size such that it stops you from socializing?",
              scoring: {
                target_metric: Impact.Relationship,
              },
            },
            q20: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you notice that you reach for certain types of food (e.g., sweets, comfort foods) when you’re feeling emotionally upset?",
              scoring: { target_metric: Symptom.EmotionalEating },
            },
            r4: {
              type: "story",
              panes: [
                {
                  body: "Binge eating often stems from a deep sensitivity to emotions and a strong desire to find comfort and relief, which can be channeled into nurturing relationships and self-care.",
                  graphic_id: "r4_1",
                },
                {
                  body: "Where many people struggling with binge eating fall short is in recognizing and responding to their body's true hunger and fullness signals.",
                  graphic_id: "r4_2",
                },
                {
                  body: "This disconnect can be frustrating, but we're here to help. We'll now take a look at your ability to tune into your body's needs and maintain balanced eating habits.",
                  graphic_id: "r4_3",
                },
              ],
            },
          },
          step_order: ["q15", "q16", "q17", "q18", "c1", "q19", "q20", "r4"],
        },
      ],
    },
    {
      title: "Your Relationship With Food",
      subsections: [
        {
          step_definitions: {
            q21: {
              type: "scale",
              preset: "agreement",
              title:
                "How often do you find yourself thinking about your body image?",
              scoring: {
                target_metric: Impact.MentalHealth,
              },
            },
            q22: {
              type: "scale",
              preset: "agreement",
              title:
                "Do you usually not know how physically hungry you really are and eat more than you need?",
              base_feedback: {
                type: "embedded",
                text: [
                  "💡 It's not uncommon to feel disconnected from your body's hunger signals. This can happen for many reasons, including emotional triggers and stress.",
                  "By becoming more aware of your hunger and fullness cues, you can make choices that truly nourish both your body and mind.",
                ],
              },
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            q23: {
              type: "scale",
              preset: "agreement",
              title:
                "How often do you get distracted by thoughts about food when trying to focus? ",
              scoring: {
                target_metric: Impact.Productivity,
              },
            },
            c2: {
              type: "info",
              contents: [
                {
                  type: "title",
                  text: "Become more productive and live life fully by saying goodbye to obsessive thoughts about food.",
                },
                {
                  type: "image",
                  graphic_id: "c2",
                },
                {
                  type: "text",
                  text: "R.care helps you feeling more focused and less distracted by the obsessive thoughts about food.",
                },
              ],
            },
            q24: {
              type: "scale",
              preset: "agreement",
              title:
                "How often do you experience difficulty falling asleep or staying asleep after a binge eating episode?",
              scoring: {
                target_metric: Impact.Productivity,
              },
            },
            q25: {
              type: "scale",
              preset: "agreement",
              title: "How often do you skip meals?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            c3: {
              type: "info",
              contents: [
                { type: "emoji", emoji: "👏" },
                { type: "title", text: "Thank you for sharing!" },
                {
                  type: "text",
                  text: "To fine-tune your results even further, let’s get to know you better. ",
                },
              ],
            },
            q26: {
              type: "yes_no",
              title: "Have you heard of Alexithymia?",
              help_text:
                "It’s a little known condition affecting many people with Binge Eating Disorder.",
              feedbacks: {
                no: {
                  type: "embedded",
                  text: "**Alexithymia is the inability to identify and describe emotions in oneself.** This condition makes it harder for individuals to understand their feelings and can result in using food as a way to cope with unresolved or unidentified emotional distress.",
                },
                yes: {
                  type: "embedded",
                  text: "**It’s great that you’re already familiar with Alexithymia.** To reiterate, it’s the inability to identify and describe emotions in oneself. This condition makes it harder for individuals to understand their feelings and can result in using food as a way to cope with unresolved or unidentified emotional distress.",
                },
              },
              scoring: {
                target_metric: Experience.Knowledge,
                mode: "pos_neg",
                yes_high: true,
                scaling_factor: 5,
              },
            },
            q27: {
              type: "scale",
              preset: "custom",
              title: "How strong is your knowledge of binge eating?",
              custom_labels: [
                "I know very little about binge eating.",
                "I know the basics, but that’s about it.",
                "I have a good understanding.",
                "I’m an expert in all things binge eating.",
              ],
              base_feedback: {
                type: "full",
                contents: [
                  {
                    type: "emoji",
                    emoji: "💪",
                  },
                  {
                    type: "title",
                    text: "Great, we’ll build on your knowledge!",
                  },
                  {
                    type: "text",
                    text: "Your personalized program will help you truly understand your eating patterns.",
                  },
                  {
                    type: "text",
                    text: "You’ll develop strategies and coping methods for overcoming binge eating related struggles and embracing your true self. ",
                  },
                ],
              },
              feedbacks: {
                1: {
                  type: "full",
                  contents: [
                    { type: "emoji", emoji: "🫶" },
                    {
                      type: "title",
                      text: "No worries, we’ll guide you on your journey!",
                    },
                    {
                      type: "text",
                      text: "Your personalized program will start with the basics, gradually building your understanding of binge eating and yourself.",
                    },
                    {
                      type: "text",
                      text: "You’ll develop strategies and coping methods for overcoming food-related struggles and embracing your true self",
                    },
                  ],
                },
              },
              scoring: {
                target_metric: Experience.Knowledge,
                scaling_factor: 20,
                max_unscaled_score: 5,
              },
            },
            q28: {
              type: "single_select",
              title:
                "When did you first suspect you might be dealing with a binge eating issue?",
              options: [
                {
                  text: "< 6 months ago",
                  value: "LESS_THAN_SIX_MONTHS",
                },
                {
                  text: "6 months - 1 year ago",
                  value: "SIX_TO_TWELVE_MONTHS",
                },
                {
                  text: "1-2 years ago",
                  value: "ONE_TO_TWO_YEARS",
                },
                {
                  text: "More than 2 years ago",
                  value: "MORE_THAN_TWO_YEARS",
                },
              ],
            },
            c5: {
              type: "info",
              contents: [
                {
                  type: "title",
                  text: "Many R.care members don’t have a formal diagnosis.",
                },
                {
                  type: "text",
                  text: "Our bite-sized lessons will help you kickstart your journey of healing your relationship with food, with or without a diagnosis. ",
                },
                {
                  type: "image",
                  graphic_id: "c5",
                },
              ],
            },
            q29: {
              type: "multi_select",
              title:
                "Do you suspect you have any other mental health conditions that impact your life?",
              help_text:
                "Knowing about any other conditions will help us tailor your results more accurately. Select all that apply.",
              options: [
                {
                  text: "Anxiety",
                  value: "ANXIETY",
                  feedback: {
                    priority: 4,
                    type: "full",
                    contents: [
                      {
                        type: "title",
                        text: "Feeling anxious can be a result of binge eating symptoms.",
                      },
                      {
                        type: "text",
                        text: "The stress of managing eating behaviors, body image concerns, and the fear of being judged can contribute to heightened anxiety levels. Often, managing your eating habit effectively can significantly reduce or eliminate this anxiety. ",
                      },
                      {
                        type: "image",
                        graphic_id: "c6",
                      },
                    ],
                  },
                },
                {
                  text: "Depression",
                  value: "DEPRESSION",
                  feedback: {
                    priority: 3,
                    type: "full",
                    contents: [
                      {
                        type: "title",
                        text: "Feeling depressed can be a result of binge eating symptoms.",
                      },
                      {
                        type: "text",
                        text: "Binge eating often leads to feelings of guilt, shame, and loss of control, which can trigger or worsen depressive symptoms.",
                      },
                      {
                        type: "text",
                        text: "Additionally, the physical discomfort and health issues related to binge eating can further contribute to a depressed mood.",
                      },
                      {
                        type: "image",
                        graphic_id: "c6",
                      },
                    ],
                  },
                },
                {
                  text: "Alcohol/Substance use",
                  value: "ALCOHOL_SUBSTANCE_USE",
                  feedback: {
                    priority: 1,
                    type: "full",
                    contents: [
                      {
                        type: "title",
                        text: "It can be beneficial to address binge eating disorder alongside treatment for substance use disorder.",
                      },
                      {
                        type: "text",
                        text: "Addressing only one might leave the other unaddressed, potentially leading to relapse. Integrated treatment that tackles both binge eating and substance use can provide a more comprehensive approach to recovery.",
                      },
                      {
                        type: "image",
                        graphic_id: "c6",
                      },
                    ],
                  },
                },
                {
                  text: "Body Dysmorphia",
                  value: "BODY_DYSMORPHIA",
                  feedback: {
                    priority: 2,
                    type: "full",
                    contents: [
                      {
                        type: "title",
                        text: "Body Dysmorphia can be a result of binge eating symptoms.",
                      },
                      {
                        type: "text",
                        text: "The negative self-image and guilt associated with binge eating can intensify preoccupation with perceived body flaws.",
                      },
                      {
                        type: "text",
                        text: "This heightened focus on body appearance and dissatisfaction can lead to or worsen body dysmorphic disorder.",
                      },
                      {
                        type: "image",
                        graphic_id: "c6",
                      },
                    ],
                  },
                },
                { text: "Other", value: "OTHER" },
              ],
              none_option: { text: "None" },
            },
            q30: {
              type: "scale",
              preset: "agreement",
              preamble_text: "Do you relate to following statement?",
              title:
                "“I feel like others are not taking my eating struggles seriously.”",
              scoring: {
                target_metric: Impact.MentalHealth,
              },
            },
            q31: {
              type: "scale",
              preset: "agreement",
              preamble_text: "Do you relate to following statement?",
              title:
                "“I have been told to simply be more disciplined or to simply stop binge eating.”",
              scoring: {
                target_metric: Impact.MentalHealth,
              },
            },
            q32: {
              type: "scale",
              preset: "agreement",
              preamble_text: "Do you relate to following statement?",
              title: "“I often feel misunderstood by the people around me.”",
              scoring: {
                target_metric: Impact.Relationship,
              },
            },
            r5: {
              type: "story",
              panes: [
                {
                  body: "Being _misunderstood_ by the people around you can feel **lonely** and **isolating**.",
                  graphic_id: "r5_1",
                },
                {
                  body: "We are here to **break the stigma** around binge eating and help you understand yourself better. ",
                  graphic_id: "r5_2",
                },
                {
                  body: "Nearly done! A Few final questions about your goals and lifestyle to further tailor your plan.",
                  graphic_id: "r5_3",
                },
              ],
            },
          },
          step_order: [
            "q21",
            "q22",
            "q23",
            "c2",
            "q24",
            "q25",
            "c3",
            "q26",
            "q27",
            "q28",
            "c5",
            "q29",
            "q30",
            "q31",
            "q32",
            "r5",
          ],
        },
      ],
    },
    {
      title: "Program Personalization",
      subsections: [
        {
          step_definitions: {
            q33: {
              type: "single_select",
              title: "What would you like to improve the most right now",
              options: [
                {
                  text: "Regain control over my eating habits",
                  value: "CONTROL_EATING_HABITS",
                },
                {
                  text: "Reduce emotional eating",
                  value: "REDUCE_EMOTIONAL_EATING",
                },
                {
                  text: "Create a more balanced eating routine",
                  value: "BALANCED_EATING_ROUTINE",
                },
                {
                  text: "Connect with my body’s hunger & fullness cues",
                  value: "CONNECT_HUNGER_FULLNESS",
                },
                {
                  text: "Break the cycle of guilt & shame around food",
                  value: "BREAK_GUILT_SHAME",
                },
                {
                  text: "Something else",
                  value: "OTHER",
                },
              ],
            },
            q34: {
              type: "multi_select",
              title:
                "When I think of taking control of my life, I see myself...",
              help_text: "Choose as many as you like",
              options: [
                {
                  text: "Feeling confident",
                  value: "CONFIDENCE",
                },
                {
                  text: "Building emotional resilience",
                  value: "EMOTIONAL_RESILIENCE",
                },
                {
                  text: "Developing a healthier relationship with food",
                  value: "HEALTHY_RELATIONSHIP_FOOD",
                },
                {
                  text: "Living more mindfully and with intention",
                  value: "MINDFULNESS",
                },
                {
                  text: "Having better relationships",
                  value: "BETTER_RELATIONSHIPS",
                },
              ],
            },
            q35: {
              type: "single_select",
              title: "What is your primary reason for downloading this app?",
              help_text: "Choose the option that resonates the most.",
              options: [
                {
                  text: "To manage my weight better",
                  value: "MANAGE_WEIGHT",
                },
                {
                  text: "To stop binge eating in response to stress or negative emotions",
                  value: "STOP_BINGE_EATING",
                },
                {
                  text: "To break the cycle of dieting and binge eating",
                  value: "BREAK_CYCLE",
                },
                {
                  text: "To improve my overall wellness - physical and mental",
                  value: "IMPROVE_WELLNESS",
                },
              ],
            },
            q36: {
              type: "integer",
              title:
                "Approximately how many times did you binge eat in the past week?",
              help_text:
                "It's okay if you can't recall the exact number. There's no need to stress out. Count the instances of binge eating as much as you can remember.",
              min: 0,
              max: 100,
              placeholder: "X (times per week)",
            },
            q37: {
              type: "integer",
              title:
                "Three months from now, what is your target frequency of binge eating?",
              help_text:
                "You reported you currently binge eat {{current_frequency}} times/week.",
              min: 0,
              max: 100,
              expressions: {
                current_frequency: "response_value('q36')",
              },
              placeholder: "X (times per week)",
            },
            c7: {
              type: "info",
              contents: [
                {
                  type: "title",
                  text: "Our evidence-based program is designed by leading binge eating disorder experts.",
                },
                {
                  type: "image",
                  graphic_id: "harvard",
                },
                {
                  type: "image",
                  graphic_id: "c7_wheel",
                },
              ],
            },
            q38: {
              type: "single_select",
              preamble_text:
                "We’re tailoring your program to fit your lifestyle.",
              title: "What learning pace feels right to you?",
              options: [
                {
                  text: "⚡ As fast as possible",
                  value: "FAST",
                },
                {
                  text: "🐢 Slow and steady",
                  value: "SLOW",
                },
                {
                  text: "🎯 Somewhere in between",
                  value: "MEDIUM",
                },
              ],
            },
            q39: {
              type: "single_select",
              preamble_text:
                "We’re tailoring your program to fit your lifestyle.",
              title: "How busy are you on an average day?",
              options: [
                {
                  text: "Very busy, I have almost no downtime.",
                  value: "VERY_BUSY",
                  feedback: { id: "busy" },
                },
                {
                  text: "Busy, but I find moments to relax.",
                  value: "BUSY",
                  feedback: { id: "busy" },
                },
                {
                  text: "Not too busy, my schedule’s flexible.",
                  value: "NOT_BUSY",
                  feedback: { id: "free" },
                },
                {
                  text: "I have plenty of free time.",
                  value: "FREE",
                  feedback: { id: "free" },
                },
              ],
              feedback_definitions: {
                busy: {
                  type: "full",
                  contents: [
                    { type: "emoji", emoji: "😌" },
                    {
                      type: "title",
                      text: "It sounds like you have a lot on your plate.",
                    },
                    {
                      type: "text",
                      text: "We’ll make sure your program accommodates your busy schedule, so you can easily integrate self-improvement into your day.",
                    },
                  ],
                },
                free: {
                  type: "full",
                  contents: [
                    { type: "emoji", emoji: "👍" },
                    {
                      type: "title",
                      text: "Sounds like you have the time to prioritise managing your symptoms.",
                    },
                    {
                      type: "text",
                      text: "That’s great! While it can be tempting to go all in at once, we encourage you to slow down and take it one day at a time, which will help building a lasting habit.",
                    },
                  ],
                },
              },
            },
            q40: {
              type: "single_select",
              preamble_text:
                "We’re tailoring your program to fit your lifestyle.",
              title: "How much time can you dedicate to self-improvement?",
              options: [
                {
                  text: "5 mins",
                  value: "5_MINUTES",
                },
                {
                  text: "10 mins",
                  value: "10_MINUTES",
                },
                {
                  text: "15 mins+",
                  value: "15_MINUTES_OR_MORE",
                },
              ],
            },
            c9: {
              type: "info",
              contents: [
                {
                  type: "title",
                  text: "Managing your binge eating behavior is hard, but R.care makes it easy in 5 minutes a day.",
                },
                {
                  type: "testimonial",
                },
              ],
            },
            q41: {
              type: "scale",
              preset: "intensity",
              title: "How motivated are you to learn more about yourself?",
              min_label: "Not at all",
              max_label: "Very Motivated",
              feedbacks: {
                1: { id: "not_motivated" },
                2: { id: "not_motivated" },
                3: { id: "not_motivated" },
                4: { id: "motivated" },
                5: { id: "motivated" },
              },
              feedback_definitions: {
                motivated: {
                  type: "full",
                  contents: [
                    { type: "emoji", emoji: "🚀" },
                    {
                      type: "title",
                      text: "**Your enthusiasm is a great sign!** A positive mindset is the foundation of any growth journey.",
                    },
                    {
                      type: "text",
                      text: "Based on everything you shared with us, we’ll show you how your personal struggles align with binge eating. ",
                    },
                  ],
                },
                not_motivated: {
                  type: "full",
                  contents: [
                    { type: "emoji", emoji: "👭" },
                    {
                      type: "title",
                      text: "**It’s normal to feel this way!** We’re here to boost your motivation and guide you on your journey.",
                    },
                    {
                      type: "text",
                      text: "Based on everything you shared with us, we’ll show you how your personal struggles align with binge eating.",
                    },
                  ],
                },
              },
            },
          },
          step_order: [
            "q33",
            "q34",
            "q35",
            "q36",
            "q37",
            "c7",
            "q38",
            "q39",
            "q40",
            "c9",
            "q41",
          ],
        },
      ],
    },
    {
      title: { branding: true },
      subsections: [
        {
          step_definitions: {
            channel: {
              type: "multi_select",
              title: "One more thing, where did you hear about R.care?",
              options: [
                {
                  text: "Friends or Family",
                  value: "FRIENDS_FAMILY",
                },
                {
                  text: "Clinician",
                  value: "CLINICIAN",
                },
                {
                  text: "Google search",
                  value: "GOOGLE",
                },
                {
                  text: "Instagram or Facebook",
                  value: "FACEBOOK_INSTRAGRAM",
                },
                {
                  text: "TikTok",
                  value: "TIKTOK",
                },
                {
                  text: "Reddit",
                  value: "REDDIT",
                },
                {
                  text: "Other",
                  value: "OTHER",
                },
              ],
              none_option: { text: "None" },
            },
            email: {
              type: "free_text",
              title: "What’s the best email address for you?",
              help_text: "You’ll use this to log back in later.",
              format: "email",
              placeholder: "Please enter your email.",
            },
          },
          step_order: ["channel", "email"],
        },
      ],
    },
  ],
  landing_quiz_step: {
    id: "landing_quiz",
    type: "single_select",
    title: "Select your age to start the quiz",
    help_text: "⌛ 3 min quiz",
    options: [
      { value: "13_17", text: "13-17" },
      { value: "18_29", text: "18-29" },
      { value: "30_49", text: "30-49" },
      { value: "50_OR_OLDER", text: "50+" },
    ],
  },
  popup_quiz_step: {
    id: "popup_quiz",
    type: "yes_no",
    title:
      "Have you ever noticed any disordered eating symptoms in your extended family?",
  },
  reaction_step_id: "reaction",
  email_step_id: "email",
  current_episode_count_id: "q36",
  target_episode_count_id: "q37",
  target_knowledge_score: 94,
  interview: {
    title: "From chaos to control",
    subtitle: "Jenni’s personal story",
    graphic_id: "persona",
    questions: [
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
        question:
          "What would you tell someone curious about trying out R.care?",
        answer:
          "I’d tell them to definitely give it a shot. It’s not just about stopping binge eating—it’s about really **getting to know yourself** and **finding that sense of control and focus again.** The program is supportive, practical, and helps you improve your life in a holistic way. When your relationship with food is a mess, it can **throw everything—your mind, body, and life—into chaos. This is your chance to take back control.**",
      },
    ],
    disclaimer: null,
  },
  program_plan: [
    {
      step_id: "q33",
      prompt: "We’re going to focus on helping you",
      echo_mapping: {
        CONTROL_EATING_HABITS: "Regain control over my eating habits",
        REDUCE_EMOTIONAL_EATING: "Reduce emotional eating",
        BALANCED_EATING_ROUTINE: "Create a more balanced eating routine",
        CONNECT_HUNGER_FULLNESS:
          "Connect with my body’s hunger & fullness cues",
        BREAK_GUILT_SHAME: "Break the cycle of guilt & shame around food",
      },
      echo_default: "Managing your binge eating symptoms",
      color: "#D7E2C9",
    },
    {
      step_id: "q27",
      prompt: "You said that",
      echo_mapping: {
        1: "You are relatively new to Binge Eating",
        3: "You have a good understanding of Binge Eating",
        4: "You have a good understanding of Binge Eating",
      },
      echo_default: "You’ve done some research into Binge Eating",
      color: "#EEE2CE",
    },
    {
      step_id: "q38",
      prompt: "You also shared that",
      echo_mapping: {
        FAST: "You want to learn as fast as possible",
      },
      echo_default: "You want to take your time to learn",
      color: "#C8DBE3",
    },
  ],
  knowledge_plan: [
    {
      step_id: "q27",
      prompt: "How much you know about binge eating:",
      echo_mapping: {
        1: "Very little",
        2: "The basics",
        3: "A good amount",
        4: "Expert in all things binge eating",
      },
      echo_default: "",
      color: "#F9F4FF",
    },
    {
      step_id: "q34",
      prompt: "What you want to achieve:",
      echo_mapping: {
        CONFIDENCE: "Feeling confident",
        EMOTIONAL_RESILIENCE: "Building emotional resilience",
        HEALTHY_RELATIONSHIP_FOOD:
          "Developing a healthier relationship with food",
        MINDFULNESS: "Living more mindfully and with intention",
        BETTER_RELATIONSHIPS: "Having better relationships",
      },
      multi_select_priority: [
        "CONFIDENCE",
        "EMOTIONAL_RESILIENCE",
        "HEALTHY_RELATIONSHIP_FOOD",
        "MINDFULNESS",
        "BETTER_RELATIONSHIPS",
      ],
      echo_default: "",
      color: "#F9F4FF",
    },
    {
      step_id: "q41",
      prompt: "Current state of mind:",
      echo_mapping: {
        1: "Unmotivated",
        2: "Unmotivated",
        3: "Not very motivated",
        4: "Motivated",
        5: "Very motivated",
      },
      echo_default: "",
      color: "#F9F4FF",
    },
  ],
  faqs: [
    {
      question: "What is the primary purpose of the R.care app?",
      answer:
        "R.care is designed to help you stop binge eating. It’s a science-based digital program based on Cognitive Behavioral Therapy, Dialectical Behavioral Therapy, and Appetite Awareness Training principles, offering a range of tools to improve your relationship with food and eating habits.",
    },
    {
      question:
        "Do I need a formal Bing Eating Disorder diagnosis to use R.care?",
      answer:
        "No formal diagnosis is required. R.care is designed to be helpful for anyone seeking to improve their eating habits and relationship with food.",
    },
    {
      question: "How can R.care help me improve my eating habits?",
      answer: [
        "R.care offers a comprehensive set of features to help you adopt and stick to more balanced eating habits:",
        {
          list: [
            "Fullness tracking: Learn how to tune into your internal stomach signals and guide your eating decision based on those cues. It’s a clinically developed tool that has been proven to be effective for people struggling with binge eating.",
            "Emotion tracking: Practice becoming aware of and naming the emotion that you feel. The enhanced awareness itself will reduce emotional eating and you will also learn how your emotional fluctuation relate to your eating patterns.",
            "Intuitive eating journal: In R.care, we don’t record calories or weights. Instead we focus on aspects of eating that actually matters such as how you felt, what prompted you to eat, and your hunger and fullness levels before and after your meal.",
            "Insight page: Based on your progress tracking, you will be presented with weekly insight on your personal factors that are often associated with overeating and binge eating.",
          ],
        },
      ],
    },
    {
      question:
        "Can I still use R.care if I’m already working with a therapist or dietitian?",
      answer:
        "Yes, you can absolutely use R.care while working with a therapist or dietitian.  It provides self-guided resources and daily support to help you stay on track between sessions, reinforcing the progress you're making in therapy or nutritional counseling. Using R.care alongside your professional guidance can offer a more comprehensive and supportive approach to overcoming binge eating.",
    },
  ],
  testimonial_disclaimer: null,
  highlighted_testimonial: {
    avatar_graphic_id: "rachel",
    screen_name: "Rachel",
    screen_subtitle: "32, Otawa (Canada)",
    content:
      "I am obsessed with r_care! I feel so understood, learning more how to heal my relationship with food. It helped me approach eating in a more peaceful and nourishing way. Highly recommend.",
    social: {
      comments: 12,
      shares: 4,
      likes: 35,
    },
  },
  community_testimonials: [
    {
      avatar_graphic_id: "charlie",
      screen_name: "Charlie",
      screen_subtitle: "29, Sedona (USA)",
      content:
        "Struggled with food obsession for most of my life. I knew it was a serious issue, but I didn’t know how to break free. R.care **helped me identify** my problems and finally **escape the restrict-binge cycle.**",
    },
    {
      avatar_graphic_id: "annie",
      screen_name: "Annie",
      screen_subtitle: "52, Austin (USA)",
      content:
        "R.care has truly **exceeded my expectations.** Its comprehensive approach to behavior change is **more effective than any therapy** I’ve tried. The **daily engagement kept me motivated** and on track. R.care has been a crucial tool in my recovery.",
    },
    {
      avatar_graphic_id: "lea",
      screen_name: "Lea",
      screen_subtitle: "27, London (USA)",
      content:
        "R.care makes binge eating recovery feel more achievable. Following the daily program helps me gently take control of my struggles and rebuild a positive relationship with food. Having this 24/7 companion is truly a game-changer. Thank you!",
    },
    {
      avatar_graphic_id: "kali",
      screen_name: "Kali",
      screen_subtitle: "21, Atlanta (USA)",
      content:
        "R.care feels like having a brilliant, **supportive expert** right in my pocket! I’m **no longer suffering from the sickness and guilt** that used to follow every binge. I feel incredible and **at peace with myself.** I’m absolutely thrilled to have discovered it!",
    },
    {
      avatar_graphic_id: "kate",
      screen_name: "Kate",
      screen_subtitle: "35, Toronto (USA)",
      content:
        "After using the app for a while, I can almost hear the expert’s voice whenever I eat. The **knowledge and guidance from R.care** are invaluable—it **empowers me during moments of doubt** and helps me avoid falling back into the binge cycle.",
    },
  ],
  activate_graphic_id: "activate",
  user_email_step_id: "email",
};
