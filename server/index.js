const express = require("express");
const cors = require("cors");
const internshala = require("./Scrapper/internshala");
const indeed = require("./Scrapper/indeed");
const naukri = require("./Scrapper/naukri");
const app = express();
const { linkedin } = require("./Scrapper/linkedin");
const cron = require('node-cron');


const PORT = 4000;

app.use(cors());

app.get("/internshala/:keyword", async(req, res) => {
    const { keyword } = req.params;
    console.log(keyword);
    try {
        // Add cron job
        // await internshala(keyword);

        const internshalalatestData = require(`./Scrapper/data/internshala-${keyword}`);

        res.status(200).json({
            status: true,
            data: internshalalatestData,
        });
    } catch (err) {
        res.status(404).json({
            status: false,
            data: err,
        });
    }
});

app.get("/indeed/:keyword", async(req, res) => {
    const { keyword } = req.params;
    console.log(keyword);
    try {
        // await indeed(keyword);

        const indeedLatestData = require(`./Scrapper/data/indeed-${keyword}`);

        res.status(200).json({
            status: true,
            data: indeedLatestData,
        });
    } catch (err) {
        res.status(404).json({
            status: false,
            data: err,
        });
    }
});

app.get("/naukri/:keyword", async(req, res) => {
    const { keyword } = req.params;
    console.log(keyword);
    try {
        // await naukri(keyword);

        const naukriLatestData = require(`./Scrapper/data/naukri-${keyword}`);

        res.status(200).json({
            status: true,
            data: naukriLatestData,
        });
    } catch (err) {
        res.status(404).json({
            status: false,
            data: err,
        });
    }
});


app.get("/linkedin/:keyword", async(req, res) => {
    const { keyword } = req.params;
    console.log(keyword);
    try {
        await linkedin(keyword);

        const linkedinLatestData = require(`./Scrapper/data/linkedin-${keyword.replace(" ", "-")}`);

        res.status(200).json({
            status: true,
            data: linkedinLatestData,
        });
    } catch (err) {
        res.status(404).json({
            status: false,
            data: err,
        });
    }
});


app.get('/test', async(req, res) => {

    try {
        const keywords = ["software engineer"];
        let promiseArr = []
        for (let i = 0; i < keywords.length; i++) {
            promiseArr.push(linkedin(keywords[i]));
            promiseArr.push(naukri(keywords[i]));
            promiseArr.push(internshala(keywords[i]));
            promiseArr.push(indeed(keywords[i]));
        }

        const result = await Promise.all(promiseArr)
        return res.status(200).json({
            status: true,
            data: result
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
    //schedule here
    // "0 * * * *" every hour
    cron.schedule("0 * * * *", () => {
        const keywords = ["software engineer"];
        let promiseArr = []
        for (let i = 0; i < keywords.length; i++) {
            promiseArr.push(naukri(keywords[i]));
            promiseArr.push(internshala(keywords[i]));
            promiseArr.push(indeed(keywords[i]));
            promiseArr.push(linkedin(keywords[i]));
        }

        const result = Promise.all(promiseArr);
    });



});