require('dotenv').config()
const express = require('express')
const cors = require('cors')
const app = express()
const PORT = 3000

app.use("/stripe", express.raw({ type: "*/*" }))
app.use(express.json())
app.use(cors())

app.get('/', (req,res) => {
    res.send("Welcome to Chop's Secure Keys Server!")
})

app.post('/getkeys', async (req,res) => {
    try {
		const {appName} = req.body

        switch (appName) {
            case 'My Amazing App':
                res.json({
                    name: process.env.ANDROID_CLONE_NAME,
                    age: process.env.ANDROID_CLONE_AGE,
                    country: process.env.ANDROID_CLONE_COUNTRY
                })
                break
            case 'My Beautiful App':
                res.json({
                    name: process.env.INSTAGRAM_CLONE_NAME,
                    age: process.env.INSTAGRAM_CLONE_AGE,
                    country: process.env.INSTAGRAM_CLONE_COUNTRY
                })
                break
        
            default:
                res.json({
                    message: 'No secrets found for app'
                })
                break
        }

    } catch (error) {
        console.error(error)
        res.status(500).json({message: 'Internal server error'})
    }
})

app.listen(PORT, () => console.log(`Secure Keys Server running on port ${PORT}`))