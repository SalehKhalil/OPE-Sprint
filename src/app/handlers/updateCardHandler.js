const CardDao = require('../models/daos/CardDao')
const GenericError = require('../utils/errors/GenericError')

const handler = async (req, res) => {
  try {
    const { card } = req.body
    if (!card) throw new GenericError('Missing card', 'SprintError', 400)
    const cardUpdated = await CardDao.updateCardByQuery({ _id: card._id }, card)

    res.status(200).json(cardUpdated)
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
