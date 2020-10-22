const { ReviewBacklog } = require('../schemas/ReviewBacklog')
const GenericError = require('../../utils/errors/GenericError.js')

class ReviewBacklogDao {
  createReviewBacklog (reviewBacklog) {
    try {
      return ReviewBacklog.create(reviewBacklog)
    } catch (error) {
      console.error(error)
      throw new GenericError('missing some reviewBacklog information', 'ReviewBacklogError', 400)
    }
  }

  findSprintCardsByGroupId (groupId, sprintNumber) {
    return ReviewBacklog
      .findOne({
        groupId,
        sprintNumber: {
          $in: [0, sprintNumber]
        }
      })
      .lean()
  }
}

module.exports = new ReviewBacklogDao()
