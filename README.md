## 🧾 API 명세서 - 퀴즈 서버 (`https://week12-api-1cc7.onrender.com`)

### 📋 1. 퀴즈 질문 목록 조회

* **URL**: `/api/questions`

* **Method**: `GET`

* **설명**: 퀴즈 질문 리스트를 가져옵니다. 각 질문에는 정답 정보가 포함되어 있지 않습니다.

* **Response (200 OK)**:

```json
[
  {
    "id": 0,
    "question": "정선빈의 생일은?",
    "answers": ["2003.04.11", "2004.03.11", "2003.06.03"]
  },
  {
    "id": 1,
    "question": "이주영의 학과는?",
    "answers": ["소프트웨어학부", "경영학부", "예술공학부"]
  }
  // ...
]
```

---

### 📝 2. 퀴즈 답안 제출

* **URL**: `/api/answers`

* **Method**: `POST`

* **설명**: 유저가 선택한 퀴즈 답안을 제출하여 채점 결과를 받습니다.

* **Request Body (application/json)**:

```json
{
  "answers": [
    { "id": 0, "answer": "2003.04.11" },
    { "id": 1, "answer": "예술공학부" },
    { "id": 2, "answer": "forsxygrave" },
    { "id": 3, "answer": "HyperText Markup Language" },
    { "id": 4, "answer": "8" }
  ]
}
```

* **Response (200 OK)**:

```json
{
  "results": [
    { "id": 0, "correct": true },
    { "id": 1, "correct": true },
    { "id": 2, "correct": true },
    { "id": 3, "correct": true },
    { "id": 4, "correct": true }
  ]
}
```

* **오류 응답 (예시)**:

```json
{
  "error": "정확히 5개의 답안을 제출해야 합니다."
}
```

---

### 🏁 3. 점수에 따른 결과 메시지 조회

* **URL**: `/api/result?score={score}`

* **Method**: `GET`

* **Query Parameter**:

  * `score` (required): `0`\~`5` 범위의 정수

* **Response (200 OK)**:

```json
{
  "score": 4,
  "message": "👍 거의 다 맞았어요!"
}
```

* **오류 응답 (400 Bad Request)**:

```json
{
  "error": "score는 0부터 5 사이의 숫자여야 합니다."
}
```

---

## ✅ 점수별 메시지 목록

| 점수 | 메시지             |
| -- | --------------- |
| 5  | 🥳 만점이에요! 완벽해요! |
| 4  | 👍 거의 다 맞았어요!   |
| 3  | 🙂 절반 이상 맞췄어요!  |
| 2  | 😐 조금 더 공부해봐요!  |
| 1  | 😅 하나만 맞았어요!    |
| 0  | 2의 3제곱을 몰라요?    |

---
