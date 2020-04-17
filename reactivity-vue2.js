class Dep {
    constructor() {
        this.subscribers = []
    }
    depend() {
        if (target && !this.subscribers.includes(target)) {
            this.subscribers.push(target)
        }
    }
    notify() {
        this.subscribers.forEach(sub => sub())
    }
}

let target = null

function watcher(myFunc) {
    target = myFunc
    target()
    target = null
}

let data = { price: 5, quantity: 2 }
let total = 0

Object.keys(data).forEach(key => {
    
    let internalValue = data[key]
    const dep = new Dep()

    Object.defineProperty(data, key, {

        get() {
            dep.depend()
            return internalValue
        },
        set(newVal) {
            internalValue = newVal
            dep.notify()
        }

    })
})


watcher(() => {
    total = data.price * data.quantity
})

console.log(total) // => 10
data.price = 20
console.log(total) // => 40
data.quantity = 3
console.log(total) // => 60