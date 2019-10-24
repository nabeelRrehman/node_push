const express = require("express");
const app = express.Router();
var gcm = require('node-gcm');

const FCM_ApiKey = 'AIzaSyBLjM87tnh3s3r2lsKIrXUTw-Ufeopl8vU'

// Set up the sender with your GCM/FCM API key (declare this once for multiple messages)
var sender = new gcm.Sender(FCM_ApiKey);
var Cron = require('cron').CronJob;



//POST REQUEST 

app.get("/", (req, res) => {

    res.json('Welcome to node push app')

})




app.post("/send", (req, res) => {

    // Prepare a message to be sent
    var message = new gcm.Message({
        collapseKey: 'demo',
        priority: 'high',
        contentAvailable: true,
        delayWhileIdle: true,
        timeToLive: 3,
        // restrictedPackageName: "com.tryggare_privat",
        dryRun: false,
        data: {
            key1: 'message1',
            key2: 'message2'
        },
        notification: {
            title: req.body.title,
            // icon: "ic_launcher",
            body: req.body.body
        }
    });

    var type = typeof req.body.token
    var regTokens

    if (type == 'string') {

        regTokens = [req.body.token];

    } else {

        regTokens = req.body.token;

    }
    // Specify which registration IDs to deliver the message to


    // Actually send the message
    sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        if (err) console.error(err);
        else res.send(response);
    });

})



async function sendScheduleNotification(title, body, token) {

    var message = new gcm.Message({
        collapseKey: 'demo',
        priority: 'high',
        contentAvailable: true,
        delayWhileIdle: true,
        timeToLive: 3,
        restrictedPackageName: "com.tryggare_privat",
        dryRun: false,
        // data: {
        //     key1: 'message1',
        //     key2: 'message2'
        // },
        notification: {
            title,
            // icon: "ic_launcher",
            body
        }
    });

    var regTokens = token;

    // Specify which registration IDs to deliver the message to


    // Actually send the message
    return sender.send(message, { registrationTokens: regTokens }, function (err, response) {
        if (err) console.error(err);
        else response;
    });
}



app.post("/schedule", (req, res) => {

    var title = req.body.title
    var body = req.body.body
    var token = req.body.token

    var date = req.body.date
    var min = new Date(req.body.date).getMinutes()
    var dat = new Date(req.body.date).getDate()
    var month = new Date(req.body.date).getMonth() + 1
    var hours = new Date(req.body.date).getHours()
    var day = new Date(req.body.date).getDay()

    switch (req.body.type) {
        case 'monthlycheck':
            var a = new Cron(new Date(date), function () {
                sendScheduleNotification(title, body, token).then(() => {
                    console.log('job done')
                    a.stop()
                })
            }, null, true);
            a.start()
            res.json('job start')
            break;

        case 'monthlyads':
            new Cron(new Date(date), function () {
                sendScheduleNotification(title, body, token).then(() => {
                    // a.stop
                })
            }, null, true);
            break;
        case 'discount':
            new Cron(new Date(date), function () {
                sendScheduleNotification(title, body, token).then(() => {
                    // a.stop
                })
            }, null, true);
            break;
        case 'online':
            new Cron(new Date(date), function () {
                sendScheduleNotification(title, body, token).then(() => {
                    // a.stop
                })
            }, null, true);
            break;
        case 'buyapp':
            new Cron(new Date(date), function () {
                sendScheduleNotification(title, body, token).then(() => {
                    // a.stop
                })
            }, null, true);
            break;

        default:
            break;
    }



})


module.exports = app;