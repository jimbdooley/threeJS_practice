var express = require('express');
var app = express();

var my_router = require('./routes/my_router.js');
var asset_routes = require('./routes/asset_routes.js');
app.use(express.urlencoded({extended: true}));
app.use(express.json());
app.use(asset_routes);
app.use(my_router);

app.listen(3000, function() { console.log("listening on 3000") });
