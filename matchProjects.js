import { projects } from "./projects"

function normalizeText(value = "") {
    return String(value).toLowerCase().trim()
}

function scoreProject(project, question) {
    const normalizedQuestion = normalizeText(question)
    let score = 0

    for (const keyword of project.keywords) {
        const normalizedKeyword = normalizeText(keyword)

        if (!normalizedKeyword) continue

        if (normalizedQuestion.includes(normalizedKeyword)) {
            score += normalizedKeyword.split(" ").length > 1 ? 3 : 2
        }
    }

    if (normalizedQuestion.includes("ai")) {
        if (project.tags.includes("AI")) score += 2
    }

    if (
        normalizedQuestion.includes("healthcare") ||
        normalizedQuestion.includes("patient") ||
        normalizedQuestion.includes("medical")
    ) {
        if (project.tags.includes("Healthcare")) score += 2
    }

    if (
        normalizedQuestion.includes("research") ||
        normalizedQuestion.includes("ux research")
    ) {
        if (project.tags.includes("UX Research")) score += 2
    }

    if (
        normalizedQuestion.includes("accessibility") ||
        normalizedQuestion.includes("accessible")
    ) {
        if (project.tags.includes("Accessibility")) score += 2
    }

    if (
        normalizedQuestion.includes("strategy") ||
        normalizedQuestion.includes("experimentation") ||
        normalizedQuestion.includes("a/b testing") ||
        normalizedQuestion.includes("ab testing")
    ) {
        if (
            project.tags.includes("Product Strategy") ||
            project.tags.includes("Experimentation")
        ) {
            score += 2
        }
    }

    if (
        normalizedQuestion.includes("system") ||
        normalizedQuestion.includes("systems") ||
        normalizedQuestion.includes("workflow") ||
        normalizedQuestion.includes("enterprise")
    ) {
        if (
            project.tags.includes("System Architecture") ||
            project.tags.includes("Systems Thinking") ||
            project.tags.includes("Enterprise UX") ||
            project.tags.includes("Workflow Design")
        ) {
            score += 2
        }
    }

    return score
}

export function matchProjects(question, limit = 2) {
    const normalizedQuestion = normalizeText(question)

    const scoredProjects = projects.map((project) => ({
        ...project,
        score: scoreProject(project, normalizedQuestion),
    }))

    const matchedProjects = scoredProjects
        .filter((project) => project.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, limit)
        .map(({ score, ...project }) => project)

    if (matchedProjects.length >= limit) {
        return matchedProjects
    }

    const fallbackProjects = getFallbackProjects(normalizedQuestion, limit)

    const combined = [...matchedProjects]

    for (const fallbackProject of fallbackProjects) {
        const alreadyIncluded = combined.some(
            (project) => project.id === fallbackProject.id
        )

        if (!alreadyIncluded) {
            combined.push(fallbackProject)
        }

        if (combined.length >= limit) break
    }

    return combined.slice(0, limit)
}

function getFallbackProjects(question, limit = 2) {
    const fallbackIds = []

    if (
        question.includes("healthcare") ||
        question.includes("patient") ||
        question.includes("medical") ||
        question.includes("accessibility")
    ) {
        fallbackIds.push("healthcare-portal", "mental-health-platform")
    } else if (
        question.includes("ai") ||
        question.includes("agentic") ||
        question.includes("automation") ||
        question.includes("chat")
    ) {
        fallbackIds.push("treering-ai-layout", "ai-portfolio-assistant")
    } else if (
        question.includes("strategy") ||
        question.includes("testing") ||
        question.includes("analytics") ||
        question.includes("growth")
    ) {
        fallbackIds.push("ab-testing-platform", "ai-portfolio-assistant")
    } else if (
        question.includes("enterprise") ||
        question.includes("workflow") ||
        question.includes("system") ||
        question.includes("process")
    ) {
        fallbackIds.push(
            "design-systems-enterprise-workflows",
            "government-service-portal"
        )
    } else {
        fallbackIds.push("treering-ai-layout", "healthcare-portal")
    }

    return fallbackIds
        .map((id) => projects.find((project) => project.id === id))
        .filter(Boolean)
        .slice(0, limit)
}
