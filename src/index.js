require('dotenv').config()
const app = require('./config/server')
const port = process.env.PORT || 3002

app.listen(port, console.log(`Server running on port: ${port}`))
