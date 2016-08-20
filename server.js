var express = require('express');
var request = require('request');
var fs = require('fs');
var app = express();
app.set('port', process.env.PORT || 8080);
app.set('host', process.env.HOST || '127.0.0.1');


app.use(express.static('./public'));

app.get('/portfolio', (req, res) => {
  fs.readFile('pdata.json','utf8', (err, data) => {
    if(err) throw err;
    console.log(JSON.parse(data));
    res.send(JSON.parse(data));
  });
});

app.listen(app.get('port'),app.get('host'), ()=>{
  console.log('express listening on port ' + app.get('port'));
});
