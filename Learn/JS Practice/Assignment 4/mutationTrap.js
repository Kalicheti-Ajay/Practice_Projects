// ==========================================
// Task 2 - The Mutation Trap
// ==========================================

const platformArrivals = [
  "Chennai Exp",
  "Nellore Local",
  "Bangalore SF",
  "Vijayawada Pass"
];

// ==========================================
// Task 2 - Fixed Function
// ==========================================

function getSortedBoard(trains) {
  // Smallest possible fix:
  // Create a copy first, then sort the copy.
  return trains.slice().sort();
}

const sortedBoard = getSortedBoard(platformArrivals);

console.log("Sorted board:", sortedBoard);
console.log("Original array:", platformArrivals);

/*
Expected Output

Sorted board:
[
  'Bangalore SF',
  'Chennai Exp',
  'Nellore Local',
  'Vijayawada Pass'
]

Original array:
[
  'Chennai Exp',
  'Nellore Local',
  'Bangalore SF',
  'Vijayawada Pass'
]

The original array remains unchanged.
*/


/*
==================================================
Task 1
==================================================

Why did the original array change?

Arrays are objects in JavaScript.

When an array is passed to a function, only its
reference is passed, not a copy.

The sort() method modifies (mutates) the same
array in memory instead of creating a new one.

Therefore:

sortedBoard
and
platformArrivals

both refer to the same array, so sorting one
changes the other.
*/


// ==========================================
// Task 3
// reverse() Experiment
// ==========================================

const reverseBoard = platformArrivals.slice().reverse();

console.log("Reversed Board:", reverseBoard);
console.log("Original After Reverse:", platformArrivals);

/*
Expected Output

Reversed Board:
[
  'Vijayawada Pass',
  'Bangalore SF',
  'Nellore Local',
  'Chennai Exp'
]

Original After Reverse:
[
  'Chennai Exp',
  'Nellore Local',
  'Bangalore SF',
  'Vijayawada Pass'
]
*/


/*
==================================================
Task 3 Answer
==================================================

Methods that MUTATE the original array:

✔ sort()
✔ reverse()
✔ splice()

Methods that DO NOT mutate the original array:

✔ slice()
✔ concat()
✔ map()

The non-mutating methods return a new array.
*/


// ==========================================
// Task 4
// One-liner using slice()
// ==========================================

const lastTwoArrivals = platformArrivals.slice(-2);

console.log("Last Two Arrivals:", lastTwoArrivals);

/*
Output

Last Two Arrivals:
[
  'Bangalore SF',
  'Vijayawada Pass'
]

The original array is not modified.
*/