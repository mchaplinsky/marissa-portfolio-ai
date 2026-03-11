{\rtf1\ansi\ansicpg1252\cocoartf2758
\cocoatextscaling0\cocoaplatform0{\fonttbl\f0\fswiss\fcharset0 Helvetica;}
{\colortbl;\red255\green255\blue255;}
{\*\expandedcolortbl;;}
\margl1440\margr1440\vieww11520\viewh8400\viewkind0
\pard\tx720\tx1440\tx2160\tx2880\tx3600\tx4320\tx5040\tx5760\tx6480\tx7200\tx7920\tx8640\pardirnatural\partightenfactor0

\f0\fs24 \cf0 # AI Failure States\
\
AI systems are probabilistic systems, meaning they cannot guarantee perfect outcomes. Unlike traditional software, AI models may occasionally produce incomplete, uncertain, or incorrect results.\
\
Designing AI products therefore requires anticipating and managing failure states so that the system remains reliable and trustworthy even when outputs are imperfect.\
\
Marissa Chaplinsky approaches AI failure state design by identifying potential points of system breakdown and designing clear fallback experiences that guide users through uncertainty.\
\
---\
\
## Understanding AI Failure Modes\
\
AI systems can fail in several ways depending on the context in which they are used. These failures may occur due to data limitations, ambiguous inputs, model uncertainty, or environmental constraints.\
\
Common failure modes include:\
\
\'95 low confidence outputs  \
\'95 incomplete or missing data  \
\'95 unsupported user requests  \
\'95 ambiguous user intent  \
\'95 unexpected edge cases\
\
Designing for these scenarios ensures the system remains stable even when the AI cannot produce an ideal response.\
\
---\
\
## Designing Graceful Fallback States\
\
When an AI system cannot generate a reliable result, the experience should transition into a fallback state rather than presenting incorrect or confusing outputs.\
\
Effective fallback states may include:\
\
\'95 informing the user that the system requires additional input  \
\'95 suggesting alternative actions  \
\'95 reverting to manual workflows  \
\'95 presenting partial suggestions rather than definitive outputs\
\
These mechanisms help maintain continuity in the user experience.\
\
---\
\
## Communicating System Limitations\
\
Users should not feel misled by AI capabilities. Transparent communication about system limitations helps users understand when the AI may not be able to complete a task.\
\
Design patterns for communicating limitations include:\
\
\'95 explanation messages  \
\'95 confidence indicators  \
\'95 contextual warnings\
\
Clear communication prevents confusion and reduces the risk of misplaced trust.\
\
---\
\
## Preventing Silent Failures\
\
Silent failures occur when the AI produces an output that appears valid but is actually incorrect.\
\
Marissa mitigates silent failures by introducing guardrails such as:\
\
\'95 validation rules for generated outputs  \
\'95 warnings for potentially incorrect results  \
\'95 user verification steps for critical actions\
\
These safeguards ensure that users remain aware of system reliability.\
\
---\
\
## Supporting User Recovery\
\
Failure states should always provide a path forward for the user.\
\
Recovery mechanisms may include:\
\
\'95 editing AI-generated results  \
\'95 retrying system actions  \
\'95 switching to manual workflows\
\
Providing recovery options ensures that failure states do not block user progress.\
\
---\
\
## Designing for High-Risk Outputs\
\
In certain environments such as content generation or data interpretation, incorrect AI outputs may have meaningful consequences.\
\
In these situations, Marissa designs systems that require human confirmation before finalizing AI-generated outputs.\
\
This approach reinforces the importance of human oversight in AI-driven workflows.\
\
---\
\
## Example Failure State\
\
Example system response:\
\
"No faces were detected in this photo. You can still use the image, but photos with visible faces typically work best in yearbook layouts."\
\
This message provides:\
\
\'95 transparency  \
\'95 helpful guidance  \
\'95 continued user control\
\
---\
\
## Questions this file helps answer\
\
How does Marissa design AI failure states?  \
How does Marissa handle unreliable AI outputs?  \
How does Marissa design fallback experiences for AI systems?}