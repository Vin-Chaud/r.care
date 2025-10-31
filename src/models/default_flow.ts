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
                  text: ["Engineered by dating strategists", "and behavioral scientists"],
                },
                {
                  type: "text",
                  text: [
                    "Take the quiz —",
                    "discover the science behind your dating power.",
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
                "Which type of dating have you tried the most?",
              help_text:
                "In other words, how do you usually meet people?",
              options: [
                {
                  text: "Online dating apps (Tinder, Bumble, Hinge...)",
                  value: "FORMAL_DIAGNOSIS",
                },
                {
                  text: "Meeting through friends or connections",
                  value: "SELF_DIAGNOSIS",
                },
                {
                  text: "Chance encounters (bars, hobby groups...)",
                  value: "SUSPICION",
                },
                {
                  text: "Speed dating or matchmaking events",
                  value: "FORMAL_DIAGNOSIS_OTHER_ED",
                },
                {
                  text: "I’m new to dating",
                  value: "OTHER",
                },
              ],
            },
            r1: {
              type: "story",
              panes: [
                {
                  title: "Welcome to Winmate.",
                  body: "We’ll analyze your mindset and strength to build your personalized advantage in online dating.",
                  graphic_id: "",
                },
                {
                  title: "Ready to lead?",
                  body: "Stop guessing. Use data and proven psychology to take control of your dating success.",
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
              title: "Do you date with direction — or let circumstances dictate?",
              scoring: {
                target_metric: Symptom.SelfControlChallenge,
              },
            },
            ["internalsigdysfunc_eatquick"]: {
              type: "scale",
              preset: "frequency",
              title:
                "How naturally can you show your real self?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            ["selfcontrol_bored"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you enjoy the process of dating and building attraction?",
              scoring: { 
                target_metric: Symptom.SelfControlChallenge,
              },
            },
            ["selfcontrol_desperate"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you approach dating with a clear strategy?",
              scoring: { 
                target_metric: Symptom.SelfControlChallenge,
              },
            },
            ["selfcontrol_habit"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you handle rejection as failure?",
              scoring: { 
                target_metric: Symptom.SelfControlChallenge,
              },
            },
            r2: {
              type: "story",
              panes: [
                {
                  body: "Ever wonder why some people always seem to get the dates they want online… but you don’t?",
                  graphic_id: "r2_1",
                },
                {
                  body: "Your ideal match isn’t out of reach; you just need the right system and mindset.",
                  graphic_id: "r2_2",
                },
                {
                  body: "Let’s break it down — this is where you gain the edge!",
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
                "Are you struggling to match with people you actually like?",
              feedbacks: {
                no: {
                  type: "embedded",
                  text: "🍃 That’s fantastic! We’ll focus on transforming your matches into connections.",
                },
                yes: {
                  type: "embedded",
                  text: "🌟 No worries — we’ll optimize your strategy, profile, and approach together.",
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
                "Do you start conversations with matches with ease?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
                reverse: true,
              },
            },
            ["internalsigdysfunc_feastfamine"]: {
              type: "scale",
              preset: "frequency",
              title:
                  "Can you plan a first date with clarity and purpose?",
              scoring: {
                target_metric: Impact.Productivity,
                reverse: true,
              },
            },
            ["internalsigdysfunc_grazeallday"]: {
              type: "scale",
              preset: "frequency",
              title: "Do you trust your instincts about a date’s potential?",
              scoring: {
                target_metric: Impact.Productivity,
                reverse: true,
              },
            },
            ["internalsigdysfunc_regulareat"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you know how to express your interest after a great first date?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            ["selfcontrol_candistract"]: {
              type: "scale",
              preset: "intensity",
              preamble_text: "Do you relate to following statement?",
              title:
                "I frequently lose matches without knowing why.",
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
                "I go on dates, but I rarely meet anyone truly satisfying.",
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
                  body: "Everything you share here stays 100% private.",
                  graphic_id: "r3_1",
                },
                {
                  body: "Think of Winmate as your secret wingman — discreet, data-driven, and fully focused on helping you.",
                  graphic_id: "r3_2",
                },
                {
                  body: "We guide you, decode your patterns, and help you master the dating game — from start to success.",
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
                "Do you overlook red flags because of attraction?",
              scoring: { target_metric: Symptom.EmotionalEating },
            },
            ["mental_harshestcritic"]: {
              type: "yes_no",
              title: "Do you chase quantity over quality?",
              feedbacks: {
                no: {
                  type: "embedded",
                  title: "Awesome!",
                  text: "Awesome!  Investing in quality upfront always pays off with stronger, faster results.",
                },
                yes: {
                  type: "embedded",
                  title: "💪 That’s totally understandable.",
                  text: "💪 That’s totally understandable. We can help you find strategies to focus more on quality without losing momentum.",
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
              title: "Do you pull back from opportunities because of fear of rejection?",
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
                  text: "Winmate transforms online dating into a winning journey, free from uncertainty and burnout.",
                },
                {
                  type: "image",
                  graphic_id: "c1",
                },
                {
                  type: "text",
                  text: "Your private advantage in modern dating — data-driven and strategic.",
                },
              ],
            },
            ["relationship_bodyconscious"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you give up when results don’t come instantly?",
              scoring: {
                target_metric: Impact.Relationship,
              },
            },
            ["emo_specific_food"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you overthink how you come across instead of leading with confidence?",
              scoring: { target_metric: Symptom.EmotionalEating },
            },
            r4: {
              type: "story",
              panes: [
                {
                  body: "Online dating isn’t luck — it’s a system.",
                  graphic_id: "r4_1",
                },
                {
                  body: "When you master the logic behind it, you create consistently high results.",
                  graphic_id: "r4_2",
                },
                {
                  body: "We’ll help you date with precision, presence, and control.",
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
      title: "Examining your patterns",
      subsections: [
        {
          step_definitions: {
            ["mental_bodyimage"]: {
              type: "scale",
              preset: "agreement",
              title:
                "Do you get stuck in shallow chats that go nowhere?",
              scoring: {
                target_metric: Impact.MentalHealth,
              },
            },
            ["internalsigdysfunc_unawarehunger"]: {
              type: "scale",
              preset: "agreement",
              title:
                "Do you struggle to express what you truly want?",
              base_feedback: {
                type: "embedded",
                text: [
                  "💡You’re not alone.",
                  "With time and practice, you’ll learn to express what you want clearly and confidently.",
                ],
              },
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            ["internalsigdysfunc_skipmeals"]: {
              type: "scale",
              preset: "agreement",
              title: "Do you ever feel like you’re wasting time and money on disappointing dates?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            c3: {
              type: "info",
              contents: [
                { type: "emoji", emoji: "🚀" },
                { type: "title", text: "Almost there!" },
                {
                  type: "text",
                  text: "Let’s dive deeper to sharpen your awareness and build unstoppable confidence.",
                },
              ],
            },
            ["knowledge_alexithymia"]: {
              type: "yes_no",
              title: "Have you heard of 'Paradox of Choice'?",
              help_text:
                "It’s one of the psychology-based insights related to why online dating often fails.",
              feedbacks: {
                no: {
                  type: "embedded",
                  text: "Paradox of Choice : when presented with too many options, people can feel overwhelmed, leading to indecision or dissatisfaction. In dating, endless choices can make it harder to stay mindful.",
                },
                yes: {
                  type: "embedded",
                  text: "**It’s great that you’re already familiar with the concept of the paradox of choice.** To recap, it explains how endless options can make mindful dating more challenging.",
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
              title: "How much do you know about relationship psychology?",
              custom_labels: [
                "I know very little.",
                "I’ve heard of a few ideas (like attachment styles.)",
                "I know quite a bit about psychology.",
                "I’m an expert in relationship psychology.",
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
                    text: "Perfect — now let’s put your knowledge into action!",
                  },
                  {
                    type: "text",
                    text: "With Winmate, your insights become action.",
                  },
                  {
                    type: "text",
                    text: "We will guide you to attract the quality people, communicate authentically, and get results.",
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
                      text: "No worries, we’ll guide you to learn and connect better.",
                    },
                    {
                      type: "text",
                      text: "Relationship psychology helps you choose partners who truly match you.",
                    },
                    {
                      type: "text",
                      text: "We’ll help you learn not just the theory, but practical strategies you can use right away!",
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
                "When did you first start actively exploring online dating?",
              options: [
                {
                  text: "🌱 I'm new to it!",
                  value: "LESS_THAN_SIX_MONTHS",
                },
                {
                  text: "💫 I’ve been using dating apps on and off for a while.",
                  value: "SIX_TO_TWELVE_MONTHS",
                },
                {
                  text: "⏳ I’ve been actively online dating for a year or more.",
                  value: "ONE_TO_TWO_YEARS",
                },
                {
                  text: "🕒 I’ve been at it for a while now.",
                  value: "MORE_THAN_TWO_YEARS",
                },
              ],
            },
            c5: {
              type: "info",
              contents: [
                {
                  type: "title",
                  text: "Real coaching. Real results.",
                },
                {
                  type: "text",
                  text: "With Winmate, you’ll get clear strategies, expert advice, and confidence. Our coaching is private, judgment-free, and designed to deliver real results.",
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
                "What are your biggest challenges in online dating?",
              help_text:
                "We’ll help you turn every obstacle into a measurable win.",
              options: [
                {
                  text: "🔍 Finding quality matches",
                  value: "ANXIETY",
                  feedback: {
                    priority: 4,
                    type: "full",
                    contents: [
                      {
                        type: "title",
                        text: "The right connection is out there.",
                      },
                      {
                        type: "text",
                        text: "Let’s fine-tune your approach so you actually spot it.",
                      },
                      {
                        type: "image",
                        graphic_id: "c6",
                      },
                    ],
                  },
                },
                {
                  text: "💬 Starting or keeping a conversations",
                  value: "DEPRESSION",
                  feedback: {
                    priority: 3,
                    type: "full",
                    contents: [
                      {
                        type: "title",
                        text: "Small tweaks can make a big difference.",
                      },
                      {
                        type: "text",
                        text: "You already have what it takes — we’ll help you spark conversations that feel natural and exciting.",
                      },
                      {
                        type: "image",
                        graphic_id: "c6",
                      },
                    ],
                  },
                },
                {
                  text: "😬 Feeling anxious about next moves",
                  value: "ALCOHOL_SUBSTANCE_USE",
                  feedback: {
                    priority: 1,
                    type: "full",
                    contents: [
                      {
                        type: "title",
                        text: "It’s normal to feel this way.",
                      },
                      {
                        type: "text",
                        text: "With the right tools, you can turn uncertainty into confidence — every great result starts with taking one confident step forward.",
                      },
                      {
                        type: "image",
                        graphic_id: "c6",
                      },
                    ],
                  },
                },
                {
                  text: "💔 Handling rejection",
                  value: "BODY_DYSMORPHIA",
                  feedback: {
                    priority: 2,
                    type: "full",
                    contents: [
                      {
                        type: "title",
                        text: "Every dating journey has bumps.",
                      },
                      {
                        type: "text",
                        text: "Let’s map a path that helps you move forward and push through when you feel stuck.",
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
              preamble_text: "Which of these myths do you relate to?",
              title:
                "Dating coaching is only for people who can’t date on their own.",
              scoring: {
                target_metric: Impact.MentalHealth,
              },
            },
            ["mental_toldtojuststop"]: {
              type: "scale",
              preset: "agreement",
              preamble_text: "Which of these myths do you relate to?",
              title:
                "Strategy won’t really make a difference — dating is just luck.",
              scoring: {
                target_metric: Impact.MentalHealth,
              },
            },
            ["relationship_misunderstood"]: {
              type: "scale",
              preset: "agreement",
              preamble_text: "Which of these myths feels most true to you?",
              title: "There is no science or data behind online dating.",
              scoring: {
                target_metric: Impact.Relationship,
              },
            },
            r5: {
              type: "story",
              panes: [
                {
                  body: "Dating’s a skill — just like lifting or leading. With the right mindset and strategy, you get better fast.",
                  graphic_id: "r5_1",
                },
                {
                  body: "Coaching isn’t just for those who struggle; it’s for anyone who wants better results.",
                  graphic_id: "r5_2",
                },
                {
                  body: "We help you master online dating through exclusive insights and proven data.",
                  graphic_id: "r5_3",
                },
              ],
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
            "relationship_misunderstood",
            "r5",
          ],
        },
      ],
    },
    {
      title: "Online Dating Potentials",
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
            ["binge_frequency"]: {
              type: "integer",
              title:
                "On a scale from 0 to 10, how satisfied are you with your online dating experience so far?",
              help_text:
                "No need to be exact — just share how it feels.",
              min: 0,
              max: 10,
              placeholder: "0 (Not satisfied) - 10 (Fully satisfied)",
            },
            ["binge_frequency_goal"]: {
              type: "integer",
              title:
                "How do you want online dating to feel?",
              help_text:
                "You reported your current satisfaction level is {{current_frequency}} out of 10.",
              min: 0,
              max: 10,
              expressions: {
                current_frequency: "response_value('binge_frequency')",
              },
              placeholder: "0 (Not satisfied) - 10 (Fully satisfied)",
            },
            c7: {
              type: "info",
              contents: [
                {
                  type: "title",
                  text: "With Winmate, you’ll transform dating from trial-and-error into a focused system for success.",
                },
                {
                  type: "image",
                  graphic_id: "harvard",
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
            ["motivationlevel"]: {
              type: "scale",
              preset: "intensity",
              title: "How ready are you for personalized coaching?",
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
                      text: "That excitement is powerful!",
                    },
                    {
                      type: "text",
                      text: "Your motivation fuels mastery — let’s turn it into results.",
                    },
                  ],
                },
                not_motivated: {
                  type: "full",
                  contents: [
                    { type: "emoji", emoji: "👭" },
                    {
                      type: "title",
                      text: "No gimmicks. No out-dated pickup lines. ",
                    },
                    {
                      type: "text",
                      text: "Just personalized coaching grounded in data, science and what actually works in today’s online dating world.🌟",
                    },
                  ],
                },
              },
            },
          },
          step_order: [
            "binge_goal",
            "current_need",
            "binge_frequency",
            "binge_frequency_goal",
            "c7",
            "selfimprovement_time",
            "c9",
            "motivationlevel",
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
              help_text: "You’ll use this to get access to your coaching later.",
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
    title: "Tap your age to unlock tailored dating tips.",
    help_text: "⌛ 3 min quiz",
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
      "Ready to achieve results starting now?",
  },
  reaction_step_id: "reaction",
  email_step_id: "email",
  current_episode_count_id: "binge_frequency",
  target_episode_count_id: "binge_frequency_goal",
  target_knowledge_score: 94,
  interview: {
    title: "Glint works!",
    subtitle: "Alex says:",
    graphic_id: "persona",
    questions: [
      {
        question: "How was your online dating experience before?",
        answer:
          "I felt lost scrolling through endless profiles, unsure how to start conversations or even what I was really looking for. It became frustrating, exhausting, and honestly, it started to make me doubt myself.",
      },
      {
        question: "How has Glint helped you?",
        answer:
          "It has been a game changer. Glint didn’t just give me tips — it gave me confidence, clarity, and a fresh perspective. With confidence and a fresh mindset, now I’m in a relationship with someone I never thought was possible.",
      },
      {
        question:
          "What would you say to someone curious about trying Glint?",
        answer:
          "Glint is worth it — even a little guidance makes a world of difference. Online dating is no longer optional, it’s standard. Getting good at it makes a huge difference, and Glint made it easy.",
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
