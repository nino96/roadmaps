window.ROADMAP_DATA.months.push(...[
  {
    "id": "m07",
    "month": "FEB 2027",
    "title": "Turn the GX10 + 3090 into a local AI service layer",
    "phase": "Local AI",
    "hours": "4.5–6 h",
    "priority": "Use hardware for leverage",
    "tracks": [
      "Local AI",
      "DevOps",
      "Agents"
    ],
    "objective": "Harden local inference into an interchangeable service with pinned models, canaries, routing and rollback. Optimize for reliable useful workloads, not maximum parameter count.",
    "ideas": [
      [
        "Stable endpoint > model zoo",
        "Applications should depend on a small gateway contract, not directly on whatever model you are testing this week."
      ],
      [
        "Canaries catch “fits but fails”",
        "A model can load yet fail structured output, tool calling, context length or memory behavior. Keep task-shaped canaries."
      ],
      [
        "Route by task risk",
        "Use local models for extraction/classification/private search where they meet eval thresholds; use subscription coding agents for interactive coding leverage."
      ],
      [
        "Hardware roles can differ",
        "Treat the GX10 and RTX 3090 as workers with explicit roles rather than forcing distributed inference across them."
      ],
      [
        "Local inference does not imply cloud-free orchestration",
        "Copilot Fusion may invoke local models while still routing decisions through cloud services. Keep sensitive workflows on an independent private local path."
      ]
    ],
    "practitioner": [
      [
        "NVIDIA Spark playbooks",
        "Official playbooks demonstrate multiple serving/runtime paths. Your value comes from choosing one, pinning it and wrapping it with health/eval checks.",
        "dgx"
      ],
      [
        "Copilot + Ollama",
        "The recent JetBrains integration is evidence that a local service can plug into mainstream workflows instead of requiring a separate local-AI UI.",
        "copilot_ollama"
      ]
    ],
    "reading": [
      [
        "NVIDIA DGX Spark playbooks — serving sections",
        "25 min targeted",
        "Select one runtime supported by your current driver stack; record why.",
        "dgx"
      ],
      [
        "GitHub — Fusion local models",
        "10 min",
        "Evaluate GX10 compatibility and the cloud routing boundary before opting in.",
        "fusion_local"
      ],
      [
        "GitHub — Copilot Ollama support",
        "10 min",
        "See local model use as a backend capability, not a separate hobby.",
        "copilot_ollama"
      ],
      [
        "Your Month 2 eval reports",
        "15 min",
        "Choose workloads local models must pass before receiving real tasks.",
        "eval_noise"
      ]
    ],
    "projects": [
      {
        "name": "1. `local-ai` Compose service",
        "time": "120 min",
        "value": "Highest",
        "steps": [
          "Create `infra/apps/local-ai/compose.yaml` using one pinned runtime/container and explicit model storage path.",
          "Add `models.lock.yaml` with model ID/revision, quantization, runtime version, launch args and expected context limit.",
          "Expose a stable private endpoint plus `/health`; do not publish it to the Internet.",
          "Run the Month 1 canary + Month 2 eval subset automatically after every model/runtime change.",
          "Document one-command rollback to the previous lockfile."
        ]
      },
      {
        "name": "2. Policy router",
        "time": "75 min",
        "value": "High",
        "steps": [
          "Create a small router mapping task classes to backends: `private-extract`, `retrieval`, `cheap-classify`, `interactive-coding`.",
          "Route only if the backend meets a per-task eval threshold.",
          "Fallback should be explicit; never silently send private data to a cloud model.",
          "Log backend, latency and reason for routing.",
          "Benchmark Copilot Fusion local/cloud routing against your explicit policy router on 4 tasks; record privacy path, human review time, cost and tool-call correctness."
        ]
      },
      {
        "name": "3. 3090 worker role",
        "time": "45 min",
        "value": "Medium",
        "steps": [
          "Pick one complementary role: embeddings/reranking, smaller low-latency model, batch OCR/vision, or experiment worker.",
          "Keep its API contract independent from GPU identity.",
          "Add the worker to inventory and health checks; no cross-GPU distributed setup unless one real workload justifies it."
        ]
      }
    ],
    "coding_skill": [
      "Backend abstraction without lowest-common-denominator design",
      "Practice a small model interface plus explicit capability flags (tools, JSON schema, vision, context). Do not hide unsupported behavior."
    ],
    "agent_pattern": [
      "Policy-based model router",
      "Task sensitivity + eval threshold + availability determine backend; the model itself does not choose where sensitive data goes."
    ],
    "devops": [
      "Model releases as deployable artifacts",
      "Lock model/runtime/config together, run canaries, retain previous lockfile, record measured regressions."
    ],
    "homelab": [
      "Private local inference service",
      "Integrate it with document triage/search and future automations. Prefer Tailscale/private LAN and auth where crossing hosts."
    ],
    "skip": [
      "Largest model that can barely load",
      "Multi-node inference because it is possible",
      "Constant quantization churn",
      "Exposing inference ports publicly",
      "Buying more Spark nodes to imitate eight-node benchmarks"
    ],
    "schedule": [
      [
        "40 min",
        "Runtime/local-model reading + choose one path."
      ],
      [
        "2 h",
        "Harden local-ai service."
      ],
      [
        "75 min",
        "Policy router."
      ],
      [
        "45 min",
        "3090 role."
      ],
      [
        "30 min",
        "Canary/eval + rollback test."
      ]
    ],
    "stretch": "Benchmark energy/latency for two task classes and route based on measured utility, not model prestige.",
    "checkpoint": "Local AI is an ordinary, versioned service with a stable contract, known-good workloads and rollback—not a hand-started terminal command."
  },
  {
    "id": "m08",
    "month": "MAR 2027",
    "title": "Instrument agents like production services",
    "phase": "Observability",
    "hours": "4.5–5.5 h",
    "priority": "Necessary for debugging",
    "tracks": [
      "Observability",
      "Agents",
      "DevOps"
    ],
    "objective": "Make latency, tool failures, retries, model/backend choice and eval outcome visible through traces and metrics without casually storing sensitive prompt content.",
    "ideas": [
      [
        "A trace is the agent stack trace",
        "Without step/tool spans you cannot distinguish model latency, bad retrieval, retry storms and slow tools."
      ],
      [
        "Use open telemetry first",
        "Instrument with OpenTelemetry semantic conventions so the backend can change later."
      ],
      [
        "Content logging is a security decision",
        "Default to metadata, hashes/IDs and safe attributes; opt into raw prompt/tool payload capture only where justified."
      ],
      [
        "SLOs beat dashboards",
        "Track a few service-level indicators: success, intervention rate, p95 latency, tool error rate, eval regression rate."
      ],
      [
        "Incident investigation is a bounded read-only agent task",
        "Start with traces, logs and deploy metadata; summarize evidence with exact trace/source IDs. Keep secret resolution and remediation in trusted tools."
      ]
    ],
    "practitioner": [
      [
        "OpenTelemetry GenAI conventions",
        "OTel now has concrete GenAI observability patterns for model calls, tokens and tool operations, reducing vendor lock-in.",
        "otel"
      ],
      [
        "Langfuse self-hostability",
        "Langfuse can receive OpenTelemetry and combine traces/evals; useful as a replaceable UI, not as your data model.",
        "langfuse"
      ]
    ],
    "reading": [
      [
        "OpenTelemetry — GenAI observability",
        "20 min",
        "Map model/tool activity to spans and decide what metadata is safe to retain.",
        "otel"
      ],
      [
        "Langfuse docs — tracing + self-hosting",
        "15 min targeted",
        "Decide whether the UI saves enough debugging time to operate it.",
        "langfuse"
      ],
      [
        "OpenAI Harness engineering — observability section",
        "8 min revisit",
        "Notice the leverage of making logs/metrics directly legible to agents.",
        "harness"
      ]
    ],
    "projects": [
      {
        "name": "1. OTel traces for one agent workflow",
        "time": "120 min",
        "value": "Highest",
        "steps": [
          "Instrument workflow, model call, retrieval and each tool call as spans with stable run/case IDs.",
          "Record backend/model alias, latency, retry count, tool outcome and approval waits.",
          "Redact or omit raw document/prompt content by default.",
          "Export to your existing preferred OTel backend or a small local collector.",
          "Create one read-only incident investigation exercise from a synthetic service failure; report trace IDs, probable cause, confidence and human validation time."
        ]
      },
      {
        "name": "2. Add Langfuse only if it earns its keep",
        "time": "60 min",
        "value": "High",
        "steps": [
          "Deploy self-hosted Langfuse behind your private network using Compose, or skip it if your existing LGTM stack already gives enough trace inspection.",
          "Ingest OTel traces; do not duplicate custom instrumentation just for the UI.",
          "Create one view/query answering: “why did this run fail or take >30s?”"
        ]
      },
      {
        "name": "3. Define four SLOs",
        "time": "45 min",
        "value": "Medium",
        "steps": [
          "Choose success rate, intervention rate, p95 runtime and eval regression count for your durable workflow.",
          "Create thresholds based on your current baseline, not arbitrary enterprise targets.",
          "Generate a weekly Markdown report from telemetry."
        ]
      }
    ],
    "coding_skill": [
      "Trace-driven debugging",
      "When an agent fails, inspect the trace before changing the prompt. Practice fixing the failing layer—retrieval, schema, tool, timeout, instruction or model."
    ],
    "agent_pattern": [
      "Observability-aware supervisor",
      "A bounded diagnostic agent can summarize failed traces and propose likely root causes, but cannot mutate production state."
    ],
    "devops": [
      "Telemetry as a portable contract",
      "OTel instrumentation stays in code; dashboards are disposable. Add retention/redaction policy to the runbook."
    ],
    "homelab": [
      "Unify AI + homelab telemetry",
      "Feed agent services into the same health/metrics discipline as Paperless/Jellyfin/local AI instead of building a separate “AI ops” island."
    ],
    "skip": [
      "Logging every prompt forever",
      "Token-cost dashboards without quality metrics",
      "Deploying three observability platforms",
      "Auto-remediation before diagnosis is trustworthy"
    ],
    "schedule": [
      [
        "40 min",
        "OTel/Langfuse reading."
      ],
      [
        "2 h",
        "Instrument one workflow."
      ],
      [
        "60 min",
        "Trace UI or existing backend integration."
      ],
      [
        "45 min",
        "Define/report SLOs."
      ],
      [
        "25 min",
        "Redaction review."
      ]
    ],
    "stretch": "Add trace links to eval failures so a failed regression case opens directly at its execution trace.",
    "checkpoint": "For any failed run you can point to the exact model/tool/retry state responsible without rereading an entire chat transcript."
  },
  {
    "id": "m09",
    "month": "APR 2027",
    "title": "Orchestrate coding agents without creating a review factory",
    "phase": "Agentic coding",
    "hours": "4.5–6 h",
    "priority": "Advanced leverage",
    "tracks": [
      "Agentic coding",
      "Automation",
      "DevOps"
    ],
    "objective": "Move from “one agent, one task” to bounded planner/implementer/reviewer workflows while measuring whether orchestration actually reduces your review time.",
    "ideas": [
      [
        "Human review is the scarce resource",
        "More PRs are not leverage if they create more review than they save."
      ],
      [
        "Parallelism requires independent work units",
        "Use worktrees for separable tasks; do not parallelize tasks with heavy shared design state."
      ],
      [
        "Agent-to-agent review needs objective anchors",
        "Reviewer agents should check tests, contracts, scope and known failure modes—not merely produce another opinion."
      ],
      [
        "Safe writes still use trusted materializers",
        "For repo maintenance, the agent proposes intent/diff; deterministic Git/GitHub commands enforce branch, path and permission rules."
      ],
      [
        "CI and source-control integration are the new scaling bottleneck",
        "High agent throughput needs small changes, isolated worktrees, immutable acceptance tests, and one owner integrating writes—not more autonomous editors."
      ]
    ],
    "practitioner": [
      [
        "Spotify at scale",
        "Spotify reports very high coding-agent adoption and increased PR frequency, while also calling out code review as a bottleneck. That makes review-time reduction the metric to optimize.",
        "spotify"
      ],
      [
        "GitHub Agentic Workflows",
        "GitHub’s documentation case study shows high-volume maintenance through constrained workflows and trusted output handling rather than unrestricted repository autonomy.",
        "agentic_docs"
      ],
      [
        "OpenAI harness team",
        "Their reported use of worktree-isolated apps and agent-to-agent reviews shows what becomes valuable after agent throughput rises.",
        "harness"
      ]
    ],
    "reading": [
      [
        "Anthropic — Redesigning source control",
        "20 min",
        "Extract practical lessons about CI/source-control constraints when agents produce code faster than humans can review.",
        "anthropic_scion"
      ],
      [
        "GitHub — Agentic Workflows GA",
        "12 min",
        "Understand Markdown-to-Actions compilation, safe outputs and sandbox defaults.",
        "aw_ga"
      ],
      [
        "Spotify — Coding Is No Longer the Constraint",
        "20 min",
        "Focus on review bottlenecks, standards and maintenance automation—not the headline adoption stats.",
        "spotify"
      ],
      [
        "GitHub — Agentic Workflows case study",
        "20 min",
        "Study the intent → safe-output handler split and where human review remains.",
        "agentic_docs"
      ],
      [
        "GitHub — worktree/subagent support",
        "8 min revisit",
        "Translate UI features into repo-level conventions that work across tools.",
        "copilot_july"
      ]
    ],
    "projects": [
      {
        "name": "1. Bounded repo-maintainer agent",
        "time": "135 min",
        "value": "Highest",
        "steps": [
          "Choose one low-risk class: docs drift, dependency metadata, test fixture refresh, lint cleanup or stale config.",
          "Planner emits a typed task plan with allowed paths and tests.",
          "Implementer runs in a fresh worktree and may only modify allowed paths.",
          "Reviewer runs deterministic checks plus a targeted agent review; failed checks return to implementer once.",
          "Human sees one final diff with evidence. Track your review minutes.",
          "Implement one GitHub Agentic Workflow that triages CI failures read-only and emits a safe report or draft PR; commit the Markdown source, compiled YAML, pinned versions and budget forecast."
        ]
      },
      {
        "name": "2. Two-agent vs one-agent experiment",
        "time": "70 min",
        "value": "High",
        "steps": [
          "Take 4 comparable maintenance tasks.",
          "Run 2 with single agent, 2 with planner+implementer/reviewer.",
          "Measure wall-clock, agent turns, human interventions, review minutes, defect/rework.",
          "Keep multi-agent orchestration only if it wins on human time or correctness."
        ]
      },
      {
        "name": "3. Safe PR materializer",
        "time": "40 min",
        "value": "Medium",
        "steps": [
          "Agent outputs a branch name, commit message and intended file list in JSON.",
          "A trusted script verifies paths/tests and performs Git/GitHub writes.",
          "Prevent force push, protected-branch writes and arbitrary workflow edits."
        ]
      }
    ],
    "coding_skill": [
      "Task decomposition + review contracts",
      "Practice splitting work along independently testable boundaries and specifying reviewer acceptance criteria before implementation starts."
    ],
    "agent_pattern": [
      "Planner → isolated implementer → evidence-based reviewer",
      "Use at most 2–3 roles; add a role only when it owns a distinct check or context boundary."
    ],
    "devops": [
      "Review budget as a metric",
      "Record `human_review_minutes` alongside CI/eval results. Autonomy must reduce that budget or improve correctness enough to justify it."
    ],
    "homelab": [
      "Automated maintenance PRs",
      "Let the same pattern propose container version bumps or config changes, but keep deploy separate and require smoke/eval evidence."
    ],
    "skip": [
      "10-agent “software company” swarms",
      "Parallelizing tightly coupled refactors",
      "AI review with no tests/contracts",
      "Automerge for risky changes",
      "Treating vendor-reported autonomous throughput as personal productivity"
    ],
    "schedule": [
      [
        "50 min",
        "Read practitioner case studies."
      ],
      [
        "2 h 15",
        "Build repo-maintainer flow."
      ],
      [
        "70 min",
        "Run comparison experiment."
      ],
      [
        "40 min",
        "Safe materializer."
      ],
      [
        "20 min",
        "Decide whether multi-agent earned its complexity."
      ]
    ],
    "stretch": "Add a queue that caps concurrent worktrees and automatically cleans them up after merge/failure.",
    "checkpoint": "You have measured evidence for where multi-agent coding helps you—and a bounded workflow that does not dump unreviewable output into your lap."
  }
]);
