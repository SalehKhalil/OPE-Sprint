const CardDao = require('../models/daos/CardDao')
const GenericError = require('../utils/errors/GenericError')

const handler = async (req, res) => {
  try {
    const { cardId } = req.query
    if (!cardId) throw new GenericError('Missing cardId', 'SprintError', 400)
    await CardDao.deleteCardById(cardId)
    res.status(200).json()
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
