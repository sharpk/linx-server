var express = require('express');
var ref = require('ref');
var ArrayType = require('ref-array');
var ffi = require('ffi');

var app = express();

var uint8 = ref.types.uint8;
var UCharArray = ArrayType(uint8);

var liblinx = ffi.Library('liblinxdevice_rpi2', {
  'LinxOpen': [ 'int', [] ],
  'LinxClose': [ 'int', [] ],
  'LinxDigitalReadNoPacking': ['int', ['uint8', UCharArray, UCharArray] ],
  'LinxDigitalWriteNoPacking': ['int', ['uint8', UCharArray, UCharArray] ]
});

// enable Cross Origin Resource Sharing for requests (optional)
app.use(function(req, res, next) {
  res.header("Access-Control-Allow-Origin", "*");
  next();
});

app.get('/', function (req, res) {
   res.send('LINX REST Server v1.0');
});

app.get('/linx/open', function (req, res) {
  console.log("Calling LinxOpen()");
  liblinx.LinxOpen();
  res.end("SUCCESS");
});

app.get('/linx/close', function (req, res) {
  console.log("Calling LinxClose()");
  liblinx.LinxClose();
  res.end("SUCCESS");
});

app.get('/linx/digitalread', function (req, res) {
  console.log("Calling LinxDigitalRead(), channel = %s", req.query.channel);
  chanArray = new UCharArray(1);
  chanArray[0] = parseInt(req.query.channel);
  valArray = new UCharArray(1);
  liblinx.LinxDigitalReadNoPacking(chanArray.length, chanArray, valArray);
  val = valArray[0].toString();
  console.log("Digital Read = " + val);
  res.end(val);
});

app.get('/linx/digitalwrite', function (req, res) {
  console.log("Calling LinxDigitalRead(), channel = %s, value = %s", req.query.channel, req.query.value);
  chanArray = new UCharArray(1);
  chanArray[0] = parseInt(req.query.channel);
  valArray = new UCharArray(1);
  valArray[0] = parseInt(req.query.value)
  liblinx.LinxDigitalWriteNoPacking(chanArray.length, chanArray, valArray);
  val = valArray[0].toString();
  console.log("Digital Write %s SUCESS", req.query.value);
  res.end("SUCCESS");
});

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("LINX server listening at http://%s:%s", host, port);
});

