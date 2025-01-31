// Step1 : 프론트 화면을 위한 서버 설정
const express = require('express');
const nunjucks = require('nunjucks');
const app = express();

app.set('view engine', 'html');
nunjucks.configure('views', { express: app });

app.get('/', (req, res, next) => {
  res.render('index.html');
});

app.listen(3005, () => {
  console.log(`Front Server open`);
});
