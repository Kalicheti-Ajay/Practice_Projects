# Lab 1: Answer Five Business Questions with AI

**Data:** `claims_raw.csv`  
**Method:** Python with pandas  

## Submission format

| Question | Your answer | How you got it (code or prompt) | Confidence |
|---|---|---|---|
| 1 | **154 claims were denied.** | Filtered rows where `claim_status` equals `denied` (case-insensitive), then counted them using `len(denied)`. | High |
| 2 | **Prior authorization absent** was the most common denial reason, with **65 claims**. | Used `denied["denial_reason"].value_counts()` to count denial reasons among denied claims. Other reasons: Missing or invalid information (57), Not medically necessary (21), and Timely filing limit expired (11). | High |
| 3 | **MRI brain with and without contrast** had the highest denial rate: **33.98%**. | Grouped claims by `procedure`, counted denied claims and total claims, then calculated `sum / count × 100`. MRI: 35 ÷ 103 × 100 = 33.98%. | High |
| 4 | **16 claims** with service dates in March 2026 were denied. | Converted `service_date` to datetime and filtered dates from `2026-03-01` (inclusive) to `2026-04-01` (exclusive), with status `denied`. | High |
| 5 | **69.39%** of selected MRI, CT, and colonoscopy claims without prior authorization were denied. | Selected 98 claims with prior authorization marked `N` or `no`; 68 were denied. Calculation: 68 ÷ 98 × 100 = 69.39%. | Medium |

## Python code used


```python
import pandas as pd

# Read the CSV file
df = pd.read_csv("claims_raw.csv")

# Question 1: Count denied claims
denied = df[df["claim_status"].str.lower() == "denied"]
print("Q1. Total denied claims:", len(denied))

# Question 2: Most common denial reason
print("\nQ2. Denial reasons:")
print(denied["denial_reason"].value_counts())

# Question 3: Procedure with highest denial rate
df["is_denied"] = (df["claim_status"].str.lower() == "denied").astype(int)

rates = df.groupby("procedure")["is_denied"].agg(
    ["sum", "count"]
)
rates["denial_rate"] = rates["sum"] / rates["count"] * 100

print("\nQ3. Denial rates:")
print(rates.sort_values("denial_rate", ascending=False))

# Question 4: Denied claims with service dates in March 2026
df["service_date"] = pd.to_datetime(
    df["service_date"], format="mixed", dayfirst=True
)

march = df[
    (df["service_date"] >= "2026-03-01") &
    (df["service_date"] < "2026-04-01") &
    (df["claim_status"].str.lower() == "denied")
]

print("\nQ4. March 2026 denied claims:", len(march))

# Question 5: MRI, CT and colonoscopy without prior authorization
selected = df[
    df["procedure"].str.contains(
        r"MRI|CT|Colonoscopy", case=False, na=False
    ) &
    df["prior_auth"].astype(str).str.strip().str.lower().isin(["n", "no"])
]

denied_selected = (
    selected["claim_status"].str.lower() == "denied"
).sum()

percentage = denied_selected / len(selected) * 100

print("\nQ5. Total selected claims:", len(selected))
print("Denied selected claims:", denied_selected)
print("Denial percentage:", round(percentage, 2), "%")
```

## Business conclusion

The most common denial reason is **prior authorization absent**. The procedure with the highest denial rate is **MRI brain with and without contrast**, at **33.98%**. The results suggest checking authorization requirements before claim submission and reviewing incomplete claim information.

## Confidence note

Confidence ratings are based on the calculations and output supplied. Question 4 uses the screenshot's reported result of **16 denied claims** for March 2026. Run the code against the same `claims_raw.csv` file to reproduce and verify the results.
