require('dotenv').config();
const crypto = require('crypto');
const express = require('express');
const fs = require('fs');
const htmlCreator = require('html-creator');

const app = express();
const port = process.env.PORT;
const bingos = fs.readFileSync('src/data/bingo.txt', 'utf8').split('\n');
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
		{ type: 'title', content: 'Bulshit Bingo' },
		{type: 'link rel=\"stylesheet\" href=\"http://'+req.headers.host+'/css"'}]
		},
	{
		type: 'body',
		attributes: { style: 'padding: 1rem' },
		content: [
			{ type: 'table', content: [
				{ type: 'caption', content: 'Sandras Sadistisches Bulshit Bingo'},
				{ type:'tr',content: [
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
				]},
				{ type:'tr', content: [
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
				]},
				{ type:'tr', content: [
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
				]},
				{ type:'tr', content: [
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
				]},
				{ type:'tr', content: [
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
					{type: 'td', content: getRandomBingo(bingoCoppy)},
				]},
			]},
	]}
	]);

	filePath = 'src/data/temp/'+crypto.randomBytes(32).toString('hex')+'.html';
	//html.renderHTMLToFile(filePath);
	
	newhtml = html.renderHTML();
	fs.writeFile(filePath, newhtml, function (err) {
		if (err) throw err;
		console.log('Saved!');
	});
	
	res.send(newhtml);
	//res.sendFile(filePath,'Bulschit-Bingo.html');
});

app.listen(port, () =>
  console.log('bulshitbingo Started'),
);