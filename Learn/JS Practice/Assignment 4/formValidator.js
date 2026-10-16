// ==========================================
// Task 6 - Form Validator Rebuild
// ==========================================

const fields = [
  { name: "email", value: "a@b.com", valid: true },
  { name: "age", value: 0, valid: true },
  { name: "password", value: "", valid: false },
];

// ==========================================
// Task 1
// Using destructuring in arrow parameters
// ==========================================

const canSubmit = fields.every(({ valid }) => valid);

const hasErrors = fields.some(({ valid }) => !valid);

const firstInvalid = fields.find(({ valid }) => !valid);

console.log("Can Submit:", canSubmit);
console.log("Has Errors:", hasErrors);

if (firstInvalid) {
  const { name, value } = firstInvalid;
  console.log("First Invalid Field:");
  console.log("Name:", name);
  console.log("Value:", value);
}


/*
Expected Output

Can Submit: false
Has Errors: true

First Invalid Field:
Name: password
Value:
*/


// ==========================================
// Task 2
// Naive Truthy Check
// ==========================================

const naiveCheck = fields.every(({ value }) => value);

console.log("Naive Check:", naiveCheck);

/*
Output:

Naive Check: false

Explanation:

The age field has:

value: 0

In JavaScript,

0

is a falsy value.

So this expression

({ value }) => value

returns false for the age field,
even though the field is completely valid.

Falsy values include:

false
0
""
null
undefined
NaN

Therefore, checking raw values using
truthiness is unreliable.

Correct approach:

Use the valid property instead.
*/

const validCheck = fields.every(({ valid }) => valid);

console.log("Correct Validation:", validCheck);


// ==========================================
// Task 3
// One-liner using find() + destructuring
// ==========================================

const { name: firstInvalidFieldName } =
    fields.find(({ valid }) => !valid) || {};

console.log("First Invalid Field Name:", firstInvalidFieldName);

/*
Output:

First Invalid Field Name:
password

If every field is valid,
firstInvalidFieldName becomes undefined.
*/


// ==========================================
// Task 4
// Summary Object
// ==========================================

const summary = {
  canSubmit,

  invalidFieldNames: fields
    .filter(({ valid }) => !valid)
    .map(({ name }) => name)
};

console.log("Summary:");
console.log(summary);

/*
Expected Output

Summary:
{
  canSubmit: false,
  invalidFieldNames: [
    "password"
  ]
}
*/


/*
==================================================
Task 2 Explanation
==================================================

Why does 0 fail the naive check?

The callback:

({ value }) => value

returns the value itself.

Since 0 is falsy,

every()

treats it as false and stops.

The field is actually valid because
its valid property is true.

Always validate using the validation flag,
not whether the value is truthy.


==================================================
Task 3 Explanation
==================================================

This statement:

const { name: firstInvalidFieldName } =
    fields.find(({ valid }) => !valid) || {};

works because:

find()

returns the first invalid object.

Destructuring immediately extracts
its name property.

If no invalid object exists,

find()

returns undefined,

so

|| {}

prevents a destructuring error.


==================================================
Task 4 Explanation
==================================================

filter()

keeps only invalid fields.

map()

extracts only their names.

Both callbacks use destructuring
directly in the parameter list.
*/