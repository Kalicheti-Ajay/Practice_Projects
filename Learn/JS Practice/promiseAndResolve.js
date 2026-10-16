const fruit1 = Promise.resolve("Apple")
const fruit2 = Promise.resolve("Banana")
const fruit3 = Promise.resolve("Orange")


const fast = new Promise((resolve)=>{
    setTimeout(()=> resolve("Fast"),1000)
})

const slow = new Promise((resolve)=>{
    setTimeout(()=> resolve("slow"),1000)
})



Promise.all([fruit1,fruit2,fruit3])
    .then((result)=> {
        console.log("Promice.all:",result)
        return Promise.allSettled([fruit1,fruit2,fruit3])
    })
    .then((result)=> {
        console.log("Promice.allSettled:",result)
        return Promise.any([fruit1,fruit2,fruit3])
    })
    .then((result)=> {
        console.log("Promice.any:",result)
        return Promise.race([fruit1,fruit2,fruit3])
    })
    .then((result)=> {
        console.log("Promice.race:",result)
    })
    .catch((err)=>{
        console.log("Got",err.message)
    })
    .finally(()=> {
        console.log("Tasks Completed!!")
    })
    








    // Promise.allSettled([fruit1,fruit2,fruit3])
//     .then((result)=> {
//         console.log("Promice.allSettled:",result)
//     });
// Promise.race([fast,slow])
//     .then((result)=>{
//         console.log("Promice.race:",result)
//     })

// Promise.any([fast,slow])
//     .then((result)=>{
//         console.log("Promice.any:",result)
//     })
