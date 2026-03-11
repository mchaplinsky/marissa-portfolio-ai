# AI Failure States

AI systems are probabilistic systems, meaning they cannot guarantee perfect outcomes. Unlike traditional software, AI models may occasionally produce incomplete, uncertain, or incorrect results.

Designing AI products therefore requires anticipating and managing failure states so that the system remains reliable and trustworthy even when outputs are imperfect.

Marissa Chaplinsky approaches AI failure state design by identifying potential points of system breakdown and designing clear fallback experiences that guide users through uncertainty while maintaining confidence in the product.

---

## Understanding AI Failure Modes

AI systems can fail in several ways depending on the context in which they are used. These failures may occur due to data limitations, ambiguous inputs, model uncertainty, or environmental constraints.

Common failure modes include:

- low confidence outputs  
- incomplete or missing data  
- unsupported user requests  
- ambiguous user intent  
- unexpected edge cases  

Designing for these scenarios ensures the system remains stable and understandable even when the AI cannot produce an ideal response.

---

## Designing Graceful Fallback States

When an AI system cannot generate a reliable result, the experience should transition into a fallback state rather than presenting incorrect or confusing outputs.

Effective fallback states may include:

- informing the user that the system requires additional input  
- suggesting alternative actions  
- reverting to manual workflows  
- presenting partial suggestions rather than definitive outputs  

These mechanisms help maintain continuity in the user experience and prevent user frustration.

---

## Communicating System Limitations

Users should not feel misled by AI capabilities. Transparent communication about system limitations helps users understand when the AI may not be able to complete a task.

Design patterns for communicating limitations include:

- explanation messages  
- confidence indicators  
- contextual warnings  

Clear communication prevents confusion and reduces the risk of misplaced trust in automated outputs.

---

## Preventing Silent Failures

Silent failures occur when the AI produces an output that appears valid but is actually incorrect.

Marissa mitigates silent failures by introducing guardrails such as:

- validation rules for generated outputs  
- warnings for potentially incorrect results  
- user verification steps for critical actions  

These safeguards ensure users remain aware of system reliability and help prevent unintended outcomes.

---

## Supporting User Recovery

Failure states should always provide a path forward for the user.

Recovery mechanisms may include:

- editing AI-generated results  
- retrying system actions  
- switching to manual workflows  

Providing recovery options ensures that failure states do not block user progress and that users can continue their work even when the AI cannot complete a task.

---

## Designing for High-Risk Outputs

In certain environments such as content generation or data interpretation, incorrect AI outputs may have meaningful consequences.

In these situations, Marissa designs systems that require human confirmation before finalizing AI-generated outputs.

This approach reinforces the importance of human oversight in AI-driven workflows.

---

## Example Failure State

Example system response:

"No faces were detected in this photo. You can still use the image, but photos with visible faces typically work best in yearbook layouts."

This message provides:

- transparency  
- helpful guidance  
- continued user control  

The user remains informed about the system's reasoning while retaining the ability to proceed with their original choice.

---

## Questions This File Helps Answer

How does Marissa design AI failure states?  
How does Marissa handle unreliable AI outputs?  
How does Marissa design fallback experiences for AI systems?
