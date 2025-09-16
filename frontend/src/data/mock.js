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
      details: "Complete case study with technical implementation details"
    },
    { 
      title: "WhatsApp Agent", 
      metric: "60% fewer no-shows",
      problem: "High appointment no-show rates affecting revenue",
      solution: "AI WhatsApp agent for automated reminders and rescheduling",
      outcome: "Appointment attendance improved from 40% to 85%",
      details: "Implementation guide and ROI breakdown"
    },
    { 
      title: "ERP HR & Payroll", 
      metric: "90% automated payroll",
      problem: "Manual payroll processing prone to errors and delays",
      solution: "Integrated ERPNext with automated payroll calculations",
      outcome: "99.5% accuracy with same-day payroll processing",
      details: "Technical architecture and compliance details"
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
    name: "Strategy",
    questions: [
      "How clearly defined is your digital strategy?",
      "How well does your leadership support digital initiatives?",
      "How effectively do you measure digital transformation ROI?"
    ]
  },
  {
    name: "Process",
    questions: [
      "How standardized are your business processes?",
      "How well integrated are your different systems?",
      "How efficiently do you handle process automation?"
    ]
  },
  {
    name: "Data & Decisions",
    questions: [
      "We use real-time dashboards for the numbers that matter.",
      "Customer data is clean, secure, and available to the right people.",
      "Management use data over gut feel for key decisions.",
      "We forecast with data (e.g., sales, demand, customer drop-off)."
    ]
  },
  {
    name: "Automation",
    questions: [
      "How much of your routine work is automated?",
      "How effectively do you use AI/ML in operations?",
      "How streamlined are your approval workflows?"
    ]
  },
  {
    name: "Security",
    questions: [
      "How comprehensive is your cybersecurity framework?",
      "How well do you manage data privacy compliance?",
      "How regularly do you conduct security assessments?"
    ]
  },
  {
    name: "Culture",
    questions: [
      "How adaptable is your workforce to digital change?",
      "How well do you support digital skills development?",
      "How effectively do you communicate digital initiatives?"
    ]
  }
];

export const maturityLevels = [
  {
    name: "Foundational",
    range: [0, 25],
    description: "Building basic digital capabilities",
    recommendations: [
      "Establish clear digital strategy",
      "Invest in foundational technologies",
      "Build digital skills across teams"
    ]
  },
  {
    name: "Emerging",
    range: [26, 50],
    description: "Developing structured digital practices",
    recommendations: [
      "Standardize core processes",
      "Implement data governance",
      "Expand automation initiatives"
    ]
  },
  {
    name: "Established",
    range: [51, 75],
    description: "Strong digital foundation with growth opportunities",
    recommendations: [
      "Optimize existing systems",
      "Implement advanced analytics",
      "Enhance cross-functional integration"
    ]
  },
  {
    name: "Advanced",
    range: [76, 100],
    description: "Leading digital transformation practices",
    recommendations: [
      "Drive innovation initiatives",
      "Mentor others in digital transformation",
      "Explore emerging technologies"
    ]
  }
];