const sprintInfoDao = require('../models/daos/SprintInfoDao')
const GenericError = require('../utils/errors/GenericError')

const handler = async (req, res) => {
  try {
    const { pcstaId } = req.query
    if (!pcstaId) throw new GenericError('Missing pcstaId', 'SprintError', 400)
    const sprintInfo = await sprintInfoDao.findSprintInfoByPcstaId(pcstaId)

    res.status(200).json(sprintInfo)
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
