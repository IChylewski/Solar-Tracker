const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const cors = require("cors");
const mysql = require("mysql");

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

app.listen(3001, () => {
    console.log("running on port 3001");
})