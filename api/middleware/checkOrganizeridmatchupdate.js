const {UserIdwithEventId} = require('../Events/event-model')

module.exports = async (req, res, next) => {
    const organizer_id = await UserIdwithEventId(req.params.event_id)
    console.log('this is inside checkorganizer id',organizer_id)
    if(organizer_id === req.decodedJwt.subject){
        next()
    } else {
        next({status: 401, message:'you are not allow to edit or delete this event'})
    }
  };
  