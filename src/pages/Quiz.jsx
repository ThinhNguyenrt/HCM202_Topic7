import React, { useState, useEffect } from 'react';
import { quizData } from '../data/quizData';

export default function Quiz() {
  const [screen, setScreen] = useState('intro'); // intro, quiz, results
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quizData.duration * 60); // in seconds
  const [startTime, setStartTime] = useState(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [finalTimeTaken, setFinalTimeTaken] = useState(0);

  // Timer effect
  useEffect(() => {
    let timer;
    if (screen === 'quiz' && timeLeft > 0) {
      timer = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleSubmitQuiz();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => clearInterval(timer);
  }, [screen, timeLeft]);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStartQuiz = () => {
    setScreen('quiz');
    setStartTime(Date.now());
    // Load previous answers from localStorage if exists
    const savedAnswers = localStorage.getItem('quizAnswers');
    if (savedAnswers) {
      setAnswers(JSON.parse(savedAnswers));
    }
  };

  const handleSelectAnswer = (optionIndex) => {
    const newAnswers = { ...answers, [currentQuestion]: optionIndex };
    setAnswers(newAnswers);
    localStorage.setItem('quizAnswers', JSON.stringify(newAnswers));
  };

  const handleNextQuestion = () => {
    if (currentQuestion < quizData.questions.length - 1) {
      setCurrentQuestion(currentQuestion + 1);
    }
  };

  const handlePreviousQuestion = () => {
    if (currentQuestion > 0) {
      setCurrentQuestion(currentQuestion - 1);
    }
  };

  const handleSubmitQuiz = () => {
    setShowConfirmSubmit(true);
  };

  const confirmSubmit = () => {
    const correctCount = quizData.questions.reduce((count, question, index) => {
      return answers[index] === question.correct ? count + 1 : count;
    }, 0);

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    setFinalTimeTaken(timeTaken);
    
    const result = {
      correct: correctCount,
      total: quizData.questions.length,
      timeTaken: timeTaken,
      answers: answers,
      completedAt: new Date().toISOString()
    };

    // Save result to localStorage
    const results = JSON.parse(localStorage.getItem('quizResults')) || [];
    results.push(result);
    localStorage.setItem('quizResults', JSON.stringify(results));

    // Clear current answers
    localStorage.removeItem('quizAnswers');

    setScreen('results');
    setShowConfirmSubmit(false);
  };

  const handleRetry = () => {
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(quizData.duration * 60);
    setStartTime(Date.now());
    setScreen('quiz');
    localStorage.removeItem('quizAnswers');
  };

  const handleBackHome = () => {
    setScreen('intro');
    setCurrentQuestion(0);
    setAnswers({});
    setTimeLeft(quizData.duration * 60);
    setShowConfirmSubmit(false);
  };

  // Intro Screen
  if (screen === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-indigo-600 mb-4">
              📚 {quizData.title}
            </h1>
            <p className="text-center text-gray-600 text-lg mb-8 leading-relaxed">
              {quizData.description}
            </p>

            <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8 p-6 bg-indigo-50 rounded-2xl">
              <div className="text-center">
                <p className="text-xs md:text-sm uppercase text-gray-500 font-semibold tracking-wider mb-2">
                  Số câu
                </p>
                <p className="text-3xl md:text-4xl font-bold text-indigo-600">
                  {quizData.questions.length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs md:text-sm uppercase text-gray-500 font-semibold tracking-wider mb-2">
                  Thời gian
                </p>
                <p className="text-3xl md:text-4xl font-bold text-indigo-600">
                  {quizData.duration} phút
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs md:text-sm uppercase text-gray-500 font-semibold tracking-wider mb-2">
                  Loại
                </p>
                <p className="text-2xl md:text-3xl font-bold text-indigo-600">
                  🎯
                </p>
              </div>
            </div>

            <div className="bg-indigo-100 border-l-4 border-indigo-600 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-bold text-indigo-600 mb-4">Hướng dẫn:</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Bạn có {quizData.duration} phút để hoàn thành bài quiz</li>
                <li>✓ Bài quiz có {quizData.questions.length} câu hỏi trắc nghiệm</li>
                <li>✓ Bạn có thể điều hướng giữa các câu hỏi</li>
                <li>✓ Đáp án sẽ được lưu tự động</li>
                <li>✓ Xác nhận trước khi nộp bài</li>
              </ul>
            </div>

            <button
              onClick={handleStartQuiz}
              className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold py-4 px-6 rounded-lg text-lg uppercase tracking-wider transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
            >
              Bắt đầu làm bài
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Quiz Screen
  if (screen === 'quiz') {
    const question = quizData.questions[currentQuestion];
    const selectedAnswer = answers[currentQuestion];
    const answeredCount = Object.keys(answers).length;

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 p-4 md:p-6 flex flex-col">
        {/* Timer Section */}
        <div className="w-full max-w-4xl mx-auto mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-indigo-600 mb-3">
                Câu {currentQuestion + 1}/{quizData.questions.length}
              </h2>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-indigo-600 to-purple-600 transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex gap-4 md:gap-8 md:whitespace-nowrap">
              <div className={`text-center md:text-right px-4 py-2 rounded-lg font-bold text-lg ${
                timeLeft < 60 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-indigo-100 text-indigo-600'
              }`}>
                ⏱️ {formatTime(timeLeft)}
              </div>
              <div className="text-center md:text-right text-sm font-semibold text-gray-600 px-4 py-2 bg-indigo-50 rounded-lg">
                Đã trả lời: <span className="text-indigo-600 font-bold">{answeredCount}/{quizData.questions.length}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Question Content */}
        <div className="w-full max-w-4xl mx-auto flex-1 mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-8 md:p-10 h-full">
            <h3 className="text-2xl md:text-3xl font-bold text-gray-800 mb-8 leading-relaxed">
              {question.question}
            </h3>

            <div className="space-y-4">
              {question.options.map((option, index) => (
                <button
                  key={index}
                  onClick={() => handleSelectAnswer(index)}
                  className={`w-full p-5 text-left rounded-xl font-semibold transition duration-300 transform flex items-center gap-4 ${
                    selectedAnswer === index
                      ? 'bg-gradient-to-r from-indigo-600 to-purple-600 text-white shadow-lg scale-105'
                      : 'bg-gray-50 hover:bg-indigo-50 text-gray-800 border-2 border-transparent hover:border-indigo-300'
                  }`}
                >
                  <span className={`flex items-center justify-center w-10 h-10 rounded-lg font-bold text-base ${
                    selectedAnswer === index
                      ? 'bg-white text-indigo-600'
                      : 'bg-gray-200 text-gray-700'
                  }`}>
                    {String.fromCharCode(65 + index)}
                  </span>
                  <span className="flex-1">{option}</span>
                  {selectedAnswer === index && <span className="text-2xl">✓</span>}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Navigation Section */}
        <div className="w-full max-w-4xl mx-auto">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row gap-3 md:gap-4 items-center justify-center flex-wrap">
            <button
              onClick={handlePreviousQuestion}
              disabled={currentQuestion === 0}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-bold rounded-lg transition duration-300 min-w-32"
            >
              ← Câu trước
            </button>

            <select
              value={currentQuestion}
              onChange={(e) => setCurrentQuestion(Number(e.target.value))}
              className="px-4 py-3 border-2 border-indigo-300 rounded-lg font-semibold text-gray-800 focus:outline-none focus:border-indigo-600 bg-white cursor-pointer min-w-40"
            >
              {quizData.questions.map((_, index) => (
                <option key={index} value={index}>
                  Câu {index + 1}
                </option>
              ))}
            </select>

            <button
              onClick={handleNextQuestion}
              disabled={currentQuestion === quizData.questions.length - 1}
              className="px-6 py-3 bg-gray-200 hover:bg-gray-300 disabled:opacity-50 disabled:cursor-not-allowed text-gray-800 font-bold rounded-lg transition duration-300 min-w-32"
            >
              Câu sau →
            </button>

            {currentQuestion === quizData.questions.length - 1 && (
              <button
                onClick={handleSubmitQuiz}
                className="px-8 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-lg min-w-40"
              >
                Nộp bài
              </button>
            )}
          </div>
        </div>

        {/* Confirm Submit Modal */}
        {showConfirmSubmit && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
            <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full animate-in fade-in zoom-in-95 duration-300">
              <h3 className="text-2xl font-bold text-gray-800 mb-4">Xác nhận nộp bài</h3>
              <p className="text-gray-600 mb-3 text-lg">
                Bạn đã trả lời <span className="font-bold text-indigo-600">{answeredCount}</span> câu trong tổng số <span className="font-bold text-indigo-600">{quizData.questions.length}</span> câu.
              </p>
              <p className="text-gray-600 mb-6 text-lg">Bạn chắc chắn muốn nộp bài không?</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  className="flex-1 px-4 py-3 bg-indigo-100 hover:bg-indigo-200 text-indigo-600 font-bold rounded-lg transition duration-300 border-2 border-indigo-600"
                >
                  Tiếp tục làm bài
                </button>
                <button
                  onClick={confirmSubmit}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition duration-300"
                >
                  Xác nhận nộp
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }

  // Results Screen
  if (screen === 'results') {
    const correctCount = quizData.questions.reduce((count, question, index) => {
      return answers[index] === question.correct ? count + 1 : count;
    }, 0);

    const totalQuestions = quizData.questions.length;
    const percentage = Math.round((correctCount / totalQuestions) * 100);
    const minutesTaken = Math.floor(finalTimeTaken / 60);
    const secondsTaken = finalTimeTaken % 60;

    let resultMessage = '';
    let resultIcon = '';
    let resultColor = '';
    let badgeColor = '';

    if (percentage >= 80) {
      resultMessage = 'Xuất sắc! 🎉';
      resultIcon = '⭐';
      resultColor = 'from-blue-500 to-blue-600';
      badgeColor = 'from-blue-100 to-blue-50';
    } else if (percentage >= 60) {
      resultMessage = 'Tốt! 👍';
      resultIcon = '👍';
      resultColor = 'from-green-500 to-green-600';
      badgeColor = 'from-green-100 to-green-50';
    } else if (percentage >= 40) {
      resultMessage = 'Bình thường!';
      resultIcon = '😐';
      resultColor = 'from-yellow-500 to-yellow-600';
      badgeColor = 'from-yellow-100 to-yellow-50';
    } else {
      resultMessage = 'Cần cố gắng hơn! 💪';
      resultIcon = '📚';
      resultColor = 'from-red-500 to-red-600';
      badgeColor = 'from-red-100 to-red-50';
    }

    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 p-4 md:p-8">
        <div className="w-full max-w-4xl mx-auto">
          <div className={`bg-gradient-to-br ${badgeColor} rounded-3xl shadow-2xl p-10 md:p-16 animate-in fade-in slide-in-from-bottom-4 duration-500`}>
            <div className="text-center mb-8">
              <div className="text-8xl md:text-9xl mb-4">{resultIcon}</div>
              <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${resultColor} bg-clip-text text-transparent mb-2`}>
                {resultMessage}
              </h2>
            </div>

            {/* Score Circle */}
            <div className="flex justify-center mb-12">
              <div className="relative w-48 h-48 md:w-56 md:h-56 rounded-full border-8 border-gray-300 flex flex-col items-center justify-center bg-white shadow-lg">
                <div className={`absolute inset-0 rounded-full bg-gradient-to-br ${resultColor} opacity-10`}></div>
                <div className="text-6xl md:text-7xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {percentage}%
                </div>
                <div className="text-sm uppercase text-gray-500 font-bold tracking-wider mt-2">Điểm số</div>
              </div>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-3 gap-4 md:gap-6 mb-10 p-8 bg-white rounded-2xl shadow-lg">
              <div className="text-center">
                <p className="text-xs md:text-sm uppercase text-gray-500 font-bold tracking-wider mb-2">Đúng</p>
                <p className="text-3xl md:text-4xl font-bold text-green-600">{correctCount}</p>
                <p className="text-xs text-gray-400 mt-1">/{totalQuestions}</p>
              </div>
              <div className="text-center border-l border-r border-gray-200">
                <p className="text-xs md:text-sm uppercase text-gray-500 font-bold tracking-wider mb-2">Sai</p>
                <p className="text-3xl md:text-4xl font-bold text-red-600">{totalQuestions - correctCount}</p>
                <p className="text-xs text-gray-400 mt-1">/{totalQuestions}</p>
              </div>
              <div className="text-center">
                <p className="text-xs md:text-sm uppercase text-gray-500 font-bold tracking-wider mb-2">Thời gian</p>
                <p className="text-3xl md:text-4xl font-bold text-indigo-600">
                  {minutesTaken}:{secondsTaken < 10 ? '0' : ''}{secondsTaken}
                </p>
              </div>
            </div>

            {/* Action Buttons */}
            <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center">
              <button
                onClick={handleRetry}
                className="px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-lg text-lg"
              >
                🔄 Làm lại
              </button>
              <button
                onClick={handleBackHome}
                className="px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 font-bold rounded-lg border-2 border-indigo-600 transition duration-300 text-lg"
              >
                🏠 Về trang chủ
              </button>
            </div>

            {/* Review Section */}
            <div className="bg-white rounded-2xl shadow-lg p-8">
              <h3 className="text-2xl font-bold text-gray-800 mb-6">📋 Xem lại kết quả</h3>
              <div className="space-y-4 max-h-96 overflow-y-auto">
                {quizData.questions.map((question, index) => {
                  const isCorrect = answers[index] === question.correct;
                  return (
                    <div
                      key={index}
                      className={`p-5 rounded-xl border-l-4 ${
                        isCorrect
                          ? 'bg-green-50 border-green-500'
                          : 'bg-red-50 border-red-500'
                      }`}
                    >
                      <div className={`font-bold mb-2 text-lg ${isCorrect ? 'text-green-600' : 'text-red-600'}`}>
                        {isCorrect ? '✓' : '✗'} Câu {index + 1}
                      </div>
                      <div className="text-gray-800 mb-3 font-medium">{question.question}</div>
                      <div className="text-sm space-y-2">
                        <div className="text-gray-700">
                          <span className="font-semibold">Bạn chọn:</span>{' '}
                          <span className={isCorrect ? 'text-green-700 font-bold' : 'text-red-700 font-bold'}>
                            {question.options[answers[index]]}
                          </span>
                        </div>
                        {!isCorrect && (
                          <div className="text-green-700">
                            <span className="font-semibold">Đáp án đúng:</span>{' '}
                            <span className="font-bold">{question.options[question.correct]}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}
