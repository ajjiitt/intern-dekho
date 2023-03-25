const express = require('express');
const cors = require('cors');
const internshala = require('./Scrapper/internshala');
const indeed = require('./Scrapper/indeed');
const app = express();

const PORT = 4000;

app.use(cors());

app.get('/internshala/:keyword', async(req, res) => {

    const { keyword } = req.params;
    console.log(keyword);
    try {

        // Add cron job
        await internshala(keyword);

        const latestData = require(`./Scrapper/data/internshala-${keyword}`);

        res.status(200).json({
            status: true,
            data: latestData
        })

    } catch (err) {
        res.status(404).json({
            status: false,
            data: err
        })
    }


})


app.get('/indeed/:keyword', async(req, res) => {

    const { keyword } = req.params;
    console.log(keyword);
    try {

        await indeed(keyword);

        const indeedLatestData = require(`./Scrapper/data/indeed-${keyword}`);

        res.status(200).json({
            status: true,
            data: indeedLatestData
        })

    } catch (err) {
        res.status(404).json({
            status: false,
            data: err
        })
    }

})



app.listen(PORT, () => {
    console.log("Server Connected on PORT: " + PORT);
});