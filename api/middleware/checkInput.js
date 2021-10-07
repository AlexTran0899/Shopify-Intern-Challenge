const yup = require('yup');
const Auth = require('../Auth/auth-model');

const registerCheck = yup.object({
    username: yup.string().required(),
    password: yup.string().min(3).required(),
    email: yup.string().email().required()
})

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
    Auth.getByUsername(req.body.username.toLowerCase())
      .then(data => {
        if (data) {
          res.status(400).json({message:`username ${req.body.username.toLowerCase()} is taken`})
        } else {
          next()
        }
      })
      .catch(next)
  }

module.exports = {checkCreateAccount,checkUsernameUnique}