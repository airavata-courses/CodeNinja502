const express = require('express');
const cors = require("cors");
const axios = require('axios')
const bodyParser = require('body-parser');

const app = express();
app.use(cors());
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
//app.use('/api/users', users);
//routes.initialize(app);
var multipart = require('connect-multiparty');
var multipartMiddleware = multipart();

app.post('/api/users/register', function(req, res) {
	console.log(req.body);
  axios.post('http://149.165.170.76:5000/api/users/register', req.body)
	.then((response)=>{
		//console.log(response)
		res.json(response.data);
	}).catch((error)=> {
		console.log("ERROR>>>>>>"+error.response.data)
		//error.json( ).then(error_data => console.log(error_data))
		res.status(error.response.status).send(error.response.data);
	})
})

app.post('/api/users/login', (req, res) => {
	console.log(req.body);
  axios.post('http://149.165.170.76:5000/api/users/login', req.body)
        .then((response)=>{
		//console.log(response.body);
                res.json(response.data);
        }).catch((error)=> {
		//console.log(error); 
                res.status(error.response.status).send(error.response.data);

        })
})

app.post('/rpc',(req, res) => {
  axios.post('http://149.165.156.133:8082/rpc', req.body)
        .then((response)=>{
                res.json(response.data);
        }).catch((error)=> {
                res.status(error.response.status).send(error.response.data);
        })
})
app.get('/', function(req, res) {
    res.send('hello');
});
app.get('/getLinks',(req, res) => {
  axios.get('http://149.165.169.156:9090/getLinks')
	.then((response) => {
		res.json(response.data)
	}).catch((error)=> {
		res.status(error.response.status).send(error.response.data);
	})

})

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
