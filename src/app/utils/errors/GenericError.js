class GroupError extends Error {
  constructor(args, name, httpStatus = '') {
    super(args)
    this.name = name
    this.errorMessage = args
    this.httpStatus = httpStatus
    console.error(this)
  }
}

module.exports = GroupError
