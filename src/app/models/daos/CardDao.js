const { Card } = require('../schemas/Card')
const GenericError = require('../../utils/errors/GenericError.js')

class CardDao {
  createCard(card) {
    try {
      return Card.create(card)
    } catch (error) {
      console.error(error)
      throw new GenericError('missing some card information', 'CardError', 400)
    }
  }

  findSprintCardsByGroupId(groupId, sprintNumber) {
    return Card
      .find({
        groupId,
        sprintNumber: {
          $in: [0, sprintNumber]
        }
      })
      .lean()
  }

  deleteCardById(cardId) {
    return Card.findOneAndDelete({ _id: cardId })
  }

  updateCardByQuery(query, data) {
    try {
      return Card.findOneAndUpdate(query, data, { new: true })
    } catch (error) {
      console.error(error)
      throw new GenericError('missing some card information', 'SprintInfoError', 400)
    }
  }
}

module.exports = new CardDao()
