"use strict";

// Assignment 4 – Prototypal Inheritance with Object.create()


const sessionHandler = {
    role: "guest",

    login: function () {
        return `${this.username} logged in as ${this.role}`;
    },

    logout: function () {
        return `${this.username} logged out`;
    }
};

// Create user1

const user1 = Object.create(sessionHandler);
user1.username = "arjun";


// Create user2
const user2 = Object.create(sessionHandler);
user2.username = "sara";
user2.role = "admin";

// Login Output

console.log("User1 Login:");
console.log(user1.login());

console.log("\nUser2 Login:");
console.log(user2.login());


// Change prototype role

console.log("\nChanging sessionHandler.role to 'member'");

sessionHandler.role = "member";

console.log("\nUser1 Login After Prototype Change:");
console.log(user1.login());

console.log("\nUser2 Login After Prototype Change:");
console.log(user2.login());


// Prototype vs Own Properties

console.log("\nOwn Properties of user1:");
console.log(Object.keys(user1));

console.log("\nProperties on Prototype:");
console.log(Object.getOwnPropertyNames(Object.getPrototypeOf(user1)));

// Logout

console.log("\nLogout:");

console.log(user1.logout());
console.log(user2.logout());


// if(true){
//     console.log("1")
// }
// if(false){
//     console.log("2")
// }
