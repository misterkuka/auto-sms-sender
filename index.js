var express = require('express');
var cors = require('cors')
var app = express();


var axios = require('axios');
app.use(express.json({extended: false})); 
app.use(cors())


app.post('/', function (req, res) {
    var data = JSON.stringify({
        "from": req.body.from,
        "to": req.body.to,
        "body": req.body.message
      });
      
      var config = {
        method: 'post',
        url: "https://us.sms.api.sinch.com/xms/v1/" + req.body.accountID + "/batches",
        headers: { 
          'Authorization': 'Bearer ' + req.body.authKey, 
          'Content-Type': 'application/json'
        },
        data : data
      };
      
      axios(config)
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error);
      });
})

app.post('/cgs', function (req, res) {
    const apiURL = new URL("https://cheapglobalsms.com/api_v1");

  apiURL.searchParams.append("message", req.body.message);
  apiURL.searchParams.append("sender_id", req.body.sendersID);
  apiURL.searchParams.append("action", "send_sms");
  apiURL.searchParams.append("recipients", req.body.number);
  apiURL.searchParams.append("sub_account", req.body.accountID)
  apiURL.searchParams.append("sub_account_pass", req.body.authKey)

    var config = {
        method: 'get',
        url: apiURL.href
      };
      
      axios(config)
      .then(function (response) {
        res.send(response.data);
      })
      .catch(function (error) {
        res.send(error.message);
      });
      
})

var server = app.listen(process.env.PORT || 80, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})
