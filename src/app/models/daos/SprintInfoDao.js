const { SprintInfo } = require('../schemas/SprintInfo')
const GenericError = require('../../utils/errors/GenericError.js')

class SprintInfoDao {
  findSprintInfoById (sprintInfoId) {
    return SprintInfo.findOne({ _id: sprintInfoId })
  }

  findSprintInfoByPcstaId (pcstaId) {
    return SprintInfo.find({ pcstaId })
  }

  createSprintInfo (sprintInfo) {
    try {
      return SprintInfo.create(sprintInfo)
    } catch (error) {
      console.error(error)
      throw new GenericError('missing some sprintInfo information', 'SprintInfoError', 400)
    }
  }

  updateSprintInfoByQuery (query, data) {
    try {
      return SprintInfo.findOneAndUpdate(query, data, { new: true })
    } catch (error) {
      console.error(error)
      throw new GenericError('missing some sprintInfo information', 'SprintInfoError', 400)
    }
  }
}

module.exports = new SprintInfoDao()
