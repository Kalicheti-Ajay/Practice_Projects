// ==========================================
// Task 5 - Flatten the Chaos
// ==========================================

const deeplyNested = [1, [2, 3, [4, 5, [6, 7]]]];
const words = ["hello world", "  javascript  rocks", "flat map fun"];

// ==========================================
// Task 1
// flat() with default depth
// ==========================================

const partialFlat = deeplyNested.flat();

console.log("flat() default:", partialFlat);

/*
Expected Output:

flat() default:
[1, 2, 3, [4, 5, [6, 7]]]

Explanation:

flat() only flattens ONE level by default.

Default depth:

flat(1)

Since the array contains deeper nested arrays,
only the first level is flattened.
*/


// ==========================================
// Task 2
// Flatten completely
// ==========================================

const fullyFlat = deeplyNested.flat(Infinity);

console.log("Fully Flattened:", fullyFlat);

/*
Output:

Fully Flattened:
[
  1, 2, 3, 4,
  5, 6, 7
]

Using Infinity tells JavaScript to flatten
every level regardless of how deeply nested
the array is.
*/


// ==========================================
// Task 3
// flatMap()
// ==========================================

const allWords = words.flatMap(sentence =>
    sentence.trim().toLowerCase().split(/\s+/)
);

console.log("Words:", allWords);

/*
Output:

Words:
[
  'hello',
  'world',
  'javascript',
  'rocks',
  'flat',
  'map',
  'fun'
]

Why does flatMap() work here?

Each sentence becomes ONE array of words.

Example:

"hello world"

↓

["hello", "world"]

flatMap() removes only ONE level of nesting,
which is exactly what we need.

It would NOT completely flatten deeplyNested
because deeplyNested contains arrays nested
many levels deep.
*/


// ==========================================
// Task 4
// Difference between flatMap() and map().flat()
// ==========================================

/*
arr.flatMap(fn)

is almost equivalent to

arr.map(fn).flat(1)

Both perform:

1. map()
2. flatten ONE level

Example:

const result = arr.flatMap(fn);

is similar to

const result = arr.map(fn).flat();

Difference:

flatMap()

✔ Combines mapping and flattening
✔ Slightly more efficient
✔ Doesn't create the intermediate array
   produced by map()

map().flat()

✔ Creates the mapped array first
✔ Then flattens it

Both flatten only ONE level.

Neither can completely flatten a deeply
nested array like deeplyNested.
*/