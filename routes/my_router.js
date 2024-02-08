var express = require('express');
var router = express.Router();
const project_root = require("../project_root").project_root;

router.get('/get_test', function(req, res) {
  res.send('GET: communication appears to be working');
});

router.post('/post_test', function(req, res) {
  res.send(`POST test: the server recieved this msg: ${req.body.msg}`);
});



router.get('/threeAssets/:filename', function(req, res) {
  res.sendFile(project_root + "/public/threeAssets/" + req.params.filename)
})

router.get('/:filename', function(req, res) {
  res.sendFile(project_root + "/public/" + req.params.filename)
})

router.get('/', function(req, res){
   res.sendFile(project_root + '/public/main.html');
});

module.exports = router;