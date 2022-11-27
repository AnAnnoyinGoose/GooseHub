// requires
const dotenv = require('dotenv');
dotenv.config();
const express = require('express');
const util = require("util");
const users = require("./users.json");
const app = express();
const port = process.env.PORT || 80;
const sftp = require('ssh2-sftp-client');
// Setup
app.use(express.static('public'));
app.use('/css', express.static(__dirname + 'public/css'))
app.use('/js', express.static(__dirname + 'public/js'))
app.use('/img', express.static(__dirname + 'public/images'))
app.use(express.urlencoded({extended: true}));
app.set('views', './views');
app.set('view engine', 'ejs');
// SFTP
const connection = new sftp();
const config = {
    host: process.env.HOST,
    port: process.env.HOSTPORT,
    username: null,
    password: null,
}
let Connect = async () => {
    try {
        await connection.connect(config);
        console.log('Connected');
    } catch (err) {
        console.error(err.message);
    }
}
let Disconnect = async () => {
    try {
        await connection.end();
        console.log('Disconnected');
    } catch (err) {
        console.error(err.message);
    }
}
let list = async () => {
    try {
        let list = await connection.list('/home/' + config.username);
        // ignore if the name starts with a dot
        list = list.filter(item => !item.name.startsWith('.'));
        // parse the list to get the file names types and sizes
        list = list.map(item => {
            return {
                name: item.name,
                type: item.type,
                size: item.size
            }
        });
        return list;
    } catch (err) {
        console.error(err.message);
    }
}


// Functions
const login = (u,p) => {
    const users = require('./users.json');
    for (let i = 0; i < users.length; i++) {
        console.log(users[i]);
        if (users[i].u === u && users[i].p === p) {


            return true;
        }
    }


}

// Navigation
app.get('', (req, res) => {
    res.render('index', { text: 'Hey' })
})
app.get('/projects', (req, res) => {
    res.render('projects')
})
app.get('/cloud', (req, res) => {
    res.render('login')
});
app.post('/cloud/login', (req, res) => {
    const {uname,psw} = req.body;
    console.log(uname,psw);
    if (login(uname,psw)) {
        // set the username for the config
        config.username = uname.toLowerCase();
        config.password = psw;
        // connect to the server
        Connect().then(() => {
            // list the files
            list().then(data => {
                // for each file create an element
                let files = '';
                data.forEach(item => {
                    files += `<div class="file"><p class="element">${item.name}</p></div>`;
                } );
                // render the page
                res.render('cloud', {username: uname, data: files});
                setTimeout(() => {
                    Disconnect();
                } , 500);
            });
        });
    } else {
        res.render('login', {error: 'Invalid Username or Password'});
    }
});

app.post('/logout', (req, res) => {
    res.render('login');
    Disconnect();
});
app.use((req, res) => {
    res.status(404).render('404');
});







app.listen(port, () => {
    console.log(`Example app listening at http://localhost:${port}\n`);
});

// wait 2second
setTimeout(() => {
    // console input (stdin)
    process.stdin.resume();
    process.stdin.setEncoding('utf8');
    process.stdin.on('data', function (text) {
        if (text === 'info\n') {
            let info = setInterval(() => {
                process.stdout.write(`\rMemory Usage: ${Math.round(process.memoryUsage().heapUsed / 1024 / 1024 * 100) / 100} MB | Uptime: ${Math.round(process.uptime())} seconds | Connected Users (to the cloud): ${Object.keys(ips).length} | IPs: ${util.inspect(ips)}\r`);
            }, 1000);
            setTimeout(() => {
                clearInterval(info);
            }, 60000);


        }


    });

// console output (stdout)
    process.stdout.write('Server is running...\n');
    process.stdout.write('Type info to get info about the server\n');

},1000);





