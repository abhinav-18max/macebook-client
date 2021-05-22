const express = require('express')
const cors = require('cors')

const app = express()
const PORT = 5001


const corsOptions = {
    origin: 'http://localhost:3000',
    credentials:  true
}

app.use(cors(corsOptions))
app.use(express.json())


const routes =require('./routes')

app.use('/api', routes)

app.listen(PORT, () => {
    console.log("Mock Server Running of Port " + PORT)
})
