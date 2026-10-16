function fetchUser() {
    return new Promise((resolve, reject) => {
        console.log("Fetching user...");
        setTimeout(() => {
            reject(new Error("Server is down"));
        }, 2000);
});
}

async function getUser() {
    try{
        console.log("inside try block");
        const user = await fetchUser();
        console.log("User fetched successfully:", user);

    } catch (error) {
        console.error("Inside catch block:");
        console.log("Error.", error.message);
    } finally {
        console.log("Inside finally block");
        console.log("Request finished.");
    }

}

console.log("Program started.");
getUser();
console.log("Program ended.");