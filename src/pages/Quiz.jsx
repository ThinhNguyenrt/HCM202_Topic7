import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';
import { quizData } from '../data/quizData';
import { db } from '../config/firebase';
import { collection, addDoc } from 'firebase/firestore';

export default function Quiz() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState('password'); // password, username, intro, quiz, loading
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [username, setUsername] = useState('');
  const [usernameError, setUsernameError] = useState('');
  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});
  const [timeLeft, setTimeLeft] = useState(quizData.duration * 60); // in seconds
  const [startTime, setStartTime] = useState(null);
  const [showConfirmSubmit, setShowConfirmSubmit] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);

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

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const trimmedPassword = password.trim();
    
    if (!trimmedPassword) {
      setPasswordError('Vui lòng nhập mật khẩu');
      return;
    }

    // ADMIN password - đi thẳng đến leaderboard
    if (trimmedPassword === '123456') {
      sessionStorage.setItem('userAuthenticated', 'true');
      localStorage.setItem('isAdmin', 'true');
      navigate('/leaderboard');
      return;
    }

    // User password - tiếp tục tới nhập tên
    if (trimmedPassword === 'user123') {
      setPasswordError('');
      setPassword('');
      sessionStorage.setItem('userAuthenticated', 'true');
      setScreen('username');
      return;
    }

    // Sai password
    setPasswordError('Mật khẩu không đúng');
    setPassword('');
  };

  const handleUsernameSubmit = (e) => {
    e.preventDefault();
    const trimmedUsername = username.trim();
    
    if (!trimmedUsername) {
      setUsernameError('Vui lòng nhập tên');
      return;
    }
    
    if (trimmedUsername.length < 2) {
      setUsernameError('Tên phải có ít nhất 2 ký tự');
      return;
    }

    if (trimmedUsername.length > 50) {
      setUsernameError('Tên không được quá 50 ký tự');
      return;
    }
    
    setUsernameError('');
    setScreen('intro');
  };

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins}:${secs < 10 ? '0' : ''}${secs}`;
  };

  const handleStartQuiz = () => {
    // Reset tất cả state cho quiz mới
    setTimeLeft(quizData.duration * 60);
    setCurrentQuestion(0);
    setAnswers({});
    setScreen('quiz');
    setStartTime(Date.now());
    // Xóa dữ liệu cũ từ sessionStorage
    sessionStorage.removeItem('quizAnswers');
  };

  const handleSelectAnswer = (optionIndex) => {
    const newAnswers = { ...answers, [currentQuestion]: optionIndex };
    setAnswers(newAnswers);
    sessionStorage.setItem('quizAnswers', JSON.stringify(newAnswers));
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

  const confirmSubmit = async () => {
    const correctCount = quizData.questions.reduce((count, question, index) => {
      return answers[index] === question.correct ? count + 1 : count;
    }, 0);

    const timeTaken = Math.floor((Date.now() - startTime) / 1000);
    
    const result = {
      username: username.trim(),
      correct: correctCount,
      total: quizData.questions.length,
      score: Math.round((correctCount / quizData.questions.length) * 100),
      timeTaken: timeTaken,
      answers: answers,
      completedAt: new Date().toISOString()
    };

    // Save to Firebase
    try {
      setIsSubmitting(true);
      console.log('📤 Đang lưu kết quả...', result);
      
      const timeoutPromise = new Promise((_, reject) =>
        setTimeout(() => reject(new Error('Hết thời gian chờ (timeout)')), 10000)
      );
      
      const savePromise = addDoc(collection(db, 'quizResults'), result);
      
      await Promise.race([savePromise, timeoutPromise]);
      
      console.log('✅ Lưu thành công!');
    } catch (error) {
      console.error('❌ Lỗi khi lưu kết quả:', error);
      // Vẫn cho phép tiếp tục ngay cả khi lỗi
      if (error.message !== 'Hết thời gian chờ (timeout)') {
        alert('⚠️ Không thể kết nối Firebase, nhưng kết quả sẽ hiển thị. Vui lòng thử xem bảng xếp hạng sau.');
      } else {
        alert('⚠️ Kết nối chậm. Vui lòng kiểm tra mạng hoặc cấu hình Firebase.');
      }
    } finally {
      setIsSubmitting(false);
    }

    // Clear current answers
    sessionStorage.removeItem('quizAnswers');

    // Navigate to success page with state
    navigate('/success', { state: { result } });
  };

  // Password Screen
  if (screen === 'password') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-orange-500 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-3">
                🔐 Xác thực
              </h1>
              <p className="text-gray-600 text-lg">
                Vui lòng nhập mật khẩu để tiếp tục
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <div className="relative">
                  <input
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => {
                      setPassword(e.target.value);
                      setPasswordError('');
                    }}
                    placeholder="Nhập mật khẩu..."
                    className={`w-full px-6 py-4 pr-16 text-lg border-2 rounded-xl focus:outline-none transition duration-300 ${
                      passwordError
                        ? 'border-red-500 focus:border-red-600 bg-red-50'
                        : 'border-red-300 focus:border-red-600 focus:bg-red-50'
                    }`}
                    autoFocus
                    onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit(e)}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-600 hover:text-gray-800 transition duration-200 focus:outline-none"
                    title={showPassword ? "Ẩn mật khẩu" : "Hiện mật khẩu"}
                  >
                    {showPassword ? (
                      <EyeOff className="w-6 h-6" />
                    ) : (
                      <Eye className="w-6 h-6" />
                    )}
                  </button>
                </div>
                {passwordError && (
                  <p className="text-red-600 text-sm font-semibold mt-2 flex items-center gap-2">
                    ⚠️ {passwordError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-lg text-lg uppercase tracking-wider transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Xác thực →
              </button>
            </form>

            <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-200">
              <p className="text-sm text-gray-600 text-center">
                ℹ️ Nhập mật khẩu để truy cập bài quiz hoặc bảng xếp hạng
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Username Screen
  if (screen === 'username') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-orange-500 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-red-600 mb-3">
                👋 Xin chào!
              </h1>
              <p className="text-gray-600 text-lg">
                Vui lòng nhập tên của bạn để bắt đầu
              </p>
            </div>

            <form onSubmit={handleUsernameSubmit} className="space-y-6">
              <div>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => {
                    setUsername(e.target.value);
                    setUsernameError('');
                  }}
                  placeholder="Nhập tên của bạn..."
                  className={`w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none transition duration-300 ${
                    usernameError
                      ? 'border-red-500 focus:border-red-600 bg-red-50'
                      : 'border-red-300 focus:border-red-600 focus:bg-red-50'
                  }`}
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && handleUsernameSubmit(e)}
                />
                {usernameError && (
                  <p className="text-red-600 text-sm font-semibold mt-2 flex items-center gap-2">
                    ⚠️ {usernameError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-lg text-lg uppercase tracking-wider transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Tiếp tục →
              </button>
            </form>

            <div className="mt-8 p-6 bg-red-50 rounded-xl border border-red-200">
              <p className="text-sm text-gray-600 text-center">
                ℹ️ Tên của bạn sẽ được hiển thị trên bảng xếp hạng
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Intro Screen
  if (screen === 'intro') {
    return (
      <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-orange-500 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <h1 className="text-4xl md:text-5xl font-bold text-center text-red-600 mb-4">
              📚 {quizData.title}
            </h1>
            <p className="text-center text-gray-600 text-lg mb-8 leading-relaxed">
              {quizData.description}
            </p>

            <div className="grid grid-cols-3 gap-4 md:gap-6 mb-8 p-6 bg-red-50 rounded-2xl">
              <div className="text-center">
                <p className="text-xs md:text-sm uppercase text-gray-500 font-semibold tracking-wider mb-2">
                  Số câu
                </p>
                <p className="text-3xl md:text-4xl font-bold text-red-600">
                  {quizData.questions.length}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs md:text-sm uppercase text-gray-500 font-semibold tracking-wider mb-2">
                  Thời gian
                </p>
                <p className="text-3xl md:text-4xl font-bold text-red-600">
                  {quizData.duration} phút
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs md:text-sm uppercase text-gray-500 font-semibold tracking-wider mb-2">
                  Loại
                </p>
                <p className="text-2xl md:text-3xl font-bold text-red-600">
                  🎯
                </p>
              </div>
            </div>

            <div className="bg-red-100 border-l-4 border-red-600 p-6 rounded-lg mb-8">
              <h3 className="text-lg font-bold text-red-600 mb-4">Hướng dẫn:</h3>
              <ul className="space-y-3 text-gray-700">
                <li>✓ Bạn có {quizData.duration} phút để hoàn thành bài quiz</li>
                <li>✓ Bài quiz có {quizData.questions.length} câu hỏi trắc nghiệm</li>
                <li>✓ Bạn có thể điều hướng giữa các câu hỏi</li>
                <li>✓ Đáp án sẽ được lưu tự động</li>
                <li>✓ Xác nhận trước khi nộp bài</li>
              </ul>
            </div>

            <div className="flex gap-4 flex-col md:flex-row mb-6">
              <button
                onClick={handleStartQuiz}
                className="flex-1 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-4 px-6 rounded-lg text-lg uppercase tracking-wider transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Bắt đầu làm bài
              </button>
              <button
                onClick={() => setScreen('username')}
                className="flex-1 bg-white hover:bg-gray-100 text-red-600 font-bold py-4 px-6 rounded-lg border-2 border-red-600 text-lg uppercase transition duration-300"
              >
                Đổi tên
              </button>
            </div>

            <div className="p-4 bg-red-50 rounded-lg text-center">
              <p className="text-red-600 font-semibold">
                Đang chơi với tên: <span className="text-red-700 font-bold">{username}</span>
              </p>
            </div>
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
      <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-orange-500 p-4 md:p-6 flex flex-col">
        {/* Timer Section */}
        <div className="w-full max-w-4xl mx-auto mb-6">
          <div className="bg-white rounded-2xl shadow-lg p-6 flex flex-col md:flex-row md:items-center md:justify-between gap-4">
            <div className="flex-1">
              <h2 className="text-xl font-bold text-red-600 mb-3">
                Câu {currentQuestion + 1}/{quizData.questions.length}
              </h2>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <div
                  className="h-full bg-gradient-to-r from-red-600 to-orange-600 transition-all duration-300"
                  style={{ width: `${((currentQuestion + 1) / quizData.questions.length) * 100}%` }}
                ></div>
              </div>
            </div>
            <div className="flex gap-4 md:gap-8 md:whitespace-nowrap">
              <div className={`text-center md:text-right px-4 py-2 rounded-lg font-bold text-lg ${
                timeLeft < 60 ? 'bg-red-100 text-red-600 animate-pulse' : 'bg-red-100 text-red-600'
              }`}>
                ⏱️ {formatTime(timeLeft)}
              </div>
              <div className="text-center md:text-right text-sm font-semibold text-gray-600 px-4 py-2 bg-red-50 rounded-lg">
                Đã trả lời: <span className="text-red-600 font-bold">{answeredCount}/{quizData.questions.length}</span>
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
                      ? 'bg-gradient-to-r from-red-600 to-orange-600 text-white shadow-lg scale-105'
                      : 'bg-gray-50 hover:bg-red-50 text-gray-800 border-2 border-transparent hover:border-red-300'
                  }`}
                >
                  <span className={`flex items-center justify-center w-10 h-10 rounded-lg font-bold text-base ${
                    selectedAnswer === index
                      ? 'bg-white text-red-600'
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
              className="px-4 py-3 border-2 border-red-300 rounded-lg font-semibold text-gray-800 focus:outline-none focus:border-red-600 bg-white cursor-pointer min-w-40"
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
                className="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-lg min-w-40"
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
                Bạn đã trả lời <span className="font-bold text-red-600">{Object.keys(answers).length}</span> câu trong tổng số <span className="font-bold text-red-600">{quizData.questions.length}</span> câu.
              </p>
              <p className="text-gray-600 mb-6 text-lg">Bạn chắc chắn muốn nộp bài không?</p>
              <div className="flex gap-4">
                <button
                  onClick={() => setShowConfirmSubmit(false)}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-red-100 hover:bg-red-200 disabled:opacity-50 text-red-600 font-bold rounded-lg transition duration-300 border-2 border-red-600 disabled:cursor-not-allowed"
                >
                  Tiếp tục làm bài
                </button>
                <button
                  onClick={confirmSubmit}
                  disabled={isSubmitting}
                  className="flex-1 px-4 py-3 bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold rounded-lg transition duration-300 disabled:opacity-50 disabled:cursor-not-allowed flex items-center justify-center gap-2"
                >
                  {isSubmitting ? (
                    <>
                      <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"></div>
                      <span>⏳ Đang xử lý...</span>
                    </>
                  ) : (
                    'Xác nhận nộp'
                  )}
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    );
  }
}
