window.ROADMAP_DATA.months.push(...[
  {
    "id": "m01",
    "month": "AUG 2026",
    "title": "Build the agent-ready foundation",
    "phase": "Foundation",
    "hours": "4.5–5.5 h",
    "priority": "Do this first",
    "tracks": [
      "Leverage",
      "Agentic coding",
      "DevOps",
      "Local AI"
    ],
    "objective": "Create one boring, reproducible repository that every later experiment extends. The goal is not a chatbot; it is a harness that makes coding agents legible, testable and cheap to rerun.",
    "ideas": [
      [
        "Harness > prompt",
        "Agent performance is increasingly determined by repository structure, commands, tests, observability and explicit instructions. Treat agent-facing ergonomics as part of software architecture."
      ],
      [
        "Worktree-safe execution",
        "Parallel agents are useful only if each task can boot, test and tear down in isolation. Make per-worktree ports/state a default."
      ],
      [
        "Portable skill packaging",
        "Keep reusable runbooks and tool schemas in a vendor-thin `skills/` or plugin layer. Claude/Codex/Copilot-specific files should be adapters, not the source of truth."
      ],
      [
        "Local inference as a service",
        "Prove one pinned local model endpoint on the GX10 now, but do not spend the month chasing model leaderboards."
      ]
    ],
    "practitioner": [
      [
        "OpenAI harness engineering",
        "A small team reports scaling agent-written work by investing in repo tooling, isolated worktrees and agent-readable logs/metrics rather than repeatedly re-prompting failures.",
        "harness"
      ],
      [
        "Anthropic usage study",
        "Claude Code usage data shows the human role shifting toward deciding what to do, verification and task decomposition—useful evidence for practicing planning/review, not typing speed.",
        "claude_practice"
      ]
    ],
    "reading": [
      [
        "OpenAI — Harness engineering",
        "25 min",
        "Look for the missing-capability mindset: when the agent fails, improve the environment or contract.",
        "harness"
      ],
      [
        "GitHub — July Copilot agent releases",
        "12 min",
        "Understand worktree isolation, subagent visibility and parallel-agent ergonomics.",
        "copilot_july"
      ],
      [
        "GitHub — Agent Plugins 1.0",
        "10 min",
        "See how to package skills and MCP config as portable artifacts.",
        "plugins"
      ],
      [
        "NVIDIA — DGX Spark playbooks",
        "15 min skim",
        "Choose one supported serving path to adapt to the GX10; ignore the rest for now.",
        "dgx"
      ]
    ],
    "projects": [
      {
        "name": "1. Create `ai-leverage-lab`",
        "time": "90 min",
        "value": "Highest",
        "steps": [
          "Create repo structure: `docs/`, `skills/`, `evals/`, `services/`, `infra/`, `scripts/`.",
          "Add `README.md`, `AGENTS.md` as a thin index, `Taskfile.yml`, `.env.example`, `.tool-versions` or pinned runtime files.",
          "Make canonical commands: `task bootstrap`, `task test`, `task lint`, `task doctor`, `task clean`.",
          "Add one GitHub Actions workflow that runs the same `task ci` command locally and in CI.",
          "Write `docs/definition-of-done.md`: tests pass, no secret changes, diff reviewed, runbook updated when behavior changes."
        ]
      },
      {
        "name": "2. Three-agent worktree bake-off",
        "time": "90 min",
        "value": "High",
        "steps": [
          "Choose one small repo task (e.g. add a CLI health command + tests).",
          "Create 3 worktrees from the same commit; give the same task to Claude Code, Codex and Copilot agent.",
          "Require each to use only repo commands and produce a short `RESULT.md` with assumptions/tests.",
          "Score on correctness, unnecessary changes, test quality, review time and intervention count—not prose quality.",
          "Keep the best implementation; commit the scorecard under `evals/bakeoffs/`."
        ]
      },
      {
        "name": "3. GX10 local endpoint smoke path",
        "time": "60 min",
        "value": "Medium",
        "steps": [
          "Pick one modest instruct model from an official/supported serving path; pin model identifier, container image and launch args.",
          "Expose it only on your private network/localhost through one stable OpenAI-compatible or Ollama-style endpoint.",
          "Add `scripts/local-ai-smoke.py` with three checks: plain completion, structured JSON, and tool-call-shaped output if supported.",
          "Store measured latency and pass/fail in `docs/local-ai-baseline.md`; do not optimize yet."
        ]
      }
    ],
    "coding_skill": [
      "Repo-level context engineering",
      "Practice writing constraints that are executable: canonical commands, file ownership, test paths, change boundaries and explicit completion criteria. Avoid long “personality” instruction files."
    ],
    "agent_pattern": [
      "Artifact-first assistant",
      "Input → plan → tool/code changes → deterministic verification → compact result artifact. The result should be reconstructable from Git history without chat transcripts."
    ],
    "devops": [
      "Single-command reproducibility",
      "The same `task ci` and `task doctor` must work for you and an agent. Pin runtimes/dependencies; make teardown idempotent."
    ],
    "homelab": [
      "Baseline service convention",
      "Every self-hosted service added later gets a Compose file, `.env.example`, healthcheck, named persistent volumes/paths, backup note and restore note. Do not deploy a full platform yet."
    ],
    "skip": [
      "Installing five agent frameworks",
      "Prompt-engineering courses",
      "Local-model leaderboard chasing",
      "Kubernetes this month"
    ],
    "schedule": [
      [
        "45 min",
        "Read the harness + recent agent changes."
      ],
      [
        "90 min",
        "Build repo + CI."
      ],
      [
        "90 min",
        "Run the three-agent worktree bake-off."
      ],
      [
        "60 min",
        "Stand up/pin one local endpoint."
      ],
      [
        "30 min",
        "Write scorecard + next-month backlog."
      ]
    ],
    "stretch": "Add a devcontainer or Nix/Devbox only if it removes a real environment inconsistency; otherwise keep the stack simpler.",
    "checkpoint": "You can clone the repo onto a clean machine, run one bootstrap command, execute CI locally, and hand a coding task to any of your three agents without explaining the repo from scratch."
  },
  {
    "id": "m02",
    "month": "SEP 2026",
    "title": "Make evals the change-control system",
    "phase": "Quality",
    "hours": "4.5–5.5 h",
    "priority": "Compounds everything",
    "tracks": [
      "Agents",
      "Agentic coding",
      "DevOps"
    ],
    "objective": "Stop judging agent changes by vibe. Build a small eval corpus drawn from tasks you actually care about and make it the gate for model/prompt/tool changes.",
    "ideas": [
      [
        "Your eval set is a product asset",
        "Ten representative, well-checked cases are more useful than a generic leaderboard for deciding whether an agent change helps you."
      ],
      [
        "Separate deterministic and model-graded checks",
        "Schema, exact fields, command exit status and retrieval provenance should be code-graded. Use model judges only for irreducibly qualitative criteria."
      ],
      [
        "Record traces + interventions",
        "A correct answer that needed six rescues may be worse than a slightly slower zero-intervention run."
      ],
      [
        "Audit the evaluator",
        "Keep human labels on a small subset and periodically check false positives/negatives from any LLM judge."
      ],
      [
        "Feedback is a proposal, not an eval",
        "Use corrected labels, rejected reviews and reverted PRs as candidate failure cases. Keep human-verified regression fixtures and require approval before any prompt/tool policy update."
      ]
    ],
    "practitioner": [
      [
        "OpenAI benchmark audit",
        "Recent work on coding evaluations shows how ambiguity and environment errors can overwhelm the signal. Personal evals should be smaller, cleaner and closer to your real tasks.",
        "eval_noise"
      ],
      [
        "Google quality flywheel",
        "Google describes a loop of traces/cases → inference → grading → new data. The useful pattern is the loop, not the vendor platform.",
        "quality_flywheel"
      ]
    ],
    "reading": [
      [
        "OpenAI — Separating signal from noise",
        "20 min",
        "Learn what makes an apparently objective coding benchmark misleading.",
        "eval_noise"
      ],
      [
        "Google — Agent Quality Flywheel",
        "15 min",
        "Translate the prepare → run → grade loop into a tiny local eval harness.",
        "quality_flywheel"
      ],
      [
        "Langfuse — Evaluation overview",
        "10 min skim",
        "See common eval primitives; you do not need to deploy Langfuse yet.",
        "langfuse"
      ],
      [
        "GitHub — Automations learn from outcomes",
        "7 min",
        "Translate user corrections into candidate eval cases, not silent self-modification.",
        "auto_feedback"
      ]
    ],
    "projects": [
      {
        "name": "1. Build a 12-case regression suite",
        "time": "120 min",
        "value": "Highest",
        "steps": [
          "Create 4 coding cases, 4 tool/automation cases, 2 retrieval cases and 2 refusal/permission cases.",
          "Store fixtures in Git; define expected assertions in YAML/JSON, not prose only.",
          "Add a runner that emits JSONL with case ID, backend, latency, tool calls, pass/fail and intervention count.",
          "Manually label the initial run and keep it as `evals/baseline/2026-09.jsonl`.",
          "Make `task eval` summarize pass rate and changed cases.",
          "Add two seeded reviewer defects and two outcome-feedback cases; protect fixtures/test oracle from the implementation agent."
        ]
      },
      {
        "name": "2. Add an eval gate to changes",
        "time": "75 min",
        "value": "High",
        "steps": [
          "Pick one agent instruction or tool change from Month 1.",
          "Run baseline and candidate at least twice where nondeterminism matters.",
          "Fail CI only on deterministic regressions at first; report model-graded differences without blocking.",
          "Write a 1-page ADR for what metrics are trusted enough to gate."
        ]
      },
      {
        "name": "3. Homelab smoke tests",
        "time": "45 min",
        "value": "Medium",
        "steps": [
          "Create health probes for your local AI endpoint and any service you added.",
          "Test from outside the container as a client would.",
          "Emit machine-readable output so later monitoring can reuse the same probes."
        ]
      }
    ],
    "coding_skill": [
      "Evaluation-driven agent iteration",
      "Before changing an instruction/tool, write or select the case that would prove the change is better. Practice reverting changes that improve demos but regress the suite."
    ],
    "agent_pattern": [
      "Generator + critic with hard assertions",
      "A generator proposes; deterministic validators run; a critic only handles the remaining qualitative check. Do not let the critic override hard failures."
    ],
    "devops": [
      "CI as evidence, not ceremony",
      "CI should produce an eval artifact you can compare over time. Cache dependencies, pin evaluator versions and keep fixtures immutable."
    ],
    "homelab": [
      "Backup the repo + eval corpus",
      "Add restic or your existing backup mechanism for the repository, agent configs and small metadata stores. Perform one restore into a temp directory."
    ],
    "skip": [
      "Huge benchmark suites",
      "LLM-as-judge everywhere",
      "Optimizing token cost before you can measure quality",
      "Fine-tuning"
    ],
    "schedule": [
      [
        "35 min",
        "Read eval sources."
      ],
      [
        "2 h",
        "Build 12-case suite + runner."
      ],
      [
        "75 min",
        "Gate one real change."
      ],
      [
        "45 min",
        "Add smoke tests/backup."
      ],
      [
        "25 min",
        "Review failures and prune bad cases."
      ]
    ],
    "stretch": "Add a simple HTML/Markdown eval trend report generated by CI.",
    "checkpoint": "You can answer “did this agent/tool/model change improve my system?” with a checked artifact, not memory."
  },
  {
    "id": "m03",
    "month": "OCT 2026",
    "title": "Design tools as capabilities, not conveniences",
    "phase": "Safety",
    "hours": "4.5–5.5 h",
    "priority": "Required before autonomy",
    "tracks": [
      "Agents",
      "Automation",
      "Security",
      "DevOps"
    ],
    "objective": "Build the trust boundary around agents: narrow capabilities, validated inputs, deterministic writes and human approval for irreversible actions.",
    "ideas": [
      [
        "Prompts are not authorization",
        "The model should not decide whether it is allowed to write/delete/send. Code and credentials decide."
      ],
      [
        "Intent is data",
        "Have the model emit a typed intent; a trusted component validates and materializes it."
      ],
      [
        "Least privilege beats clever detection",
        "A read-only filesystem tool is safer than a powerful shell tool plus a prompt saying “don’t delete”."
      ],
      [
        "MCP is an interface, not a trust stamp",
        "Treat every MCP server/tool description as untrusted until you review capability and auth paths."
      ],
      [
        "Sandbox and capability policy must fail closed",
        "Test blocked network egress, forbidden filesystem reads, decoy credentials and denied tool invocation; prompts are not security boundaries."
      ]
    ],
    "practitioner": [
      [
        "Google zero-trust design",
        "The most useful recent security pattern is to put deterministic gateways and sandbox boundaries around model actions.",
        "zero_trust"
      ],
      [
        "GitHub safe-output workflow",
        "GitHub’s agentic workflow architecture separates model-produced intent from the trusted action handler, which is exactly the pattern to reproduce personally.",
        "agentic_docs"
      ]
    ],
    "reading": [
      [
        "Google — Zero-trust AI agents",
        "22 min",
        "Extract a threat model for your own action gateway.",
        "zero_trust"
      ],
      [
        "MCP — Security Best Practices",
        "20 min targeted read",
        "Read consent, confused-deputy and tool-safety sections; skip protocol minutiae.",
        "mcp_security"
      ],
      [
        "MCP — July 2026 specification",
        "12 min skim",
        "Understand host/client/server and tools/resources/tasks at the architecture level.",
        "mcp"
      ]
    ],
    "projects": [
      {
        "name": "1. Build a tiny action broker",
        "time": "120 min",
        "value": "Highest",
        "steps": [
          "Create `services/action-broker/` with typed intents such as `create_note`, `move_file`, `open_issue`; start with no destructive action.",
          "Validate paths, size limits, allowed roots and field schemas deterministically.",
          "Give the model only an `emit_intent` tool; the broker owns credentials and execution.",
          "Add `--dry-run` and an approval token for any write.",
          "Add 6 abuse tests: path traversal, shell injection text, oversized payload, unknown action, stale approval, duplicated request.",
          "Add one impossible-task test: the correct agent response is to stop or request authorization, never silently broaden permissions."
        ]
      },
      {
        "name": "2. Wrap one capability as MCP",
        "time": "75 min",
        "value": "High",
        "steps": [
          "Expose one read-only capability first, such as homelab service status or document metadata search.",
          "Write a tiny capability manifest: data touched, credentials, network destinations, side effects, timeout.",
          "Run it from one supported client; keep the underlying function callable without MCP so you can migrate later.",
          "Add an eval case that verifies it cannot reach outside the allowed scope."
        ]
      },
      {
        "name": "3. Secrets baseline with SOPS + age",
        "time": "45 min",
        "value": "Medium",
        "steps": [
          "Create `.sops.yaml`; encrypt one non-production secret file.",
          "Keep age private key outside Git; document backup/recovery location without storing the key in the repo.",
          "Make `task secrets-check` fail if plaintext secret patterns are staged."
        ]
      }
    ],
    "coding_skill": [
      "Tool contract design",
      "Practice small typed schemas, explicit side effects, idempotency keys, timeouts and deterministic errors. An agent should never need to “guess” how a tool behaves."
    ],
    "agent_pattern": [
      "Intent → validate → approve → execute → audit",
      "Use this as the default for anything that writes, sends, deletes, pays, deploys or changes infrastructure."
    ],
    "devops": [
      "Secrets + permissions as code",
      "Version policy and encrypted configuration; keep runtime credentials short-lived/scoped where possible. CI tests permission boundaries."
    ],
    "homelab": [
      "Homelab ops read API",
      "Expose health/status/log-tail as read-only capabilities before allowing any restart/update tool. This becomes the base for later home automation."
    ],
    "skip": [
      "Random public MCP servers",
      "Browser agents with broad authenticated sessions",
      "Giving agents Docker socket/root by default",
      "Prompt-only safety"
    ],
    "schedule": [
      [
        "55 min",
        "Security/MCP reading."
      ],
      [
        "2 h",
        "Action broker."
      ],
      [
        "75 min",
        "One MCP wrapper."
      ],
      [
        "45 min",
        "SOPS baseline."
      ],
      [
        "20 min",
        "Threat-model review."
      ]
    ],
    "stretch": "Run the action broker in a rootless container with a read-only filesystem and explicit bind mounts.",
    "checkpoint": "You can explain exactly what an agent can touch, and a malicious prompt cannot expand that capability without a code/config change."
  }
]);
