// ======================================
// Task 3 - Timeout Race
// ======================================

function unreliableServer(delayMs, label) {
    return new Promise((resolve) => {
        setTimeout(() => {
            resolve(`Response from ${label}`);
        }, delayMs);
    });
}

// ======================================
// Task 1
// withTimeout() using Promise.race()
// ======================================

function withTimeout(promise, ms) {
    const timeoutPromise = new Promise((_, reject) => {
        setTimeout(() => {
            reject(new Error("Timeout"));
        }, ms);
    });

    return Promise.race([promise, timeoutPromise]);
}

// ======================================
// Task 2
// Server A (3000ms) with 1000ms timeout
// ======================================

withTimeout(unreliableServer(3000, "Server A"), 1000)
    .then((result) => {
        console.log("Server A:", result);
    })
    .catch((error) => {
        console.log("Server A Error:", error.message);
    });

// Expected Output (after ~1000ms)
// Server A Error: Timeout


// ======================================
// Task 3
// Server B (500ms) with 1000ms timeout
// ======================================

withTimeout(unreliableServer(500, "Server B"), 1000)
    .then((result) => {
        console.log("Server B:", result);
    })
    .catch((error) => {
        console.log("Server B Error:", error.message);
    });

// Expected Output (after ~500ms)
// Server B: Response from Server B


/*
===========================================
Task 4 - Explanation
===========================================

Promise.race() returns the result of whichever Promise
settles first.

For Server A:

- Server A takes 3000ms.
- Timeout Promise rejects after 1000ms.
- Since the timeout finishes first, Promise.race()
  immediately rejects with "Timeout".

However, the original unreliableServer() Promise
does NOT stop running.

Its internal setTimeout() continues until 3000ms,
even though our code has already moved on.

This is because Promise.race() only chooses the
first completed Promise. It cannot cancel the
other Promise automatically.

Promises in JavaScript do not have built-in
cancellation.

To actually stop an ongoing operation (such as
a network request), we normally use APIs like
AbortController with fetch().

Example:

const controller = new AbortController();

fetch(url, {
    signal: controller.signal
});

controller.abort();

AbortController actively cancels the request,
whereas Promise.race() simply ignores the
losing Promise.
*/