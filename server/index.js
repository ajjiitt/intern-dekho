const express = require('express');
const cors = require('cors');
const app = express();

const PORT = 4000;

app.use(cors());




app.listen(PORT, () => {
    console.log("Server Connected on PORT: " + PORT);
});