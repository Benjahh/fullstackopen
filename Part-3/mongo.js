  const mongoose = require('mongoose')

  

  
  if(process.argv.length<3) {
    console.log("please pass the PASSWORD - NAME - PHONENUMBER")
    process.exit(1)
  }

  const password = process.argv[2]
  const newPersonName = process.argv[3]
  const newPhoneNumber = process.argv[4]  
  console.log(`Added name: ${newPersonName} phonenumber: ${newPhoneNumber} to the phonebook. `)

  url = `mongodb+srv://benjah:${password}@cluster0.qr5gjpr.mongodb.net/phoneBo?retryWrites=true&w=majority`

  
  mongoose.set('strictQuery',false)
  mongoose.connect(url)

  const personSchema = new mongoose.Schema({
    name: String,
    number: String,
  })
  
  const Person = mongoose.model('Person', personSchema)
  const person = new Person({
    name: newPersonName,
    number: newPhoneNumber,
    })

  if(process.argv.length === 3) {
    mongoose.connect(url)
    Person.find({})
    .then(result => {
      console.log(result)
      result.forEach(person => 
      console.log(person))
      mongoose.connection.close()
      })
    }

  person.save().then(result => {
    console.log('person saved!')  
    mongoose.connection.close()
    })
  
      






