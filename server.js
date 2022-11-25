const dotenv = require('dotenv');
dotenv.config();

const express = require('express');
const util = require("util");
const app = express();
const port = process.env.PORT || 80;

const jsonParser = express.json();

const ips = {};

// login function that checks the users.json file
// for the username (u) and password (p)
// returns true if the user exists, false otherwise
const login = (u,p) => {
    const users = require('./users.json');
    for (let i = 0; i < users.length; i++) {
        console.log(users[i]);
        if (users[i].u === u && users[i].p === p) {


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
        console.log('Logged in as ' + uname + ' From IP: ' + req.ip);
        //push the ip to the ips object with the username as the key
        ips[uname] = req.ip;
        res.redirect('/FTP/sftp.html');
    }
    else {
        // reload the page
        res.redirect('/FTP/login.html');
    }


});



app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}\n`);
});

// wait 3seconds
setTimeout(() => {
    // console input (stdin)
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (text) {
        if (text === 'info\n') {
            let info = setInterval(() => {
                process.stdout.write(`\rMemory Usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB | Uptime: ${Math.round(process.uptime())} seconds | Connected Users (to the cloud): ${Object.keys(ips).length} | IPs: ${util.inspect(ips)}\r`);
            }, 1000);

        }
        else if (text === '\n') {
            clearInterval('info');
        }

    });

// console output (stdout)
    process.stdout.write('Server is running...\n');
    process.stdout.write('Type info to get info about the server\n');

})



