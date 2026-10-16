setTimeout(()=>{
    console.log("Customer entered into restaurant")
},1000)

setTimeout(()=>{
    console.log("Customer Ordered Pizza")
},2000)

Promise.resolve("Sheff Picked Order")
    .then((content)=>{
        console.log("current:",content)

        return "Served the order to customer"
    })
    .then((content)=>{
        console.log("current:",content)

        throw new Error("UPI FAILED")
    })
    .catch((err)=>{
        console.log("Error Log Details:")

        console.log(
            "\nGot:",err.message,
            "\nMessage:",err.message,
            "\nlog:",err.message,
            "\nError:",err.Error,
            "\nPromice:",err.Promise,
            "\nCatch:",err.catch,
            "\nConsole:",err.console,
            "\nContent:",err.content,
            "\nErr:",err.err,
            "\nFinally:",err.finally,
            "\nResolve:",err.resolve,
            "\nSet Timeout:",err.setTimeout,
            "\nThen:",err.then
        )
    })
    .finally(()=>{
        console.log("PAYMENT DONE WITH CASH")
    })


                // first call should cust enter be - 1sec 
                // order pizza 2sec

                // micro task 
                // sheff pick order
                // shift order to customer
                // cash statement
                // terminate 