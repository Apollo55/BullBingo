require('dotenv').config();
const express = require('express');
const fs = require('fs');
const htmlCreator = require('html-creator');

const app = express();
const port = process.env.PORT || 3000;
const bingos = fs.readFileSync('src/data/bingo.config', 'utf8').split('\n');
console.log(bingos);

function getRandomBingo(datas){
	i = Math.floor(Math.random() * datas.length);
	console.log(i);
	var item = datas[i];
	console.log(datas);

	datas.splice(i,1);
	console.log(item);
	return item;
}

app.get('/css', (req, res) => {
	var options = {
		root: __dirname
	}
	
	res.sendFile('style.css', options);
});

app.get('/', (req, res) => {
	bingoCoppy = [...bingos];
	console.log(bingoCoppy);
	
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
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
				]},
				{ type:'tr', content: [
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
				]},
				{ type:'tr', content: [
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
				]},
				{ type:'tr', content: [
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
				]},
				{ type:'tr', content: [
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
					{type: 'td onclick="Change(this)"', content: getRandomBingo(bingoCoppy)},
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
