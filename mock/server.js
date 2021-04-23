const express = require('express')
const app = express()
const PORT = 5001

app.use(express.json())

const routes = require('./routes')
app.use('/api', routes)

app.listen(PORT, () => {
    console.log("Mock Server Running of Port " + PORT)
})