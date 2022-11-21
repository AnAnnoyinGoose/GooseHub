const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port = process.env.PORT || 80;


// link Stylesheet
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});