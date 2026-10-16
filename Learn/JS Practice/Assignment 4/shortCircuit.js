// ==========================================
// Task 4 - Short-Circuit Surprise
// ==========================================

const emptyQueue = [];
const ticketPrices = [120, 85, 300, 60];

// ==========================================
// Task 1
// Prediction (Before Running)
// ==========================================

/*
Predicted Output:

emptyQueue.every(price => price > 0)  => true
emptyQueue.some(price => price > 0)   => false
*/

const everyResult = emptyQueue.every(price => price > 0);
const someResult = emptyQueue.some(price => price > 0);

console.log("every():", everyResult);
console.log("some():", someResult);

/*
Actual Output:

every(): true
some(): false

Explanation:

An empty array has no elements that violate
the condition, so every() returns true.

An empty array also has no elements that
satisfy the condition, so some() returns false.

This behavior is called "Vacuous Truth."
*/


// ==========================================
// Task 2
// some() Short-Circuit
// ==========================================

console.log("\nChecking some():");

const hasExpensiveTicket = ticketPrices.some(price => {
    console.log("Checking:", price);
    return price > 250;
});

console.log("Result:", hasExpensiveTicket);

/*
Output:

Checking: 120
Checking: 85
Checking: 300
Result: true

Notice:

60 was NEVER checked.

some() stops immediately after finding
the first matching element.
*/


// ==========================================
// Task 3
// every() Short-Circuit
// ==========================================

console.log("\nChecking every():");

const allAbove100 = ticketPrices.every(price => {
    console.log("Checking:", price);
    return price > 100;
});

console.log("Result:", allAbove100);

/*
Output:

Checking: 120
Checking: 85
Result: false

Notice:

300 and 60 were never checked.

every() stops as soon as one element
fails the condition.
*/


// ==========================================
// Task 4
// find()
// ==========================================

const firstHighPrice = ticketPrices.find(price => price > 250);

console.log("\nFirst ticket above 250:", firstHighPrice);

/*
Output:

First ticket above 250:
300

Why use find() instead of filter()[0]?

find()

✔ Stops searching after finding the first match.
✔ Returns a single value.
✔ More efficient.

filter()[0]

✔ Searches the entire array.
✔ Creates a new array.
✔ Uses more memory.

find() is the better choice when only
the first matching element is needed.
*/