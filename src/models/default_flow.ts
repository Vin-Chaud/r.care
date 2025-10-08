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
                  text: ["Built by dating coaches &", "relationship psychology experts"],
                },
                {
                  type: "text",
                  text: [
                    "Our quiz helps you better understand",
                    "yourself and estimate your chances of finding",
                    "your ideal match through online dating.",
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
            ["bed_diagnosis"]: {
              type: "single_select",
              title:
                "What kind of dating have you tried the most?",
              help_text:
                "It helps us enhance your experience, but rest assured, everyone is welcome.",
              options: [
                {
                  text: "Online dating apps (Tinder, Bumble, Hinge...)",
                  value: "FORMAL_DIAGNOSIS",
                },
                {
                  text: "Meeting people through connections (friends, colleagues, family)",
                  value: "SELF_DIAGNOSIS",
                },
                {
                  text: "Chance encounters (at a bar, hobby groups...)",
                  value: "SUSPICION",
                },
                {
                  text: "Speed dating or matchmaking events",
                  value: "FORMAL_DIAGNOSIS_OTHER_ED",
                },
                {
                  text: "I haven’t tried dating yet",
                  value: "OTHER",
                },
              ],
            },
            r1: {
              type: "story",
              panes: [
                {
                  title: "Glad you're here!",
                  body: "Discover your dating style, unlock your best strategy, and find your perfect match.",
                  graphic_id: "r1_1",
                },
                {
                  title: "Our quiz is the perfect place to start.",
                  body: "Discover your dating style, unlock your best strategy, and find your perfect match. ",
                  graphic_id: "r1_2",
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
              title: "Do you know what you want in a partner?",
              scoring: {
                target_metric: Symptom.SelfControlChallenge,
                reverse: true,
              },
            },
            ["internalsigdysfunc_eatquick"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you feel comfortable showing your true self when dating?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            ["selfcontrol_bored"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you enjoy the process of dating and getting to know new people?",
              scoring: { target_metric: Symptom.SelfControlChallenge },
            },
            ["selfcontrol_desperate"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you approach dating with a clear strategy?",
              scoring: { target_metric: Symptom.SelfControlChallenge },
            },
            ["selfcontrol_habit"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you have enough time, energy, and resources to date?",
              scoring: { target_metric: Symptom.SelfControlChallenge },
            },
            r2: {
              type: "story",
              panes: [
                {
                  body: "Online dating can be exhausting.",
                  graphic_id: "r2_1",
                },
                {
                  body: "With the right guidance, you’re on an exciting journey to finding your perfect match!",
                  graphic_id: "r2_2",
                },
                {
                  body: "Let’s explore together — you’ve got this!",
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
                "Do you have trouble getting matches that excite you?",
              feedbacks: {
                no: {
                  type: "embedded",
                  text: "🍃 That’s fantastic! We’ll help you transform your matches into genuine connections.",
                },
                yes: {
                  type: "embedded",
                  text: "🌟 No worries — we’ll support you from start to finish, including improving your profile to attract the right connections.",
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
                "Do you start conversations with matches without hesitation?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            ["internalsigdysfunc_feastfamine"]: {
              type: "scale",
              preset: "frequency",
              title:
                  "Do you feel confident planning the first date with your matches?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            ["internalsigdysfunc_grazeallday"]: {
              type: "scale",
              preset: "frequency",
              title: "Do you trust your instincts about a date’s potential?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            ["internalsigdysfunc_regulareat"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you know how to express your interest after a good first date?",
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
                reverse: true,
              },
            },
            ["selfcontrol_candistract"]: {
              type: "scale",
              preset: "intensity",
              preamble_text: "Do you relate to following statement?",
              title:
                "I frequently stop hearing from matches without knowing why.",
              min_label: "Not at all",
              max_label: "Totally",
              scoring: {
                target_metric: Symptom.SelfControlChallenge,
                reverse: true,
              },
            },
            ["internalsigdysfunc_eatpastcomfortablyfull"]: {
              type: "scale",
              preset: "intensity",
              preamble_text: "Do you relate to following statement?",
              title:
                "I go on dates but don’t feel a real connection.",
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
                  body: "Now let’s dive into what you’re **truly** looking for in online dating.",
                  graphic_id: "r3_1",
                },
                {
                  body: "Exploring the deeper emotions behind dating can feel personal and even a little tricky.",
                  graphic_id: "r3_2",
                },
                {
                  body: "But remember: you deserve to dream of the partner you truly want and need.",
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
                "Do you sometimes ignore red flags because of attraction?",
              scoring: { target_metric: Symptom.EmotionalEating },
            },
            ["mental_harshestcritic"]: {
              type: "yes_no",
              title: "Do you prioritize quantity of matches/dates over quality of connection?",
              feedbacks: {
                no: {
                  type: "embedded",
                  title: "🌼 Awesome!",
                  text: "Prioritizing quality can really help build deeper, lasting relationships. We’ll help you make the most of it.",
                },
                yes: {
                  type: "embedded",
                  title: "💪 That’s totally understandable.",
                  text: "This is a common approach, and we can help you find strategies to focus more on quality without losing momentum.",
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
              title: "Do you avoid taking things further due to fear of rejection?",
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
                "Do you expect to find a perfect match without accepting flaws?",
              scoring: { target_metric: Symptom.EmotionalEating },
            },
            c1: {
              type: "info",
              contents: [
                {
                  type: "title",
                  text: "Glint transforms online dating into a mindful journey, free from uncertainty and burnout.",
                },
                {
                  type: "image",
                  graphic_id: "c1",
                },
                {
                  type: "text",
                  text: "Our coaching helps you build authentic connections that truly matter.",
                },
              ],
            },
            ["relationship_bodyconscious"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you expect instant results, only to give up too soon?",
              scoring: {
                target_metric: Impact.Relationship,
              },
            },
            ["emo_specific_food"]: {
              type: "scale",
              preset: "frequency",
              title:
                "Do you find yourself overthinking dates or worrying too much about how you come across — instead of just being yourself?",
              scoring: { target_metric: Symptom.EmotionalEating },
            },
            r4: {
              type: "story",
              panes: [
                {
                  body: "Online dating often fails because people don’t fully understand its nature. Many expect instant chemistry or a perfect match, forgetting that meaningful connections take time.",
                  graphic_id: "r4_1",
                },
                {
                  body: "Many quit after a few unsuccessful interactions instead of investing time and patience in the process.",
                  graphic_id: "r4_2",
                },
                {
                  body: "Building genuine connections can feel challenging, but we’re here to guide you. Let’s explore how you can be truly authentic and share your real feelings and thoughts.",
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
      title: "Communicate from the heart",
      subsections: [
        {
          step_definitions: {
            ["mental_bodyimage"]: {
              type: "scale",
              preset: "agreement",
              title:
                "Do you find yourself stuck in shallow chats with no real dates?",
              scoring: {
                target_metric: Impact.MentalHealth,
              },
            },
            ["internalsigdysfunc_unawarehunger"]: {
              type: "scale",
              preset: "agreement",
              title:
                "Do you feel like you’re not truly expressing your feelings?",
              base_feedback: {
                type: "embedded",
                text: [
                  "💡You’re not alone — this is something many people experience.",
                  "It takes time and practice to communicate your feelings clearly, and the fact that you notice it is the first step toward improvement.",
                ],
              },
              scoring: {
                target_metric: Symptom.InternalSignalDysfunction,
              },
            },
            ["internalsigdysfunc_skipmeals"]: {
              type: "scale",
              preset: "agreement",
              title: "Do you sometimes avoid conversations because you’re afraid of being misunderstood?",
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
                  text: "To perfect your online dating game, let’s start by getting to know you better.",
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
                  text: "Paradox of Choice : when presented with too many options, people can feel overwhelmed, leading to indecision or dissatisfaction. In online dating, endless profiles can make it harder to commit to one person.",
                },
                yes: {
                  type: "embedded",
                  text: "**It’s great that you’re already familiar with the concept of the paradox of choice.** To reiterate, it explains how endless profiles can make it harder to commit to one person in online dating.",
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
              title: "How strong is your knowledge of relationship psychology?",
              custom_labels: [
                "I know very little about it.",
                "I've heard of a few concepts(e.g. attachment patterns, love languages...)",
                "I am familiar with psychology in general.",
                "I’m an expert in all things related to relationship psychology.",
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
                    text: "With Glint, your insights become action.",
                  },
                  {
                    type: "text",
                    text: "We will guide you to attract the right people, communicate authentically, and build meaningful connections.",
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
                      text: "No worries, we’ll guide you to learn, grow, and connect better.",
                    },
                    {
                      type: "text",
                      text: "Relationship psychology helps you understand yourself and others, so you can communicate clearly and choose partners who truly match your values.",
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
                  text: "Real support. Real progress. Real connections.",
                },
                {
                  type: "text",
                  text: "With Glint, you’ll gain practical strategies, expert feedback, and confidence. Our coaching is completely private, judgment-free, and focused on real results.",
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
                "What do you feel are your biggest challenges when it comes to online dating?",
              help_text:
                "Understanding your main blockers will help us give you the most effective guidance.",
              options: [
                {
                  text: "🔍 Finding compatible matches",
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
                  text: "💬 Starting or maintaining conversations",
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
                  text: "💔 Feeling discouraged or anxious about building a connection",
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
                        text: "With the right tools, you can turn uncertainty into confidence — every great connection starts with taking one confident step forward.",
                      },
                      {
                        type: "image",
                        graphic_id: "c6",
                      },
                    ],
                  },
                },
                {
                  text: "🎯 Feeling stuck before reaching my relationship goal",
                  value: "BODY_DYSMORPHIA",
                  feedback: {
                    priority: 2,
                    type: "full",
                    contents: [
                      {
                        type: "title",
                        text: "Every relationship journey has bumps.",
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
              preamble_text: "Which of these myths about dating coaching feels most true to you?",
              title:
                "Dating coaching is only for people who can’t date on their own.",
              scoring: {
                target_metric: Impact.MentalHealth,
              },
            },
            ["mental_toldtojuststop"]: {
              type: "scale",
              preset: "agreement",
              preamble_text: "Which of these myths about dating coaching feels most true to you?",
              title:
                "Dating won’t actually make a difference; it’s just luck.",
              scoring: {
                target_metric: Impact.MentalHealth,
              },
            },
            ["relationship_misunderstood"]: {
              type: "scale",
              preset: "agreement",
              preamble_text: "Which of these myths about dating coaching feels most true to you?",
              title: "Discussing my dating life with others feels too awkward.",
              scoring: {
                target_metric: Impact.Relationship,
              },
            },
            r5: {
              type: "story",
              panes: [
                {
                  body: "Just like any other skill — whether it’s cooking, public speaking, or sports — **dating takes practice** and the right guidance.",
                  graphic_id: "r5_1",
                },
                {
                  body: "Coaching isn’t just for those who struggle; it’s for anyone who wants better results.",
                  graphic_id: "r5_2",
                },
                {
                  body: "We’ll help you get better at dating so you can reach one of life’s most important goals: **finding the right person.**",
                  graphic_id: "r5_3",
                },
              ],
            },
          },
          step_order: [
            "mental_bodyimage",
            "internalsigdysfunc_unawarehunger",
            "prod_distractedbyfood",
            "c2",
            "prod_sleeptrouble",
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
                  text: "Meeting someone who truly matches my values and goals.",
                  value: "CONFIDENCE",
                },
                {
                  text: "In a meaningful, lasting relationship.",
                  value: "EMOTIONAL_RESILIENCE",
                },
                {
                  text: "Enjoying the process without stress or confusion.",
                  value: "HEALTHY_RELATIONSHIP_FOOD",
                },
                {
                  text: "Learning more about myself while finding love.",
                  value: "MINDFULNESS",
                },
                {
                  text: "Confidently enjoying meeting and connecting with new people.",
                  value: "BETTER_RELATIONSHIPS",
                },
              ],
            },
            ["current_need"]: {
              type: "single_select",
              title: "What excites you most about online dating?4",
              help_text: "Choose the option that resonates the most.",
              options: [
                {
                  text: "🌐 Access to a bigger pool of potential matches",
                  value: "MANAGE_WEIGHT",
                },
                {
                  text: "📱 Convenience of dating anytime, anywhere",
                  value: "STOP_BINGE_EATING",
                },
                {
                  text: "🕊️ Low pressure to start the first conversation",
                  value: "BREAK_CYCLE",
                },
                {
                  text: "⚡ Get the gist of someone in seconds",
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
                "How do you want your online dating journey to feel? What satisfaction level would keep you going until you meet the right person?",
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
                  text: "With Glint, you can master the online dating game and find your perfect match — and as a bonus, discover yourself, your true needs, and life’s deeper meaning along the way.",
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
                "Let’s see how you can make the most of online dating.",
              title: "How much time can you spend leveling up your online dating?",
              options: [
                {
                  text: "5 mins/day",
                  value: "5_MINUTES",
                },
                {
                  text: "10 mins/day",
                  value: "10_MINUTES",
                },
                {
                  text: "15 mins+/day",
                  value: "15_MINUTES_OR_MORE",
                },
              ],
            },
            c9: {
              type: "info",
              contents: [
                {
                  type: "title",
                  text: "**Five minutes a day** is all it takes to level up your online dating game and boost your results.",
                },
                {
                  type: "testimonial",
                },
              ],
            },
            ["motivationlevel"]: {
              type: "scale",
              preset: "intensity",
              title: "How ready are you for personalized coaching to improve your online dating?",
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
                      text: "Motivation and excitement unlock power — fuel your energy to kickstart online dating success.",
                    },
                  ],
                },
                not_motivated: {
                  type: "full",
                  contents: [
                    { type: "emoji", emoji: "👭" },
                    {
                      type: "title",
                      text: "We know online dating can feel intimidating.",
                    },
                    {
                      type: "text",
                      text: "We’re here to boost your motivation and guide your journey.🌟",
                    },
                  ],
                },
              },
            },
          },
          step_order: [
            "binge_support_want",
            "binge_goal",
            "current_need",
            "binge_frequency",
            "binge_frequency_goal",
            "c7",
            "desiredlearningpace",
            "avgday_howbusy",
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
    title: "Select your age to start the quiz",
    help_text: "⌛ 3 min quiz",
    options: [
      { value: "18_23", text: "13-17" },
      { value: "23_29", text: "18-29" },
      { value: "30_39", text: "30-49" },
      { value: "40_OR_OLDER", text: "50+" },
    ],
  },
  popup_quiz_step: {
    id: "popup_quiz",
    type: "yes_no",
    title:
      "Are you excited to finally meet the person you’ve always dreamed of? 🔑",
  },
  reaction_step_id: "reaction",
  email_step_id: "email",
  current_episode_count_id: "binge_frequency",
  target_episode_count_id: "binge_frequency_goal",
  target_knowledge_score: 94,
  interview: {
    title: "From Confusion to Loving Connection",
    subtitle: "Alex’s recovery story",
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
      prompt: "We’re going to focus on helping you",
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
    {
      step_id: "knowledge_bingeeating",
      prompt: "You said that",
      echo_mapping: {
        1: "You are relatively new to Relationship Psychology",
        3: "You have a good understanding of Relationship Psychology",
        4: "You have a great understanding of Relationship Psychology",
      },
      echo_default: "You’ve done some research into Relationship Psychology",
      color: "#EEE2CE",
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
        4: "Expert in all things online dating",
      },
      echo_default: "",
      color: "#F9F4FF",
    },
    {
      step_id: "binge_goal",
      prompt: "What you want to achieve:",
      echo_mapping: {
        CONFIDENCE: "Meeting someone who truly matches your values and goals",
        EMOTIONAL_RESILIENCE: "Being in a meaningful, lasting relationship",
        HEALTHY_RELATIONSHIP_FOOD:
          "Enjoying the process without stress or confusion",
        MINDFULNESS: "Learning more about yourself while finding love",
        BETTER_RELATIONSHIPS: "Confidently enjoying meeting and connecting with new people",
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
      question: "What’s Glint all about?",
      answer:
        "Glint is your ultimate coach for online dating — guiding you to connect confidently, attract the right matches, and turn dating into something exciting instead of exhausting. We combine proven relationship psychology with practical tools to help you level up your dating experience.",
    },
    {
      question:
        "What is Glint comparable to?",
      answer:
        "Glint is like having a relationship therapist ❤️, a trusted friend who’s great at dating 🌟, and a personalized self-help guide tailored just for you 📖.",
    },
    {
      question: "How can Glint change my dating experience?",
      answer: [
        "Glint helps you:",
        {
          list: [
            "Profile Magic: Build a profile that stands out and truly represents you.",
            "Conversation Flow: Learn how to start and keep conversations flowing effortlessly.",
            "Authenticity Boost: Express your true self while feeling confident and attractive.",
            "Smart Insights: Decode your dating patterns, sharpen your goals, and get better with every swipe and message.",
          ],
        },
      ],
    },
    {
      question:
        "Is Glint a pick‑up artist?",
      answer:
        "Glint is never about pretending to be someone you’re not 🎭. It’s not about quick fixes or generic advice ❌. It’s about mastering real connection skills so you can be your true self and attract the right match.",
    },
  ],
  testimonial_disclaimer: null,
  highlighted_testimonial: {
    avatar_graphic_id: "jason",
    screen_name: "Jason",
    screen_subtitle: "32, Austin (USA)",
    content:
      "I never thought online dating was for me — but I realized I had no choice but to get better at this game. Glint was exactly what I needed: actionable, personalized strategies and skills to practice. My dating quality improved drastically.",
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
        "I was hesitant about dating coaching at first, but Glint feels different. It’s not about cheesy lines — it’s about building real skills. I feel more confident, authentic, and excited to meet new people. My dating life has truly leveled up.",
    },
    {
      avatar_graphic_id: "diego",
      screen_name: "Diego",
      screen_subtitle: "24, Mexico City (Mexico)",
      content:
        "I’ve always been shy and wanted to improve my dating life, but I never knew where to start. Glint broke it down for me — step-by-step, no pressure. Now I’m dating with confidence, and I actually look forward to it.",
    },
    {
      avatar_graphic_id: "marcus",
      screen_name: "Marcus",
      screen_subtitle: "32, London (UK)",
      content:
        "Glint gave me the tools to cut through the noise and connect with people who actually matched what I’m looking for. I went on just three dates — all with clarity and purpose — and now I’m in a relationship with someone I never thought I’d find.",
    },
    {
      avatar_graphic_id: "javier",
      screen_name: "Javier",
      screen_subtitle: "42, Miami (USA)",
      content:
        "At my age, online dating felt overwhelming. I tried so many dating apps and had no idea what I was doing. Glint gave me the right perspective, attitude, and strategy to follow. Last month, I met someone amazing and have never been happier.",
    },
    {
      avatar_graphic_id: "ethan",
      screen_name: "Ethan",
      screen_subtitle: "39, San Francisco (USA)",
      content:
        "After divorcing my high school sweetheart, I made an online dating profile but it never led to a real-life date. Glint rebuilt everything for me from scratch: my mindset, my profile, and my messaging style — all in less than a month. Since then, I’ve scored countless matches and enjoyed four amazing dates. In one word: life-changing.",
    },
  ],
  activate_graphic_id: "activate",
};
