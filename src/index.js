require('dotenv').config();
const express = require('express');
const fs = require('fs');
const htmlCreator = require('html-creator');	

const app = express();
const port = process.env.PORT || 3000;
const bingos = fs.readFileSync('src/data/bingo.config', 'utf8').split('\n');

function getRandom(arr, n) {
	var result = new Array(n),
			len = arr.length,
			taken = new Array(len);
	while (n--) {
			var x = Math.floor(Math.random() * len);
			result[n] = arr[x in taken ? taken[x] : x];
			taken[x] = --len in taken ? taken[len] : len;
	}
	return result;
}

app.get('/css', (req, res) => {
	var options = {
		root: __dirname
	}
	
	res.sendFile('style.css', options);
});

app.get('/', (req, res) => {
	bingoVal = getRandom(bingos, 25);
	
	var html = new htmlCreator([
		{ type: 'head', content: [
			{ type: 'title', content: 'Bullshit Bingo' },
			{ type: 'script', content: 'function Change(node){\n'+
				'if (node.className == "on"){' + '\n' + 'node.className="";}' + '\n' + 'else {node.className="on";}}'},
			{ type: 'link rel=\"stylesheet\" href=\"http://'+req.headers.host+'/css"'}]
		},
		{
			type: 'body',
			attributes: { style: 'padding: 1rem' },
			content: [
				{ type: 'table'}
		]}
	]);

	//create table content
	j = 0;
	for (i=0;i<5;i++) {
		
		//create table-row id
		trname = 'tr' + i;
		
		//create table-rows
		html.document.addElementToType('table', {
			type: 'tr', 
			attributes: { id: trname }
		});

		//create table-data
		for (k=0;k<5;k++) {
			html.document.addElementToId(trname, {
				type: 'td onclick="Change(this)"',
				content: bingoVal[j]
			});
			j++
		}
	}
		
	res.send(html.renderHTML());
});

app.listen(port, () =>
  console.log('bullshitbingo Started'),
);