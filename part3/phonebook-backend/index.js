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

//HOMEPAGE
app.get('/', (request, response) => {
  response.send('<h1>Hello World!</h1>')
})

//POST ->  ADDING
app.post('/api/persons', (request, response, next) => {
  const body = request.body

  // if(!body.name || !body.number || undefined) { // if empty
  //   return response.status(400).json({
  //       error: 'please include name and number'
  //   })
  // }   
  // else if(persons.map(person => person.name).includes(body.name)) { //if duplicate name
  //   return response.status(400).json({
  //       error: 'name must be unique'
  //   })
  // }

  const person = new Person({
      name: body.name,
      number: body.number,
  })

  person.save().then(savedPerson => savedPerson.toJSON())
  .then(savedAndFormattedPerson => {
    response.json(savedAndFormattedPerson)
  })
  .catch(error => next(error))
})


//GET ALL PERSONS
app.get('/api/persons', (request, response) => {
  Person.find({}).then(people => {
    response.json(people.map(person => person.toJSON()))
  })
  .catch(error => next(error))
})

//GET INFO
app.get('/info', (request, response) => {
  Person.countDocuments({}, (error, count) => {
    if (error) {
      response.send(error)
    } else {
      const phonebookInfo = `<p></p>Phonebook has info for ${count} people </p>
                            <p> ${new Date()}</p>`
      response.send(phonebookInfo)
    }
  })
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

//UPDATING
app.put('/api/persons/:id', (request, response, next) => {
  const body = request.body

  const person = {
    name: body.name,
    number: body.number
  }

  Person.findByIdAndUpdate(request.params.id, person, { new: true })
  .then(updatedPerson => {
    response.json(updatedPerson.toJSON())
  })
  .catch(error => next(error))
})

//DELETE
app.delete('/api/persons/:id', (request, response, next) => {
  Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end()
    })
    .catch(error => next(error))
})

const unknownEndpoint = (request, response) => {
	response.status(404).send({ error: 'unknown endpoint' })
}

app.use(unknownEndpoint)

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError' && error.kind === 'ObjectId') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }
  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT), () => {
  console.log(`Server running on port ${PORT}`)
}

