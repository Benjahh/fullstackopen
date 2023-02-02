const morgan = require("morgan")
require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const mongoose = require('mongoose')
const Person = require('./models/person')







app.use(express.static('build'))
app.use(cors())
app.use(express.json())
app.use(morgan((tokens, req, res) => {
  return [
    tokens.method(req, res), 
    tokens.url(req, res),
    tokens.status(req, res),
    tokens.res(req, res, 'content-length'), '-',
    tokens['response-time'](req, res), 'ms',
    JSON.stringify(req.body)
  ].join(' ')
}))


app.get('/info', (request, response) => {
    const currentTime = new Date().toLocaleString();
    const personAmount = persons.length;

    response.send(`
    <div>
     <h1> Phonebook has info for ${personAmount} people </h1>
     <h1> ${currentTime} </h1>
    </div> `)
})

app.get('/persons/:id', (request, response, next) => {
    Person.findById(request.params.id)
    .then(person => {
      person
      ? response.json(person)
      : response.status(404).end()     
    })
    .catch(error => next(error))
    
})

app.get('/persons', (request, response) => {
  Person.find({})
  .then(person => response.json(person))

})

app.delete('/persons/:id', (request, response, next) => {
    Person.findByIdAndRemove(request.params.id)
    .then(result => {
      response.status(204).end
    })
    .catch(error => next(error))
   
})

app.post('/persons', (request, response) => {
  body = request.body;
  

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'content is missing'
    })
  }
   
    
      const person = new Person ({
        name: body.name,
        number: body.number,
      })

      person.save()
      .then(savedPerson => {
        console.log('Person saved')
        response.json(savedPerson)
      })
    
})

const errorHandler = (error, request, response, next) => {
  console.error(error.message)

  if (error.name === 'CastError') {
    return response.status(400).send({ error: 'malformatted id' })
  } else if (error.name === 'ValidationError') {
    return response.status(400).json({ error: error.message })
  }

  next(error)
}

app.use(errorHandler)

const PORT = process.env.PORT
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
}) 