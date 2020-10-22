const {
  API_AUTH_URL
} = process.env
const axios = require('axios')
const GenericError = require('../utils/errors/GenericError')

class AuthService {
  async getActivities(pcstaId, courseId, pcsta, email) {
    try {
      const { data } = await axios.get(`${API_AUTH_URL}/getActivities?pcstaId=${pcstaId}&courseId=${courseId}&pcsta=${pcsta}&email=${email}`)
      return data
    } catch (error) {
      console.error(error)
      throw new GenericError(error.message || 'Something went wrong with AuthService', 'AuthServiceError', error.httpStatus || 500)
    }
  }

  async publishActivity(payload) {
    try {
      await axios.patch(`${API_AUTH_URL}/publishActivity`, { ...payload })
    } catch (error) {
      console.error(error)
      throw new GenericError(error.message || 'Something went wrong with AuthService', 'AuthServiceError', error.response.status || 500)
    }
  }

  async setActivityGrade(payload) {
    try {
      await axios.patch(`${API_AUTH_URL}/setActivityGrade`, { ...payload })
    } catch (error) {
      console.error(error)
      throw new GenericError(error.message || 'Something went wrong with AuthService', 'AuthServiceError', error.response.status || 500)
    }
  }

  async createActivitiesByPcstas(payload) {
    try {
      await axios.post(`${API_AUTH_URL}/createActivitiesByPcstas`, { ...payload })
    } catch (error) {
      console.error(error)
      throw new GenericError(error.message || 'Something went wrong with AuthService', 'AuthServiceError', error.response.status || 500)
    }
  }
}

module.exports = new AuthService()
