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
                "In other words, what should be the main activity of your diary?",
              options: [
                {
                  text: "By writing",
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
              title: "Do you like planning your days in advance?",
              scoring: {
                target_metric: Symptom.SelfControlChallenge,
              },
            },
            ["internalsigdysfunc_eatquick"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you enjoy going with the flow without fixed plans?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            ["selfcontrol_bored"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you feel comfortable expressing your thoughts from scratch?",
              scoring: { 
                target_metric: Symptom.SelfControlChallenge,
              },
            },
            ["selfcontrol_desperate"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you prefer having prompts or guides to bring out thoughts?",
              scoring: { 
                target_metric: Symptom.SelfControlChallenge,
              },
            },
            ["selfcontrol_habit"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you like setting goals and tracking progress?",
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
                  body: "This quiz helps us learn your personality so we can craft a personalized diary that supports you.",
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
                  text: "🌟 No worries — you're not alone. We’ll help you continue with your commitment, and make a true difference.",
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
              preamble_text: "Do you relate to the following statement?",
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
              preamble_text: "Do you relate to the following statement?",
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
                "Do you often feel overwhelmed?",
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
                  title: "That's beautiful!",
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
                  body: "Journaling isn't just writing — it’s a proven system for growing, healing, and understanding yourself.",
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
                "Do you struggle to have clarity in your days?",
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
                    text: "With your customized diary, you will feel empowered and inspired everyday.",
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
                      text: "With your customized diary, you will feel empowered and inspired everyday.",
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
              preamble_text: "Does this sound familiar to you?",
              title:
                "Blank spaces in the diary feel overwhelming and intimidating.",
              scoring: {
                target_metric: Impact.MentalHealth,
              },
            },
            ["mental_toldtojuststop"]: {
              type: "scale",
              preset: "agreement",
              preamble_text: "Does this sound familiar to you?",
              title:
                "Diary layouts don’t match my personal needs or styles.",
              scoring: {
                target_metric: Impact.MentalHealth,
              },
            },
            ["relationship_misunderstood"]: {
              type: "scale",
              preset: "agreement",
              preamble_text: "Does this sound familiar to you?",
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
                "When I think of why I want to keep a journal / diary...",
              help_text: "Choose as many as you like",
              options: [
                {
                  text: "Express my thoughts and emotions freely without judgment or pressure.",
                  value: "CONFIDENCE",
                },
                {
                  text: "Understand myself better.",
                  value: "EMOTIONAL_RESILIENCE",
                },
                {
                  text: "Preserve my memories and life experiences",
                  value: "HEALTHY_RELATIONSHIP_FOOD",
                },
                {
                  text: "Reduce stress and calm my mind ",
                  value: "MINDFULNESS",
                },
                {
                  text: "Set my goal, plan my next step and track my daily progress",
                  value: "BETTER_RELATIONSHIPS",
                },
              ],
            },
            ["current_need"]: {
              type: "single_select",
              title: "What excites you most about customized diary?",
              help_text: "Choose the option that resonates the most.",
              options: [
                {
                  text: "🌐 General look and feel that makes the diary as MY diary",
                  value: "MANAGE_WEIGHT",
                },
                {
                  text: "📱 Personalized prompts based on habits and values instead of blank space",
                  value: "STOP_BINGE_EATING",
                },
                {
                  text: "🕊️ Affirmation and guidance that makes me feel most comfortable and safe",
                  value: "BREAK_CYCLE",
                },
                {
                  text: "⚡ Structure and layout that match my needs and style",
                  value: "IMPROVE_WELLNESS",
                },
              ],
            },
           ["selfimprovement_time"]: {
              type: "single_select",
              preamble_text:
                "Let's see.",
              title: "How much time per day can you spend on keeping the diary?",
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
                  text: "Five minutes of focused effort can give you exponential values.",
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
              title: "How can we contact you?",
              help_text: "You’ll use this to get keep track of your order.",
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
    title: "Tap your age to craft your 2026 diary.",
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
      "Have you bought a gift for yourself this year?",
  },
  reaction_step_id: "reaction",
  email_step_id: "email",
  current_episode_count_id: "binge_frequency",
  target_episode_count_id: "binge_frequency_goal",
  target_knowledge_score: 94,
  interview: {
    title: "It works. 💖",
    subtitle: "Alex says:",
    graphic_id: "persona",
    questions: [
      {
        question: "How was your journaling experience before?",
        answer:
          "I always wanted to journal, but it never quite stuck. Most journals felt impersonal and uninspiring, and I’d stare at blank pages not knowing where to begin. Over time, it made me feel disconnected from myself.",
      },
      {
        question: "How has Aster & Ink helped you?",
        answer:
          "It’s honestly been beautiful in every way. The diary feels like it was created just for me — from the thoughtful prompts to the way each page flows. Writing in it feels calming and nurturing, like a little ritual I look forward to. It’s helped me reconnect with my emotions, slow down, and feel more grounded.",
      },
    
    ],
    disclaimer: null,
  },
  program_plan: [
    {
      step_id: "comorbidities",
      prompt: "Your tailored diary's key magic will be: ",
      echo_mapping: {
        ANXIETY: "🌸 Personalized prompts tailored to you.",
        DEPRESSION: "🕊️ A perfect layout designed around your daily rhythm and needs",
        ALCOHOL_SUBSTANCE_USE: "✨ A creative space that inspires you everyday",
       BODY_DYSMORPHIA:
          "💕 Gentle encouragement that speaks to your heart",
      },
      echo_default: "💕 Gentle encouragement that speaks to your hear",
      color: "#D7E2C9",
    },
  ],
  knowledge_plan: [
    {
      step_id: "knowledge_bingeeating",
      prompt: "How familiar are you with keeping a journal/diary?",
      echo_mapping: {
        1: "Just beginning.",
        2: "Dabbled a little.",
        3: "Already a routine.",
        4: "Feels second nature.",
      },
      echo_default: "",
      color: "#F9F4FF",
    },
    {
      step_id: "binge_goal",
      prompt: "What your customized diary will bring:",
      echo_mapping: {
        CONFIDENCE: "Pour out your thoughts and emotions freely",
        EMOTIONAL_RESILIENCE: "Get to know yourself on a deeper level",
        HEALTHY_RELATIONSHIP_FOOD:
          "Hold onto your memories and meaningful moments",
        MINDFULNESS: "Let go of stress and soothe your mind",
        BETTER_RELATIONSHIPS: "Set loving intentions and celebrate your daily progress",
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
      question: "What’s Aster & Ink all about?",
      answer:
        "Aster & Ink is your beautifully crafted, fully personalized diary — a gentle space to reflect, dream, and express yourself. With the help of AI, every page feels like it was made just for you.",
    },
    {
      question:
        "How is Aster & Ink different from a traditional diary?",
      answer:
        "Unlike ordinary diaries with the same generic pages for everyone, Aster & Ink is fully personalized just for you. Ready-made diaries can feel impersonal or even overwhelming, leaving you unsure of what to write. Aster & Ink is different — it adapts to you, offering guidance that matches your rhythm, mood, and aspirations, turning journaling into a joyful, meaningful ritual rather than a chore.",
    },
    {
      question: "Will it help me actually stick with journaling?",
      answer: 
        "Yes! The prompts and encouragements as well as tailored layouts make it effortless and delightful to write regularly.",
       
    },
  ],
  testimonial_disclaimer: null,
  highlighted_testimonial: {
    avatar_graphic_id: "Sophia",
    screen_name: "Sophia",
    screen_subtitle: "32, Portland (USA)",
    content:
      "Aster & Ink diary is pure magic. The pages are gorgeous and tactile, making me slow down and write by hand. Yet every page is customized by AI and the prompts and reflections feel like they are made just for me. It’s the perfect blend of analogue beauty and smart technology — truly inspiring.",
    social: {
      comments: 11,
      shares: 35,
      likes: 898,
    },
  },
  community_testimonials: [
    {
      avatar_graphic_id: "Lila",
      screen_name: "Lila",
      screen_subtitle: "25, Seattle (USA)",
      content:
        "Thanks to this diary, I'm learning myself more and more everyday. Each entry is guided in a way that’s personal, meaningful, and perfectly timed. Aster & Ink turns reflection into insight effortlessly.",
    },
    {
      avatar_graphic_id: "Maya",
      screen_name: "Maya",
      screen_subtitle: "44, Mexico City (Mexico)",
      content:
        "It is my best friend. Every time I write, I feel held and seen. The combination of beautiful pages and tailored guidance makes journaling feel emotionally nourishing.",
    },
    {
      avatar_graphic_id: "Aria",
      screen_name: "Aria",
      screen_subtitle: "22, Toronto (Canada)",
      content:
"I have many goals in my life but I often forget or lose motivation. Aster & Ink gently reminds me with thoughtful prompts and tracks my progress in a way that feels supportive, not pushy. It makes reaching my goals feel natural, encouraging, and joyful."    },
    
  ],
  activate_graphic_id: "activate",
};
