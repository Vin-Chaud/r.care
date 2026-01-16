import { Experience, Impact, Symptom } from "@/models/Metric";
import { OnboardingFlow } from "@/models/OnboardingFlow/model";

export const defaultOnboardingFlow: OnboardingFlow = {
  step_definitions: {},
  sections: [
    {
      title: "Preparing Your Path",
      subsections: [
        {
          step_order: [
            "when_need_god",
            "i1",
            "recall_freq",
            "emotions_override",
            "i2",
            "post_failure_response",
            "options_tried",
            "faith_practice",
            "i3_1",
            "i3_2",
              "time_devote",
            "desire_for_change",
            "i4",
            "spiritual_intention",
            "final_align",
            "i5",
            "email"
          
            
          
          ],
        },
      ],
      step_definitions: {
         ["i1"]: {
             type: "info",
          variant: "dark",
          background: "#212121",
          contents: [
            {
              type: "image",
              graphic_id: "alreadygood",
            },
          ],
          content_style: {
            width: "unset",
            marginInline: "-26px",
          },
        },
        ["i2"]: {
             type: "info",
          variant: "dark",
          background: "#212121",
          contents: [
            {
              type: "image",
              graphic_id: "godswords_instinct2",
            },
          ],
          content_style: {
            width: "unset",
            marginInline: "-26px",
          },
        },
     ["i3_1"]: {
             type: "info",
          variant: "dark",
          background: "#212121",
          contents: [
            {
              type: "image",
              graphic_id: "notjustreading",
            },
          ],
          content_style: {
            width: "unset",
            marginInline: "-26px",
          },
        },

       ["i3_2"]: {
             type: "info",
          variant: "dark",
          background: "#212121",
          contents: [
            {
              type: "image",
              graphic_id: "trainwithcards2",
            },
          ],
          content_style: {
            width: "unset",
            marginInline: "-26px",
          },
        },
         ["i4"]: {
             type: "info",
          variant: "dark",
          background: "#212121",
          contents: [
            {
              type: "image",
              graphic_id: "livegodswords",
            },
          ],
          content_style: {
            width: "unset",
            marginInline: "-26px",
          },
        },
             ["i5"]: {
             type: "info",
          variant: "dark",
          background: "#212121",
          contents: [
            {
              type: "image",
              graphic_id: "fivemintraining2",
            },
          ],
          content_style: {
            width: "unset",
            marginInline: "-26px",
          },
        },
        ["when_need_god"]: {
          type: "single_select",
          title: "In everyday life, when do you most wish God’s Word guided your response?",
            help_text: "This helps us focus on moments that matter most to you.",
          options: [
            {
              value: "ANXIETY",
              text: "When I feel anxious or overwhelmed",
            },
            {
              value: "CONFLICT",
              text: "During conflict or disagreement",
            },
            {
              value: "MISTAKE",
              text: "After I make mistakes or fall short",
            },
            {
              value: "DECISION",
              text: "When making important decisions",
            },
            {
              value: "TEMPTATION",
              text: "In moments of temptation or pressure",
            },
          ],
        },
          ["recall_freq"]: {
          type: "single_select",
          title: "In stressful moments, how often does Scripture come to mind before you react?",
          options: [
            {
              value: "RARELY",
              text: "Rarely",
        
            },
            {
              value: "SOMETIMES",
              text: "Sometimes",
            },
            {
              value: "OFTEN",
              text: "Often",
            },
            {
              value: "ALWAYS",
              text: "Almost always",
            },
          ],
        },
        ["emotions_override"]: {
          type: "yes_no",
          title: "Do emotions sometimes override what you know to be true?",
          feedbacks: {
                no: {
                  type: "embedded",
                  text: "🌱 That’s a strong foundation. We’ll build on this by helping Scripture shape your responses even more naturally.",
                },
                yes: {
                  type: "embedded",
                  text: "🌿 You’re not alone. This happens to many people under pressure — we’ll help you practice bringing truth to mind when emotions rise.",
                },
              },
        },       
        ["post_failure_response"]: {
          type: "single_select",
          title: "After you fall short, what do you usually experience first?",
          options: [
            {
              value: "SHAME",
              text: "Self-criticism or shame",
              
            },
            {
              value: "DISTANCE",
              text: "Distance from God",
               
            },
            {
              value: "NEXTTIME",
              text: "A desire to do better next time",
              
            },
            {
              value: "GRACE",
              text: "Grace and reassurance",
              
            },
          ],
        },
         ["options_tried"]: {
          type: "multi_select",
          title: "Where do you feel God is inviting you to give more spiritual attention right now?",
           help_text: "We’ll use this to select relevant Bible verses.",
          options: [
            {
              value: "RELATIONSHIP",
              text: "Marriage or romantic relationships",
            },
             {
              value: "FAMILY",
              text: "Family or parenting",
            },
             {
              value: "WORK",
              text: "Career or work decisions",
            },
             {
              value: "NUTRITIONIST",
              text: "Friendships or community",
            },
             {
              value: "MEDITATION",
              text: "Personal growth and character",
            },
              {
              value: "MEDITATION",
              text: "Faith and spiritual discipline",
            },
             {
              value: "OTHER",
              text: "Other",
            },
      
          ],
        },
         ["faith_practice"]: {
          type: "single_select",
          title: "Which best describes your current rhythm with Scripture?",
          options: [
            {
              value: "REGULAR",
              text: "I read or engage regularly",
      
            },
            {
              value: "WANTCONSISTENT",
              text: "I want to be more consistent",
              
            },
            {
              value: "LISTENSCRIPTURE",
              text: "I mostly hear Scripture through sermons or content",
             
            },
            {
              value: "FIGURINGOUT",
              text: "I’m still figuring out a rhythm",
              
            },
          ],
        },
        ["time_devote"]: {
          type: "single_select",
          title: "How much time could you realistically give to a daily Scripture practice?",
          options: [
            {
              value: "TWO_THREE",
              text: "2–3 minutes",
            },
            {
              value: "FIVE",
              text: "5 minutes",
            },
            {
              value: "TEN",
              text: "10 minutes",
            },
            {
              value: "MORETHAN10",
              text: "More than 10 minutes",
            },
          ],
        },
        ["desire_for_change"]: {
          type: "yes_no",
          title: "Would you like God’s Word to shape your reactions more naturally in daily life?",
        },       
        ["spiritual_intention"]: {
          type: "single_select",
          title: "What do you most hope this practice helps you grow in?",
          options: [
            {
              value: "PEACE",
              text: "Trust and peace",
           
            },
            {
              value: "SELFCONTROL",
              text: "Patience and self-control",
              
            },
            {
              value: "CONFIDENCE",
              text: "Confidence in God’s grace",
               
            },
            {
              value: "WISDOM",
              text: "Wisdom and discernment",
               
            },
          ],
        },
        ["final_align"]: {
          type: "single_select",
          title: "Which statement feels closest to where you are right now?",
          options: [
            {
              value: "DAILYGUIDE",
              text: "I want God’s Word to guide my daily life more",
            },
            {
              value: "LIVEDFAITH",
              text: "I want faith to feel more practical and lived out",
            },
            {
              value: "SPIRITUALHABIT",
              text: "I want help forming better spiritual habits",
            },
            {
              value: "CURIOUS",
              text: "I’m exploring what this could look like",
            },
          ],
        },
        ["email"]: {
              type: "free_text",
              title: "What’s the best email address for you?",
              help_text: "You’ll use this to log back in later.",
              format: "email",
              placeholder: "Please enter your email.",
        },
          
      },
    },
  
  ],

  popup_quiz_step: {
    id: "popup_quiz",
    type: "yes_no",
    title:
      "Would you like God’s Word to guide you more in daily life?",
  },
  reaction_step_id: "reaction",
  email_step_id: "email",
  current_episode_count_id: "binge_frequency",
  target_episode_count_id: "binge_frequency_goal",
  target_knowledge_score: 94,
  interview: {
    title: "Wonderful 💖",
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
      prompt: "How familiar are you with keeping a diary?",
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
      question: "What is Daily Scripture Coach all about?",
      answer:
        "Daily Scripture Coach is a personalized daily practice designed to help God’s Word come to mind in real-life moments. Instead of simply reading verses, it helps you practice recalling Scripture and letting it guide your thoughts, responses, and decisions throughout the day.",
    },
    {
      question:
        "How is Daily Scripture Coach different from other Bible apps?",
      answer:
        "Many Bible apps focus on reading plans, devotionals, or inspirational content. Daily Scripture Coach focuses on something different: helping Scripture surface when you actually need it. It adapts to your life, priorities, and current season, training Scripture to become more instinctive and practical in everyday situations.",
    },
    {
      question: "Will this help me stay consistent?",
      answer: 
        "Yes. The practice is intentionally simple and short, making it easier to return each day. By focusing on real-life moments rather than volume or pressure, Daily Scripture Coach helps consistency feel natural rather than forced.",
       
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
        "This practice has helped Scripture feel more present in my everyday life. Instead of just reading verses, I’m learning to recall them when I actually need them. It’s gentle, personal, and surprisingly impactful.",
    },
    {
      avatar_graphic_id: "Diego",
      screen_name: "Diego",
      screen_subtitle: "31, Boston (USA)",
      content:
        "I used to struggle with anxiety about the future. Spending a few minutes each day with Scripture has helped me slow down and respond with more trust and clarity. It’s changed how I approach my days.",
    },
    {
      avatar_graphic_id: "Maya",
      screen_name: "Maya",
      screen_subtitle: "44, Mexico City (Mexico)",
      content:
        "This has become a quiet anchor in my day. Scripture feels less distant and more alive, especially when I’m feeling overwhelmed. It reminds me of grace when I’m hardest on myself.",
    },
     {
      avatar_graphic_id: "Jason",
      screen_name: "Jason",
      screen_subtitle: "32, LA (USA)",
      content:
        "What I appreciate most is how practical this feels. The verses show up in ways that connect directly to real situations — work stress, relationships, daily decisions. It helps me pause before reacting.",
    },
    {
      avatar_graphic_id: "Aria",
      screen_name: "Aria",
      screen_subtitle: "22, Toronto (Canada)",
      content:
"I want my faith to shape my life more, not just my Sundays. This daily practice helps Scripture come to mind throughout the day, especially when I feel discouraged or unmotivated. It feels supportive, not overwhelming."    },
    
  ],
  activate_graphic_id: "activate",
};
