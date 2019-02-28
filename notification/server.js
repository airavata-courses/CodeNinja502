var bodyParser = require('body-parser');
var amqp = require('amqplib/callback_api');

var express = require('express'),
    path = require('path'),
    nodeMailer = require('nodemailer');

    var app = express();
    var port = 9898;
    app.use(bodyParser.urlencoded({extended: true}));
    app.use(bodyParser.json());

    app.get('/', function (req, res) {
    res.render('index');
    });
amqp.connect('amqp://localhost', function(err, conn) {
  conn.createChannel(function(err, ch) {
    var q = 'hello';

    ch.assertQueue(q, {durable: false});
    console.log(" [*] Waiting for messages in %s. To exit press CTRL+C", q);
    ch.consume(q, function(msg) {
        var res = JSON.parse(msg);
        let transporter = nodeMailer.createTransport({
            host: 'smtp.gmail.com',
            port: 465,
            secure: true,
            auth: {
                user: 'xxx@gmail.com',
                pass: 'xxxxxxx'
            }
        });
        let mailOptions = {
            from: '"ProjectHub" <xxx@gmail.com>', // sender address
            to: res.to, // list of receivers
            subject: res.subject, // Subject line
            text: res.text, // plain text body
        };

        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                return console.log(error);
            }
            console.log('Message %s sent: %s', info.messageId, info.response);
            res.json({result : 'success'});
            });
        }); 
      app.listen(port, function(req, res){
        console.log('Server is running at port: ',port);
        //console.log(" [x] Received %s", msg.content.toString());
      }, {noAck: true});
    });
});


