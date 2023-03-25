const express = require('express');
const cors = require('cors');
const internshala = require('./Scrapper/internshala');
const indeed = require('./Scrapper/indeed');
const naukri = require('./Scrapper/naukri');
const app = express();

const PORT = 4000;

app.use(cors());

app.get('/internshala/:keyword', async(req, res) => {

    const { keyword } = req.params;
    console.log(keyword);
    try {

        // Add cron job
        await internshala(keyword);

        const internshalalatestData = require(`./Scrapper/data/internshala-${keyword}`);

        res.status(200).json({
            status: true,
            data: internshalalatestData
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

});

app.get('/naukri/:keyword', async(req, res) => {

    const { keyword } = req.params;
    console.log(keyword);
    try {

        await naukri(keyword);

        const naukriLatestData = require(`./Scrapper/data/naukri-${keyword}`);

        res.status(200).json({
            status: true,
            data: naukriLatestData
        })

    } catch (err) {
        res.status(404).json({
            status: false,
            data: err
        })
    }
});



app.listen(PORT, () => {
    console.log("Server Connected on PORT: " + PORT);
});