const generator =  {
    string({ domain = CHARS, len = 16 } = {}) {
        let ret = ""
        for (let i = 0; i < len; i++) {
            ret += this.oneOf(domain)
        }
        return ret
    },
    oneOf(xs) {
        return xs[Math.floor(Math.random() * xs.length)]
    },
    objectId() {
        const CHARS = "0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ".split("")
        const HEX_CHARS = CHARS.slice(0, 16)
        return generator.string({ "domain": HEX_CHARS, "len": 24 })
    }
}

exports.orders = [
    {
        _id: generator.objectId(),
        amount: 1500,
        created_at: new Date(),
        items: [
            {
                name: 'Kibbeling',
                category: 'fish',
                price: 750,
                quantity: 1,
            },
            {
                name: 'Zalm',
                category: 'fish',
                price: 750,
                quantity: 1,
            },
        ]
    }
]

exports.users = [
    {
        _id: generator.objectId(),
        name: "Luuk Gruijs",
        email: "testuser@projectfish.nl",
        _id: "123",
        orders: [exports.orders[0]._id]
    }
]