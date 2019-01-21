const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');

mongoose.connect(
    "mongodb://localhost:27017/facebook_clone", function(err, res){
		if (err) throw err ;
			
		console.log('monoggose connected');
	}
);
/*import storage from 'node-persist';

storage.init({
  dir: 'data',
  stringify: JSON.stringify,
  parse: JSON.parse,
  encoding: 'utf8',
}).then(() => {
  console.log('storage initialized');
}).catch((e) => {
  console.log('storage initialization failed');
  console.error(e);
});*/

const app = express();


var EditorSchema = new mongoose.Schema({
	content: String
	
});

var Editor = mongoose.model("Editor", EditorSchema);
module.exports = Editor;

app.use(bodyParser.json())

/*app.get('/content', (req, res) => {
  storage.getItem('content', (err, val) => {
    res.json(val || null);
	console.log(req.body.val);
	
  });
});

app.post('/content', (req, res) => {
  storage.setItem('content', req.body.content, (err, val) => {
    res.json({ok: true});
	console.log(req.body.content);
  });
});
*/
app.post('/content', (req, res) => {
  var newEditor = new Editor({
  content: req.body.content
});

newEditor.save( function(error, data){
    if(error){
        res.json(error);
    }
    else{
        res.json(data);
    }
});
});

app.listen(3001);
console.log('listening on http://localhost:3001');
