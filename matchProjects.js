import { projects } from "./projects.js"

function normalizeText(value = "") {
    return String(value)
        .toLowerCase()
        .replace(/&/g, " and ")
        .replace(/[^a-z0-9\s/-]/g, " ")
        .replace(/\s+/g, " ")
        .trim()
}

function includesPhrase(text, phrase) {
    const normalizedText = normalizeText(text)
    const normalizedPhrase = normalizeText(phrase)
    return normalizedPhrase && normalizedText.includes(normalizedPhrase)
}

function scoreProject(project, text) {
    const normalizedText = normalizeText(text)
    let score = 0

    for (const keyword of project.keywords || []) {
        const normalizedKeyword = normalizeText(keyword)
        if (!normalizedKeyword) continue

        if (normalizedText.includes(normalizedKeyword)) {
            score += normalizedKeyword.includes(" ") ? 5 : 3
        }
    }

    for (const tag of project.tags || []) {
        const normalizedTag = normalizeText(tag)
        if (normalizedTag && normalizedText.includes(normalizedTag)) {
            score += 2
        }
    }

    if (includesPhrase(text, project.title)) {
        score += 8
    }

    if (includesPhrase(text, project.description)) {
        score += 4
    }

    // AI / GenAI / Agentic
    if (
        includesPhrase(text, "ai") ||
        includesPhrase(text, "artificial intelligence") ||
        includesPhrase(text, "generative ai") ||
        includesPhrase(text, "agentic") ||
        includesPhrase(text, "automation") ||
        includesPhrase(text, "llm") ||
        includesPhrase(text, "assistant") ||
        includesPhrase(text, "chat")
    ) {
        if ((project.tags || []).includes("AI")) score += 5
        if ((project.tags || []).includes("Conversational UX")) score += 3
    }

    // Healthcare
    if (
        includesPhrase(text, "healthcare") ||
        includesPhrase(text, "patient") ||
        includesPhrase(text, "medical") ||
        includesPhrase(text, "clinical") ||
        includesPhrase(text, "mental health") ||
        includesPhrase(text, "accessibility")
    ) {
        if ((project.tags || []).includes("Healthcare")) score += 5
        if ((project.tags || []).includes("Accessibility")) score += 3
        if ((project.tags || []).includes("UX Research")) score += 2
    }

    // Research
    if (
        includesPhrase(text, "research") ||
        includesPhrase(text, "ux research") ||
        includesPhrase(text, "user research") ||
        includesPhrase(text, "discovery") ||
        includesPhrase(text, "testing")
    ) {
        if ((project.tags || []).includes("UX Research")) score += 4
        if ((project.tags || []).includes("Experimentation")) score += 3
    }

    // Strategy / experimentation
    if (
        includesPhrase(text, "strategy") ||
        includesPhrase(text, "product strategy") ||
        includesPhrase(text, "experimentation") ||
        includesPhrase(text, "a/b testing") ||
        includesPhrase(text, "ab testing") ||
        includesPhrase(text, "analytics") ||
        includesPhrase(text, "growth")
    ) {
        if ((project.tags || []).includes("Product Strategy")) score += 4
        if ((project.tags || []).includes("Experimentation")) score += 4
        if ((project.tags || []).includes("Analytics")) score += 2
    }

    // Systems / enterprise / workflows
    if (
        includesPhrase(text, "system") ||
        includesPhrase(text, "systems") ||
        includesPhrase(text, "enterprise") ||
        includesPhrase(text, "workflow") ||
        includesPhrase(text, "workflow design") ||
        includesPhrase(text, "information architecture") ||
        includesPhrase(text, "ia") ||
        includesPhrase(text, "service design") ||
        includesPhrase(text, "portal")
    ) {
        if ((project.tags || []).includes("System Architecture")) score += 4
        if ((project.tags || []).includes("Systems Thinking")) score += 4
        if ((project.tags || []).includes("Enterprise UX")) score += 4
        if ((project.tags || []).includes("Workflow Design")) score += 3
        if ((project.tags || []).includes("Information Architecture")) score += 3
        if ((project.tags || []).includes("Service Design")) score += 3
    }

    // Government / public sector
    if (
        includesPhrase(text, "government") ||
        includesPhrase(text, "public sector") ||
        includesPhrase(text, "public services") ||
        includesPhrase(text, "case management") ||
        includesPhrase(text, "documentation") ||
        includesPhrase(text, "forms")
    ) {
        if ((project.tags || []).includes("Enterprise UX")) score += 3
        if ((project.tags || []).includes("Service Design")) score += 3
        if ((project.tags || []).includes("Information Architecture")) score += 3
    }

    return score
}

function dedupeProjects(list) {
    const seen = new Set()

    return list.filter((project) => {
        if (!project || !project.id) return false
        if (seen.has(project.id)) return false
        seen.add(project.id)
        return true
    })
}

function getFallbackProjects(text) {
    const normalized = normalizeText(text)
    let fallbackIds = []

    if (
        normalized.includes("healthcare") ||
        normalized.includes("patient") ||
        normalized.includes("medical") ||
        normalized.includes("mental health") ||
        normalized.includes("accessibility")
    ) {
        fallbackIds = ["healthcare-portal", "mental-health-platform"]
    } else if (
        normalized.includes("ai") ||
        normalized.includes("artificial intelligence") ||
        normalized.includes("agentic") ||
        normalized.includes("automation") ||
        normalized.includes("chat") ||
        normalized.includes("assistant") ||
        normalized.includes("generative")
    ) {
        fallbackIds = ["treering-ai-layout", "ai-portfolio-assistant"]
    } else if (
        normalized.includes("strategy") ||
        normalized.includes("testing") ||
        normalized.includes("analytics") ||
        normalized.includes("growth") ||
        normalized.includes("experimentation")
    ) {
        fallbackIds = ["ab-testing-platform", "ai-portfolio-assistant"]
    } else if (
        normalized.includes("enterprise") ||
        normalized.includes("workflow") ||
        normalized.includes("system") ||
        normalized.includes("systems") ||
        normalized.includes("process") ||
        normalized.includes("portal") ||
        normalized.includes("information architecture") ||
        normalized.includes("service design")
    ) {
        fallbackIds = [
            "design-systems-enterprise-workflows",
            "government-service-portal",
        ]
    } else {
        fallbackIds = ["treering-ai-layout", "healthcare-portal"]
    }

    return dedupeProjects(
        fallbackIds.map((id) => projects.find((project) => project.id === id))
    )
}

export function matchProjects(question, answer = "", limit = 2) {
    const combinedText = `${question || ""} ${answer || ""}`

    const scoredProjects = projects
        .map((project) => ({
            project,
            score: scoreProject(project, combinedText),
        }))
        .filter((entry) => entry.score > 0)
        .sort((a, b) => b.score - a.score)
        .map((entry) => entry.project)

    const uniqueMatchedProjects = dedupeProjects(scoredProjects)

    if (uniqueMatchedProjects.length >= limit) {
        return uniqueMatchedProjects.slice(0, limit)
    }

    const fallbackProjects = getFallbackProjects(combinedText)

    const combined = dedupeProjects([
        ...uniqueMatchedProjects,
        ...fallbackProjects,
    ])

    return combined.slice(0, limit)
}
