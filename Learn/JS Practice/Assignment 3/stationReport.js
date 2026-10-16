// ==========================================
// Task 4 - Partial Failure Report
// ==========================================

function checkStation(name, willFail) {
    return new Promise((resolve, reject) => {
        setTimeout(() => {
            if (willFail) {
                reject(new Error(`${name} is OFFLINE`));
            } else {
                resolve(`${name} is OK`);
            }
        }, Math.random() * 1000);
    });
}

const stations = [
    checkStation("Chennai", false),
    checkStation("Bangalore", true),
    checkStation("Vijayawada", false),
    checkStation("Nellore", true),
];

// ==========================================
// Task 1
// Promise.all()
// ==========================================

Promise.all(stations)
    .then((result) => {
        console.log("All Stations:", result);
    })
    .catch((error) => {
        console.log("Promise.all Error:", error.message);
    });

/*
Possible Output:

Promise.all Error: Bangalore is OFFLINE

OR

Promise.all Error: Nellore is OFFLINE

Only ONE error is shown because Promise.all()
stops immediately when the first Promise rejects.
*/


// ==========================================
// Task 2 & 3
// Promise.allSettled()
// ==========================================

Promise.allSettled(stations)
    .then((results) => {

        const summary = {
            okCount: 0,
            failedCount: 0,
            failedStations: []
        };

        results.forEach((result) => {

            if (result.status === "fulfilled") {
                summary.okCount++;
            } else {
                summary.failedCount++;
                summary.failedStations.push(result.reason.message);
            }

        });

        console.log("Summary Report:");
        console.log(summary);
    });


/*
Expected Output

Summary Report:
{
  okCount: 2,
  failedCount: 2,
  failedStations: [
      "Bangalore is OFFLINE",
      "Nellore is OFFLINE"
  ]
}

(Note:
The completion order may vary because of random delays,
but Promise.allSettled() returns the results in the
same order as the input array.)
*/


/*
=========================================
Task 4
=========================================

Rule:

Use Promise.all() when every Promise must succeed.

Use Promise.allSettled() when you want the result
of every Promise, even if some of them fail.
*/