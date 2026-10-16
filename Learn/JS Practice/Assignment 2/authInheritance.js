"use strict";

// Assignment 5 – ES6 Classes, super(), Private Fields & Polymorphism

// Parent Class


class User {

    
    static totalUsers = 0;

    constructor(username) {
        this.username = username;

        
        User.totalUsers++;
    }

    logout() {
        console.log(`${this.username} logged out`);
    }
}


// Child Class - AdminUser


class AdminUser extends User {

    // Private Field
    #password;

    constructor(username, password) {
        super(username);      
        this.#password = password;
    }

    login(attempt) {

        if (attempt === this.#password) {
            console.log("Access granted");
        } else {
            console.log("Access denied");
        }

    }

    
    get hasPassword() {
        return this.#password ? true : false;
    }

    
    logout() {
        super.logout();                    
        console.log("(admin session cleared)");
    }

}


// Child Class - GuestUser


class GuestUser extends User {

    constructor(username) {
        super(username);
    }

    // Method Overriding
    logout() {
        super.logout();
        console.log("(guest data discarded)");
    }

}


// Create Objects


const admin = new AdminUser("neha", "s3cret");
const guest = new GuestUser("visitor1");


// Login Test


console.log("Admin Login (Wrong Password)");
admin.login("wrong");

console.log("\nAdmin Login (Correct Password)");
admin.login("s3cret");



const sessions = [admin, guest];

console.log("\nLogout (Polymorphism)");

for (const user of sessions) {
    user.logout();
}

// Static Field


console.log("\nTotal Users:");
console.log(User.totalUsers);


// Getter


console.log("\nAdmin Has Password?");
console.log(admin.hasPassword);


// Private Field

// Expected Output


/*

Admin Login (Wrong Password)
Access denied

Admin Login (Correct Password)
Access granted

Logout (Polymorphism)
neha logged out
(admin session cleared)

visitor1 logged out
(guest data discarded)

Total Users:
2

Admin Has Password?
true

*/