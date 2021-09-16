/* eslint-disable no-unused-vars */
const express = require('express')
const helmet = require('helmet')
const cors = require('cors')
const path = require('path')
const server = express()
const Auth = require('./Auth/auth-router')
const uploadImage = require('./upload_image/upload_image')
const images = require('./Image/image-router')
const bodyParser = require('body-parser')
server.use(bodyParser.urlencoded({extended: true}));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, '../client/build')))
server.use(express.json())
server.use(helmet())
server.use(cors())

server.use('/api/auth', Auth)
server.use('/api/uploadImage', uploadImage)
server.use('/api/images', images)


  
server.use('*', (req, res) => {
    res.sendFile(path.join(__dirname, '../client/build', 'index.html'))
})

server.use((err, req, res, next) => {
    res.status(500).json({
        message: err.message,
        stack: err.stack
    })
})

module.exports = server;