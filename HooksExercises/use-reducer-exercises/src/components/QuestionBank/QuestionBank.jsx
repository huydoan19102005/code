import React, { useReducer } from 'react';
import { Button, Card, ListGroup, ProgressBar } from 'react-bootstrap';

const initialState = {
    questions: [
        { id: 1, question: '🇦🇺 What is the capital of Australia?', options: ['Sydney', 'Canberra', 'Melbourne', 'Perth'], answer: 'Canberra' },
        { id: 2, question: '🪐 Which planet is known as the Red Planet?', options: ['Venus', 'Mars', 'Jupiter', 'Saturn'], answer: 'Mars' },
        { id: 3, question: '🌊 What is the largest ocean on Earth?', options: ['Atlantic', 'Indian', 'Arctic', 'Pacific'], answer: 'Pacific' },
    ],
    currentQuestion: 0,
    selectedOption: '',
    score: 0,
    showScore: false,
};

const quizReducer = (state, action) => {
    switch (action.type) {
        case 'SELECT_OPTION':
            return { ...state, selectedOption: action.payload };
        case 'NEXT_QUESTION':
            const isCorrect = state.selectedOption === state.questions[state.currentQuestion].answer;
            return {
                ...state,
                currentQuestion: state.currentQuestion + 1,
                score: isCorrect ? state.score + 1 : state.score,
                selectedOption: '',
                showScore: state.currentQuestion + 1 === state.questions.length,
            };
        case 'RESTART_QUIZ':
            return initialState;
        default:
            throw new Error(`Unsupported action type: ${action.type}`);
    }
};

function QuestionBank() {
    const [state, dispatch] = useReducer(quizReducer, initialState);
    const current = state.questions[state.currentQuestion];

    const progress =
        ((state.currentQuestion + (state.showScore ? 1 : 0)) / state.questions.length) * 100;

    return (
        <div
            style={{
                maxWidth: '600px',
                margin: '40px auto',
                textAlign: 'center',
                background: 'linear-gradient(135deg, #f8f9fa, #e8eaf6)',
                padding: '30px',
                borderRadius: '16px',
                boxShadow: '0 10px 30px rgba(0,0,0,0.1)',
            }}
        >
            {!state.showScore ? (
                <>
                    <h2 style={{ marginBottom: '20px', color: '#3f51b5' }}>🧩 Quiz Challenge</h2>
                    <ProgressBar now={progress} label={`${Math.round(progress)}%`} className="mb-3" />
                    <Card style={{ borderRadius: '12px', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
                        <Card.Body>
                            <Card.Title style={{ fontWeight: '600' }}>{current.question}</Card.Title>
                            <ListGroup variant="flush">
                                {current.options.map((opt, idx) => (
                                    <ListGroup.Item
                                        key={idx}
                                        action
                                        onClick={() => dispatch({ type: 'SELECT_OPTION', payload: opt })}
                                        active={state.selectedOption === opt}
                                        style={{
                                            cursor: 'pointer',
                                            borderRadius: '10px',
                                            margin: '6px 0',
                                            background:
                                                state.selectedOption === opt ? '#c5cae9' : 'white',
                                            transition: '0.2s',
                                        }}
                                    >
                                        {opt}
                                    </ListGroup.Item>
                                ))}
                            </ListGroup>
                            <Button
                                variant="primary"
                                className="mt-3"
                                disabled={!state.selectedOption}
                                onClick={() => dispatch({ type: 'NEXT_QUESTION' })}
                            >
                                {state.currentQuestion + 1 === state.questions.length ? 'Finish ✅' : 'Next →'}
                            </Button>
                        </Card.Body>
                    </Card>
                </>
            ) : (
                <Card
                    style={{
                        background: 'linear-gradient(135deg, #81c784, #66bb6a)',
                        color: 'white',
                        borderRadius: '16px',
                    }}
                >
                    <Card.Body>
                        <h3>🎉 Quiz Completed!</h3>
                        <p style={{ fontSize: '20px' }}>
                            Your Score: <strong>{state.score}</strong> / {state.questions.length}
                        </p>
                        <Button variant="light" onClick={() => dispatch({ type: 'RESTART_QUIZ' })}>
                            Restart 🔄
                        </Button>
                    </Card.Body>
                </Card>
            )}
        </div>
    );
}

export default QuestionBank;
