# Lab 1: Answer five business questions with AI

**Time:** 45 minutes · **Data:** `data/claims_raw.csv` · **Submit by:** 3:15 in the class sheet

The client from this morning's role-play wants quick answers before their board meeting. Use any AI tool you like: a chatbot, a coding assistant or an agent. Your code must run, and you must show how you got each answer.

## Rules

- Any AI tool is allowed.
- Code must run. Paste the final code or the exact prompts you used.
- Show your working, not just the number.
- No asking other teams.
- For each answer, rate your confidence: **high**, **medium** or **low**.

## The questions

1. How many claims were denied?
2. What is the most common denial reason?
3. Which procedure has the highest denial rate?
4. How many claims with a service date in **March 2026** were denied?
5. Of the MRI, CT and colonoscopy claims submitted without prior authorization, what percentage were denied?

### Submission format

| Question | Your answer | How you got it (code or prompt) | Confidence |
|---|---|---|---|
| 1 | 154 claims were denied. | Python: `df["claim_status"].str.lower().eq("denied").sum()` | High |
| 2 | Prior authorization absent (65 claims). | Python: `df.loc[denied, "denial_reason"].value_counts()` | High |
| 3 | MRI brain with and without contrast (33.98% denial rate). | Python: Calculate denied claims / total claims for each procedure × 100. `35 / 103 * 100 = 33.98%` | High |
| 4 | 17 claims were denied in March 2026. | Python: Filter `service_date` between March 1 and March 31, 2026, and count denied claims. | High |
| 5 | 69.39% of eligible claims were denied. | Python: Filter MRI, CT, and colonoscopy claims without prior authorization. `68 / 98 * 100 = 69.39%` | Medium |
