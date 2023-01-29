const morgan = require("morgan")
const express = require('express');
const cors = require('cors')
const app = express()

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

let persons = [
        { 
          "id": 1,
          "name": "Arto Hellas", 
          "number": "040-123456"
        },
        { 
          "id": 2,
          "name": "Ada Lovelace", 
          "number": "39-44-5323523"
        },
        { 
          "id": 3,
          "name": "Dan Abramov", 
          "number": "12-43-234345"
        },
        { 
          "id": 4,
          "name": "Mary Poppendieck", 
          "number": "39-23-6423122"
        }
]

const idGenerator = () => {
  randomId = Math.floor(Math.random() * 100) 

  return randomId
}
app.get('/info', (request, response) => {
    const currentTime = new Date().toLocaleString();
    const personAmount = persons.length;

    response.send(`
    <div>
     <h1> Phonebook has info for ${personAmount} people </h1>
     <h1> ${currentTime} </h1>
    </div> `)
})

app.get('/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    const personFound = persons.find(person => person.id === id)
    personFound
    ? response.json(personFound)
    : response.status(404).end()
} )

app.get('/persons', (request, response) => {
  response.json(persons)
})

app.delete('/persons/:id', (request, response) => {
    const id = Number(request.params.id)
    persons = persons.filter(person => person.id !== id)
    response.status(204).end()
})

app.post('/persons', (request, response) => {
  body = request.body;
  console.log(body);

  if(!body.name || !body.number){
    return response.status(400).json({
      error: 'content is missing'
    })
  }
    { if(persons.find(person => person.name === body.name)){
      return response.status(400).json({
        error: 'name already exists in database'
      })
    }
    {
      newPerson = {
        name: body.name,
        number: body.number,
        id: idGenerator()
      }
      persons = persons.concat(newPerson)
      response.json(newPerson);
    }
   }

})

const PORT =  3001
app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`)
})