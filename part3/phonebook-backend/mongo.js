const mongoose = require('mongoose')

if (process.argv.length<3) {
    console.log('give password as argument')
    process.exit(1)
}

const password = process.argv[2]

const url = `mongodb+srv://iamkiko:${encodeURIComponent('password')}@cluster0-vdvmu.mongodb.net/phonebook-backend?retryWrites=true&w=majority`

mongoose.connect(url, { useNewUrlParser: true })

const personSchema = new mongoose.Schema({
    name: String,
    number: String,
    // id: Number
})

const Person = mongoose.model('Person', personSchema)

const person = new Person({
    name: process.argv[3],
    number: process.argv[4],
    // id: 223
})

person.save().then(response => {
    console.log(`added ${person.name} number ${person.number} to phonebook`)
    // mongoose.connection.close()
})

Person.find({}).then(result => {
    result.forEach(person => {
        console.log(person)
    })
    mongoose.connection.close()
})