import React, { useState, useEffect } from "react";
import "./index.css";
import question from "./Que.jsx";

export default function App() {
  const [currentque, setCurrentque] = useState(0);
  const [answer, setAnswer] = useState(false);
  const [score, setScore] = useState(0);
  const [showscore, setShowscore] = useState(false);
  const [selectedAnswer, setSelectedAnswer] = useState(null); // Track selected answer
  const [timeLeft, setTimeLeft] = useState(30); // Timer state

  // Handle answer selection
  const handleansoption = (isCorrect, ansId) => {
    setAnswer(true);
    setSelectedAnswer(ansId); // Store the selected answer ID
    if (isCorrect) {
      setScore(score + 1);
    }
  };

  // Move to the next question
  const changeque = () => {
    setAnswer(false);
    setSelectedAnswer(null); // Clear the selected answer
    setTimeLeft(30); // Reset timer for the next question
    const nextque = currentque + 1;
    if (nextque < question.length) {
      setCurrentque(nextque);
    } else {
      setShowscore(true);
    }
  };

  // Timer logic
  useEffect(() => {
    if (timeLeft > 0 && !showscore) {
      const timer = setInterval(() => {
        setTimeLeft((prevTime) => prevTime - 1);
      }, 1000);
      return () => clearInterval(timer); // Cleanup interval on unmount
    } else if (timeLeft === 0) {
      changeque(); // Automatically move to the next question when time runs out
    }
  }, [timeLeft, showscore]);
  return (
    <>
      <section>
        <div className='container-fluid'>
            <div className='row'>
                <div className='col-md-12'>
                  <h3 className='text-center'>My Quiz App<hr/></h3>
                </div>
            </div>
            <div className='row bg-success pt-2 pb-2'>
                <div className='col-4'>
                  <p style={{fontWeight:"bold"}} className='text-start text-white subsec'>Total Marks: {question.length}</p>
                </div>
                <div className='col-4'>
                  <p style={{fontWeight:"bold"}} className='text-center text-white subsec'>Que: {currentque+1}/{question.length}</p>
                </div>
                <div className='col-4'>
                  <p style={{fontWeight:"bold"}} className='text-right text-white'>Time: {timeLeft}s</p>
                </div>
            </div>
        </div>
    </section>

    <section>
      {showscore ? 
        <div className="row col-md-12">
            <h1>My Score is {score} of {question.length}</h1>
        </div> :
        <div className='examque row'>
        <div className="col-md-12">
          <h4 className="pb-2 pt-3">Q {currentque+1}. {question[currentque].quename}</h4>
          <ul type="none" className="list-group pb-3">
                {question[currentque].queans.map((item, index) => (
                  <li key={index} className="list-group-item mb-1">
                    <input
                      type="radio"
                      name={`question${currentque}`} // Unique name for each question
                      value={item.ans}
                      id={`ans${index}`}
                      checked={selectedAnswer === `ans${index}`} // Controlled component
                      onChange={() => handleansoption(item.anstype, `ans${index}`)}
                    />
                    <label htmlFor={`ans${index}`}>{item.ans}</label>
                  </li>
                ))}
              </ul>
        </div>
      </div>
    }
    </section>

    <section>
      <div className="container-fluid m-0">
      <hr/>
        <div className="row pb-3">
          <div className="col-6 text-left">
            <button className="btn btn-outline-primary" disabled={answer ? "":"disabled"} onClick={changeque}>Next Question</button>
          </div>
          <div className="col-6 text-right">
            <button className="btn btn-primary disabled">End Exam</button>
          </div>
        </div>
      </div>
    </section>
    </>
  );
}