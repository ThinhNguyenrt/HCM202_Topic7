import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { quizData } from '../data/quizData';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const resultData = location.state?.result;

  // Lưu trạng thái xác thực user để có thể xem bảng xếp hạng mà không cần nhập lại mật khẩu
  useEffect(() => {
    if (resultData) {
      sessionStorage.setItem('userAuthenticated', 'true');
      sessionStorage.setItem('leaderboardAuth', 'true');
    }
  }, [resultData]);

  if (!resultData) {
    navigate('/quiz');
    return null;
  }

  const { correct, total, timeTaken, answers, username } = resultData;
  const percentage = Math.round((correct / total) * 100);
  const minutesTaken = Math.floor(timeTaken / 60);
  const secondsTaken = timeTaken % 60;

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
    <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-orange-500 py-8 px-4 sm:px-6 lg:px-8">
      <section className="mb-8">
        <div className="w-full max-w-4xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-10 md:p-16 group cursor-pointer hover:border-red-400 transition-all duration-500 animate-in fade-in slide-in-from-bottom-4">
          <div className="text-center mb-8">
            <div className="text-8xl md:text-9xl mb-4">{resultIcon}</div>
            <h2 className={`text-4xl md:text-5xl font-bold bg-gradient-to-r ${resultColor} bg-clip-text text-transparent mb-2`}>
              {resultMessage}
            </h2>
            <p className="text-xl text-gray-600">Xin chào, <span className="font-bold text-red-600">{username}</span></p>
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
          <div className="grid grid-cols-3 gap-4 md:gap-6 mb-10 p-8 bg-white rounded-2xl shadow-lg hover:shadow-2xl hover:scale-[1.01] transition-all duration-300 group cursor-pointer">
            <div className="text-center">
              <p className="text-xs md:text-sm uppercase text-gray-500 font-bold tracking-wider mb-2">Đúng</p>
              <p className="text-3xl md:text-4xl font-bold text-green-600 group-hover:scale-110 transition-transform">{correct}</p>
              <p className="text-xs text-gray-400 mt-1">/{total}</p>
            </div>
            <div className="text-center border-l border-r border-gray-200">
              <p className="text-xs md:text-sm uppercase text-gray-500 font-bold tracking-wider mb-2">Sai</p>
              <p className="text-3xl md:text-4xl font-bold text-red-600 group-hover:scale-110 transition-transform">{total - correct}</p>
              <p className="text-xs text-gray-400 mt-1">/{total}</p>
            </div>
            <div className="text-center">
              <p className="text-xs md:text-sm uppercase text-gray-500 font-bold tracking-wider mb-2">Thời gian</p>
              <p className="text-3xl md:text-4xl font-bold text-red-600 group-hover:scale-110 transition-transform">
                {minutesTaken}:{secondsTaken < 10 ? '0' : ''}{secondsTaken}
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col md:flex-row gap-4 mb-10 justify-center flex-wrap">
            <Link
              to="/quiz"
              className="px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold rounded-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-600/50 text-lg text-center group hover:scale-110"
            >
              <span className="group-hover:animate-spin inline mr-2">🔄</span> Làm lại
            </Link>
            <Link
              to="/leaderboard"
              className="px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 font-bold rounded-lg border-2 border-indigo-600 transition duration-300 text-lg text-center"
            >
              🏆 Xem bảng xếp hạng
            </Link>
            <Link
              to="/"
              className="px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 font-bold rounded-lg border-2 border-indigo-600 transition duration-300 text-lg text-center"
            >
              🏠 Về trang chủ
            </Link>
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
                      isCorrect ? 'bg-green-50 border-green-500' : 'bg-red-50 border-red-500'
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
      </section>
    </div>
  );
}
