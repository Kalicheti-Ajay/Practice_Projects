// Predicted Output (First 5 Lines):
// 1. A. Station Master starts duty
// 2. G. Station Master ends duty
// 3. D. Microtask 1
// 4. E. Microtask 2
// 5. B. Late train arrives

console.log("A. Station Master starts duty");

setTimeout(() => console.log("B. Late train arrives"), 0);

const announce = setInterval(() => {
    console.log("C. Repeated announcement");
}, 100);

Promise.resolve()
    .then(() => console.log("D. Microtask 1"))
    .then(() => console.log("E. Microtask 2"));

setTimeout(() => {
    console.log("F. Clearing announcements");
    clearInterval(announce);
}, 250);

console.log("G. Station Master ends duty");

/*
----------------------------------------------------------
Task 2: After Running the Code
----------------------------------------------------------

// My prediction matched the actual output.
// Synchronous code executed first, followed by Promise
// microtasks, and finally the timer callbacks.

----------------------------------------------------------
Task 3: Why is the output in this order?
----------------------------------------------------------

1. Why does "G" print before "D" and "E"?

- "G" is part of the synchronous code.
- JavaScript executes all synchronous code first before
  handling any asynchronous callbacks.

2. Why do "D" and "E" print before "B"?

- "D" and "E" are Promise callbacks.
- Promise callbacks go into the Microtask Queue.
- "B" is a setTimeout callback.
- setTimeout callbacks go into the Macrotask (Timer) Queue.
- After the call stack becomes empty, JavaScript executes
  ALL microtasks before executing any macrotasks.
- Even though setTimeout has a delay of 0ms, it still waits
  until the current code and all microtasks have completed.

Execution Order:
Synchronous Code
        ↓
Microtasks (Promises)
        ↓
Macrotasks (setTimeout / setInterval)

----------------------------------------------------------
Task 4: Why does "C" keep printing?
----------------------------------------------------------

- setInterval() executes its callback every 100 milliseconds.
- Unlike setTimeout(), it does not stop automatically.
- It keeps scheduling itself repeatedly.
- At approximately 250ms, the second setTimeout executes,
  prints "F. Clearing announcements", and calls
  clearInterval(announce).
- clearInterval() stops any future interval executions.
- If clearInterval() were never called, the interval would
  continue forever, keeping Node.js alive because the event
  loop still has an active timer.

----------------------------------------------------------
Actual Console Output
----------------------------------------------------------

A. Station Master starts duty
G. Station Master ends duty
D. Microtask 1
E. Microtask 2
B. Late train arrives
C. Repeated announcement
C. Repeated announcement
F. Clearing announcements

(Note: The exact timing may vary slightly, but the order
remains the same.)
*/