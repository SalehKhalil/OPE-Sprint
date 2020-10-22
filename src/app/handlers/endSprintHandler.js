const SprintInfoDao = require('../models/daos/SprintInfoDao')
const GenericError = require('../utils/errors/GenericError')

const handler = async (req, res) => {
  try {
    const { sprintInfo } = req.body
    if (!sprintInfo) throw new GenericError('Missing sprintInfo', 'SprintError', 400)
    const sprintInfoEnded = await SprintInfoDao.updateSprintInfoByQuery({ _id: sprintInfo._id }, sprintInfo)
    res.status(200).json(sprintInfoEnded)
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
