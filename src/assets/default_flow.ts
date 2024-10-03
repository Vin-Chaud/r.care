import { OnboardingFlow } from "@/models/OnboardingFlow/model";

export const defaultOnboardingFlow: OnboardingFlow = {
  step_definitions: {},
  sections: [
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
              template: "frequency",
              title: "Do you feel in control of how much you eat?",
            },
            q4: {
              type: "scale",
              template: "frequency",
              title:
                "Do you eat meals much more quickly than other and seem to eat a lot more than others as well?",
            },
            q5: {
              type: "scale",
              template: "frequency",
              title:
                "Do you have a strong habit of eating when you’re bored such that nothing else can distract you?",
            },
            q6: {
              type: "scale",
              template: "frequency",
              title:
                "Do you often feel desperate that you can’t be more in control of what you eat?",
            },
            q7: {
              type: "scale",
              template: "frequency",
              title:
                "Do you often eat, even though you are not hungry, because of habit?",
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
                " Is it easy for you to get back on track with a diet or healthy eating regime?",
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
            },
            q9: {
              type: "scale",
              template: "frequency",
              title:
                "Do you sometimes make yourself sick because you are so uncomfortably full?",
            },
            q10: {
              type: "scale",
              template: "frequency",
              title:
                "Does your life seem to be ‘feast’ or ‘famine’ with very little moderation?",
            },
            q11: {
              type: "scale",
              template: "frequency",
              title: "Do you tend to eat all day with no defined meal times?",
            },
            q12: {
              type: "scale",
              template: "frequency",
              title:
                "Do you eat about the same amount of food every day and rarely binge?",
            },
            q13: {
              type: "scale",
              template: "intensity",
              preamble_text: "Do you relate to following statement?",
              title:
                "“I feel in control of my urge to eat and can distract myself.”",
              min_label: "Not at all",
              max_label: "Totally",
            },
            q14: {
              type: "scale",
              template: "intensity",
              preamble_text: "Do you relate to following statement?",
              title:
                "“I will keep eating, even when I am full, and it has become uncomfortable.”",
              min_label: "Not at all",
              max_label: "Totally",
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
              template: "frequency",
              title:
                "Do you have strong feelings of self-hate or guilt if you overeat?",
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
            },
            q17: {
              type: "yes_no",
              title: "Do you feel self-conscious eating around other people?",
            },
            q18: {
              type: "scale",
              template: "frequency",
              title:
                "How frequently do you eat as a way to cope with difficult emotions?",
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
              template: "frequency",
              title:
                "Do you feel very self-conscious about your weight and body size such that it stops you from socializing?",
            },
            q20: {
              type: "scale",
              template: "frequency",
              title:
                "Do you notice that you reach for certain types of food (e.g., sweets, comfort foods) when you’re feeling emotionally upset?",
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
      title: "Your Experience",
      subsections: [
        {
          step_definitions: {
            q21: {
              type: "scale",
              template: "agreement",
              title:
                "How often do you find yourself thinking about your body image?",
            },
            q22: {
              type: "scale",
              template: "agreement",
              title:
                "Do you usually not know how physically hungry you really are and eat more than you need?",
              base_feedback: {
                type: "embedded",
                text: [
                  "💡 It's not uncommon to feel disconnected from your body's hunger signals. This can happen for many reasons, including emotional triggers and stress.",
                  "By becoming more aware of your hunger and fullness cues, you can make choices that truly nourish both your body and mind.",
                ],
              },
            },
            q23: {
              type: "scale",
              template: "agreement",
              title:
                "How often do you get distracted by thoughts about food when trying to focus? ",
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
              template: "agreement",
              title:
                "How often do you experience difficulty falling asleep or staying asleep after a binge eating episode?",
            },
            q25: {
              type: "scale",
              template: "agreement",
              title: "How often do you skip meals?",
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
                  text: "**It’s great that you’re already familiar with Alexithymia.** To reaffirm, it’s the inability to identify and describe emotions in oneself. This condition makes it harder for individuals to understand their feelings and can result in using food as a way to cope with unresolved or unidentified emotional distress.",
                },
              },
            },
            q27: {
              type: "scale",
              template: "custom",
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
            },
            q28: {
              type: "scale",
              template: "custom",
              title:
                "When did you first suspect you might be dealing with a binge eating issue?",
              custom_labels: [
                "< 6 months ago",
                "6 months - 1 year ago",
                "1-2 years ago",
                "More than 2 years ago",
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
                    ],
                  },
                },
                { text: "Other", value: "OTHER" },
              ],
              none_option: { text: "None" },
            },
            q30: {
              type: "scale",
              template: "agreement",
              preamble_text: "Do you relate to following statement?",
              title:
                "“I feel like others are not taking my  eating struggles seriously.”",
            },
            q31: {
              type: "scale",
              template: "agreement",
              preamble_text: "Do you relate to following statement?",
              title:
                "“I have been told to simply be more disciplined or to simply stop binge eating.”",
            },
            q32: {
              type: "scale",
              template: "agreement",
              preamble_text: "Do you relate to following statement?",
              title: "“I often feel misunderstood by the people around me.”",
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
                  type: "image",
                  graphic_id: "testimonial_single",
                },
              ],
            },
            q41: {
              type: "scale",
              template: "intensity",
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
};
