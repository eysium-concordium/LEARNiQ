import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import ProgressBar from "react-bootstrap/ProgressBar";
import { useNavigate } from "react-router-dom";
import "../Styles/Quiz.css";

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [mood, setMood] = useState("");
  const [refreshKaro, setRefreshKaro] = useState(0);
  const [userAnswers, setUserAnswers] = useState({});
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [points, setPoints] = useState(0);
  const [quizFinished, setQuizFinished] = useState(false);
  const [quizStarted, setQuizStarted] = useState(false);
  const [rr, setrr] = useState(0);
  const [disableOptions, setDisableOptions] = useState(false);
  const [disableButton, setDisableButton] = useState(false);
  const [userId, setUserID] = useState(null);
  const [pointsUpdated, setPointsUpdated] = useState(false);
  const [loading, setLoading] = useState(false);
  const [transitionClass, setTransitionClass] = useState("");
  const [confetti, setConfetti] = useState(false);
  const [error, setError] = useState(null);
  
  // Use fallback data in case the API fails
  const fallbackQuestions = [
    {
      question: "Which programming language is often used for frontend web development?",
      answers: {
        answer_a: "JavaScript",
        answer_b: "Python",
        answer_c: "Java",
        answer_d: "C++",
        answer_e: null,
        answer_f: null
      },
      correct_answers: {
        answer_a_correct: "true",
        answer_b_correct: "false",
        answer_c_correct: "false",
        answer_d_correct: "false",
        answer_e_correct: "false",
        answer_f_correct: "false"
      }
    },
    {
      question: "What does CSS stand for?",
      answers: {
        answer_a: "Computer Style Sheets",
        answer_b: "Creative Style System",
        answer_c: "Cascading Style Sheets",
        answer_d: "Colorful Style Sheets",
        answer_e: null,
        answer_f: null
      },
      correct_answers: {
        answer_a_correct: "false",
        answer_b_correct: "false",
        answer_c_correct: "true",
        answer_d_correct: "false",
        answer_e_correct: "false",
        answer_f_correct: "false"
      }
    },
    {
      question: "What is React?",
      answers: {
        answer_a: "A database",
        answer_b: "A JavaScript library for building user interfaces",
        answer_c: "A programming language",
        answer_d: "A server technology",
        answer_e: null,
        answer_f: null
      },
      correct_answers: {
        answer_a_correct: "false",
        answer_b_correct: "true",
        answer_c_correct: "false",
        answer_d_correct: "false",
        answer_e_correct: "false",
        answer_f_correct: "false"
      }
    },
    {
      question: "Which of the following is NOT a JavaScript framework or library?",
      answers: {
        answer_a: "Angular",
        answer_b: "Vue",
        answer_c: "React",
        answer_d: "Django",
        answer_e: null,
        answer_f: null
      },
      correct_answers: {
        answer_a_correct: "false",
        answer_b_correct: "false",
        answer_c_correct: "false",
        answer_d_correct: "true",
        answer_e_correct: "false",
        answer_f_correct: "false"
      }
    },
    {
      question: "Which HTML tag is used to create a hyperlink?",
      answers: {
        answer_a: "<link>",
        answer_b: "<a>",
        answer_c: "<href>",
        answer_d: "<url>",
        answer_e: null,
        answer_f: null
      },
      correct_answers: {
        answer_a_correct: "false",
        answer_b_correct: "true",
        answer_c_correct: "false",
        answer_d_correct: "false",
        answer_e_correct: "false",
        answer_f_correct: "false"
      }
    }
  ];
  
  const API_URL = process.env.REACT_APP_API_URL_QUIZ;
  const API_KEY = process.env.REACT_APP_API_KEY_QUIZ;

  // Validate user authentication
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (!token) {
      navigate("/login");
      return;
    }

    const validateUser = async () => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URL}/api/auth/getuser`, {
          method: "POST",
          headers: {
            Authorization: token,
          },
        });
        
        if (!response.ok) throw new Error("Authentication failed");
        
        const data = await response.json();
        setUserID(data._id);
      } catch (error) {
        console.error("Authentication error:", error.message);
        navigate("/login");
      }
    };

    validateUser();
  }, [navigate]);

  // Fetch questions when quiz starts
  useEffect(() => {
    const fetchQuestions = async () => {
      if (!quizStarted) return;
      
      setLoading(true);
      setError(null);
      
      try {
        // Add a timeout promise to handle slow responses
        const timeoutPromise = new Promise((_, reject) => 
          setTimeout(() => reject(new Error("Request timed out")), 5000)
        );
        
        const fetchPromise = fetch(`https://quizapi.io/api/v1/questions?apiKey=VvHgTBAJikxu5B0y9JIsdtMnInq8TnaZ683J2fiR&limit=5`);
        
        // Race between fetch and timeout
        const response = await Promise.race([fetchPromise, timeoutPromise]);
         console.log(response)
        // Check if response is valid before parsing JSON
        if (!response.ok) {
          throw new Error(`API responded with status: ${response.status}`);
        }
        
        const contentType = response.headers.get("content-type");
        if (!contentType || !contentType.includes("application/json")) {
          throw new Error("API did not return JSON");
        }
        
        const data = await response.json();
        
        if (!Array.isArray(data) || data.length === 0) {
          throw new Error("Invalid question format from API");
        }
        
        setQuestions(data);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
        setError(`Failed to load questions: ${error.message}`);
        
        // Use fallback questions instead
        setQuestions(fallbackQuestions);
      } finally {
        setrr((prevKey) => prevKey + 1);
        setLoading(false);
      }
    };

    if (quizStarted) {
      fetchQuestions();
    }
  }, [quizStarted, API_URL, API_KEY]);

  const handleNextQuestion = () => {
    setTransitionClass("slide-out");
    
    setTimeout(() => {
      if (currentQuestionIndex < questions.length - 1) {
        setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
        setDisableOptions(false);
        setDisableButton(false);
        setTransitionClass("slide-in");
      } else {
        finishQuiz();
      }
    }, 300);
  };

  const handleOptionClick = (answerKey) => {
    if (quizFinished || disableOptions) {
      return;
    }

    const isCorrect =
      questions[currentQuestionIndex]?.correct_answers[
        `${answerKey}_correct`
      ] === "true";

    setUserAnswers((prevAnswers) => ({
      ...prevAnswers,
      [currentQuestionIndex]: answerKey,
    }));

    setDisableOptions(true);
    setDisableButton(false);

    // Use try-catch for audio to prevent errors if sound files aren't available
    try {
      const sound = new Audio(isCorrect ? '/sounds/correct.mp3' : '/sounds/incorrect.mp3');
      sound.volume = 0.5; // Lower volume
      sound.play().catch(e => console.log("Audio play failed:", e));
    } catch (e) {
      console.log("Sound effect could not be played");
    }
  };

  // Update points in backend when quiz finishes
  useEffect(() => {
    if (pointsUpdated && userId) {
      sendPointsToBackend();
    }
  }, [pointsUpdated, userId]);

  const finishQuiz = () => {
    const calculatedPoints = questions.reduce(
      (totalPoints, question, index) => {
        const selectedAnswerKey = userAnswers[index];
        const isCorrect = selectedAnswerKey && 
          question.correct_answers[`${selectedAnswerKey}_correct`] === "true";

        return totalPoints + (isCorrect ? 1 : 0);
      },
      0
    );

    setPoints(calculatedPoints);
    setQuizFinished(true);

    const userMood =
      (calculatedPoints / questions.length) * 100 >= 50
        ? "impressive"
        : "improve";
    setMood(userMood);
    
    if (userMood === "impressive") {
      setConfetti(true);
      try {
        const sound = new Audio('/sounds/success.mp3');
        sound.play().catch(e => console.log("Audio play failed:", e));
      } catch (e) {
        console.log("Success sound effect could not be played");
      }
    }

    setPointsUpdated(true);

    // Auto-refresh countdown
    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setRefreshKaro(progress);

      if (progress >= 100) {
        clearInterval(interval);
        // Provide a way to restart quiz rather than forcing reload
        setQuizStarted(false);
        setQuizFinished(false);
        setCurrentQuestionIndex(0);
        setUserAnswers({});
        setPoints(0);
        setRefreshKaro(0);
      }
    }, 1000);
  };

  const sendPointsToBackend = async () => {
    if (!userId) return;
    
    try {
      const token = localStorage.getItem("token");
      const backendURL = `${process.env.REACT_APP_BACKEND_URL}/api/quiz/submit-quiz`;
      const response = await fetch(backendURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },
        body: JSON.stringify({ userId, points }),
      });

      if (!response.ok) {
        console.error(`Failed to send points to the backend: ${response.status}`);
      }
    } catch (error) {
      console.error("Error sending points to the backend:", error);
    } finally {
      setPointsUpdated(false);
    }
  };

  // Welcome screen
  if (!quizStarted) {
    return (
      <div className="quiz-welcome">
        <div className="welcome-card">
          <div className="welcome-icon">🧠</div>
          <h1 className="welcome-title">Challenge Your Knowledge!</h1>
          <p className="welcome-description">
            Test your skills with our interactive quiz. Ready to begin?
          </p>
          <button
            className="start-button"
            onClick={() => {
              setQuizStarted(true);
              try {
                const sound = new Audio('/sounds/start.mp3');
                sound.play().catch(e => console.log("Audio play failed:", e));
              } catch (e) {
                console.log("Start sound effect could not be played");
              }
            }}
          >
            <span className="start-text">Start Quiz</span>
            <span className="start-icon">→</span>
          </button>
        </div>
      </div>
    );
  }

  // Loading state
  if (loading) {
    return (
      <div className="quiz-loading">
        <div className="pulse-loader"></div>
        <p className="loading-text">Preparing your questions...</p>
      </div>
    );
  }

  // Error state
  if (error && (!questions || questions.length === 0)) {
    return (
      <div className="quiz-error">
        <div className="error-icon">⚠️</div>
        <h3 className="error-title">Oops! Something went wrong</h3>
        <p className="error-message">{error}</p>
        <button 
          className="retry-button"
          onClick={() => {
            setError(null);
            setrr((prev) => prev + 1);
            setQuizStarted(true);
          }}
        >
          Try Again
        </button>
      </div>
    );
  }

  // Empty questions state
  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-loading">
        <Spinner animation="grow" role="status" className="custom-spinner"></Spinner>
        <p className="loading-text">Loading questions...</p>
      </div>
    );
  }

  return (
    <div className="quiz-container" key={rr}>
      {error && (
        <div className="warning-banner">
          <p>Using backup questions: {error}</p>
        </div>
      )}
      
      {!quizFinished && (
        <div className="quiz-progress">
          <div className="progress-tracker">
            {questions.map((_, index) => (
              <div 
                key={index} 
                className={`progress-dot ${index === currentQuestionIndex ? 'active' : ''} 
                  ${userAnswers[index] !== undefined ? 
                    (questions[index]?.correct_answers[`${userAnswers[index]}_correct`] === "true" ? 
                      'correct' : 'incorrect') : ''}`}
              ></div>
            ))}
          </div>
          <div className="question-counter">
            Question {currentQuestionIndex + 1} of {questions.length}
          </div>
        </div>
      )}
      
      <div className={`quiz-box ${transitionClass}`}>
        {quizFinished ? (
          <div className="results-container">
            {confetti && <div className="confetti-container"></div>}
            <div className="results-icon">
              {mood === "impressive" ? "🏆" : "📚"}
            </div>
            <h1 className={mood === "impressive" ? "impressive-text" : "improve-text"}>
              {mood === "impressive" 
                ? "Impressive!!" 
                : "You need to clear your concepts."}
            </h1>
            <div className="score-display">
              <div className="score-circle">
                <span className="score-number">{points}</span>
                <span className="score-total">/{questions.length}</span>
              </div>
              <h3 className="score-text">
                {Math.round((points / questions.length) * 100)}% Correct
              </h3>
            </div>
            <div className="refresh-container">
              <p className="refresh-text">
                New quiz in {Math.ceil((100 - refreshKaro) / 10)}s
              </p>
              <ProgressBar
                variant={mood === "impressive" ? "success" : "warning"}
                now={refreshKaro}
                className="refresh-bar"
              />
            </div>
            <button 
              className="restart-now-button"
              onClick={() => {
                setQuizStarted(false);
                setQuizFinished(false);
                setCurrentQuestionIndex(0);
                setUserAnswers({});
                setPoints(0);
                setRefreshKaro(0);
              }}
            >
              Start New Quiz Now
            </button>
          </div>
        ) : (
          <div className="question-container">
            <h3 className="quiz-question">
              {questions[currentQuestionIndex]?.question}
            </h3>
            <ul className="quiz-answers">
              {Object.keys(questions[currentQuestionIndex]?.answers || {})
                .filter(answerKey => questions[currentQuestionIndex]?.answers[answerKey] !== null)
                .map((answerKey, answerIndex) => (
                  <li
                    key={answerIndex}
                    className={`quiz-option ${
                      userAnswers[currentQuestionIndex] === answerKey
                        ? questions[currentQuestionIndex]?.correct_answers[
                            `${answerKey}_correct`
                          ] === "true"
                          ? "correct-option"
                          : "incorrect-option"
                        : ""
                    } ${disableOptions && userAnswers[currentQuestionIndex] !== answerKey ? "fade" : ""}`}
                    onClick={() => handleOptionClick(answerKey)}
                  >
                    <span className="option-letter">
                      {String.fromCharCode(65 + answerIndex)}
                    </span>
                    <span className="option-text">
                      {questions[currentQuestionIndex]?.answers[answerKey]}
                    </span>
                    {userAnswers[currentQuestionIndex] === answerKey && (
                      <span className="option-icon">
                        {questions[currentQuestionIndex]?.correct_answers[
                          `${answerKey}_correct`
                        ] === "true" ? "✓" : "✗"}
                      </span>
                    )}
                  </li>
                ))}
            </ul>
            <button
              className={`quiz-button ${disableOptions ? "pulse" : ""} ${userAnswers[currentQuestionIndex] ? "" : "disabled"}`}
              onClick={handleNextQuestion}
              disabled={!userAnswers[currentQuestionIndex]}
            >
              {currentQuestionIndex < questions.length - 1
                ? "Next Question"
                : "Finish Quiz"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;