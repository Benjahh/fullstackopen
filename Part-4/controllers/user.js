const userRouter = require('express').Router()
const bcrypt = require('bcrypt')
const User = require('../models/user')

userRouter.get('/', async (request, response) => {
    const users = await User.find({}).populate('blogs')
    response.json(users)

})

userRouter.post('/', async (request, response) => {
    const {name, username, password} = request.body

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(password, saltRounds)

    const newUser = new User({
        username: username,
        name: name,
        passwordHash

    })
    const savedUser = await newUser.save()
    response.status(201).json(savedUser)
    
})

module.exports = userRouter