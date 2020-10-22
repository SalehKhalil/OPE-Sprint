const ReviewBacklogDao = require('../models/daos/ReviewBacklogDao')
const GenericError = require('../utils/errors/GenericError')

const handler = async (req, res) => {
  try {
    const { groupId, sprintNumber } = req.query
    if (!groupId || !sprintNumber) throw new GenericError('Missing groupId and/or sprintNumber', 'SprintError', 400)
    const { cards } = await ReviewBacklogDao.findSprintCardsByGroupId(groupId, sprintNumber)

    res.status(200).json(cards)
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
