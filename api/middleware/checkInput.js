const yup = require('yup');
const Auth = require('../Auth/auth-model');

const create = yup.object({
    event_name: yup.string().required(),
    date: yup.string().required(),
    time: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    street_address: yup.string().required(),
    zip: yup.number().required().required(),
    organizer_id: yup.number().required(),
    max_attendee: yup.number().required(),
    img_url: yup.string(),
})

const update = yup.object({
    event_name: yup.string().required(),
    date: yup.string().required(),
    time: yup.string().required(),
    state: yup.string().required(),
    city: yup.string().required(),
    street_address: yup.string().required(),
    zip: yup.number().required().required(),
    max_attendee: yup.number().required(),
    // img_url: yup.string(),
})

const registerCheck = yup.object({
    username: yup.string().required(),
    password: yup.string().min(3).required(),
    email: yup.string().email().required()
})

const checkcreateEvent = async (req, res, next) => {
    try {
        const validate = await create.validate(req.body, { stripUnknown: true })
        req.body = validate
        next()
    } catch (err) {
        res.status(400).json({message: `${err.path} is missing` })
    }
}

const checkupdateEvent = async (req, res, next) => {
    try {
        
        const validate = await update.validate(req.body, { stripUnknown: true })
        req.body = validate
        next()
        console.log("in the check updated event ")
    } catch (err) {
        res.status(400).json({message: `${err.path} is missing` })
    }
}

const checkCreateAccount = async (req, res, next) => {
    try {
        const validate = await registerCheck.validate(req.body, { stripUnknown: true })
        req.body = validate
        next()
    } catch (err) {
        res.status(400).json({message: err.message })
    }
}

const checkUsernameUnique = async (req, res, next) => {
    Auth.getByUsername(req.body.username)
      .then(data => {
        if (data) {
          res.status(400).json({message:`username ${req.body.username} is taken`})
        } else {
          next()
        }
      })
      .catch(next)
  }

module.exports = {checkcreateEvent, checkupdateEvent,checkCreateAccount,checkUsernameUnique}