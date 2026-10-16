// ==========================================
// Task 1 - Destructuring Under Fire
// ==========================================

const config = {
  host: "localhost",
  port: 8080,
  db: {
    name: "orders",
    replica: null
  }
};

// Prediction (Before Running)
/*
PORT     = 8080
dbName   = "orders"
replica  = null
timeout  = 5000
third    = 99
*/

const {
  host,
  port: PORT,
  db: {
    name: dbName,
    replica = "primary"
  },
  timeout = 5000,
  region = "ap-south-1"   // Task 4
} = config;

const arr = [1, 2, , 4];

const [first, second, third = 99, fourth] = arr;

console.log("host:", host);
console.log("PORT:", PORT);
console.log("dbName:", dbName);
console.log("replica:", replica);
console.log("timeout:", timeout);
console.log("region:", region);
console.log("first:", first);
console.log("second:", second);
console.log("third:", third);
console.log("fourth:", fourth);

/*
After Running:

Prediction matched the actual output.

Output:

host: localhost
PORT: 8080
dbName: orders
replica: null
timeout: 5000
region: ap-south-1
first: 1
second: 2
third: 99
fourth: 4
*/


/*
==================================================
Task 2
==================================================

Why is replica null instead of "primary"?

Destructuring default values are used ONLY when
the extracted value is undefined.

Here:

replica: null

Since the value is null (not undefined),
JavaScript keeps null and ignores the default.

Rule:

Default values work only for undefined or
missing properties.
*/


/*
==================================================
Task 3
==================================================

The array contains a hole at index 2:

const arr = [1, 2, , 4];

The hole is treated as undefined during
destructuring.

Therefore:

third = 99

because the default value is used.

Difference from arr[2]:

arr[2] also returns undefined.

The difference is that the array actually has
no element at index 2 (it's a hole), whereas
an element could explicitly exist with the
value undefined.

Both produce undefined when read, so the
destructuring default is applied in either case.
*/


/*
==================================================
Task 4
==================================================

Added this property while destructuring:

region = "ap-south-1"

Since config does not contain a region property,
the default value "ap-south-1" is assigned.
*/