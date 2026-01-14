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
            "recall_freq",
            "emotions_override",
            "post_failure_response",
            "options_tried",
            "faith_practice",
            "time_devote",
            "desire_for_change",
            "spiritual_intention",
            "final_align",
            "email", 
          ],
        },
      ],
      step_definitions: {
    
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
              feedback: {
                type: "full",
                contents: [
                   {
                    type: "title",
                    text: "Wanting to live God’s Word is already a good sign.",
        
                  },
                   {
              type: "text",
              text: [
                "Many Christians know Scripture — but remembering it in emotional moments is hard. This isn’t about faithfulness. It’s about forming habits.",
              ],
            }
                  ],
              },
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
              feedback: {
                type: "full",
                contents: [
                   {
                    type: "title",
                    text: "God’s Word works best when it becomes instinct.",
        
                  },
                   {
              type: "text",
              text: [
                "Just like language or habits, Scripture can be practiced until it flows naturally into your thoughts, words, and actions.",
              ],
            },
              ]
           
            },
            },
            {
              value: "DISTANCE",
              text: "Distance from God",
               feedback: {
                type: "full",
                contents: [
                   {
                    type: "title",
                    text: "God’s Word works best when it becomes instinct.",
        
                  },
                   {
              type: "text",
              text: [
                "Just like language or habits, Scripture can be practiced until it flows naturally into your thoughts, words, and actions.",
              ],
            },
             ]
           
            },
            },
            {
              value: "NEXTTIME",
              text: "A desire to do better next time",
               feedback: {
                type: "full",
                contents: [
                   {
                    type: "title",
                    text: "God’s Word works best when it becomes instinct.",
        
                  },
                   {
              type: "text",
              text: [
                "Just like language or habits, Scripture can be practiced until it flows naturally into your thoughts, words, and actions.",
              ],
            },
               ]
           
            },
            },
            {
              value: "GRACE",
              text: "Grace and reassurance",
               feedback: {
                type: "full",
                contents: [
                   {
                    type: "title",
                    text: "God’s Word works best when it becomes instinct.",
        
                  },
                   {
              type: "text",
              text: [
                "Just like language or habits, Scripture can be practiced until it flows naturally into your thoughts, words, and actions.",
              ],
            },
             ]
           
            },
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
              feedback: {
                type: "full",
                contents: [
                   {
                    type: "title",
                    text: "This isn’t about reading more verses.",
        
                  },
                   {
              type: "text",
              text: [
                "It’s about remembering the right verse at the right moment — when real life puts pressure on your faith.",
              ],
            },
              ]
           
            },
            },
            {
              value: "WANTCONSISTENT",
              text: "I want to be more consistent",
              feedback: {
                type: "full",
                contents: [
                   {
                    type: "title",
                    text: "This isn’t about reading more verses.",
        
                  },
                   {
              type: "text",
              text: [
                "It’s about remembering the right verse at the right moment — when real life puts pressure on your faith.",
              ],
            },
               ]
           
            },
            },
            {
              value: "LISTENSCRIPTURE",
              text: "I mostly hear Scripture through sermons or content",
             feedback: {
                type: "full",
                contents: [
                   {
                    type: "title",
                    text: "This isn’t about reading more verses.",
        
                  },
                   {
              type: "text",
              text: [
                "It’s about remembering the right verse at the right moment — when real life puts pressure on your faith.",
              ],
            },
              ]
           
            },
            },
            {
              value: "FIGURINGOUT",
              text: "I’m still figuring out a rhythm",
              feedback: {
                type: "full",
                contents: [
                   {
                    type: "title",
                    text: "This isn’t about reading more verses.",
        
                  },
                   {
              type: "text",
              text: [
                "It’s about remembering the right verse at the right moment — when real life puts pressure on your faith.",
              ],
            },
              ]
           
            },
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
              feedback: {
                type: "full",
                contents: [
                   {
                    type: "title",
                    text: "God’s Word works best when it becomes instinct.",
        
                  },
                   {
              type: "text",
              text: [
                "Just like language or habits, Scripture can be practiced until it flows naturally into your thoughts, words, and actions.",
              ],
            },
              
                  ]
           
            },
            },
            {
              value: "SELFCONTROL",
              text: "Patience and self-control",
               feedback: {
                type: "full",
                contents: [
                   {
                    type: "title",
                    text: "God’s Word works best when it becomes instinct.",
        
                  },
                   {
              type: "text",
              text: [
                "Just like language or habits, Scripture can be practiced until it flows naturally into your thoughts, words, and actions.",
              ],
            },
               
                ]
           
            },
            },
            {
              value: "CONFIDENCE",
              text: "Confidence in God’s grace",
               feedback: {
                type: "full",
                contents: [
                   {
                    type: "title",
                    text: "God’s Word works best when it becomes instinct.",
        
                  },
                   {
              type: "text",
              text: [
                "Just like language or habits, Scripture can be practiced until it flows naturally into your thoughts, words, and actions.",
              ],
            },
               ]
           
            },
            },
            {
              value: "WISDOM",
              text: "Wisdom and discernment",
               feedback: {
                type: "full",
                contents: [
                   {
                    type: "title",
                    text: "God’s Word works best when it becomes instinct.",
        
                  },
                   {
              type: "text",
              text: [
                "Just like language or habits, Scripture can be practiced until it flows naturally into your thoughts, words, and actions.",
              ],
            },
               ]
           
            },
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
     
            ["placeholder"]: {
              type: "scale",
              preset: "frequency",
              title: "PLACEHOLDER",
              scoring: {
                target_metric: Symptom.SelfControlChallenge,
              },
            },
           ["binge_goal"]: {
              type: "multi_select",
              title:
                "When I think of why I want to keep a diary...",
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
           
            c9: {
              type: "info",
              contents: [
                {
                  type: "title",
                  text: "🌸 Write for five minutes, bloom from within.",
                },
                {
                  type: "testimonial",
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
      "Have you planned a gift that inspires your dreams for the year ahead?",
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
