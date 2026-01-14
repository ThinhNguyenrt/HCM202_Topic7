import React from 'react';
import { useLocation, useNavigate, Link } from 'react-router-dom';

export default function Success() {
  const location = useLocation();
  const navigate = useNavigate();
  
  const resultData = location.state?.result;

  if (!resultData) {
    navigate('/quiz');
    return null;
  }

  const { correct, total, username } = resultData;
  const percentage = Math.round((correct / total) * 100);

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 p-4 md:p-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="inline-block mb-6">
              <div className="text-9xl animate-bounce">✨</div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-transparent bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text mb-4">
              Chúc mừng!
            </h1>
            <p className="text-xl text-gray-600 mb-2">
              Bạn đã hoàn thành bài quiz thành công 🎉
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-bold">Xin chào, {username}!</span>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-indigo-50 to-purple-50 rounded-2xl p-8 mb-10 border border-indigo-200">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div>
                <p className="text-sm uppercase text-gray-600 font-semibold tracking-wider mb-2">
                  Điểm số
                </p>
                <p className="text-5xl font-black bg-gradient-to-r from-indigo-600 to-purple-600 bg-clip-text text-transparent">
                  {percentage}%
                </p>
              </div>
              <div>
                <p className="text-sm uppercase text-gray-600 font-semibold tracking-wider mb-2">
                  Kết quả
                </p>
                <p className="text-4xl font-bold text-indigo-600">
                  {correct}/{total}
                </p>
              </div>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="mb-10">
            {percentage >= 80 && (
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg">
                <p className="text-blue-800 font-semibold text-lg">
                  🌟 Xuất sắc! Bạn thực sự giỏi!
                </p>
              </div>
            )}
            {percentage >= 60 && percentage < 80 && (
              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg">
                <p className="text-green-800 font-semibold text-lg">
                  👏 Tốt lắm! Bạn làm rất tốt!
                </p>
              </div>
            )}
            {percentage >= 40 && percentage < 60 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-lg">
                <p className="text-yellow-800 font-semibold text-lg">
                  📚 Không tệ! Tiếp tục cố gắng nhé!
                </p>
              </div>
            )}
            {percentage < 40 && (
              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg">
                <p className="text-red-800 font-semibold text-lg">
                  💪 Đừng nản lòng! Hãy cố gắng lần tiếp theo!
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Link
              to="/results"
              state={{ result: resultData }}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-indigo-600 to-purple-600 hover:from-indigo-700 hover:to-purple-700 text-white font-bold rounded-lg transition duration-300 transform hover:-translate-y-1 hover:shadow-lg text-lg"
            >
              <span>📋</span>
              <span>Xem kết quả chi tiết</span>
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-gray-100 text-indigo-600 font-bold rounded-lg border-2 border-indigo-600 transition duration-300 text-lg"
            >
              <span>🏆</span>
              <span>Xem bảng xếp hạng</span>
            </Link>
          </div>

          {/* Additional Options */}
          <div className="flex flex-col gap-3">
            <Link
              to="/quiz"
              className="text-center px-8 py-3 bg-gray-100 hover:bg-gray-200 text-gray-800 font-bold rounded-lg transition duration-300 text-base"
            >
              🔄 Làm bài khác
            </Link>
            <Link
              to="/"
              className="text-center px-8 py-3 text-indigo-600 font-semibold hover:text-indigo-700 text-base"
            >
              ← Về trang chủ
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center gap-4">
          <div className="text-3xl animate-bounce" style={{ animationDelay: '0s' }}>🎉</div>
          <div className="text-3xl animate-bounce" style={{ animationDelay: '0.2s' }}>🎊</div>
          <div className="text-3xl animate-bounce" style={{ animationDelay: '0.4s' }}>🎉</div>
        </div>
      </div>
    </div>
  );
}
