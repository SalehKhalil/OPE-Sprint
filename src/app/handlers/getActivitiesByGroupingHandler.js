const AuthService = require('../services/AuthService')
const GroupsService = require('../services/GroupsService')
const GenericError = require('../utils/errors/GenericError')
const sprintInfoDao = require('../models/daos/SprintInfoDao')

const verifyIfActivityIsInUse = async (pcstaId, activityTitleToVerify) => {
  const sprintInfo = await sprintInfoDao.findSprintInfoByPcstaId(pcstaId)
  if (sprintInfo && sprintInfo.length > 1) {
    for (const info of sprintInfo) {
      const activityInUse = info.activities.some(activityInUse => {
        const { title } = activityInUse
        return activityTitleToVerify === title
      })
      if (activityInUse) return info.sprintNumber
    }

    return null
  } else if (sprintInfo && sprintInfo.length === 1) {
    const inUse = !!sprintInfo[0].activities.some(activityInUse => {
      const { title } = activityInUse
      return activityTitleToVerify === title
    })

    return inUse ? sprintInfo[0].sprintNumber : null
  } else {
    return null
  }
}

const validateActivities = async (pcsta, activities) => {
  const activitiesValidated = []
  for (const activity of activities) {
    const isActivityInUse = await verifyIfActivityIsInUse(pcsta._id, activity.title)
    activity.sprintNumber = isActivityInUse
    activitiesValidated.push(activity)
  }

  return activitiesValidated
}

const handler = async (req, res) => {
  try {
    const { grouping, email } = req.query
    if (!grouping || !email) throw new GenericError('Missing grouping and/or email', 'SprintError', 400)

    const pcstas = await GroupsService.getPcstasByGrouping(grouping)
    const requests = pcstas.map(pcsta => AuthService.getActivities(pcsta._id, pcsta.courseId, pcsta.title, email))

    const data = await Promise.all(requests)

    const arrayToResponse = []
    for (const payload of data) {
      if (payload && payload.activities && payload.pcsta) {
        const { pcsta, activities } = payload
        const activitiesToResponse = await validateActivities(pcsta, activities)
        arrayToResponse.push({ pcsta, activitiesToResponse })
      }
    }

    res.status(200).json(arrayToResponse)
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
