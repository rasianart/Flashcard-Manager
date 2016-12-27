let fs = require('fs');
let mysql = require('mysql');

let connection = mysql.createConnection({
  host     : 'localhost',
  user     : 'root',
  password : 'Loonylupin87',
  database : 'Flashcards'
});

module.exports = class ClozeFlashcard {
	constructor() {
		this.text,
		this.cloze,
		this.returnDeleted = () => {
			console.log(this.text);
		},
		this.answer = () => {
			console.log(this.text.replace('...', '') + this.cloze);
		}
		this.save = (callback) => {
			//saves to mysql database
			connection.query('INSERT INTO cloze SET ?', {text: this.text, cloze : this.cloze}, function(err, rows, fields) {
			  if (err) throw err;
			  console.log('Succesfully Inserted Into Database');
			  callback && callback();
			});
			// saves locally to text file
			fs.appendFile('cloze_flashcards.txt', JSON.stringify(this), (error, data) => {
				console.log("Succesfully added to local txt file!");
			});
		},
		this.fetchQuestion = (callback) => {
			//fetches random question
			connection.query('SELECT * FROM cloze ORDER BY RAND() LIMIT 1', function(err, rows, fields) {
			  if (err) throw err;
			  let dataArr = [];
			  dataArr.push(rows[0].text);
			  dataArr.push(rows[0].cloze);
			  callback && callback(dataArr);
			});
		}
	}
}



