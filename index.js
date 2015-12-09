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

app.post('/fbredirect', function(req, res,next){
    var link = req.query.fb_ref;
    if(link.indexOf("dailynoti") != -1){
      i = link.indexOf("notifications")+14
      linkredirect = link.slice(link.indexOf("http"),i);
      params = link.slice(i,link.length);
      parray = params.split(",");
      rspStr = "Bạn có "
      if(parray[0] != "0"){
        rspStr += parray[0] + " yêu cầu mượn sách bị từ chối, "
      }
      if(parray[1] != "0"){
        rspStr += parray[1] + " yêu cầu mượn sách được đồng ý, "
      }
      if(parray[2] != "0"){
        rspStr += parray[2] + " tin nhắn mới"
      }
      res.render( 'dailynoti.html', {redir: linkredirect, str:rspStr});
    }
    else
      res.render( 'fbredirect.html', {redir: link});
});

app.post('/dailynoti', function(req, res,next){
    var link = req.query.fb_ref;
    console.log(link);
    i = link.indexOf("notifications")+14
    linkredirect = link.slice(0,i);
    params = link.slice(i,link.length);
    parray = params.split(",");
    // res.redirect(next,link);
    // window.open(link, '_top');
    // res.send('ok');
});

app.listen(app.get('port'), function() {
  console.log('Node app is running on port', app.get('port'));
});
