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