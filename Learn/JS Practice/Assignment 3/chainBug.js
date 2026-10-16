// ===============================
// Task 2 - Fix the Silent Race Condition
// ===============================

function stationOneWork() {
    return new Promise((resolve) => {
        setTimeout(() => resolve("Parcel sorted at Station 1"), 1500);
    });
}

function stationTwoWork(data) {
    return new Promise((resolve) => {
        setTimeout(() => resolve(`Station 2 processed: ${data}`), 500);
    });
}

// ===========================================
// Fixed Version (.then() chaining)
// ===========================================

function runPipeline() {
    return Promise.resolve("Parcel dispatched")
        .then((data) => {
            console.log("Step 1:", data);

            // FIX: Return the promise so the next .then() waits.
            return stationOneWork();
        })
        .then((data) => {
            console.log("Step 2:", data);

            return stationTwoWork(data);
        })
        .then((finalData) => {
            console.log("Step 3:", finalData);
        });
}

runPipeline();


// ===========================================
// Async/Await Version
// ===========================================

async function runPipelineAsync() {
    const dispatched = await Promise.resolve("Parcel dispatched");
    console.log("Step 1:", dispatched);

    const stationOneResult = await stationOneWork();
    console.log("Step 2:", stationOneResult);

    const finalResult = await stationTwoWork(stationOneResult);
    console.log("Step 3:", finalResult);
}

// Uncomment to test async version
// runPipelineAsync();


/*
===========================================
Expected Output
===========================================

Step 1: Parcel dispatched
(wait about 1.5 seconds)
Step 2: Parcel sorted at Station 1
(wait about 0.5 second)
Step 3: Station 2 processed: Parcel sorted at Station 1

Total execution time: about 2 seconds.


===========================================
Answer 1
===========================================

Buggy Output:

Step 1: Parcel dispatched
Step 2: undefined
Step 3: Station 2 processed: undefined

The program finishes almost immediately because
stationOneWork() is started but not waited for.


===========================================
Answer 2
===========================================

Smallest Possible Fix:

Add the keyword "return".

Change this:

    stationOneWork();

to:

    return stationOneWork();

This makes the Promise chain wait until
stationOneWork() finishes.


===========================================
Answer 3
===========================================

The async/await version above produces exactly
the same output and timing, but is easier to
read because it looks like synchronous code.


===========================================
Answer 4
===========================================

Why doesn't forgetting to return a Promise
throw an error?

A .then() callback can return any value.

If nothing is returned, JavaScript
automatically returns undefined.

Therefore, the next .then() receives
undefined immediately instead of waiting for
stationOneWork() to finish.

Since this is valid JavaScript behavior,
no error is thrown.

The Promise chain continues with undefined,
which creates a silent bug instead of an
exception.
*/