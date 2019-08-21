require('dotenv').config()
const express = require('express')
const morgan = require('morgan')
const app = express()
const bodyParser = require('body-parser')
const cors = require('cors')
const Person = require('./models/person')

app.use(bodyParser.json())
app.use(express.static('build'))
app.use(cors())


morgan.token('data', (req) => JSON.stringify(req.body))

app.use(morgan(':method :url :status  :res[content-length] - :response-time ms :data '))


let persons = [
  {
    name: "Bill Gates",
    number: "021 456 8823",
    id: 1
  },
  {
    name: "Alexis Toromanoff ",
    number: "083 442 3328",
    id: 2
  },
  {
    name: "Costas Ioannou",
    number: " 324 442 2123",
    id: 3
  },
  {
    name: "Maria Andreou ",
    number: "434 222 5535",
    id: 4
  }
]

//HOMEPAGE
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

//POST ->  ADDING
app.post('/api/persons', (request, response) => {
  const body = request.body
  if(!body.name || !body.number || undefined) { // if empty
      return response.status(400).json({
          error: 'please include name and number'
      })
  }   
  else if(persons.map(person => person.name).includes(body.name)) { //if duplicate name
    return response.status(400).json({
        error: 'name must be unique'
    })
  }

  const person = new Person({
      name: body.name,
      number: " - " + body.number,
  })

  person.save().then(savedPerson => {
    response.json(savedPerson.toJSON())
  })
})


//GET ALL PERSONS
app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people.map(person => person.toJSON()))
  })
})

//GET INFO
app.get('/info', (request, response) => {
  const phonebookInfo = `Phonebook has info for ${persons.length} people 

  ${new Date()}`
  // const date = new Date()
  response.send(phonebookInfo)
})

//GET SPECIFIC PERSON
app.get('/api/persons/:id', (request, response, next) => {
  Person.findById(request.params.id)
  .then(person => {
    if(person) {
      response.json(person.toJSON())
    } else {
      response.status(404).end()
    }
  })
  .catch(error => next(error))
})

//DELETE
// app.delete('/api/persons/:id', (request, response) => {
//   const id = Number(request.params.id)
//   persons = persons.filter(persons => persons.id !== id)

//   response.status(204).end()
// })

app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } 

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT), () => {
  console.log(`Server running on port ${PORT}`)
}

