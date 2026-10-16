console.log("Process Started")

setInterval(()=>{
    console.log("process 1 executed")
},2000)

setTimeout(()=>{
    console.log("process 2 executed")
},1000)

Promise.resolve("process 3 executed")
    .then((content)=>{
        console.log("current:",content)

        return "process 4 executed"
    })
    .then((content)=>{
        console.log("current:",content)

        throw new Error("Execution Interrupted")
    })
    .catch((err)=>{
        console.log("Got",err.message)
    })
    .finally(()=>{
        console.log("Task Completed")
    })

    console.log("Process completd!!")