const express = require('express')
const app = express()

app.use(express.json())

const investorRoute = require('./routes/investorRoute')
const fundRoute = require('./routes/fundRoute')
const sipRoute = require('./routes/sipRoute')

app.use('/api/investors', investorRoute)
app.use('/api/funds', fundRoute)
app.use('/api/sips', sipRoute)

app.listen(4000, () => {
    console.log('Server running on port 4000')
})

