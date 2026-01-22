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
    <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-orange-500 py-8 px-4 sm:px-6 lg:px-8 flex items-center justify-center">
      <div className="w-full max-w-2xl">
        <div className="bg-white rounded-2xl border-2 border-gray-200 p-12 md:p-16 animate-in fade-in slide-in-from-bottom-4 group cursor-pointer hover:border-red-400 transition-all duration-500">
          {/* Success Animation */}
          <div className="text-center mb-8">
            <div className="inline-block mb-6 animate-bounce">
              <div className="text-9xl">✨</div>
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              Chúc mừng!
            </h1>
            <p className="text-xl text-gray-600 mb-2 flex items-center justify-center gap-2">
              <span className="text-2xl animate-spin">🎉</span>
              Bạn đã hoàn thành bài quiz thành công
            </p>
            <p className="text-lg text-gray-700">
              <span className="font-bold">Xin chào, {username}!</span>
            </p>
          </div>

          {/* Quick Stats */}
          <div className="bg-gradient-to-r from-red-50 to-orange-50 rounded-xl p-8 mb-10 border-l-4 border-red-600 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group cursor-pointer">
            <div className="grid grid-cols-2 gap-6 text-center">
              <div className="group-hover:scale-110 transition-transform">
                <p className="text-sm uppercase text-gray-600 font-semibold tracking-wider mb-2">
                  Điểm số
                </p>
                <p className="text-5xl font-black text-red-600">
                  {percentage}%
                </p>
              </div>
              <div className="group-hover:scale-110 transition-transform">
                <p className="text-sm uppercase text-gray-600 font-semibold tracking-wider mb-2">
                  Kết quả
                </p>
                <p className="text-4xl font-bold text-red-600">
                  {correct}/{total}
                </p>
              </div>
            </div>
          </div>

          {/* Motivational Message */}
          <div className="mb-10">
            {percentage >= 80 && (
              <div className="bg-blue-50 border-l-4 border-blue-600 p-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300 group cursor-pointer">
                <p className="text-blue-800 font-semibold text-lg flex items-center gap-2">
                  <span className="text-3xl group-hover:animate-bounce">🌟</span>
                  Xuất sắc! Bạn thực sự giỏi!
                </p>
              </div>
            )}
            {percentage >= 60 && percentage < 80 && (
              <div className="bg-green-50 border-l-4 border-green-600 p-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300 group cursor-pointer">
                <p className="text-green-800 font-semibold text-lg flex items-center gap-2">
                  <span className="text-3xl group-hover:animate-bounce">👏</span>
                  Tốt lắm! Bạn làm rất tốt!
                </p>
              </div>
            )}
            {percentage >= 40 && percentage < 60 && (
              <div className="bg-yellow-50 border-l-4 border-yellow-600 p-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300 group cursor-pointer">
                <p className="text-yellow-800 font-semibold text-lg flex items-center gap-2">
                  <span className="text-3xl group-hover:animate-bounce">📚</span>
                  Không tệ! Tiếp tục cố gắng nhé!
                </p>
              </div>
            )}
            {percentage < 40 && (
              <div className="bg-red-50 border-l-4 border-red-600 p-6 rounded-lg hover:shadow-md hover:scale-105 transition-all duration-300 group cursor-pointer">
                <p className="text-red-800 font-semibold text-lg flex items-center gap-2">
                  <span className="text-3xl group-hover:animate-bounce">💪</span>
                  Đừng nản lòng! Hãy cố gắng lần tiếp theo!
                </p>
              </div>
            )}
          </div>

          {/* Action Buttons */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
            <Link
              to="/results"
              state={{ result: resultData }}
              className="flex items-center justify-center gap-3 px-8 py-4 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold rounded-lg transition duration-300 transform hover:-translate-y-2 hover:shadow-lg hover:shadow-red-600/50 text-lg group hover:scale-110"
            >
              <span className="group-hover:animate-spin">📋</span>
              <span>Xem kết quả chi tiết</span>
            </Link>
            <Link
              to="/leaderboard"
              className="flex items-center justify-center gap-3 px-8 py-4 bg-white hover:bg-yellow-50 text-red-600 font-bold rounded-lg border-2 border-red-600 transition duration-300 text-lg group hover:scale-110 hover:shadow-lg"
            >
              <span className="group-hover:animate-bounce">🏆</span>
              <span>Xem bảng xếp hạng</span>
            </Link>
          </div>

          {/* Additional Options */}
          <div className="flex flex-col gap-3">
            <Link
              to="/quiz"
              className="text-center px-8 py-3 bg-gradient-to-r from-gray-200 to-gray-100 hover:from-gray-300 hover:to-gray-200 text-gray-800 font-bold rounded-lg transition duration-300 text-base transform hover:scale-105"
            >
              <span className="mr-2">🔄</span>Làm bài khác
            </Link>
            <Link
              to="/"
              className="text-center px-8 py-3 text-red-600 font-semibold hover:text-orange-600 text-base transform hover:scale-105 transition-all"
            >
              ← Về trang chủ
            </Link>
          </div>
        </div>

        {/* Decorative Elements */}
        <div className="mt-8 flex justify-center gap-4">
          <div className="text-3xl animate-bounce hover:scale-150 transition-transform cursor-pointer" style={{ animationDelay: '0s' }}>🎉</div>
          <div className="text-3xl animate-bounce hover:scale-150 transition-transform cursor-pointer" style={{ animationDelay: '0.2s' }}>🎊</div>
          <div className="text-3xl animate-bounce hover:scale-150 transition-transform cursor-pointer" style={{ animationDelay: '0.4s' }}>🎉</div>
        </div>
      </div>
    </div>
  );
}
