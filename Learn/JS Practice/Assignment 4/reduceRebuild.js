// ==========================================
// Task 3 - Reduce Rebuilt
// ==========================================

const orders = [
  { id: 1, amount: 250, status: "paid" },
  { id: 2, amount: 400, status: "pending" },
  { id: 3, amount: 150, status: "paid" },
];

// ==========================================
// Task 1
// Build myMap() using ONLY reduce()
// ==========================================

function myMap(arr, fn) {
  return arr.reduce((result, current, index) => {
    result.push(fn(current, index, arr));
    return result;
  }, []);
}

// ==========================================
// Build myFilter() using ONLY reduce()
// ==========================================

function myFilter(arr, fn) {
  return arr.reduce((result, current, index) => {
    if (fn(current, index, arr)) {
      result.push(current);
    }
    return result;
  }, []);
}


// ==========================================
// Task 2
// Filter -> Map -> Reduce
// ==========================================

const paidOrders = myFilter(
  orders,
  order => order.status === "paid"
);

const amounts = myMap(
  paidOrders,
  order => order.amount
);

const total = amounts.reduce(
  (sum, amount) => sum + amount,
  0
);

console.log("Paid Orders:", paidOrders);
console.log("Amounts:", amounts);
console.log("Total Paid Amount:", total);


/*
Expected Output

Paid Orders:
[
  { id: 1, amount: 250, status: "paid" },
  { id: 3, amount: 150, status: "paid" }
]

Amounts:
[250, 150]

Total Paid Amount:
400
*/


// ==========================================
// Task 3
// reduce() WITHOUT initial value
// ==========================================

const wrongTotal = orders.reduce(
  (sum, order) => sum + order.amount
);

console.log("Wrong Total:", wrongTotal);


/*
Output:

Wrong Total:
[object Object]150

Explanation:

Since no initial value is provided,
reduce() uses the FIRST ARRAY ELEMENT
as the accumulator.

Iteration 1:

sum =
{ id: 1, amount: 250, status: "paid" }

order =
{ id: 2, amount: 400, status: "pending" }

Expression:

sum + order.amount

becomes

object + 400

which results in string conversion like:

"[object Object]400"

Next iteration:

"[object Object]400" + 150

becomes

"[object Object]400150"

This is incorrect because the accumulator
was expected to be a number, but it was
actually an object.

Always provide an initial value when the
accumulator type differs from the array
element type.
*/


/*
==================================================
Task 4
==================================================

Rule:

Always provide an initial value when the
accumulator is NOT the same type as the
array elements or when the array might be
empty.

Example (Must provide):

const total = orders.reduce(
    (sum, order) => sum + order.amount,
    0
);

Safe to omit:

const numbers = [10, 20, 30];

const total = numbers.reduce(
    (sum, number) => sum + number
);

This is safe because both the accumulator
and the array elements are numbers.
*/