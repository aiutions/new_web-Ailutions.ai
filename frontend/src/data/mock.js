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
      desc: "ERP, dashboards & workflows built from scratch." 
    },
    { 
      title: "AI Integration", 
      icon: "Bot", 
      desc: "Add AI to your ERP, CRM, or HR without rebuilding." 
    },
    { 
      title: "Automations", 
      icon: "Workflow", 
      desc: "Sales, operations, and support on autopilot." 
    },
    { 
      title: "ERPNext Implementation", 
      icon: "Settings2", 
      desc: "Tailored ERPNext setup with training and support." 
    }
  ]
};

export const caseStudiesData = {
  headline: "Proven Outcomes",
  cards: [
    { title: "AI Finance OS", metric: "−28% invoice time" },
    { title: "WhatsApp Agent", metric: "60% fewer no-shows" },
    { title: "ERP HR & Payroll", metric: "90% automated payroll" }
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
    name: "Data",
    questions: [
      "How accessible is your business data?",
      "How well do you leverage data for decision making?",
      "How robust is your data governance framework?"
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