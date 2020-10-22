const SprintInfoDao = require('../models/daos/SprintInfoDao')
const GroupsService = require('../services/GroupsService')
const CardDao = require('../models/daos/CardDao')
const ReviewBacklogDao = require('../models/daos/ReviewBacklogDao')
const GenericError = require('../utils/errors/GenericError')

const generateReviewBacklogs = async (groups, sprintNumber) => {
  await groups.forEach(async group => {
    const cards = await CardDao.findSprintCardsByGroupId(group._id, sprintNumber)
    await ReviewBacklogDao.createReviewBacklog({
      cards,
      groupId: group._id,
      sprintNumber
    })
  })
}

const handler = async (req, res) => {
  try {
    const { sprintInfo, pcsta } = req.body
    if (!sprintInfo || !pcsta) throw new GenericError('Missing sprintInfo and/or pcsta', 'SprintError', 400)
    const { groups } = await GroupsService.getGroupsByPcsta(pcsta.title)
    if (!groups || groups.length === 0) throw new GenericError('Groups not found', 'SprintError', 404)
    await generateReviewBacklogs(groups, sprintInfo.sprintNumber)
    const sprintInfoCreated = await SprintInfoDao.createSprintInfo(sprintInfo)
    res.status(201).json(sprintInfoCreated)
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
