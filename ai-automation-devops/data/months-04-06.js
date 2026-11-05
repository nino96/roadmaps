window.ROADMAP_DATA.months.push(...[
  {
    "id": "m04",
    "month": "NOV 2026",
    "title": "Make one useful automation durable",
    "phase": "Reliability",
    "hours": "4.5–6 h",
    "priority": "First real agent service",
    "tracks": [
      "Automation",
      "Agents",
      "DevOps"
    ],
    "objective": "Turn one personal workflow into a recoverable state machine: retries, timeouts, idempotency, durable state and a human checkpoint where needed.",
    "ideas": [
      [
        "Agents are steps inside workflows",
        "Use deterministic code for routing, validation and side effects; reserve the model for classification, extraction or decisions that benefit from ambiguity handling."
      ],
      [
        "Durability changes the design",
        "A crash at step 6 should resume safely, not re-run side effects from step 1."
      ],
      [
        "Idempotency is an agent feature",
        "Tool retries are inevitable; design external writes with request IDs and deduplication."
      ],
      [
        "Human-in-the-loop is a state, not a chat message",
        "Persist an approval request and resume later rather than blocking an agent process."
      ],
      [
        "Cloud session resume is not workflow durability",
        "Resumable coding sandboxes do not replace business-process idempotency, external side-effect tracking, retry state and human approval checkpoints."
      ]
    ],
    "practitioner": [
      [
        "Temporal + agent SDK recipe",
        "The Aug 14 recipe is a concrete demonstration of model/tool calls inside a durable workflow runtime with observability and recovery.",
        "temporal"
      ],
      [
        "LangGraph orchestration model",
        "LangGraph’s useful abstraction is mixing deterministic and agentic nodes with persistence and human checkpoints—not the framework brand itself.",
        "langgraph"
      ]
    ],
    "reading": [
      [
        "Temporal — Durable agent recipe",
        "25 min",
        "Understand activities, durable state and why external calls belong behind replay-safe boundaries.",
        "temporal"
      ],
      [
        "LangGraph overview",
        "15 min",
        "Compare graph/state-machine thinking to a free-running agent loop.",
        "langgraph"
      ],
      [
        "OpenAI Agents SDK overview",
        "12 min skim",
        "Study handoffs, guardrails, sessions and tracing as concepts; API usage is optional.",
        "openai_agents"
      ],
      [
        "GitHub — Connected cloud agent sessions",
        "8 min",
        "Compare session snapshots against durable workflow state; watch shared compute billing.",
        "cloud"
      ]
    ],
    "projects": [
      {
        "name": "1. Durable monthly maintenance workflow",
        "time": "150 min",
        "value": "Highest",
        "steps": [
          "Choose a real task: dependency-update triage, document inbox triage, backup verification, or homelab update report.",
          "Model the workflow explicitly: discover → classify → propose → validate → approval (if write) → execute → verify → report.",
          "Implement with Temporal OSS or LangGraph; choose one only. Prefer Temporal if you want durable timers/retries, LangGraph if stateful agent branching is the main learning goal.",
          "Use your local model backend for programmatic inference where practical; cloud API is optional, not required by the roadmap.",
          "Kill the worker mid-run and prove it resumes without duplicate side effects."
        ]
      },
      {
        "name": "2. Failure-injection test pack",
        "time": "60 min",
        "value": "High",
        "steps": [
          "Simulate model timeout, malformed structured output, tool timeout, duplicate request and unavailable downstream service.",
          "Assert retry policy and final state for each.",
          "Store the scenarios under `evals/failure/` and run them in CI with mocked external calls."
        ]
      },
      {
        "name": "3. Runbook + ADR",
        "time": "35 min",
        "value": "Medium",
        "steps": [
          "Document state store, retry policy, idempotency mechanism, backup path and manual recovery command.",
          "Write why you chose Temporal or LangGraph and what would trigger migration."
        ]
      }
    ],
    "coding_skill": [
      "Stateful orchestration",
      "Practice modeling states and transitions explicitly. Avoid hiding business flow inside one giant prompt or recursive loop."
    ],
    "agent_pattern": [
      "Durable queue + approval checkpoint",
      "A persistent workflow wakes for events/timers, uses the model only where needed, pauses for approval, then resumes exactly once."
    ],
    "devops": [
      "Failure injection",
      "Make crash/retry behavior part of CI. Reliability is demonstrated by forced failure, not inferred from successful demos."
    ],
    "homelab": [
      "Run the workflow engine as a managed Compose service",
      "Pin image digests, persist only required state, add a backup of workflow metadata and a simple health probe."
    ],
    "skip": [
      "24/7 autonomous “life agents”",
      "Multi-agent swarms",
      "Complex long-term memory before state recovery works",
      "API spend just to avoid local setup"
    ],
    "schedule": [
      [
        "50 min",
        "Read durability material."
      ],
      [
        "2.5 h",
        "Implement one durable workflow."
      ],
      [
        "60 min",
        "Failure injection."
      ],
      [
        "35 min",
        "Runbook/ADR."
      ],
      [
        "25 min",
        "Review traces and simplify."
      ]
    ],
    "stretch": "Add a tiny web/CLI inbox showing pending approvals and failed runs.",
    "checkpoint": "A useful automation can survive process death and tool failure, resume safely, and tell you what happened."
  },
  {
    "id": "m05",
    "month": "DEC 2026",
    "title": "Build a personal document & knowledge plane",
    "phase": "Personal leverage",
    "hours": "4.5–5.5 h",
    "priority": "High personal ROI",
    "tracks": [
      "Leverage",
      "Homelab",
      "Search",
      "Automation"
    ],
    "objective": "Create a trustworthy personal document layer where ingestion, metadata, OCR status, search and backup are reproducible. AI adds classification/extraction only after deterministic ingestion works.",
    "ideas": [
      [
        "Ingestion before RAG",
        "Most personal-knowledge value comes from getting documents reliably collected, named, tagged, searchable and backed up."
      ],
      [
        "Structured metadata first",
        "Dates, correspondent, document type, filenames and tags often outperform embeddings for precise retrieval."
      ],
      [
        "Provenance is mandatory",
        "Every AI answer over personal documents should retain source document/page or stable item IDs."
      ],
      [
        "AI should reduce inbox friction",
        "Use models for suggested tags, summaries, entity extraction and query interpretation—not as the only storage/index layer."
      ]
    ],
    "practitioner": [
      [
        "Search systems win by boring reliability",
        "For personal data, the measurable leverage is “find the thing in under a minute” and “zero lost documents,” not chatbot fluency.",
        "paperless"
      ],
      [
        "Eval loop carries over",
        "The retrieval cases from Month 2 become a regression suite before adding semantic search.",
        "quality_flywheel"
      ]
    ],
    "reading": [
      [
        "Paperless-ngx docs — setup + backup",
        "20 min targeted",
        "Understand consume directory, metadata, DB/media volumes and backup requirements.",
        "paperless"
      ],
      [
        "restic docs — snapshots/restore",
        "15 min targeted",
        "Design a real restore path for documents and metadata.",
        "restic"
      ],
      [
        "Immich docs — backup guidance",
        "10 min optional",
        "Only if photo self-hosting is a priority; treat the primary photo library and backup as separate concerns.",
        "immich"
      ]
    ],
    "projects": [
      {
        "name": "1. Paperless-ngx reproducible stack",
        "time": "120 min",
        "value": "Highest",
        "steps": [
          "Add `infra/apps/paperless/compose.yaml`, pinned images, `.env.example`, healthcheck and persistent path map.",
          "Create an `inbox/` consume path and import 20 non-sensitive sample documents first.",
          "Define a small tag/document-type taxonomy; resist building an ontology.",
          "Add `task paperless-backup` and `task paperless-restore-test` using restic/database export as required.",
          "Document how to rebuild on a new host."
        ]
      },
      {
        "name": "2. Document triage agent",
        "time": "75 min",
        "value": "High",
        "steps": [
          "Watch only new/untagged items through API or exported metadata.",
          "Ask a local model to propose document type, tags and a one-line summary with confidence.",
          "Low-confidence suggestions go to a review queue; the agent never deletes originals.",
          "Evaluate on 10 documents and record tag precision before enabling automatic low-risk tags."
        ]
      },
      {
        "name": "3. Retrieval baseline",
        "time": "45 min",
        "value": "Medium",
        "steps": [
          "Create 10 real lookup questions and the expected document IDs.",
          "Implement metadata/full-text search first.",
          "Record recall@k. This becomes the baseline before embeddings in Month 10."
        ]
      }
    ],
    "coding_skill": [
      "Context minimization",
      "Practice retrieving only the few source chunks/metadata fields needed for the decision. Large context windows are not a substitute for selection."
    ],
    "agent_pattern": [
      "Ingest → classify → suggest → human-confirm",
      "AI reduces clerical work while the source of truth remains deterministic and inspectable."
    ],
    "devops": [
      "Backup/restore as a release gate",
      "A service is not “installed” until a scripted restore into a fresh directory/container works."
    ],
    "homelab": [
      "Optional photo lane",
      "If photos matter more than documents, deploy Immich as a separate incremental lane—but do not treat self-hosting as the sole backup of your original library."
    ],
    "skip": [
      "Vector database first",
      "Chat-with-everything UI",
      "Auto-deleting/renaming originals based on model output",
      "Migrating every personal data source at once"
    ],
    "schedule": [
      [
        "35 min",
        "Read Paperless/restic guidance."
      ],
      [
        "2 h",
        "Deploy + ingest sample set."
      ],
      [
        "75 min",
        "Triage agent."
      ],
      [
        "45 min",
        "Retrieval baseline."
      ],
      [
        "25 min",
        "Restore test + notes."
      ]
    ],
    "stretch": "Add a phone-friendly upload path or watched folder that lands in the same deterministic intake pipeline.",
    "checkpoint": "You can ingest a document, find it deterministically, get useful AI metadata suggestions, and restore the system from backup."
  },
  {
    "id": "m06",
    "month": "JAN 2027",
    "title": "Automate a legal personal content library",
    "phase": "Homelab leverage",
    "hours": "4.5–5.5 h",
    "priority": "Useful, maintainable self-hosting",
    "tracks": [
      "Homelab",
      "Automation",
      "DevOps"
    ],
    "objective": "Build an *arr-stack-style architecture around content you legally own or are authorized to acquire: deterministic intake, naming/metadata, library serving, exceptions and backup—not a piracy tutorial.",
    "ideas": [
      [
        "Separate acquisition from library automation",
        "Keep your reproducible project focused on intake/organization/metadata/serving. Do not couple it to questionable content sources."
      ],
      [
        "Event-driven beats polling everywhere",
        "A watched intake directory + explicit queue is easier to reason about than many overlapping scanners."
      ],
      [
        "Agents are exception handlers",
        "Deterministic tools should do renaming, validation and moves; use AI when metadata is ambiguous or an item needs classification."
      ],
      [
        "Media metadata is rebuildable; originals are not",
        "Backup priorities and storage classes should reflect that distinction."
      ]
    ],
    "practitioner": [
      [
        "The *arr lesson is workflow architecture",
        "The useful pattern is declarative desired state, queues, metadata, retries and separation between automation services—not any particular content source.",
        "jellyfin"
      ],
      [
        "Homelab reliability compounds",
        "Reuse the exact healthcheck, secrets, backup and runbook conventions established in Months 1–5.",
        "compose"
      ]
    ],
    "reading": [
      [
        "Jellyfin docs — containers + libraries",
        "20 min targeted",
        "Understand server/library boundaries and permissions.",
        "jellyfin"
      ],
      [
        "Docker Compose docs — profiles/dependencies",
        "12 min",
        "Use profiles to keep optional media services from becoming an all-or-nothing stack.",
        "compose"
      ],
      [
        "restic docs — include/exclude policy",
        "10 min",
        "Design backups around irreplaceable originals vs rebuildable cache/metadata.",
        "restic"
      ]
    ],
    "projects": [
      {
        "name": "1. Content intake pipeline",
        "time": "120 min",
        "value": "Highest",
        "steps": [
          "Create `services/content-ingest/`: `incoming/` → validate file/type/hash → normalize destination path → write manifest → move atomically.",
          "Use deterministic metadata tools where available; the agent only handles ambiguous titles/categories and returns a proposal.",
          "Keep a SHA-256 manifest and source/import timestamp for every item.",
          "Make dry-run and replay idempotent."
        ]
      },
      {
        "name": "2. Jellyfin serving stack",
        "time": "75 min",
        "value": "High",
        "steps": [
          "Deploy Jellyfin with read-only mounts for final media wherever practical.",
          "Keep config/cache separate from originals and document what must be backed up.",
          "Add a health probe and a smoke test that checks one known library item through the API.",
          "Add a `task media-rebuild-index` runbook."
        ]
      },
      {
        "name": "3. Exception queue",
        "time": "40 min",
        "value": "Medium",
        "steps": [
          "When intake confidence is low, move metadata—not the original—to `exceptions/`.",
          "Generate a short review page/JSON with proposed destination and reason.",
          "After approval, run the same deterministic mover used by normal intake."
        ]
      }
    ],
    "coding_skill": [
      "Agent as exception resolver",
      "Practice handing the model a bounded ambiguous case plus candidate choices rather than asking it to control the entire pipeline."
    ],
    "agent_pattern": [
      "Deterministic conveyor belt + exception agent",
      "Normal cases flow without an LLM; ambiguous cases pause, get a proposal, then rejoin the same audited path."
    ],
    "devops": [
      "Data classification + backup policy",
      "Write `docs/data-classes.md`: irreplaceable originals, reproducible metadata, cache, secrets. Backup and restore each class appropriately."
    ],
    "homelab": [
      "*arr-style service boundaries",
      "If you later add Sonarr/Radarr/Bazarr-like tools, keep them isolated behind legal content sources and the same intake/permissions conventions. The roadmap does not require them."
    ],
    "skip": [
      "Automating unauthorized downloads",
      "Backing up transcoding caches",
      "Giving every media container write access to originals",
      "Perfect metadata cleanup"
    ],
    "schedule": [
      [
        "40 min",
        "Read service/backup docs."
      ],
      [
        "2 h",
        "Build intake pipeline."
      ],
      [
        "75 min",
        "Jellyfin stack + smoke test."
      ],
      [
        "40 min",
        "Exception queue."
      ],
      [
        "25 min",
        "Backup/data-class review."
      ]
    ],
    "stretch": "Add automatic subtitle/transcode jobs only for your own content if a real playback need appears.",
    "checkpoint": "A new legal media item can enter one folder and reach a clean, served library through an idempotent, inspectable pipeline."
  }
]);
