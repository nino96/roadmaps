window.ROADMAP_DATA.months.push(...[
  {
    "id": "m10",
    "month": "MAY 2027",
    "title": "Build search that earns trust",
    "phase": "Knowledge systems",
    "hours": "4.5–5.5 h",
    "priority": "Use AI over your own data",
    "tracks": [
      "Search",
      "RAG",
      "Agents",
      "Homelab"
    ],
    "objective": "Unify documents, service inventory, notes and content metadata behind provenance-first search. Add embeddings only where the Month 5 baseline shows a gap.",
    "ideas": [
      [
        "Retrieval is a ranking problem",
        "Measure whether the right source appears, not whether the final answer sounds plausible."
      ],
      [
        "Hybrid beats fashionable by default",
        "Metadata filters + lexical search + embeddings are often more robust than a vector-only pipeline."
      ],
      [
        "Index rebuild must be routine",
        "Treat indexes as derived state. You should be able to delete and recreate them from source systems."
      ],
      [
        "Answers need citations to your own source IDs",
        "The agent can summarize, but it must expose exactly which records/pages/items support the result."
      ]
    ],
    "practitioner": [
      [
        "Eval flywheel applies directly to retrieval",
        "Keep real questions and expected source IDs, rerun whenever chunking/embedding/reranking changes.",
        "quality_flywheel"
      ],
      [
        "Open tooling preserves migration options",
        "pgvector keeps vectors near relational metadata; Qdrant is reasonable when vector/search features justify another service. Choose based on operational cost, not hype.",
        "pgvector"
      ]
    ],
    "reading": [
      [
        "pgvector README/docs",
        "15 min",
        "Understand the simplest “vectors beside metadata” option.",
        "pgvector"
      ],
      [
        "Qdrant docs — concepts",
        "15 min optional",
        "Compare dedicated vector DB operational/features tradeoff; do not deploy by default.",
        "qdrant"
      ],
      [
        "Your Month 5 retrieval baseline",
        "10 min",
        "Identify exact questions where lexical/metadata search failed before adding embeddings.",
        "paperless"
      ]
    ],
    "projects": [
      {
        "name": "1. Federated search API",
        "time": "135 min",
        "value": "Highest",
        "steps": [
          "Define a normalized result shape: `source`, `item_id`, `title`, `snippet`, `timestamp`, `score`, `uri`.",
          "Add adapters for Paperless metadata/full-text, homelab inventory/runbooks and content manifests.",
          "Implement filters and lexical search first.",
          "Add embeddings only for the subset of queries that fails baseline; keep embedding model/revision in `models.lock.yaml`.",
          "Return source IDs with every result."
        ]
      },
      {
        "name": "2. Retrieval eval upgrade",
        "time": "60 min",
        "value": "High",
        "steps": [
          "Expand to 20 questions spanning exact lookup, fuzzy concept, date/person filter and cross-source queries.",
          "Track recall@3/5 and whether the top answer has valid provenance.",
          "Compare lexical vs hybrid; keep hybrid only where it wins materially."
        ]
      },
      {
        "name": "3. Rebuild-from-zero task",
        "time": "45 min",
        "value": "Medium",
        "steps": [
          "Add `task search-reindex` that deletes derived index state and recreates it from sources.",
          "Time it and document prerequisites.",
          "Run it once on a temporary index before trusting backups of derived state."
        ]
      }
    ],
    "coding_skill": [
      "Retrieval/context engineering",
      "Practice explicit query decomposition, source selection, filtering and provenance. The agent should ask the search layer for evidence, not ingest entire libraries."
    ],
    "agent_pattern": [
      "Query planner → federated retriever → grounded synthesizer",
      "Planner chooses sources/filters; retriever returns evidence; synthesizer cannot invent a source outside returned IDs."
    ],
    "devops": [
      "Derived-state discipline",
      "Indexes, embeddings and caches must be reproducible from source data. Back up configs/source data; test index rebuilds."
    ],
    "homelab": [
      "Personal search service",
      "Expose it privately as a read-only API that future agents can use instead of each service getting a custom RAG pipeline."
    ],
    "skip": [
      "GraphRAG before a measured need",
      "Embedding every byte you own",
      "Vector-only retrieval",
      "Chat UI work before retrieval scores improve"
    ],
    "schedule": [
      [
        "35 min",
        "Compare vector options + baseline gaps."
      ],
      [
        "2 h 15",
        "Build federated search."
      ],
      [
        "60 min",
        "Retrieval eval."
      ],
      [
        "45 min",
        "Reindex task."
      ],
      [
        "25 min",
        "Choose lexical/hybrid per query class."
      ]
    ],
    "stretch": "Add a lightweight reranker only if evals show it improves recall/precision enough to justify latency.",
    "checkpoint": "Your agent can answer personal questions with source IDs, and you can delete/rebuild the entire search index without losing source data."
  },
  {
    "id": "m11",
    "month": "JUN 2027",
    "title": "Make the homelab rebuildable",
    "phase": "Infrastructure",
    "hours": "4.5–6 h",
    "priority": "DevOps payoff",
    "tracks": [
      "DevOps",
      "Homelab",
      "GitOps",
      "Automation"
    ],
    "objective": "Prove the environment can be reconstructed from Git + secrets backup + data backups. Use Ansible/Compose as the baseline; adopt K3s/Flux only where orchestration has earned the complexity.",
    "ideas": [
      [
        "Rebuildability is stronger than documentation",
        "A runbook can lie. A fresh-host rebuild exposes missing packages, implicit state and forgotten secrets."
      ],
      [
        "Compose is not a failure",
        "For a small number of single-host stateful services, Compose plus Ansible may be the most maintainable answer."
      ],
      [
        "Kubernetes should solve a problem",
        "Use K3s/Flux if you need declarative reconciliation, multi-host scheduling or GitOps practice that you actually value—not because AI makes YAML easy."
      ],
      [
        "Backups need independent restore evidence",
        "Configuration rebuild and data restore are separate drills; both must pass."
      ],
      [
        "Agent workflows belong in GitOps review",
        "Keep agentic Markdown sources and generated Actions YAML versioned together; CI validates compilation and policy. Do not let agents silently update production workflows."
      ]
    ],
    "practitioner": [
      [
        "Agent-friendly repos reward deterministic bootstrap",
        "The same harness principle used for coding agents applies to infrastructure: make the desired environment legible and executable.",
        "harness"
      ],
      [
        "Open-source infra keeps migration cheap",
        "Ansible + Compose are sufficient for the core; K3s + Flux are optional, version-controlled layers rather than a forced migration.",
        "ansible"
      ]
    ],
    "reading": [
      [
        "Ansible docs — inventories/playbooks",
        "20 min targeted",
        "Model host baseline and service prerequisites declaratively.",
        "ansible"
      ],
      [
        "Docker Compose docs — production notes",
        "12 min",
        "Harden the single-host baseline before replacing it.",
        "compose"
      ],
      [
        "K3s + Flux overview",
        "20 min optional",
        "Decide from explicit criteria whether GitOps adds value for you.",
        "k3s"
      ]
    ],
    "projects": [
      {
        "name": "1. Fresh-host rebuild playbook",
        "time": "150 min",
        "value": "Highest",
        "steps": [
          "Create `infra/inventory/` and Ansible roles for base packages, users/groups, directories, container runtime and service deployment prerequisites.",
          "Do not store mutable app data in the playbook; mount restored data paths explicitly.",
          "Run against a VM or disposable host first.",
          "Target: `ansible-playbook` + `task up` reaches healthy services with no hand edits.",
          "Capture every manual fix as a playbook change, then rebuild again."
        ]
      },
      {
        "name": "2. Restore drill",
        "time": "70 min",
        "value": "High",
        "steps": [
          "Restore one service’s data (Paperless is a good candidate) into fresh paths.",
          "Bring it up from Git-defined config and validate through the same smoke tests.",
          "Record RTO (hands-on and wall clock) and missing dependencies."
        ]
      },
      {
        "name": "3. Compose vs K3s/Flux decision experiment",
        "time": "45 min",
        "value": "Medium",
        "steps": [
          "Choose one stateless/low-risk service and deploy it with K3s + Flux in a disposable environment.",
          "Compare config size, secrets flow, upgrades, rollback and recovery to Compose.",
          "Keep K3s only if the learning/operational benefit is worth maintaining two layers; otherwise document “not yet.”"
        ]
      }
    ],
    "coding_skill": [
      "Infrastructure changes through agents",
      "Let coding agents author playbook/manifest changes, but require `--check`/lint/diff, smoke tests and path-scoped review before apply."
    ],
    "agent_pattern": [
      "Drift detector → proposal → tested remediation",
      "Agent may diagnose drift and generate a change; deterministic tooling verifies and a human approves infrastructure mutation."
    ],
    "devops": [
      "Disaster-recovery exercise",
      "Make restore time and missing-step count visible. The definition of done is a working rebuilt service, not “backups succeeded.”"
    ],
    "homelab": [
      "Optional GitOps lane",
      "If K3s/Flux earns its keep, migrate only stateless or easy-to-restore services first. Keep stateful workloads where operations are simplest."
    ],
    "skip": [
      "Big-bang Kubernetes migration",
      "Terraform for local resources that Ansible/Compose already model well",
      "HA for services whose downtime costs you nothing",
      "Backups never restored"
    ],
    "schedule": [
      [
        "45 min",
        "Read/decision criteria."
      ],
      [
        "2.5 h",
        "Fresh-host Ansible rebuild."
      ],
      [
        "70 min",
        "Restore drill."
      ],
      [
        "45 min",
        "Optional K3s/Flux experiment."
      ],
      [
        "20 min",
        "Record RTO and decision."
      ]
    ],
    "stretch": "Have an agent compare actual host state to inventory and open a remediation PR without applying it.",
    "checkpoint": "A disposable host can become your working homelab from Git plus restored secrets/data, with documented evidence of the restore."
  },
  {
    "id": "m12",
    "month": "JUL 2027",
    "title": "Capstone: Personal Ops Platform v1.0",
    "phase": "Integration",
    "hours": "5–6 h",
    "priority": "Ship, measure, simplify",
    "tracks": [
      "Leverage",
      "Agents",
      "Automation",
      "DevOps",
      "Homelab"
    ],
    "objective": "Integrate only the pieces that earned their keep into three recurring workflows, run a failure day, measure human time saved and release a reproducible v1.0.",
    "ideas": [
      [
        "Leverage is time returned",
        "The capstone metric is recurring minutes saved or failure risk reduced—not number of agents/services."
      ],
      [
        "Delete low-value automation",
        "Every maintained service/agent has carrying cost. If it saves little and breaks often, remove it."
      ],
      [
        "Bounded autonomy scales trust",
        "Read/search/triage can be highly automated; consequential writes stay behind the Month 3 action broker and approval policy."
      ],
      [
        "The platform is the repo + contracts",
        "Models and UIs will change. Your durable asset is the versioned data flows, evals, capabilities, infrastructure and runbooks."
      ]
    ],
    "practitioner": [
      [
        "Spotify’s review constraint",
        "Throughput only matters if human attention does not become the new bottleneck; measure intervention/review time.",
        "spotify"
      ],
      [
        "OpenAI’s harness lesson",
        "The compounding payoff comes from agent-legible infrastructure and tools, not allegiance to one model.",
        "harness"
      ],
      [
        "Zero-trust + durable workflow convergence",
        "Combine deterministic capability boundaries with persistent workflows rather than granting a free-running agent broad authority.",
        "zero_trust"
      ]
    ],
    "reading": [
      [
        "Your 11 monthly ADRs/checkpoints",
        "30 min",
        "Identify what repeatedly saved time, what broke, and what you stopped using.",
        "harness"
      ],
      [
        "Spotify case study — revisit metrics",
        "10 min",
        "Use review/intervention time as a capstone metric.",
        "spotify"
      ],
      [
        "Google zero-trust — revisit boundaries",
        "10 min",
        "Audit whether your real deployment still matches the intended permissions model.",
        "zero_trust"
      ]
    ],
    "projects": [
      {
        "name": "1. Ship three recurring workflows",
        "time": "150 min",
        "value": "Highest",
        "steps": [
          "Choose exactly three from: document triage/search, homelab health/update report, repo maintenance, content intake, backup verification, personal research capture.",
          "Give each an owner file: trigger, inputs, model/tool policy, side effects, approval rule, eval suite, SLO, backup/recovery and disable command.",
          "Run them for one full simulated cycle and measure manual minutes.",
          "Create a single `task ops-status` summary showing health, last success and pending approvals."
        ]
      },
      {
        "name": "2. Failure day",
        "time": "75 min",
        "value": "High",
        "steps": [
          "Stop the local model, corrupt an index copy, kill a workflow worker, revoke a tool credential and restore one service from backup.",
          "Confirm failures are visible, workflows fail closed, retries do not duplicate writes and recovery instructions work.",
          "Open issues for every undocumented manual action."
        ]
      },
      {
        "name": "3. v1.0 release + deletion pass",
        "time": "60 min",
        "value": "High",
        "steps": [
          "Archive/remove agents/services that did not save time or improve reliability.",
          "Generate an architecture diagram from versioned source (Mermaid/PlantUML) and a `REBUILD.md` from real commands.",
          "Tag `v1.0.0`; export an eval summary and restore evidence.",
          "Write next-year backlog with only 3 candidates ranked by expected leverage."
        ]
      }
    ],
    "coding_skill": [
      "System-level agent design",
      "Practice deciding where AI should not be used. Compose deterministic code, model steps, policy, evals and operations into one inspectable system."
    ],
    "agent_pattern": [
      "Personal ops coordinator with bounded tools",
      "One thin coordinator can query status/search and trigger approved workflows; it should not become a universal shell with all credentials."
    ],
    "devops": [
      "Release engineering for your personal platform",
      "Version config, generate release notes/eval report, verify backup/restore and tag a known-good state."
    ],
    "homelab": [
      "Operate, don’t collect",
      "End the year with fewer, better-understood services. Every surviving service has a restore path and a reason to exist."
    ],
    "skip": [
      "New frameworks during capstone",
      "Feature creep",
      "Rewriting working services",
      "Autonomy as a goal in itself"
    ],
    "schedule": [
      [
        "50 min",
        "Review year metrics/ADRs."
      ],
      [
        "2.5 h",
        "Integrate three workflows."
      ],
      [
        "75 min",
        "Failure day."
      ],
      [
        "60 min",
        "Delete/clean/release."
      ],
      [
        "25 min",
        "Rank next-year bets."
      ]
    ],
    "stretch": "Create a monthly autogenerated “personal ops report” with minutes saved, failures, eval trend, backup age and maintenance debt.",
    "checkpoint": "You have a v1.0 platform that saves measurable time, fails visibly, can be rebuilt, and is not tied to one model vendor."
  }
]);
