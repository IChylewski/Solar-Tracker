const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");
const { application } = require("express");

const Particle = require("particle-api-js");
const particle = new Particle();

const deviceID = 'e00fce684e8083453f49b051';
const token = 'c2a708646d896a5bccba1d7418fde915e50f7ffe';

const db = mysql.createPool({
    host: 'mysql5044.site4now.net',
    user: 'a8d664_solartr',
    password: 'L1o2l345!',
    database: 'db_a8d664_solartr'
});

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());
app.use(cors());


app.post('/api/login', (req, res) => {

    const login = req.body.login;
    const password = req.body.password;

    const sqlPost = "SELECT Password FROM Users WHERE Login=?";

    db.query(sqlPost, [login], (err, result, fields) => {
        if (result[0].Password === password) {
            res.send(true);
        }
        else {
            res.send(false);
        }
    })
});

app.get('/api/dailystat', (req, res) => {

    const sqlGet = "SELECT * FROM dailystats";

    db.query(sqlGet, (err, result) => {
        res.send(result);
    })
})



app.listen(3001, () => {

    /*particle.getVariable({ deviceId: deviceID, name: 'solar panel one volt', auth: token}).then( (data) => {
        console.log(data.body.result);
    })

    particle.getVariable({ deviceId: deviceID, name: 'solar panel two volt', auth: token}).then( (data) => {
        console.log(data.body.result);
    })*/
    getPanelsValues();
    setInterval(getPanelsValues, 60000)
    console.log("running on port 3001");
})


// Particle

//const devicesPr = particle.listDevices({ auth: token });

function getPanelsValues() {
    let solarPanelOneValues = [];
    let solarPanelTwoValues = [];
    let counter = 0;


    var interval = setInterval(() => {
        if (counter > 10) {

            solarPanelOneAvg = solarPanelOneValues.reduce((a,b) => a+b, 0) / solarPanelOneValues.length;
            solarPanelTwoAvg = solarPanelTwoValues.reduce((a,b) => a+b, 0) / solarPanelTwoValues.length;

            const dateTime = new Date().toISOString().slice(0, 19).replace("T", " ");
            const date = dateTime.slice(0,10);
            const time = dateTime.slice(11,19);

            //console.log(solarPanelOneAvg);
            //console.log(solarPanelTwoAvg);

            let sqlPost = `INSERT INTO test2 VALUES (?,?,?,?,?)`;

            db.query(sqlPost, [null,time, date, solarPanelOneAvg, solarPanelTwoAvg], (err, result) => {
                //console.log("Results " + result);
                console.log("Errors " + err)
                console.log("Entry  has been added");
            })
            //post1
            //post2

            clearInterval(interval);
        }

        console.log(counter);

        particle.getVariable({ deviceId: deviceID, name: 'solar panel one volt', auth: token }).then((data) => {
            //console.log("Solar Panel One" + data.body.result);

            solarPanelOneValues.push(data.body.result);
        })

        particle.getVariable({ deviceId: deviceID, name: 'solar panel two volt', auth: token }).then((data) => {
            //console.log("Solar Panel Two" + data.body.result);
            solarPanelTwoValues.push(data.body.result);
        })

        counter += 1;
    }, 5000);

    /*for(let i  = 0; i < 10; i++){

        let solarPanelOneValue = 0;
        let solarPanelTwoValue = 0;

        setTimeout(function() {

            particle.getVariable({ deviceId: deviceID, name: 'solar panel one volt', auth: token}).then( (data) => {
                solarPanelOneValue = data.body.result;
            })

            particle.getVariable({ deviceId: deviceID, name: 'solar panel two volt', auth: token}).then( (data) => {
                solarPanelTwoValue = data.body.result;
            })

            //solarPanelOneValues.push(solarPanelOneValue);
            //solarPanelTwoValues.push(solarPanelTwoValue);

            console.log(solarPanelOneValue);
            console.log(solarPanelTwoValue);

        }, 2000)
    }*/

    //solarPanelOneAvg = solarPanelOneValues.reduce((a,b) => a+b, 0) / solarPanelOneValues.length;
    //solarPanelTwoAvg = solarPanelTwoValues.reduce((a,b) => a+b, 0) / solarPanelTwoValues.length;

    // post1
    // post2

    //console.log(solarPanelOneAvg);
    //console.log(solarPanelTwoAvg);

}



