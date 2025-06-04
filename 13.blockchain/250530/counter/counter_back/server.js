const express = require('express');
const cors = require('cors');
const sequelize = require('./config/database');
const counterRoutes = require('./routes/counter');

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// 라우트 설정
app.use('/counter', counterRoutes);

// 데이터베이스 연결 및 서버 시작
async function startServer() {
    try {
        await sequelize.sync();
        console.log('데이터베이스 연결 성공');

        app.listen(PORT, () => {
            console.log(`서버가 포트 ${PORT}에서 실행 중입니다`);
        });
    } catch (error) {
        console.error('서버 시작 실패:', error);
    }
}

startServer(); 