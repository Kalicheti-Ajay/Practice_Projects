function* number() {
    yield 1,
    yield 2,
    yield 3,
    yield 4
}

const iterator = number()

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

