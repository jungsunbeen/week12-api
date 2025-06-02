const express = require('express');
const app = express();
const port = 3000;

const questions = [
  {
    question: "정선빈의 생일은?",
    answers: ["2003.04.11", "2004.03.11", "2003.06.03"]
  },
  {
    question: "이주영의 학과는?",
    answers: ["소프트웨어학부", "경영학부", "예술공학부"]
  },
  {
    question: "대한민국의 수도는?",
    answers: ["서울", "부산", "대전"]
  },
  {
    question: "HTML은 무엇의 약자인가?",
    answers: ["HyperText Markup Language", "HyperTime Machine Learning", "High Tech Made Language"]
  },
  {
    question: "2의 3제곱은?",
    answers: ["8", "6", "9"]
  }
];

app.get('/api/questions', (req, res) => {
  res.json(questions);
});

app.listen(port, () => {
  console.log(`✅ 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
