# Roadmaps

Personal, version-controlled learning roadmaps.

## AI × Automation × DevOps

The current interactive roadmap lives at:

- [`ai-automation-devops/index.html`](ai-automation-devops/index.html)

It is maintained as reviewable source rather than a single generated HTML blob:

- `index.html` — UI shell
- `styles.css` — presentation
- `app.js` — interaction logic
- `data/core.js` — sources, current signals, repository model
- `data/months-*.js` — monthly curriculum data
- `reviews/` — monthly refresh notes and rationale

### Monthly refresh policy

The monthly refresh should:

1. Review roughly the prior month using primary sources and strong practitioner evidence.
2. Change roadmap content only when a development materially changes an engineering decision or obsoletes a recommendation.
3. Preserve month-to-month continuity and the limited-time 4–6 hour/month budget.
4. Open a pull request against `main` with the roadmap changes and a `reviews/YYYY-MM.md` note.
5. If the roadmap itself does not need to change, still open the monthly pull request with only the review note explaining why no roadmap change was warranted.

The pull request is the approval boundary; the scheduled refresh must not merge itself.
