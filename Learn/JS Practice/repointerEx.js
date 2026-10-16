process.on('uncaughtException', (err) => { 
    console.log("pizza manager:", err.message);
    console.log("Dont't Worry, we'll make another pizza!:")
});

function makePizza() {
    console.log("chef is Making a pizza...");
    throw new Error("Pizza got burned");
}

console.log("Customer Placed an Order.");
makePizza();
console.log("Pizza delivered!");