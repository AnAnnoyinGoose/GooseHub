const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const app = express();
const port = process.env.PORT || 80;

const jsonParser = express.json();

// login function that checks the users.json file
// for the username (u) and password (p)
// returns true if the user exists, false otherwise
const login = (u,p) => {
    const users = require('./users.json');
    for (let i = 0; i < users.length; i++) {
        console.log(users[i]);
        if (users[i].u === u && users[i].p === p) {
            console.log('Logged in as ' + u);

            return true;
        }
    }


}


// link Stylesheet
app.use(express.static("public"));
app.use(express.urlencoded({extended: true}));
app.get('/', (req, res) => {
    res.sendFile(__dirname + '/index.html');
});

// get the data from the form in public/FTP/login.html
app.post('/login', (req, res) => {
    const { uname, psw } = req.body;
    // log
    console.log(uname, psw);
    if (login(uname, psw)) {
        res.redirect('/FTP/sftp.html');
    }
    else {
        // reload the page
        res.redirect('/FTP/login.html');
    }


});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}`);
});