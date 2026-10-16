const cars = [
    {
        name: "lamborgini",
        fuel: "petrol",
        color: "red"
    },
    {
        name: "porche",
        fuel: "deseal",
        color: "blue"
    },
    {
        name: "ford",
        fuel: "electric",
        color: "pink"
    },
    {
        name: "bmw",
        fuel: "cng",
        color: "white"
    }

]


const carFileds = Object.keys(cars[0])
const indexes = carFileds.join("          ")
// /console.log(indexes)
// console.log("---------------------------------")
// cars.map((car)=> console.log(Object.values(car).join("      ")))
// /console.log(cars)
// console.log(Object.entries(cars))

for(let i=0; i<cars.length;i++) {
    let record = Object.values(cars[i])
    console.log(record.join("      "))
}























// object assing and object freeze

// const defaultDish = { spiceLevel: "medium", portion: "regular" }
// const customerChoice = { spiceLevel: "extra hot", portion:"special" }
// const finalOrder = Object.assign({},defaultDish,customerChoice)

// console.log("=================Final Order before freeze================")
// console.log(finalOrder)

// Object.freeze(finalOrder)

// finalOrder.spiceLevel = "mild"

// console.log("=================Final Order after freeze tried to change the spice level to mild================")
// console.log(finalOrder.spiceLevel)































// //Assingment to create the objects in ways

// const dishes = [["Pizza",300],["Burger",150],["Noodles",200]]

// //object literal

// const dish = { name: "Biriyani", price: 750 }

// //factory function to create the object

// function createDish(name,price,quantity) {
//     return { price,name,quantity }
// }

// //constructor function

// function makeDish(name,price,quantity) {
//     this.name = name
//     this.price = price
//     this.quantity = quantity
// }

// //objects using class instantiation

// class bakeDish{
//     constructor(name,price){
//         this.name = name,
//         this.price  = price
//     }
// }

// // console.log("================object literal==============")
// // console.log(dish)

// const dish1 =  dishes.map(([name,price])=>createDish(name,price))
// console.log("================factory function to create the object==============")
// console.log(dish1)

// const dish2 = dishes.map(([name,price])=> new makeDish(name,price))
// console.log("================constructor function==============")
// console.log(dish2)

// // const dish3 = dishes.map(([name,price])=> new bakeDish(name,price))
// // console.log("================objects using class instantiation==============")
// // console.log(dish3)

