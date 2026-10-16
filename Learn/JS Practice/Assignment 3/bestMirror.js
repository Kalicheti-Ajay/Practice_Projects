// ==========================================
// Task 5 - First Success Wins
// ==========================================

// Original Mirrors

const mirror1 = new Promise((_, reject) =>
    setTimeout(() => reject("Mirror 1 down"), 200)
);

const mirror2 = new Promise((resolve) =>
    setTimeout(() => resolve("Mirror 2 OK"), 800)
);

const mirror3 = new Promise((_, reject) =>
    setTimeout(() => reject("Mirror 3 down"), 400)
);


// ==========================================
// Task 1
// Promise.race()
// ==========================================

Promise.race([mirror1, mirror2, mirror3])
    .then((result) => {
        console.log("Promise.race Success:", result);
    })
    .catch((error) => {
        console.log("Promise.race Error:", error);
    });

/*
Expected Output (after ~200ms)

Promise.race Error: Mirror 1 down

Explanation:
Promise.race() settles with whichever Promise
finishes first, whether it resolves OR rejects.
Since mirror1 rejects after 200ms, the race
immediately rejects even though mirror2
would eventually succeed.
*/


// ==========================================
// Task 2
// Promise.any()
// ==========================================

Promise.any([mirror1, mirror2, mirror3])
    .then((result) => {
        console.log("Promise.any Success:", result);
    })
    .catch((error) => {
        console.log("Promise.any Error:", error);
    });

/*
Expected Output (after ~800ms)

Promise.any Success: Mirror 2 OK

Explanation:
Promise.any() ignores rejected Promises.
It waits until the first Promise resolves.
*/


// ==========================================
// Task 3
// All Mirrors Fail
// ==========================================

const failedMirror1 = new Promise((_, reject) =>
    setTimeout(() => reject("Mirror 1 down"), 200)
);

const failedMirror2 = new Promise((_, reject) =>
    setTimeout(() => reject("Mirror 2 down"), 800)
);

const failedMirror3 = new Promise((_, reject) =>
    setTimeout(() => reject("Mirror 3 down"), 400)
);

const failedMirror4 = new Promise((_, reject) =>
    setTimeout(() => reject("Mirror 4 down"), 600)
);

async function checkMirrors() {
    try {
        const result = await Promise.any([
            failedMirror1,
            failedMirror2,
            failedMirror3,
            failedMirror4
        ]);

        console.log(result);

    } catch (error) {

        console.log("All Mirrors Failed");
        console.log(error);

        // Optional:
        console.log("Errors:", error.errors);
    }
}

checkMirrors();


/*
Expected Output

Promise.race Error: Mirror 1 down

Promise.any Success: Mirror 2 OK

All Mirrors Failed
AggregateError: All promises were rejected

Errors:
[
  'Mirror 1 down',
  'Mirror 2 down',
  'Mirror 3 down',
  'Mirror 4 down'
]


=========================================
Important Interview Concept
=========================================

Promise.race()

✔ Returns the first Promise that settles.
✔ It can resolve OR reject.
✔ A rejection immediately ends the race.


Promise.any()

✔ Ignores rejected Promises.
✔ Returns the first successful Promise.
✔ Rejects ONLY if every Promise rejects.


=========================================
Answer for Task 3
=========================================

When every Promise passed to Promise.any()
rejects, JavaScript throws an

AggregateError

This AggregateError contains an "errors"
array with all rejection reasons.
*/