export type Project = {
    id: string
    title: string
    description: string
    metric: string
    tags: string[]
    image: string
    url: string
    keywords: string[]
}

export const projects: Project[] = [
    {
        id: "treering-ai-layout",
        title: "AI Powered Yearbook Creation System For TreeRing",
        description:
            "Designed an intelligent layout generation system that uses AI to automatically create responsive yearbook pages.",
        metric: "Reduced design time by 60% for content-heavy pages",
        tags: ["AI", "Product Design", "System Architecture"],
        image: "/images/treering-ai.jpg",
        url: "https://www.marissachaplinsky.com/blank-1-1-1",
        keywords: [
            "ai",
            "artificial intelligence",
            "automation",
            "layout",
            "layout generation",
            "system",
            "systems",
            "product design",
            "agentic",
            "machine learning",
            "generative",
            "creative tools",
            "yearbook",
            "treering",
            "tree ring",
            "design system",
            "responsive pages",
        ],
    },

    {
        id: "ai-portfolio-assistant",
        title: "AI Powered Portfolio Assistant",
        description:
            "Designed an AI assistant that allows recruiters and hiring managers to ask questions about experience, projects, and design philosophy.",
        metric: "Reduces recruiter search time across portfolio content",
        tags: ["AI", "Conversational UX", "Product Strategy"],
        image: "/images/ai-assistant.jpg",
        url: "https://www.marissachaplinsky.com/blank-1",
        keywords: [
            "ai",
            "assistant",
            "chat",
            "chatbot",
            "agentic",
            "llm",
            "conversational",
            "ux ai",
            "product strategy",
            "portfolio ai",
            "intelligent interface",
            "recruiter experience",
            "question answering",
        ],
    },

    {
        id: "healthcare-portal",
        title: "Healthcare Patient Portal Redesign",
        description:
            "Redesigned a patient portal for a major healthcare provider to improve accessibility, navigation, and digital engagement.",
        metric: "Increased patient engagement by 38%",
        tags: ["Healthcare", "Accessibility", "Service Design"],
        image: "/images/healthcare-portal.jpg",
        url: "https://www.marissachaplinsky.com/healthcare-portal",
        keywords: [
            "healthcare",
            "patient",
            "portal",
            "medical",
            "hospital",
            "accessibility",
            "service design",
            "patient experience",
            "health system",
            "case management",
            "clinical",
            "digital health",
            "health ux",
        ],
    },

    {
        id: "mental-health-platform",
        title: "Mental Health Resource Platform",
        description:
            "Conducted UX research and redesigned digital mental health resources to improve discoverability, usability, and accessibility.",
        metric: "Improved access to mental health information across user groups",
        tags: ["Healthcare", "UX Research", "Accessibility"],
        image: "/images/mental-health.jpg",
        url: "https://www.marissachaplinsky.com/cmha-project",
        keywords: [
            "mental health",
            "healthcare",
            "research",
            "ux research",
            "user research",
            "accessibility",
            "resource platform",
            "information design",
            "health services",
            "cmha",
            "content strategy",
            "discoverability",
        ],
    },

    {
        id: "ab-testing-platform",
        title: "Experimentation & A/B Testing Platform",
        description:
            "Designed a testing framework to help teams experiment with product features and measure user behavior and outcomes.",
        metric: "Enabled data-driven product experimentation across teams",
        tags: ["Product Strategy", "Experimentation", "Analytics"],
        image: "/images/ab-testing.jpg",
        url: "https://www.marissachaplinsky.com/blank-1-1-1-1",
        keywords: [
            "ab testing",
            "a/b testing",
            "experimentation",
            "product analytics",
            "optimization",
            "conversion",
            "growth",
            "metrics",
            "product strategy",
            "data",
            "testing",
            "experiment design",
            "analytics",
        ],
    },

    {
        id: "government-service-portal",
        title: "Government Service Portal Redesign",
        description:
            "Redesigned a large-scale government service portal to improve navigation, workflows, and document discovery.",
        metric: "Reduced support requests by simplifying service workflows",
        tags: ["Enterprise UX", "Service Design", "Information Architecture"],
        image: "/images/gov-portal.jpg",
        url: "https://www.marissachaplinsky.com/government-project",
        keywords: [
            "government",
            "public services",
            "enterprise",
            "workflow",
            "service design",
            "information architecture",
            "case management",
            "documentation",
            "process",
            "portal",
            "forms",
            "enterprise ux",
            "ia",
        ],
    },

    {
        id: "design-systems-enterprise-workflows",
        title: "Enterprise Workflow & Systems Design",
        description:
            "Designed complex workflows, dashboards, and scalable product experiences across enterprise and service environments.",
        metric: "Improved clarity across multi-step workflows and internal systems",
        tags: ["Systems Thinking", "Enterprise UX", "Workflow Design"],
        image: "/images/enterprise-workflow.jpg",
        url: "https://www.marissachaplinsky.com/enterprise-workflows",
        keywords: [
            "systems thinking",
            "workflow",
            "enterprise",
            "dashboard",
            "internal tools",
            "b2b",
            "service flows",
            "complex systems",
            "process design",
            "operations",
            "product design",
            "multi-step flow",
        ],
    },
]
