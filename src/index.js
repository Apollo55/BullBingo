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
			{ type: 'table', content: [
				{ type: 'caption', content: 'Sandras Sadistisches Bullshit Bingo'},
				{ type:'tr',content: [
					{type: 'td onclick="Change(this)"', content: bingoVal[0]},
					{type: 'td onclick="Change(this)"', content: bingoVal[1]},
					{type: 'td onclick="Change(this)"', content: bingoVal[2]},
					{type: 'td onclick="Change(this)"', content: bingoVal[3]},
					{type: 'td onclick="Change(this)"', content: bingoVal[4]},
				]},
				{ type:'tr', content: [
					{type: 'td onclick="Change(this)"', content: bingoVal[5]},
					{type: 'td onclick="Change(this)"', content: bingoVal[6]},
					{type: 'td onclick="Change(this)"', content: bingoVal[7]},
					{type: 'td onclick="Change(this)"', content: bingoVal[8]},
					{type: 'td onclick="Change(this)"', content: bingoVal[9]},
				]},
				{ type:'tr', content: [
					{type: 'td onclick="Change(this)"', content: bingoVal[10]},
					{type: 'td onclick="Change(this)"', content: bingoVal[11]},
					{type: 'td onclick="Change(this)"', content: bingoVal[12]},
					{type: 'td onclick="Change(this)"', content: bingoVal[13]},
					{type: 'td onclick="Change(this)"', content: bingoVal[14]},
				]},
				{ type:'tr', content: [
					{type: 'td onclick="Change(this)"', content: bingoVal[15]},
					{type: 'td onclick="Change(this)"', content: bingoVal[16]},
					{type: 'td onclick="Change(this)"', content: bingoVal[17]},
					{type: 'td onclick="Change(this)"', content: bingoVal[18]},
					{type: 'td onclick="Change(this)"', content: bingoVal[19]},
				]},
				{ type:'tr', content: [
					{type: 'td onclick="Change(this)"', content: bingoVal[20]},
					{type: 'td onclick="Change(this)"', content: bingoVal[21]},
					{type: 'td onclick="Change(this)"', content: bingoVal[22]},
					{type: 'td onclick="Change(this)"', content: bingoVal[23]},
					{type: 'td onclick="Change(this)"', content: bingoVal[24]},
				]},
			]},
	]}
	]);
	
	newhtml = html.renderHTML();
	
	res.send(newhtml);
});

app.listen(port, () =>
  console.log('bullshitbingo Started'),
);
