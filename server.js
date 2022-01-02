require('dotenv').config();
const express = require('express');
const app = express();
const mongoose = require('mongoose')
const ShortUrlModel = require('./models/urlSchema');
// nano ID
const { nanoid } = require('nanoid');
// static files
// middleware
app.use(express.static('./public/'))
app.use(express.urlencoded({ extended: false }))
app.use(express.json());
// port number
const PORT = process.env.PORT || 3000;

// Database connection 
const url = process.env.MONGO_URL;
mongoose.connect(url).then(() => console.log('Mongoose Connected')).catch((err) => console.error(err));



app.set('view engine', 'hbs')



// @get  
app.get('/', (req, res) => {
    res.render('index');
})

// @post

app.post('/', async (req, res) => {
    try {
        const { fullUrl } = req.body;
        const urlExist = await ShortUrlModel.findOne({ fullUrl })
        if (urlExist) {
            res.render('index', { openImg: 'openImg', fullUrl, shortUrl: `https://urqr.herokuapp.com/${urlExist.shortId}`, qrCode: urlExist.qrCode, message: "URL and QR Code Is Generated" })
            return
        } else {
            const shortId = nanoid(10);
            const qrCode = `https://api.qrserver.com/v1/create-qr-code/?size=300x300&data=https://urqr.herokuapp.com/${shortId}`
            const shortUrl = new ShortUrlModel({ fullUrl, shortId, qrCode })
            const result = await shortUrl.save();
            res.render('index', {
                openImg: 'openImg',
                fullUrl,
                shortUrl: `https://urqr.herokuapp.com/${result.shortId}`,
                qrCode: result.qrCode,
                message: "URL and QR Code Is Generated"
            })
        }
    } catch (err) {
        res.render('index', { message: 'Fields Are Empty !' })
    }
})

app.get('/:shortId', async (req, res) => {
    try {
        const { shortId } = req.params
        const result = await ShortUrlModel.findOne({ shortId })
        if (!result) {
            res.redirect('/');
            return;
        }
        res.redirect(result.fullUrl);
    } catch (err) {
        console.log(err)
    }
})

// listen
app.listen(PORT, () => {
    console.log(`Listening at ${PORT}`)
})