
import pandas as pd

# Load the dataset
df = pd.read_csv("claims_raw.csv")

# Clean text fields
for col in ["claim_status", "denial_reason", "procedure", "prior_auth"]:
    df[col] = df[col].astype("string").str.strip()

# Normalize claim status
status = df["claim_status"].str.lower()
denied = status.eq("denied")

# Q1: Total denied claims
q1 = int(denied.sum())


# Q2: Most common denial reason
reasons = df.loc[denied, "denial_reason"].value_counts()
q2_reason = reasons.index[0]
q2_count = int(reasons.iloc[0])

# Q3: Procedure with the highest denial rate
procedure_stats = df.groupby("procedure").agg(
    total_claims=("claim_id", "size"),
    denied_claims=("claim_status",
                   lambda s: s.str.lower().eq("denied").sum())
)
procedure_stats["denial_rate"] = (
    procedure_stats["denied_claims"]
    / procedure_stats["total_claims"] * 100
)
q3 = procedure_stats.sort_values(
    "denial_rate", ascending=False
).iloc[0]

# Q4: Claims denied for March 2026 service dates
# Handles ISO dates and slash-separated dates
dates = pd.to_datetime(
    df["service_date"], format="mixed",
    dayfirst=True, errors="coerce"
)
march = dates.between("2026-03-01", "2026-03-31")
q4 = int((march & denied).sum())

# Q5: MRI, CT and colonoscopy without prior authorization
target = df["procedure"].str.contains(
    r"MRI|CT|Colonoscopy", case=False, na=False
)
no_auth = df["prior_auth"].str.lower().isin(["n", "no"])

eligible = target & no_auth
total_eligible = int(eligible.sum())
denied_eligible = int((eligible & denied).sum())
q5 = denied_eligible / total_eligible * 100

# Display answers and calculations
print("Q1. Total denied claims:", q1)

print("\nQ2. Most common denial reason:", q2_reason)
print("Number of claims:", q2_count)
print("\nAll denial reasons:")
print(reasons.to_string())

print("\nQ3. Highest denial-rate procedure:",q3.name)
print("Denied:", int(q3["denied_claims"]))
print("Total:", int(q3["total_claims"]))
print(f"Denial rate: {q3['denial_rate']:.2f}%")

print("\nQ4. March 2026 denied claims:", q4)

print("\nQ5. Eligible claims:", total_eligible)
print("Denied eligible claims:", denied_eligible)
print(f"Denial percentage: {q5:.2f}%")
