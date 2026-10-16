"use strict";

// Assignment 3 – Getters & Setters (Tricky)

class Account {
    constructor(username) {
        this.username = username;
        this._failedAttempts = 0;
        this._isLoggedIn = false;
    }

    // Setter with validation
    set failedAttempts(value) {
        if (value < 0) {
            console.log("Failed attempts cannot be negative");
            return;
        }
        this._failedAttempts = value;
    }

    // Getter 
    get status() {
        if (this._failedAttempts >= 3) {
            return "Locked";
        }

        return this._isLoggedIn ? "Logged in" : "Logged out";
    }

    // Login method
    login(password, correctPassword) {

        // If already locked, don't even check password
        if (this._failedAttempts >= 3) {
            console.log("Account locked");
            return;
        }

        // Wrong password
        if (password !== correctPassword) {
            this.failedAttempts = this._failedAttempts + 1;
            console.log("Incorrect password");

            if (this._failedAttempts >= 3) {
                console.log("Account locked");
            }

            retrn;
        }

        // Correct password
        this._isLoggedIn = true;
        this.failedAttempts = 0;
        console.log("Login successful");
    }
}

// Testing


const acc = new Account("neha");

console.log("Username:", acc.username);

// First wrong attempt
console.log("\nAttempt 1");
acc.login("1111", "abcd");
console.log("Status:", acc.status);

// Second wrong attempt
console.log("\nAttempt 2");
acc.login("2222", "abcd");
console.log("Status:", acc.status);

// Third wrong attempt
console.log("\nAttempt 3");
acc.login("3333", "abcd");
console.log("Status:", acc.status);

// Correct password after lock
console.log("\nAttempt 4 (Correct Password After Lock)");
acc.login("abcd", "abcd");
console.log("Status:", acc.status);

// Setter 
console.log("\nSetter Validation");
acc.failedAttempts = -5;

// Getter property test
console.log("\nTrying to change getter-only property");

try {
    acc.status = "Logged in";
} catch (error) {
    console.log(error.message);
}

console.log("Status:", acc.status);