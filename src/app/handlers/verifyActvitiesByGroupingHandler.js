const groupService = require('../services/GroupsService')
const authService = require('../services/AuthService')
const GenericError = require('../utils/errors/GenericError')

const verifyIfNeedToCreateActivities = (activities) => {
  const activitiesNumbers = ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10']

  for (const activity of activities) {
    for (const number of activitiesNumbers) {
      if (activity.title.includes(number)) {
        const indexToRemove = activitiesNumbers.indexOf(number)
        activitiesNumbers.splice(indexToRemove, 1)
      }
    }
  }

  return (activitiesNumbers.length > 0)
}

const handler = async (req, res) => {
  try {
    const { grouping, email } = req.query
    if (!grouping || !email) throw new GenericError('Missing grouping and/or email', 'SprintError', 400)
    const pcstas = await groupService.getPcstasByGrouping(grouping)
    const activitiesRequests = pcstas.map(pcsta => authService.getActivities(pcsta._id, pcsta.courseId, pcsta.title, email))
    const allGroupingActivities = await Promise.all(activitiesRequests)
    const needToCreate = !!allGroupingActivities.some(classInfo => {
      if (classInfo.activities) return verifyIfNeedToCreateActivities(classInfo.activities)
      else return true
    })

    res.status(200).json({ needToCreate })
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
