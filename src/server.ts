import express from 'express'
import cors from 'cors'

import investorRoute from './routes/investorRoute'
import fundRoute from './routes/fundRoute'
import sipRoute from './routes/sipRoute'

const app = express()

app.use(cors())

app.use(express.json())

app.use('/api/investors', investorRoute)
app.use('/api/funds', fundRoute)
app.use('/api/sips', sipRoute)

app.listen(4000, () => {
    console.log('Server running on port 4000')
})