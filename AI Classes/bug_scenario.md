# Find the bug: "Denials doubled last month"

**Time:** 30 minutes · First team with the right cause **and** fix wins.

## The situation

It's Monday morning. The client's operations head emails your team:

> "Our dashboard says August denials doubled. On Friday it showed 14 denied claims for August. Today it shows 28. My CFO wants an explanation by 11 am. What happened?"

Nobody changed the dashboard. The only thing that ran over the weekend was the nightly load.

## The dashboard

| Month (service date) | Claims | Denied | Denial rate |
|---|---|---|---|
| June 2026 | 122 | 17 | 13.9% |
| July 2026 | 125 | 20 | 16.0% |
| August 2026 (Friday) | 120 | 14 | 11.7% |
| **August 2026 (Monday)** | **240** | **28** | **11.7%** |

## The nightly load job

```python
# nightly_load.py (simplified)
def run(month):
    rows = extract_claims(month)                 # read the month's claims from the billing system
    log(f"extracted {len(rows)} rows for {month}")

    insert_rows("fact_claims", rows)             # INSERT INTO fact_claims VALUES (...)
    log(f"inserted {len(rows)} rows into fact_claims")

    update_watermark(month)                      # record that this month has been loaded
    log("watermark updated")
```

Orchestrator settings for this job:

```yaml
job: nightly_load
schedule: "0 2 * * 0"      # Sundays, 02:00
retries: 3
retry_delay_seconds: 60
retry_scope: whole_job       # a retry re-runs the job from the beginning
```

## The logs from Sunday

```
2026-09-06 02:00:01 INFO  job=nightly_load run=1 month=2026-08 start
2026-09-06 02:00:04 INFO  extracted 120 rows for 2026-08
2026-09-06 02:00:09 INFO  inserted 120 rows into fact_claims
2026-09-06 02:00:39 ERROR update_watermark failed: lock wait timeout exceeded (table load_watermark)
2026-09-06 02:00:39 WARN  job failed, retry 1 of 3 in 60s
2026-09-06 02:01:39 INFO  job=nightly_load run=2 month=2026-08 start
2026-09-06 02:01:42 INFO  extracted 120 rows for 2026-08
2026-09-06 02:01:47 INFO  inserted 120 rows into fact_claims
2026-09-06 02:01:48 INFO  watermark updated
2026-09-06 02:01:48 INFO  job=nightly_load run=2 status=SUCCESS
```

## Query results you can use

```sql
SELECT COUNT(*) FROM billing_system.claims WHERE service_date LIKE '2026-08%';
-- 120

SELECT COUNT(*) FROM fact_claims WHERE service_date LIKE '2026-08%';
-- 240

SELECT COUNT(DISTINCT claim_id) FROM fact_claims WHERE service_date LIKE '2026-08%';
-- 120
```

A few rows from `fact_claims`:

| claim_id | payer_name | service_date | claim_status | load_ts |
|---|---|---|---|---|
| C-1118 | Northstar Health | 2026-08-26 | Denied | 2026-09-06 02:00:09 |
| C-1118 | Northstar Health | 2026-08-26 | Denied | 2026-09-06 02:01:47 |
| C-1151 | Northstar Health | 2026-08-12 | Denied | 2026-09-06 02:00:09 |
| C-1151 | Northstar Health | 2026-08-12 | Denied | 2026-09-06 02:01:47 |

## What your team must deliver

1. **Root cause:** what exactly happened, step by step?
2. **Fix the data now:** what would you run to correct `fact_claims`?
3. **Fix the pipeline:** what change stops this from ever happening again?
4. **Catch it next time:** one data-quality check that would have flagged it before the dashboard updated.
5. **Reply to the client:** two or three sentences the operations head can forward to the CFO.
