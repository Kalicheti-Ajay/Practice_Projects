const users = ["Ajay","Raiyan","Sreekar","Siddhu"]


function sendNotification(name) {
return `${name} New YouTube Video is uploaded`
}


console.time("Map")
users.map((user) => {
    console.log(sendNotification(user))
})
console.timeEnd("Map")

console.time("For")
for (let i = 0; i < users.length; i++) {
    console.log(sendNotification(users[i]))
}
console.timeEnd("For")

console.time("ForEach")
users.forEach((user) => {
    console.log(sendNotification(user))
})
console.timeEnd("ForEach")

