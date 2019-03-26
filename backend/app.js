const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const passport = require('passport');
const config = require('./db');
const cors = require("cors");
//var consul = require("consul")();
require('./models/User');

mongoose.connect(config.DB, { useNewUrlParser: true }).then(
    () => {console.log('Database is connected') },
    err => { console.log('Can not connect to the database'+ err)}
);


const users = require('./routes/user'); 
const upload = require('./routes/upload');

const app = express();
app.use(cors());

app.use(passport.initialize());
require('./passport')(passport);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/api/users', users);
app.use('/upload',upload);

app.get('/', function(req, res) {
    res.send('hello');
});
let details = {
	name: 'login_service',
	address : '',
	check:{
		http : 'http://localhost:5000',
		interval: '10s',
		deregistercriticalserviceafter:'1m'
	}
};
/*consul.agent.service.register(details, function(err){
	if(err) throw err;
})*/
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
//Testing webhook
