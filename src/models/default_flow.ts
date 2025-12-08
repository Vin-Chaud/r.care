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
                  text: ["Let's start customizing a diary that feels truly yours."],
                },
                {
                  type: "text",
                  text: [
                    "Step inside —",
                    "discover what helps you grow deeper, softer, stronger.",
                  ],
                  variant: "subtle",
                },
                {
                  type: "image",
                  graphic_id: "intro",
                  max_height: 260,
                },
                {
                  type: "text",
                  text: "",
                  variant: "subtle",
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
            ["gender"]: {
              type: "single_select",
              title: "Which gender do you identify with?",
              options: [
                {
                  text: "Male",
                  value: "MALE",
                },
                {
                  text: "Female",
                  value: "FEMALE",
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
            ["bed_diagnosis"]: {
              type: "single_select",
              title:
                "How do you usually organize your thoughts?",
              help_text:
                "In other words, what should be the main layout of the diary?",
              options: [
                {
                  text: "By journaling",
                  value: "FORMAL_DIAGNOSIS",
                },
                {
                  text: "Making a to-do list",
                  value: "SELF_DIAGNOSIS",
                },
                {
                  text: "Doodles and sketches",
                  value: "SUSPICION",
                },
                {
                  text: "Scrapbooking",
                  value: "FORMAL_DIAGNOSIS_OTHER_ED",
                },
                {
                  text: "I’m not sure",
                  value: "OTHER",
                },
              ],
            },
            r1: {
              type: "story",
              panes: [
                {
                  title: "Welcome to Aster & Ink.",
                  body: "We’ll understand your personality, intentions, and lifestyle to craft a diary that feels soft, personal, and perfectly you.",
                  graphic_id: "",
                },
                {
                  title: "Ready to begin?",
                  body: "No more ready-print diary. Make it specially designed for you. Make every day in 2026 count.",
                  graphic_id: "",
                },
              ],
            },
          },
          step_order: ["gender", "bed_diagnosis", "r1"],
        },
      ],
    },
    {
      title: "Understanding you",
      subsections: [
        {
          step_definitions: {
            ["selfcontrol_feel"]: {
              type: "scale",
              preset: "frequency",
              title: "Do you plan your days with intention or go with the flow?",
              scoring: {
                target_metric: Symptom.SelfControlChallenge,
              },
            },
            ["internalsigdysfunc_eatquick"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you enjoy revisiting the day and having a retrosepction?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            ["selfcontrol_bored"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you feel comfortable expressing your thoughts from scratch or do you prefer more guidance?",
              scoring: { 
                target_metric: Symptom.SelfControlChallenge,
              },
            },
            ["selfcontrol_desperate"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you enjoy setting golas and tracking your growth?",
              scoring: { 
                target_metric: Symptom.SelfControlChallenge,
              },
            },
            ["selfcontrol_habit"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you like following routines?",
              scoring: { 
                target_metric: Symptom.SelfControlChallenge,
              },
            },
            r2: {
              type: "story",
              panes: [
                {
                  title: "Everyone blossoms differently.",
                  body: "Some people thrive with perfectly planned days, while others grow best by going with the flow and reflecting later.",
                  graphic_id: "r2_1",
                },
                {
                  title: "Your style isn't wrong.",
                  body: "You simply need a diary that understands how you naturally think, feel, and grow. Your rhythm matters.",
                  graphic_id: "r2_2",
                },
                {
                   title: "Let's break it down.",
                  body: "This quiz helps us learn your planning personality so we can craft a 2026 diary that supports your strengths — whether you’re a gentle planner or a reflective soul.",
                  graphic_id: "r2_3",
                },
              ],
            },
          },
          step_order: [
            "selfcontrol_feel",
            "internalsigdysfunc_eatquick",
            "selfcontrol_bored",
            "selfcontrol_desperate",
            "selfcontrol_habit",
            "r2",
          ],
        },
        {
          step_definitions: {
            ["selfcontrol_getbackontrack"]: {
              type: "yes_no",
              title:
                "Do you struggle to commit to the goal you set at the beginning of the year?",
              feedbacks: {
                no: {
                  type: "embedded",
                  text: "🍃 That’s fantastic! We’ll focus on enriching your process to realize your commitment.",
                },
                yes: {
                  type: "embedded",
                  text: "🌟 No worries — you're not alone. We’ll help you continue with your commitment, and make a true difference in 2026. your strategy, profile, and approach together.",
                },
              },
              scoring: {
                target_metric: Symptom.SelfControlChallenge,
                mode: "1_5",
                yes_high: true,
              },
            },
            ["internalsigdysfunc_fulluntilsick"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Are you good at setting goals?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
                reverse: true,
              },
            },
            ["internalsigdysfunc_feastfamine"]: {
              type: "scale",
              preset: "frequency",
              title:
                  "Do you find it difficult to be honest with yourself?",
              scoring: {
                target_metric: Impact.Productivity,
                reverse: true,
              },
            },
            ["internalsigdysfunc_grazeallday"]: {
              type: "scale",
              preset: "frequency",
              title: "Do you have difficulties making personal decisions?",
              scoring: {
                target_metric: Impact.Productivity,
                reverse: true,
              },
            },
            ["internalsigdysfunc_regulareat"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you know how to express your fear and concerns?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            ["selfcontrol_candistract"]: {
              type: "scale",
              preset: "intensity",
              preamble_text: "Do you relate to following statement?",
              title:
                "I frequently feel lost in my thoguhts or emotions.",
              min_label: "Not at all",
              max_label: "Totally",
              scoring: {
                target_metric: Symptom.SelfControlChallenge,
              },
            },
            ["internalsigdysfunc_eatpastcomfortablyfull"]: {
              type: "scale",
              preset: "intensity",
              preamble_text: "Do you relate to following statement?",
              title:
                "I go on with my life but often forget the daily joy and the gratitude.",
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
                  title: "Think of Aster & Ink as a soft little companion.",
                  body: "It’s here to help you organize your days with ease and reflect on your moments with love.",
                  graphic_id: "r3_1",
                },
                {
                  title: "Beautiful inside out.",
                  body: "Your diary isn’t just pretty — it’s thoughtfully shaped by behavioral science and real data on habits, reflection, and emotional growth.",
                  graphic_id: "r3_2",
                },
                {
                  title: "From your first page to your fullest you.",
                  body: "With thoughtful prompts and guided moments, this diary helps you make every single day count.",
                  graphic_id: "r3_3",
                },
              ],
            },
          },
          step_order: [
            "selfcontrol_getbackontrack",
            "internalsigdysfunc_fulluntilsick",
            "internalsigdysfunc_feastfamine",
            "internalsigdysfunc_grazeallday",
            "internalsigdysfunc_regulareat",
            "selfcontrol_candistract",
            "internalsigdysfunc_eatpastcomfortablyfull",
            "r3",
          ],
        },
        {
          step_definitions: {
            ["emo_guilt"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you often feel overwhelemed?",
              scoring: { target_metric: Symptom.EmotionalEating },
            },
            ["mental_harshestcritic"]: {
              type: "yes_no",
              title: "Does your work vs. private life feel balanced?",
              feedbacks: {
                no: {
                  type: "embedded",
                  title: "That’s totally understandable.",
                  text: "That’s totally understandable. Aster and Ink can help you regain balance through thoughtful prompts and considerate supports in planning your days.",
                },
                yes: {
                  type: "embedded",
                  title: "That's beuatiful!",
                  text: "Now, Aster and Ink will be your best support so that you can stay in the safe space and stay in balance.",
                },
              },
              scoring: {
                target_metric: Impact.MentalHealth,
                mode: "1_5",
                yes_high: true,
              },
            },
            ["relationship_selfconsciouseating"]: {
              type: "yes_no",
              title: "Do you feel like you are stuck in the similar issues or blockers?",
              scoring: {
                target_metric: Impact.Relationship,
                mode: "1_5",
                yes_high: true,
              },
            },
            ["emo_eat2cope"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you expect perfection instead of progress?",
              scoring: { target_metric: Symptom.EmotionalEating },
            },
            c1: {
              type: "info",
              contents: [
                {
                  type: "title",
                  text: "Experience a diary tailored for you and turn 2026 into a year of soft, steady growth — without burnout or pressure.",
                },
                {
                  type: "image",
                  graphic_id: "c1",
                },
                {
                  type: "text",
                  text: "Turn everyday moments into tiny joys — one cozy entry at a time.",
                },
              ],
            },
            ["relationship_bodyconscious"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Are you happy with your current habits and routines?",
              scoring: {
                target_metric: Impact.Relationship,
              },
            },
            ["emo_specific_food"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Would you like to live more intentionally?",
              scoring: { target_metric: Symptom.EmotionalEating },
            },
            r4: {
              type: "story",
              panes: [
                {
                  title: "Don't be mistaken.",
                  body: "Journaling isn't just writing — it’s a proven system for growing, healing, and understnading yourself.",
                  graphic_id: "r4_1",
                },
                {
                  title: "Understand the magic behind it.",
                  body: "When you build a rhythm that’s customized for you, your days become clearer, calmer, and more meaningful.",
                  graphic_id: "r4_2",
                },
                {
                  title: "Make the most of your customized diary.",
                  body: "We’ll create pages that guide you softly — helping you stay connected to your heart.",
                  graphic_id: "r4_3",
                },
              ],
            },
          },
          step_order: [
            "emo_guilt",
            "mental_harshestcritic",
            "relationship_selfconsciouseating",
            "emo_eat2cope",
            "c1",
            "relationship_bodyconscious",
            "emo_specific_food",
            "r4",
          ],
        },
      ],
    },
    {
      title: "Examining your needs",
      subsections: [
        {
          step_definitions: {
            ["mental_bodyimage"]: {
              type: "scale",
              preset: "agreement",
              title:
                "Do you get stuck in regrets or mistakes you've made?",
              scoring: {
                target_metric: Impact.MentalHealth,
              },
            },
            ["internalsigdysfunc_unawarehunger"]: {
              type: "scale",
              preset: "agreement",
              title:
                "Do you struggle to have a clarity in your days?",
              base_feedback: {
                type: "embedded",
                text: [
                  "💡You’re not alone.",
                  "With time and practice, you’ll learn to have a better idea of what you want and need.",
                ],
              },
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            ["internalsigdysfunc_skipmeals"]: {
              type: "scale",
              preset: "agreement",
              title: "Do you ever feel like you’re wasting time and energy on things that don't matter?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            c3: {
              type: "info",
              contents: [
                { type: "emoji", emoji: "💗" },
                { type: "title", text: "Almost there!" },
                {
                  type: "text",
                  text: "Let’s dive deeper to finalize what can bring more joy to your day.",
                },
              ],
            },
            ["knowledge_alexithymia"]: {
              type: "yes_no",
              title: "Have you heard of 'Cognitive Offloading'?",
              help_text:
                "It’s a research-backed idea about why Aster and Ink can be so powerful.",
              feedbacks: {
                no: {
                  type: "embedded",
                  text: "Cognitive Offloading: your brain relaxes when you move thoughts out of your head and onto paper. Customized diary like Aster and Ink can reduce mental load, helps with focus, and makes room for calm.",
                },
                yes: {
                  type: "embedded",
                  text: "**It’s great that you’re already familiar with the concept of the cognitive offloading.** Now, it's time to make the best out of it.",
                },
              },
              scoring: {
                target_metric: Experience.Knowledge,
                mode: "pos_neg",
                yes_high: true,
                scaling_factor: 5,
              },
            },
            ["knowledge_bingeeating"]: {
              type: "scale",
              preset: "custom",
              title: "How familiar are you with journaling and self-reflection?",
              custom_labels: [
                "I'm very new to jouranling.",
                "I’ve tried it a few times.",
                "I journal often.",
                "I’m a journaling pro.",
              ],
              base_feedback: {
                type: "full",
                contents: [
                  {
                    type: "emoji",
                    emoji: "💖",
                  },
                  {
                    type: "title",
                    text: "Beautiful — let’s level up your journaling to real growth!",
                  },
                  {
                    type: "text",
                    text: "Your customized diary will help you be the best version of yourself slowly, lovingly, and at your pace.",
                  },
                  {
                    type: "text",
                    text: "With your 2026 journal, everything you know becomes a daily practice.",
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
                      text: "No worries, we’ll guide you to learn and connect with yourself better.",
                    },
                    {
                      type: "text",
                      text: "Your customized diary will help you be the best version of yourself slowly, lovingly, and at your pace.",
                    },
                    {
                      type: "text",
                      text: "With your 2026 journal, everything you know becomes a daily practice.",
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
            ["binge_howlong"]: {
              type: "single_select",
              title:
                "What kind of journaling feels most natural to you?",
              options: [
                {
                  text: "🌸 Short and sweet — just a few lines a day.",
                  value: "LESS_THAN_SIX_MONTHS",
                },
                {
                  text: "📖 Reflective and meaningful — I like writing deeper thoughts.",
                  value: "SIX_TO_TWELVE_MONTHS",
                },
                {
                  text: "🎀 Creative and playful — doodles, colors, stickers...",
                  value: "ONE_TO_TWO_YEARS",
                },
                {
                  text: "✨ Organized and action-oriented — I write to plan my days.",
                  value: "MORE_THAN_TWO_YEARS",
                },
              ],
            },
            c5: {
              type: "info",
              contents: [
                {
                  type: "title",
                  text: "Truly premium. Truly yours.",
                },
                {
                  type: "text",
                  text: "A bespoke diary crafted just for you — a private space to grow, reflect, and bloom at your own sweet pace.",
                },
                {
                  type: "image",
                  graphic_id: "c5",
                },
              ],
            },
            ["comorbidities"]: {
             type: "multi_select",
              title:
                "What would make your diary feel truly special to you?",
              help_text:
                "Ashton & Ink is here to make your 2026 truly meaningful and beautifully yours.",
              options: [
                {
                  text: "🌸 Personalized prompts tailored to your thoughts",
                  value: "ANXIETY",
                  feedback: {
                    priority: 4,
                    type: "full",
                    contents: [
                      {
                        type: "title",
                        text: "Your thoughts deserve gentle guidance.",
                      },
                      {
                        type: "text",
                        text: "We’ll craft calming, science-backed prompts that meet you exactly where you are.",
                      },
                      {
                        type: "image",
                        graphic_id: "c6",
                      },
                    ],
                  },
                },
                {
                  text: "🕊️ A soothing structure designed around your daily rhythm",
                  value: "DEPRESSION",
                  feedback: {
                    priority: 3,
                    type: "full",
                    contents: [
                      {
                        type: "title",
                        text: "Your days have their own natural flow.",
                      },
                      {
                        type: "text",
                        text: "We’ll tailor your diary’s layout to match your pace — making consistency feel soft, simple, and beautifully doable.",
                      },
                      {
                        type: "image",
                        graphic_id: "c6",
                      },
                    ],
                  },
                },
                {
                  text: "✨ A creative space tailored for doodles, dreams & ideas",
                  value: "ALCOHOL_SUBSTANCE_USE",
                  feedback: {
                    priority: 1,
                    type: "full",
                    contents: [
                      {
                        type: "title",
                        text: "Your creativity deserves room to breathe.",
                      },
                      {
                        type: "text",
                        text: "We’ll shape your diary with extra space for imagination — a cozy corner for sketches and ideas.",
                      },
                      {
                        type: "image",
                        graphic_id: "c6",
                      },
                    ],
                  },
                },
                {
                  text: "💕 Gentle, tailored encouragement that speaks to your heart",
                  value: "BODY_DYSMORPHIA",
                  feedback: {
                    priority: 2,
                    type: "full",
                    contents: [
                      {
                        type: "title",
                        text: "A little encouragement can brighten every day.",
                      },
                      {
                        type: "text",
                        text: "We’ll add uplifting notes crafted just for you — tiny reminders of strength, softness, and self-love.",
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
            ["mental_othersnotserious"]: {
              type: "scale",
              preset: "agreement",
              preamble_text: "Which of these frustrations feel familiar to you?",
              title:
                "Blank spaces in the diary feel overwhelming and intimidating.",
              scoring: {
                target_metric: Impact.MentalHealth,
              },
            },
            ["mental_toldtojuststop"]: {
              type: "scale",
              preset: "agreement",
              preamble_text: "Which of these frustrations feel familiar to you?",
              title:
                "Diary layouts don’t match my personal needs or styles.",
              scoring: {
                target_metric: Impact.MentalHealth,
              },
            },
            ["relationship_misunderstood"]: {
              type: "scale",
              preset: "agreement",
              preamble_text: "Which of these frustrations feel familiar to you?",
              title: "Diaries lack personalization, making it feel less motivating or engaging.",
              scoring: {
                target_metric: Impact.Relationship,
              },
            },
  
          },
          step_order: [
            "mental_bodyimage",
            "internalsigdysfunc_unawarehunger",
            "internalsigdysfunc_skipmeals",
            "c3",
            "knowledge_alexithymia",
            "knowledge_bingeeating",
            "binge_howlong",
            "c5",
            "comorbidities",
            "mental_othersnotserious",
            "mental_toldtojuststop",
            "relationship_misunderstood"
          ],
        },
      ],
    },
    {
      title: "Final Customization",
      subsections: [
        {
          step_definitions: {
                ["binge_goal"]: {
              type: "multi_select",
              title:
                "When I think of what i want to get out of online dating, I see myself...",
              help_text: "Choose as many as you like",
              options: [
                {
                  text: "Meeting someone who matches me.",
                  value: "CONFIDENCE",
                },
                {
                  text: "In a meaningful, lasting relationship.",
                  value: "EMOTIONAL_RESILIENCE",
                },
                {
                  text: "Enjoying dating without stress or confusion.",
                  value: "HEALTHY_RELATIONSHIP_FOOD",
                },
                {
                  text: "Learning more about myself while finding love.",
                  value: "MINDFULNESS",
                },
                {
                  text: "Openly connecting with new people.",
                  value: "BETTER_RELATIONSHIPS",
                },
              ],
            },
            ["current_need"]: {
              type: "single_select",
              title: "What excites you most about online dating?",
              help_text: "Choose the option that resonates the most.",
              options: [
                {
                  text: "🌐 More choices – I can meet lots of new people",
                  value: "MANAGE_WEIGHT",
                },
                {
                  text: "📱 Easy & convenient – Date whenever and wherever I want",
                  value: "STOP_BINGE_EATING",
                },
                {
                  text: "🕊️ No pressure – Starting a conversation feels easier",
                  value: "BREAK_CYCLE",
                },
                {
                  text: "⚡ Quick first impression – I can get to know someone fast.",
                  value: "IMPROVE_WELLNESS",
                },
              ],
            },
           ["selfimprovement_time"]: {
              type: "single_select",
              preamble_text:
                "Let’s see your potential for growth.",
              title: "How much time per day can you spend leveling up your online dating performance?",
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
                  text: "Even five minutes of focused effort can create exponential results.",
                },
                {
                  type: "testimonial",
                },
              ],
            },
           
          },
          step_order: [
            "binge_goal",
            "current_need",
            "selfimprovement_time",
            "c9"
          ],
        },
      ],
    },
    {
      title: { branding: true },
      subsections: [
        {
          step_definitions: {
            email: {
              type: "free_text",
              title: "What’s the best email address for you?",
              help_text: "You’ll use this to get access to your order details.",
              format: "email",
              placeholder: "Please enter your email.",
            },
          },
          step_order: ["email"],
        },
      ],
    },
  ],
  landing_quiz_step: {
    id: "age",
    type: "single_select",
    title: "Tap your age to start crafting your 2026 diary",
    help_text: "⌛ 4 min",
    options: [
      { value: "18_23", text: "18-23" },
      { value: "23_29", text: "24-29" },
      { value: "30_39", text: "30-39" },
      { value: "40_OR_OLDER", text: "40+" },
    ],
  },
  popup_quiz_step: {
    id: "popup_quiz",
    type: "yes_no",
    title:
      "Ready to get a personalized diary for you?",
  },
  reaction_step_id: "reaction",
  email_step_id: "email",
  current_episode_count_id: "binge_frequency",
  target_episode_count_id: "binge_frequency_goal",
  target_knowledge_score: 94,
  interview: {
    title: "It works!",
    subtitle: "Alex says:",
    graphic_id: "persona",
    questions: [
      {
        question: "How was your online dating experience before?",
        answer:
          "I felt lost scrolling through endless profiles. It became frustrating, exhausting, and honestly, it started to make me doubt myself.",
      },
      {
        question: "How has Winmate helped you?",
        answer:
          "It’s been a game changer. Winmate shared tips I never knew about online dating—and gave me confidence, clarity, and a fresh perspective.",
      },
      {
        question:
          "What would you say to someone curious about trying Winmate?",
        answer:
          "Winmate is worth it — even a little guidance makes a world of difference. You will get the results that will surprise you in less than a month!",
      },
    ],
    disclaimer: null,
  },
  program_plan: [
    {
      step_id: "comorbidities",
      prompt: "We will focus on helping you: ",
      echo_mapping: {
        ANXIETY: "Find and match with quality dates.",
        DEPRESSION: "Start conversations and connect smoothly in real life.",
        ALCOHOL_SUBSTANCE_USE: "Stay positive and motivated throughout your dating journey",
       BODY_DYSMORPHIA:
          "Overcome barriers to reach your ultimate dating goal.",
      },
      echo_default: "Start conversations and connect smoothly in real life.",
      color: "#D7E2C9",
    },
  ],
  knowledge_plan: [
    {
      step_id: "knowledge_bingeeating",
      prompt: "How much you know about relationship psychology:",
      echo_mapping: {
        1: "Very little",
        2: "The basics",
        3: "A good amount",
        4: "Expert in all things",
      },
      echo_default: "",
      color: "#F9F4FF",
    },
    {
      step_id: "binge_goal",
      prompt: "What you want to achieve:",
      echo_mapping: {
        CONFIDENCE: "Meeting someone who matches you",
        EMOTIONAL_RESILIENCE: "Being in a meaningful, lasting relationship",
        HEALTHY_RELATIONSHIP_FOOD:
          "Enjoying dating without stress or confusion",
        MINDFULNESS: "Learning more about yourself while finding love",
        BETTER_RELATIONSHIPS: "Openly connecting with new people",
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
      step_id: "motivationlevel",
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
      question: "What’s Winmate all about?",
      answer:
        "Winmate is your ultimate coach for online dating — guiding you to connect confidently, attract the right matches, and turn dating into something exciting instead of exhausting.",
    },
    {
      question:
        "What is Winmate comparable to?",
      answer:
        "Winmate is like having a relationship scientist, a trusted friend who’s great at dating, and a personalized self-help guide tailored just for you.",
    },
    {
      question: "I keep failing at online dating. Am I the problem?",
      answer: 
        "No — the problem isn’t you. Many people who are less successful, less attractive, or less experienced still achieve great results. Success in online dating comes down to the right strategy, mindset, and approach. With Glint, you can too.",
       
    },
    {
      question:
        "Is Winmate a pick‑up artist?",
      answer:
        "Winmate is never about pretending to be someone you’re not 🎭. It’s not about quick fixes or generic advice ❌. It’s about mastering real connection skills so you can be your true self and attract the right match.",
    },
  ],
  testimonial_disclaimer: null,
  highlighted_testimonial: {
    avatar_graphic_id: "Jason",
    screen_name: "Jason",
    screen_subtitle: "32, Austin (USA)",
    content:
      "I never thought online dating was for me — but I realized I had no choice but to get better at this game. Winmate was exactly what I needed: actionable, personalized strategies and skills to practice. My dating quality improved drastically.",
    social: {
      comments: 11,
      shares: 35,
      likes: 898,
    },
  },
  community_testimonials: [
    {
      avatar_graphic_id: "charlie",
      screen_name: "Liam",
      screen_subtitle: "29, Sedona (USA)",
      content:
        "I was hesitant about dating coaching at first, but Winmate feels different. It’s not about cheesy lines — it’s about building real skills. I feel more confident, authentic, and excited to meet new people. My dating life has truly leveled up.",
    },
    {
      avatar_graphic_id: "Diego",
      screen_name: "Diego",
      screen_subtitle: "24, Mexico City (Mexico)",
      content:
        "I’ve always been shy and wanted to improve my dating life, but I never knew where to start. Winmate broke it down for me — step-by-step, no pressure. Now I’m dating with confidence, and I actually look forward to it.",
    },
    {
      avatar_graphic_id: "Marcus",
      screen_name: "Marcus",
      screen_subtitle: "32, London (UK)",
      content:
        "Winmate gave me the tools to cut through the noise and connect with people who actually matched what I’m looking for. I went on just three dates — all with clarity and purpose — and now I’m in a relationship with someone I never thought I’d find.",
    },
    {
      avatar_graphic_id: "Javier",
      screen_name: "Javier",
      screen_subtitle: "42, Miami (USA)",
      content:
        "At my age, online dating felt overwhelming. I tried so many dating apps and had no idea what I was doing. Winmate gave me the right perspective, attitude, and strategy to follow. Last month, I met someone amazing and have never been happier.",
    },
    {
      avatar_graphic_id: "Ethan",
      screen_name: "Ethan",
      screen_subtitle: "39, San Francisco (USA)",
      content:
        "After divorcing my high school sweetheart, I made an online dating profile but it never led to a real-life date. Winmate rebuilt everything for me from scratch: my mindset, my profile, and my messaging style — all in less than a month. Since then, I’ve scored countless matches and enjoyed four amazing dates. In one word: life-changing.",
    },
  ],
  activate_graphic_id: "activate",
};
