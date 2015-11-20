var express = require('express');
var bodyParser = require('body-parser');

var app = express();
app.use(bodyParser());

app.set('port', (process.env.PORT || 5000));

app.use(express.static(__dirname + '/public'));

// views is directory for all template files
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.set('view engine', 'ejs');

app.get('/', function(request, response) {
  response.send("ok");
});

app.post('/fbredirect.html', function(req, res){
    var link = req.param.fb_ref;
    console.log(link);
    res.render( 'fbredirect.html', { redir: req.param.fb_ref });
});

var redirect = function(){
  console.log("123123123123");
};

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
