const {
  API_GROUPS_URL
} = process.env
const axios = require('axios')
const GenericError = require('../utils/errors/GenericError')

class GroupsService {
  async getPcstasByGrouping(grouping) {
    try {
      const { data } = await axios.get(`${API_GROUPS_URL}/getPcstasByGrouping?grouping=${grouping}`)
      return data
    } catch (error) {
      throw new GenericError(error.message || 'Something went wrong with AuthService', 'GroupServiceError', error.response.status || 500)
    }
  }

  async getGroupsByPcsta(pcsta) {
    try {
      const { data } = await axios.get(`${API_GROUPS_URL}/getGroups?pcsta=${pcsta}`)
      return data
    } catch (error) {
      throw new GenericError(error.message || 'Something went wrong with AuthService', 'GroupServiceError', error.response.status || 500)
    }
  }
}

module.exports = new GroupsService()
