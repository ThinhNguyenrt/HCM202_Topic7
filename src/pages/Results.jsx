import React, { useEffect } from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';
import { Trophy, ArrowLeft } from 'lucide-react';

export default function Results() {
  const location = useLocation();
  const navigate = useNavigate();
  
  // Handle both quiz results and minigame results
  const stateData = location.state;
  const isMinigame = stateData?.group1Score !== undefined;
  
  if (!stateData) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 flex items-center justify-center px-4">
        <div className="text-center">
          <h1 className="text-4xl font-bold text-white mb-4">Không có dữ liệu</h1>
          <Link 
            to="/minigame"
            className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Quay lại Minigame
          </Link>
        </div>
      </div>
    );
  }

  // Minigame Results
  if (isMinigame) {
    const { group1Score, group2Score, winner } = stateData;
    
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Header */}
          <div className="text-center mb-12">
            <Trophy className="w-16 h-16 text-yellow-400 mx-auto mb-4 animate-bounce" />
            <h1 className="text-5xl font-bold text-white mb-2">Kết Quả Trò Chơi</h1>
            <p className="text-purple-200 text-lg">Minigame - Tư Tưởng Hồ Chí Minh</p>
          </div>

          {/* Scores Card */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl border border-white/20 p-8 mb-8">
            <div className="grid grid-cols-2 gap-8 mb-8">
              {/* Nhóm 1 */}
              <div className={`rounded-xl p-6 text-center transform transition ${
                winner === 1 ? 'bg-blue-500 scale-105 shadow-lg' : 'bg-blue-500/50'
              }`}>
                <h2 className="text-white text-xl font-bold mb-2">Nhóm 1</h2>
                <div className="text-5xl font-bold text-white mb-2">{group1Score}</div>
                <p className="text-blue-100">Điểm</p>
                {winner === 1 && (
                  <div className="mt-3 inline-block bg-yellow-400 text-blue-900 px-4 py-1 rounded-full font-bold text-sm">
                    🥇 Chiến Thắng
                  </div>
                )}
              </div>

              {/* Nhóm 2 */}
              <div className={`rounded-xl p-6 text-center transform transition ${
                winner === 2 ? 'bg-orange-500 scale-105 shadow-lg' : 'bg-orange-500/50'
              }`}>
                <h2 className="text-white text-xl font-bold mb-2">Nhóm 2</h2>
                <div className="text-5xl font-bold text-white mb-2">{group2Score}</div>
                <p className="text-orange-100">Điểm</p>
                {winner === 2 && (
                  <div className="mt-3 inline-block bg-yellow-400 text-orange-900 px-4 py-1 rounded-full font-bold text-sm">
                    🥇 Chiến Thắng
                  </div>
                )}
              </div>
            </div>

            {/* Winner Announcement */}
            {winner === 1 ? (
              <div className="bg-blue-500/20 border border-blue-400 rounded-lg p-4 text-center mb-8">
                <p className="text-white text-lg font-bold">🎉 Nhóm 1 Chiến Thắng! 🎉</p>
              </div>
            ) : winner === 2 ? (
              <div className="bg-orange-500/20 border border-orange-400 rounded-lg p-4 text-center mb-8">
                <p className="text-white text-lg font-bold">🎉 Nhóm 2 Chiến Thắng! 🎉</p>
              </div>
            ) : (
              <div className="bg-purple-500/20 border border-purple-400 rounded-lg p-4 text-center mb-8">
                <p className="text-white text-lg font-bold">🤝 Hòa Nhau! 🤝</p>
              </div>
            )}
          </div>

          {/* Score Analysis */}
          <div className="bg-white/5 backdrop-blur-lg rounded-2xl border border-white/20 p-8 mb-8">
            <h3 className="text-white text-2xl font-bold mb-6">📊 Phân Tích</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div className="bg-blue-500/20 rounded-lg p-4">
                <p className="text-blue-200 text-sm mb-2">Chênh Lệch Điểm</p>
                <p className="text-white text-3xl font-bold">{Math.abs(group1Score - group2Score)}</p>
              </div>
              <div className="bg-green-500/20 rounded-lg p-4">
                <p className="text-green-200 text-sm mb-2">Tổng Điểm</p>
                <p className="text-white text-3xl font-bold">{group1Score + group2Score}</p>
              </div>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link
              to="/minigame"
              className="inline-flex items-center justify-center gap-2 bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              🎮 Chơi Lại
            </Link>
            <Link
              to="/"
              className="inline-flex items-center justify-center gap-2 bg-gray-600 hover:bg-gray-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
            >
              🏠 Trang Chủ
            </Link>
          </div>
        </div>
      </div>
    );
  }

  // Original Quiz Results (keep existing code)
  const resultData = stateData; // For quiz results
  const correct = resultData?.correct || 0;
  const total = resultData?.total || 0;
  const username = resultData?.username || 'Người chơi';
  const timeTaken = resultData?.timeTaken || 0;
  const answers = resultData?.answers || [];
  
  const percentage = Math.round((correct / total) * 100) || 0;
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
              {answers && answers.length > 0 ? (
                answers.map((answer, index) => {
                  const isCorrect = answer === index;
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
                    </div>
                  );
                })
              ) : (
                <p className="text-gray-600 text-center py-8">Không có dữ liệu để xem lại</p>
              )}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
