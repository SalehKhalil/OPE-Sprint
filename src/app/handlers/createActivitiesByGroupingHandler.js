const groupService = require('../services/GroupsService')
const authService = require('../services/AuthService')
const GenericError = require('../utils/errors/GenericError')

const handler = async (req, res) => {
  try {
    const { grouping, email } = req.body
    if (!grouping || !email) throw new GenericError('Missing grouping and/or email', 'SprintError', 400)
    const pcstas = await groupService.getPcstasByGrouping(grouping)
    const response = await authService.createActivitiesByPcstas({ pcstas, email })

    res.status(201).json(response)
  } catch (error) {
    console.error(error)
    res.status(error.httpStatus || 500).json({ error })
  }
}

module.exports = handler
