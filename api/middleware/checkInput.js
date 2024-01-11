const yup = require('yup');
const Auth = require('../Auth/auth-model');

const registerCheck = yup.object({
    email: yup.string().email().required(),
    password: yup.string().min(3).required()
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
    const email = req.body.email.toLowerCase()
    Auth.getByEmail(email)
      .then(data => {
        if (data) {
          res.status(400).json({message:`email: ${email} is already exists`})
        } else {
          next()
        }
      })
      .catch(next)
  }

module.exports = {checkCreateAccount,checkUsernameUnique}