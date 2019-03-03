const express = require('express');
const cors = require("cors");
const axios = require('axios')

const app = express();
app.use(cors());

const router = express.Router();
router.post('/upload/upload', function(req, res) {
  axios.post('http://localhost:5000/upload/upload', req)
	.then((response) =>{
		res.json(response);
	}).catch((error)=>{
		res.status(400).json(error);
	})
})
router.post('/api/users/register', function(req, res) {
  axios.post('http://localhost:5000/api/users/register', req)
	.then((response)=>{
		res.json(response);
	}).catch((error)=> {
		res.status(400).json(error);
	})
})
router.post('/api/users/login', (req, res) => {
  axios.post('http://localhost:5000/api/users/login', req)
        .then((response)=>{
                res.json(response);
        }).catch((error)=> {
                res.status(400).json(error);
        })
})
router.post('/rpc',(req, res) => {
  axios.post('http://localhost:8082/rpc', req)
        .then((response)=>{
                res.json(response);
        }).catch((error)=> {
                res.status(400).json(error);
        })
})

router.get('/getLinks',(req, res) => {
  axios.get('http://localhost:8090/getLinks')
	.then((response) => {
		res.json(response);
	}).catch((error)=> {
		res.status(400).json(error);
	})
})
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
    console.log(`Server is running on PORT ${PORT}`);
});
