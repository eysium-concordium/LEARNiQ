import React, { useState, useEffect } from "react";
import Spinner from "react-bootstrap/Spinner";
import ProgressBar from "react-bootstrap/ProgressBar";
import { Link, Router, useNavigate, useParams } from "react-router-dom";
import "./Quiz.css";
import Navbar from "../components/Navbar/Navbar";

const Quiz = () => {
  const navigate = useNavigate();
  const [questions, setQuestions] = useState([]);
  const [mood, setMood] = useState("");
  const [RefreshKaro, setRefreshKaro] = useState(0);
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
  const API_URL = "https://quizapi.io/api/v1/questions";
  const API_KEY = "nl213ygcZiZICCod1vYoHBBCfmjj4OecFMYHyNHu";
  var point = 0;

  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      fetch("http://localhost:5000/api/auth/getuser", {
        method: "POST",
        headers: {
          Authorization: token,
        },
      })
        .then((response) => {
          if (response.ok) {
            return response.json();
          } else {
            throw new Error("Response not OK");
          }
        })
        .then((data) => {
          //console.log(data._id);
          setUserID(data._id);
        })
        .catch((error) => {
          console.error("Error fetching user info:", error.message);
        });
    } else {
      navigate("/login");
    }
  }, []);

  useEffect(() => {
    const fetchQuestions = async () => {
      try {
        const response = await fetch(`${API_URL}?apiKey=${API_KEY}&limit=5`);
        const data = await response.json();
        console.log("Fetched questions:", data);
        setQuestions(data);
        setrr((prevKey) => prevKey + 1);
      } catch (error) {
        console.error("Error fetching quiz questions:", error);
      }
    };

    if (quizStarted) {
      fetchQuestions();
    }
  }, [quizStarted]);

  const handleNextQuestion = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prevIndex) => prevIndex + 1);
      setDisableOptions(false);
      setDisableButton(false);
    } else {
      finishQuiz();
    }
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

    console.log(`Selected option is correct: ${isCorrect}`);
  };

  useEffect(() => {
    if (pointsUpdated) {
      sendPointsToBackend();
    }
  }, [pointsUpdated]);

  const finishQuiz = async () => {
    const calculatedPoints = questions.reduce(
      (totalPoints, question, index) => {
        const selectedAnswerKey = userAnswers[index];
        const isCorrect =
          question.correct_answers[`${selectedAnswerKey}_correct`] === "true";

        return totalPoints + (isCorrect ? 1 : 0);
      },
      0
    );

    console.log(calculatedPoints);

    setPoints((prevPoints) => prevPoints + calculatedPoints);

    console.log(points);
    setQuizFinished(true);

    const userMood =
      (calculatedPoints / questions.length) * 100 >= 50
        ? "impressive"
        : "improve";
    setMood(userMood);

    setPointsUpdated(true);

    let progress = 0;
    const interval = setInterval(() => {
      progress += 10;
      setRefreshKaro(progress);

      if (progress >= 1000) {
        clearInterval(interval);
        window.location.reload();
      }
    }, 1000);
  };

  // useEffect(() => {
  //   console.log("Updated Points:", points);
  // }, [points]);

  const sendPointsToBackend = async () => {
    try {
      const token = localStorage.getItem("token");
      // console.log("le bhai" + points);
      const backendURL = "http://localhost:5000/api/quiz/submit-quiz";
      const response = await fetch(backendURL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: token,
        },

        body: JSON.stringify({ userId, points }),
      });

      if (response.ok) {
        // console.log("Points sent to the backend successfully");
      } else {
        console.error("Failed to send points to the backend");
      }
    } catch (error) {
      console.error("Error sending points to the backend:", error);
    } finally {
      setPointsUpdated(false);
    }
  };

  if (!quizStarted) {
    return (
      <>
        <div className="quiz-container">
          <h1 className="big-text">Welcome to the Quiz Section !!!</h1>
          <div className="start-quiz">
            <button
              className="start-button"
              onClick={() => setQuizStarted(true)}
            >
              Start Quiz
            </button>
          </div>
        </div>
      </>
    );
  }

  if (!questions || questions.length === 0) {
    return (
      <div className="quiz-container">
        <Spinner animation="grow" role="status"></Spinner>
      </div>
    );
  }

  return (
    <div className="quiz-container" key={rr}>
      <div className="quiz-box">
        {quizFinished ? (
          <div>
            <h1
              className={
                mood === "impressive" ? "impressive-text" : "improve-text"
              }
            >
              {(points / questions.length) * 100 >= 50
                ? "Impressive !!"
                : "You need to clear your concepts."}
            </h1>
            <h3 className="quiz-score">
              Your Score: {points}/{questions.length}
            </h3>
            <ProgressBar
              variant="success"
              now={RefreshKaro}
              label={`Auto-Refresh in ${(100 - RefreshKaro) / 10}s`}
            />
          </div>
        ) : (
          <div>
            <h3 className="quiz-question">
              {questions[currentQuestionIndex]?.question}
            </h3>
            <ul className="quiz-answers">
              {Object.keys(questions[currentQuestionIndex]?.answers).map(
                (answerKey, answerIndex) =>
                  questions[currentQuestionIndex]?.answers[answerKey] !==
                  null ? (
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
                      }`}
                      onClick={() => handleOptionClick(answerKey)}
                    >
                      {questions[currentQuestionIndex]?.answers[answerKey]}
                    </li>
                  ) : null
              )}
            </ul>
            <button
              className="quiz-button"
              onClick={handleNextQuestion}
              disabled={disableButton}
            >
              {currentQuestionIndex < questions.length - 1
                ? "Next Question"
                : "Finish"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Quiz;
