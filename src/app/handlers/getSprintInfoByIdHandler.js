const sprintInfoDao = require('../models/daos/SprintInfoDao')
const GenericError = require('../utils/errors/GenericError')

const handler = async (req, res) => {
  try {
    const { sprintInfoId } = req.query
    if (!sprintInfoId) throw new GenericError('Missing sprintInfoId', 'SprintError', 400)
    const sprintInfo = await sprintInfoDao.findSprintInfoById(sprintInfoId)

    res.status(200).json(sprintInfo)
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
