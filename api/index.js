const cors = require('cors');
app.use(cors());

const express = require('express');
const app = express();
const port = 3000;

// JSON 본문을 파싱하기 위한 미들웨어
app.use(express.json());

const questions = [
  {
    question: "정선빈의 생일은?",
    answers: ["2003.04.11", "2004.03.11", "2003.06.03"],
    correct: "2003.04.11"
  },
  {
    question: "이주영의 학과는?",
    answers: ["소프트웨어학부", "경영학부", "예술공학부"],
    correct: "예술공학부"
  },
  {
    question: "멋사 13기 프론트엔드 파트장님의 인스타그램 아이디는?",
    answers: ["f0rsxygrav2", "forsxygrave", "forsxygreve"],
    correct: "forsxygrave"
  },
  {
    question: "HTML은 무엇의 약자인가?",
    answers: ["HyperText Markup Language", "HyperTime Machine Learning", "High Tech Made Language"],
    correct: "HyperText Markup Language"
  },
  {
    question: "2의 3제곱은?",
    answers: ["8", "6", "9"],
    correct: "8"
  }
];

// 질문 목록 반환
app.get('/api/questions', (req, res) => {
  const questionsWithoutAnswers = questions.map(({ question, answers }, index) => ({
    id: index,
    question,
    answers
  }));
  res.json(questionsWithoutAnswers);
});

// 답안 제출 처리
app.post('/api/answers', (req, res) => {
  const userAnswers = req.body.answers;

  if (!Array.isArray(userAnswers)) {
    return res.status(400).json({ error: "answers는 배열이어야 합니다." });
  }

  if (userAnswers.length !== questions.length) {
    return res.status(400).json({ error: `정확히 ${questions.length}개의 답안을 제출해야 합니다.` });
  }

  // 모든 항목이 id, answer 형식을 가졌는지 확인
  const allValid = userAnswers.every(({ id, answer }) => 
    typeof id === 'number' && typeof answer === 'string'
  );

  if (!allValid) {
    return res.status(400).json({ error: "각 답안은 { id: number, answer: string } 형식이어야 합니다." });
  }

  const results = userAnswers.map(({ id, answer }) => {
    const question = questions[id];
    if (!question) {
      return { id, correct: false, error: "잘못된 질문 ID" };
    }
    return {
      id,
      correct: answer === question.correct
    };
  });

  res.json({ results });
});

app.get('/api/result', (req, res) => {
  const score = parseInt(req.query.score, 10);

  if (isNaN(score) || score < 0 || score > 5) {
    return res.status(400).json({ error: "score는 0부터 5 사이의 숫자여야 합니다." });
  }

  let message = "";
  switch (score) {
    case 5:
      message = "🥳 만점이에요! 완벽해요!";
      break;
    case 4:
      message = "👍 거의 다 맞았어요!";
      break;
    case 3:
      message = "🙂 절반 이상 맞췄어요!";
      break;
    case 2:
      message = "😐 조금 더 공부해봐요!";
      break;
    case 1:
      message = "😅 하나만 맞았어요!";
      break;
    case 0:
      message = "2의 3제곱을 몰라요?";
      break;
  }

  res.json({ score, message });
});

app.listen(port, () => {
  console.log(`✅ 서버가 http://localhost:${port} 에서 실행 중입니다.`);
});
