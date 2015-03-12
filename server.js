var express = require('express'),
bodyParser = require('body-parser'),
mongoose = require('mongoose');


var app = express();


app.engine('html', require('ejs').renderFile);
app.set('view engine', 'html');

app.set('views', __dirname + '/views');
app.use('/assets', express.static(__dirname + '/assets'));
app.use('/templates', express.static(__dirname + '/views/templates'));
app.use(bodyParser());

mongoose.connect("mongodb://sahanarula:helloworld@ds041157.mongolab.com:41157/wtm", function(err, connection){
	if(err) console.log(err);
	if(connection) console.log(connection);
});

var Applicant = mongoose.model('applicant', {
	name: String,
	regno: String,
	gender: String,
	phone: Number,
	knownlang: String,
	email: String,
	date: {type: Date, default: Date.now}
})

app.get('/', function(req, res){
	res.render('index');
})

app.post('/register', function(req, res){
	console.log(req.body);
	var applicant = new Applicant(req.body);
	applicant.save(function(err, applicant){
		res.status(200).json(applicant);
	});
})

app.listen(process.env.PORT || conf.port, function(){
	console.log('Listening at' + process.env.PORT);
})
