
// Mock data for Ailutions website
export const heroData = {
  headline: "Build, Integrate & Automate with AI.",
  subcopy: "We design custom AI tools, embed AI into your existing systems, automate sales & operations, and implement ERPNext tailored to you.",
  primaryCTA: { label: "Get Started", href: "#contact" },
  secondaryCTA: { label: "Try Digital Maturity Tracker", href: "/digital-maturity-tracker" }
};

export const servicesData = {
  headline: "What We Do",
  cards: [
    { 
      title: "Custom AI Tools & Systems", 
      icon: "Cpu", 
      desc: "ERP, dashboards & workflows built from scratch.",
      slug: "custom-ai-tools"
    },
    { 
      title: "AI Integration", 
      icon: "Bot", 
      desc: "Add AI to your ERP, CRM, or HR without rebuilding.",
      slug: "ai-integration"
    },
    { 
      title: "Automations", 
      icon: "Workflow", 
      desc: "Sales, operations, and support on autopilot.",
      slug: "automations"
    },
    { 
      title: "ERPNext Implementation", 
      icon: "Settings2", 
      desc: "Tailored ERPNext setup with training and support.",
      slug: "erpnext-implementation"
    }
  ]
};

export const caseStudiesData = {
  headline: "Proven Outcomes",
  cards: [
    { 
      title: "AI Finance OS", 
      metric: "−28% invoice time",
      problem: "Manual invoice processing taking 4+ hours daily",
      solution: "AI-powered document extraction and automated approval workflows",
      outcome: "Reduced invoice processing from 4 hours to 45 minutes per day",
      details: "Complete case study with technical implementation details",
      link: "/case-studies/ai-finance-os"
    },
    { 
      title: "WhatsApp Agent", 
      metric: "60% fewer no-shows",
      problem: "High appointment no-show rates affecting revenue",
      solution: "AI WhatsApp agent for automated reminders and rescheduling",
      outcome: "Appointment attendance improved from 40% to 85%",
      details: "Implementation guide and ROI breakdown",
      link: "/case-studies/whatsapp-agent"
    },
    { 
      title: "ERP HR & Payroll", 
      metric: "90% automated payroll",
      problem: "Manual payroll processing prone to errors and delays",
      solution: "Integrated ERPNext with automated payroll calculations",
      outcome: "99.5% accuracy with same-day payroll processing",
      details: "Technical architecture and compliance details",
      link: "/case-studies/erp-hr-payroll"
    },
    {
      title: "WhatsApp Real Estate",
      metric: "+100% lead volume",
      problem: "Leads from social media were going cold due to slow response times.",
      solution: "An automated WhatsApp agent to instantly qualify and nurture leads.",
      outcome: "Doubled lead volume and cut response time to under 2 minutes.",
      details: "Full case study on WhatsApp automation for real estate in Dubai.",
      link: "/case-studies/whatsapp-automation-for-real-estate"
    },
    {
      title: "eCommerce Sales Agent",
      metric: "+30% sales conversion",
      problem: "High cart abandonment and missed sales opportunities on WhatsApp.",
      solution: "An AI-powered WhatsApp agent to recover carts and close sales.",
      outcome: "Increased sales conversion by 30% and improved customer engagement.",
      details: "Learn how a WhatsApp sales agent can boost your eCommerce revenue.",
      link: "/blog/whatsapp-sales-agent-ecommerce-uae"
    }
  ]
};

export const ctaData = {
  headline: "Discover your digital maturity",
  subcopy: "Answer key questions and receive a tailored, actionable report.",
  ctaButton: { label: "Launch Digital Maturity Tracker", href: "/digital-maturity-tracker" }
};

export const contactData = {
  headline: "Let's Talk",
  form: ["Name", "Email", "Company", "Message"]
};

export const processSteps = [
  {
    step: "01",
    title: "Assess & Strategize",
    description: "We analyze your current systems and identify automation opportunities",
    icon: "Search"
  },
  {
    step: "02", 
    title: "Design & Plan",
    description: "Create detailed implementation roadmap with clear milestones",
    icon: "PenTool"
  },
  {
    step: "03",
    title: "Build & Integrate", 
    description: "Develop custom AI tools and seamlessly integrate with existing systems",
    icon: "Code"
  },
  {
    step: "04",
    title: "Test & Optimize",
    description: "Rigorous testing and performance optimization for maximum efficiency",
    icon: "TestTube"
  },
  {
    step: "05",
    title: "Deploy & Support",
    description: "Go live with ongoing support and continuous improvement",
    icon: "Rocket"
  }
];

export const blogPreviews = [
  {
    title: "5 Ways a WhatsApp Sales Agent Can Boost eCommerce Sales in UAE (2025)",
    excerpt: "Learn 5 proven ways a WhatsApp agent can help you sell more in 2025.",
    readTime: "5 min read",
    category: "eCommerce",
    slug: "/blog/whatsapp-sales-agent-ecommerce-uae"
  },
  {
    title: "5 Signs Your Business Needs AI Automation",
    excerpt: "Discover the key indicators that show your company is ready for AI-powered automation.",
    readTime: "4 min read",
    category: "Strategy",
    slug: "signs-business-needs-ai-automation"
  },
  {
    title: "ERPNext vs Custom ERP: Making the Right Choice",
    excerpt: "Compare the benefits of ERPNext implementation versus building a custom ERP system.",
    readTime: "6 min read", 
    category: "Technology",
    slug: "erpnext-vs-custom-erp"
  },
  {
    title: "ROI Calculator: Measuring AI Automation Success",
    excerpt: "Learn how to calculate and track the return on investment for your AI initiatives.",
    readTime: "5 min read",
    category: "Business",
    slug: "roi-calculator-ai-automation"
  }
];

export const digitalMaturitySections = [
  {
    id: "strategy",
    name: "Strategy & Leadership",
    questions: [
      "How clearly defined is your digital strategy?",
      "How well does your leadership support digital initiatives?",
      "How effectively do you measure digital transformation ROI?"
    ]
  },
  {
    id: "process",
    name: "Process & Operations",
    questions: [
      "How standardized are your business processes?",
      "How well integrated are your different systems?",
      "How efficiently do you handle process automation?"
    ]
  },
  {
    id: "data",
    name: "Data & Decisions",
    questions: [
      "We use real-time dashboards for the numbers that matter.",
      "Customer data is clean, secure, and available to the right people.",
      "Management use data over gut feel for key decisions.",
      "We forecast with data (e.g., sales, demand, customer drop-off)."
    ]
  },
  {
    id: "automation",
    name: "Automation & AI",
    questions: [
      "How much of your routine work is automated?",
      "How effectively do you use AI/ML in operations?",
      "How streamlined are your approval workflows?"
    ]
  },
  {
    id: "security",
    name: "Security & Compliance",
    questions: [
      "How comprehensive is your cybersecurity framework?",
      "How well do you manage data privacy compliance?",
      "How regularly do you conduct security assessments?"
    ]
  },
  {
    id: "customer",
    name: "Customer & People",
    questions: [
      "Our site/app is fast, mobile-friendly, and easy to use.",
      "We collect customer feedback and act on it within a week.",
      "Customers get the same info and service on our website, WhatsApp, phone, and in-person.",
      "We train our team on new tools at least twice a year."
    ]
  }
];

export const maturityLevels = [
  {
    name: "Pre-Digital",
    range: [0, 25],
    description: "Building basic digital capabilities, often with manual or ad-hoc processes.",
    recommendations: [
      "Establish a clear digital strategy and roadmap.",
      "Invest in foundational technologies like a modern ERP or CRM.",
      "Begin standardizing core business processes."
    ]
  },
  {
    name: "Digital",
    range: [26, 50],
    description: "Developing structured digital practices and integrating core systems.",
    recommendations: [
      "Implement data governance and start using data for decisions.",
      "Identify and begin automating high-frequency, low-value tasks.",
      "Enhance customer experience through digital channels."
    ]
  },
  {
    name: "Automated",
    range: [51, 75],
    description: "Automating core processes and workflows to improve efficiency and reduce errors.",
    recommendations: [
      "Optimize and expand automation across departments.",
      "Implement advanced analytics and business intelligence.",
      "Develop a culture of continuous improvement and data-driven decisions."
    ]
  },
  {
    name: "AI-Powered",
    range: [76, 100],
    description: "Leveraging AI for predictive insights, strategic advantage, and autonomous operations.",
    recommendations: [
      "Deploy AI and machine learning models for forecasting and optimization.",
      "Explore generative AI for content creation and customer interaction.",
      "Foster a culture of innovation and data experimentation."
    ]
  }
];
