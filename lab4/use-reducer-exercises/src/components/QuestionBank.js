import React, { useReducer, useEffect } from "react";
import { Button, Container, Card, ProgressBar, Alert } from "react-bootstrap";
import { FaCheckCircle, FaTimesCircle } from "react-icons/fa";
const initialState = {
  questions: [
    {
      id: 1,
      question: "What is the capital of Australia?",
      options: ["Sydney", "Canberra", "Melbourne", "Perth"],
      answer: "Canberra",
    },
    {
      id: 2,
      question: "Which planet is known as the Red Planet?",
      options: ["Venus", "Mars", "Jupiter", "Saturn"],
      answer: "Mars",
    },
    {
      id: 3,
      question: "What is the largest ocean on Earth?",
      options: [
        "Atlantic Ocean",
        "Indian Ocean",
        "Pacific Ocean",
        "Arctic Ocean",
      ],
      answer: "Pacific Ocean",
    },
  ],
  currentQuestion: 0,
  selectedOption: "",
  score: 0,
  showScore: false,
  showFeedback: false,
  isCorrect: false,
  timeLeft: 10,
  highScore: 0,
};

function quizReducer(state, action) {
  switch (action.type) {
    case "SELECT_OPTION":
      return { ...state, selectedOption: action.payload };

    case "SUBMIT_ANSWER":
      const isCorrect =
        state.selectedOption === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        showFeedback: true,
        isCorrect: isCorrect,
        score: isCorrect ? state.score + 1 : state.score,
      };

    case "NEXT_QUESTION":
      const nextQuestion = state.currentQuestion + 1;
      const isLastQuestion = nextQuestion === state.questions.length;
      
      // Update high score if current score is higher
      const newHighScore = Math.max(state.score, state.highScore);
      
      return {
        ...state,
        currentQuestion: nextQuestion,
        selectedOption: "",
        showFeedback: false,
        showScore: isLastQuestion,
        timeLeft: 10,
        highScore: isLastQuestion ? newHighScore : state.highScore,
      };

    case "RESTART_QUIZ":
      return {
        ...initialState,
        highScore: state.highScore, // Preserve high score
      };

    case "TICK_TIMER":
      return {
        ...state,
        timeLeft: state.timeLeft > 0 ? state.timeLeft - 1 : 0,
      };

    case "TIME_UP":
      const isCorrectOnTimeUp =
        state.selectedOption === state.questions[state.currentQuestion].answer;
      return {
        ...state,
        showFeedback: true,
        isCorrect: isCorrectOnTimeUp,
        score: isCorrectOnTimeUp ? state.score + 1 : state.score,
      };

    case "LOAD_HIGH_SCORE":
      return {
        ...state,
        highScore: action.payload,
      };

    default:
      return state;
  }
}
// Component chính
function QuestionBank() {
  const [state, dispatch] = useReducer(quizReducer, initialState);
  const { 
    questions, 
    currentQuestion, 
    selectedOption, 
    score, 
    showScore, 
    showFeedback, 
    isCorrect, 
    timeLeft, 
    highScore 
  } = state;

  // Load high score from localStorage on component mount
  useEffect(() => {
    const savedHighScore = localStorage.getItem('quizHighScore');
    if (savedHighScore) {
      dispatch({ type: "LOAD_HIGH_SCORE", payload: parseInt(savedHighScore) });
    }
  }, []);

  // Timer effect
  useEffect(() => {
    if (!showScore && !showFeedback && timeLeft > 0) {
      const timer = setTimeout(() => {
        dispatch({ type: "TICK_TIMER" });
      }, 1000);
      return () => clearTimeout(timer);
    } else if (timeLeft === 0 && !showFeedback) {
      dispatch({ type: "TIME_UP" });
    }
  }, [timeLeft, showScore, showFeedback]);

  // Save high score to localStorage when quiz ends
  useEffect(() => {
    if (showScore && highScore > 0) {
      localStorage.setItem('quizHighScore', highScore.toString());
    }
  }, [showScore, highScore]);

  const handleOptionSelect = (option) => {
    if (!showFeedback) {
      dispatch({ type: "SELECT_OPTION", payload: option });
    }
  };

  const handleSubmitAnswer = () => {
    if (selectedOption) {
      dispatch({ type: "SUBMIT_ANSWER" });
    }
  };

  const handleNextQuestion = () => {
    dispatch({ type: "NEXT_QUESTION" });
  };

  const handleRestartQuiz = () => {
    dispatch({ type: "RESTART_QUIZ" });
  };

  return (
    <Container className="mt-4">
      <Card className="p-4">
        {showScore ? (
          <div className="text-center">
            <h2>
              Your Score: {score} / {questions.length}
            </h2>
            {highScore > 0 && (
              <div className="mt-3">
                <h4 className="text-success">
                  🏆 High Score: {highScore} / {questions.length}
                </h4>
              </div>
            )}
            <Button variant="primary" onClick={handleRestartQuiz}>
              Restart Quiz
            </Button>
          </div>
        ) : (
          <div>
            {/* Progress Display */}
            <div className="mb-3">
              <h5>Question {currentQuestion + 1} of {questions.length}</h5>
              <ProgressBar 
                now={((currentQuestion + 1) / questions.length) * 100} 
                label={`${currentQuestion + 1}/${questions.length}`}
                className="mb-2"
              />
            </div>

            {/* Timer Display */}
            <div className="text-center mb-3">
              <h4 className={timeLeft <= 5 ? "text-danger" : "text-primary"}>
                ⏰ {timeLeft}s
              </h4>
            </div>

            <h4>
              Question {questions[currentQuestion].id}:<br />
              {questions[currentQuestion].question}
            </h4>
            
            <div className="mt-3">
              {questions[currentQuestion].options.map((option, index) => (
                <Button
                  key={index}
                  variant={
                    selectedOption === option ? "success" : "outline-secondary"
                  }
                  className="m-2"
                  onClick={() => handleOptionSelect(option)}
                  disabled={showFeedback}
                >
                  {option}
                </Button>
              ))}
            </div>

            {/* Feedback Display */}
            {showFeedback && (
              <Alert variant={isCorrect ? "success" : "danger"} className="mt-3">
                <div className="d-flex align-items-center">
                  {isCorrect ? (
                    <>
                      <FaCheckCircle className="me-2" size={24} />
                      <strong>Correct! 🎉</strong>
                    </>
                  ) : (
                    <>
                      <FaTimesCircle className="me-2" size={24} />
                      <strong>Incorrect! The correct answer is: {questions[currentQuestion].answer}</strong>
                    </>
                  )}
                </div>
              </Alert>
            )}

            {/* Action Buttons */}
            <div className="mt-3">
              {!showFeedback ? (
                <Button
                  variant="primary"
                  disabled={!selectedOption}
                  onClick={handleSubmitAnswer}
                >
                  Submit Answer
                </Button>
              ) : (
                <Button
                  variant="primary"
                  onClick={handleNextQuestion}
                >
                  {currentQuestion === questions.length - 1
                    ? "Finish Quiz"
                    : "Next Question"}
                </Button>
              )}
            </div>
          </div>
        )}
      </Card>
    </Container>
  );
}

export default QuestionBank;
