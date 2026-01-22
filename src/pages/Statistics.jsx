import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { quizData } from '../data/quizData';

export default function Statistics() {
  const location = useLocation();
  const navigate = useNavigate();
  const [userDetail, setUserDetail] = useState(null);

  useEffect(() => {
    if (location.state?.user) {
      setUserDetail(location.state.user);
    } else {
      // Nếu không có dữ liệu, redirect về leaderboard
      navigate('/leaderboard');
    }
  }, [location, navigate]);

  const getWrongAnswerStats = () => {
    if (!userDetail || !userDetail.answers) {
      return [];
    }

    const wrongAnswers = [];
    quizData.questions.forEach((question, index) => {
      if (userDetail.answers[index] !== question.correct) {
        wrongAnswers.push({
          questionIndex: index,
          question: question.question,
          userAnswer: question.options[userDetail.answers[index] || -1] || 'Không trả lời',
          correctAnswer: question.options[question.correct],
          optionIndex: question.correct
        });
      }
    });

    return wrongAnswers;
  };

  const getAnswerStats = () => {
    if (!userDetail || !userDetail.answers) {
      return { total: 0, correct: 0, wrong: 0, notAnswered: 0 };
    }

    let correct = 0;
    let wrong = 0;
    let notAnswered = 0;

    quizData.questions.forEach((question, index) => {
      if (userDetail.answers[index] === undefined) {
        notAnswered++;
      } else if (userDetail.answers[index] === question.correct) {
        correct++;
      } else {
        wrong++;
      }
    });

    return {
      total: quizData.questions.length,
      correct,
      wrong,
      notAnswered
    };
  };

  if (!userDetail) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-red-600 via-red-500 to-orange-500 flex items-center justify-center p-4">
        <div className="text-white text-2xl font-bold animate-pulse flex items-center gap-3">
          <span className="text-4xl animate-bounce">⏳</span>
          Đang tải dữ liệu...
        </div>
      </div>
    );
  }

  const wrongAnswers = getWrongAnswerStats();
  const answerStats = getAnswerStats();

  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-orange-500 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-4xl mx-auto">
        <section className="mb-8">
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 group cursor-pointer hover:border-red-400 transition-all duration-500">
            <div className="flex items-center justify-between mb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center text-white font-bold text-2xl shadow-lg hover:scale-125 transition-transform">
                {userDetail.username.charAt(0).toUpperCase()}
              </div>
              <div>
                <h1 className="text-3xl font-bold text-gray-800 hover:text-red-600 transition-colors">{userDetail.username}</h1>
                <p className="text-gray-500">📅 {new Date(userDetail.completedAt).toLocaleDateString('vi-VN')}</p>
              </div>
            </div>
            <button
              onClick={() => navigate('/leaderboard')}
              className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold rounded-lg transition duration-300 transform hover:scale-110 hover:shadow-lg"
            >
              ← Quay lại
            </button>
            </div>
          </div>
        </section>

        {/* Answer Statistics */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 group cursor-pointer hover:border-red-400 transition-all duration-500">
            <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
              <span className="text-3xl animate-bounce">📊</span>
              Thống kê đáp án
            </h2>
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="bg-green-50 p-6 rounded-lg border-2 border-green-300 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group">
                <p className="text-sm font-semibold text-gray-600 uppercase mb-2 group-hover:text-green-600 transition-colors">✅ Trả lời đúng</p>
                <p className="text-4xl font-bold text-green-600 group-hover:scale-110 transition-transform">{answerStats.correct}</p>
                <p className="text-sm text-gray-500 mt-1">/ {answerStats.total} câu</p>
              </div>
              <div className="bg-red-50 p-6 rounded-lg border-2 border-red-300 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group">
                <p className="text-sm font-semibold text-gray-600 uppercase mb-2 group-hover:text-red-600 transition-colors">❌ Trả lời sai</p>
                <p className="text-4xl font-bold text-red-600 group-hover:scale-110 transition-transform">{answerStats.wrong}</p>
                <p className="text-sm text-gray-500 mt-1">{((answerStats.wrong / answerStats.total) * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-yellow-50 p-6 rounded-lg border-2 border-yellow-300 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group">
                <p className="text-sm font-semibold text-gray-600 uppercase mb-2 group-hover:text-yellow-600 transition-colors">⏭️ Không trả lời</p>
                <p className="text-4xl font-bold text-yellow-600 group-hover:scale-110 transition-transform">{answerStats.notAnswered}</p>
                <p className="text-sm text-gray-500 mt-1">{((answerStats.notAnswered / answerStats.total) * 100).toFixed(1)}%</p>
              </div>
              <div className="bg-gradient-to-br from-red-50 to-orange-50 p-6 rounded-lg border-2 border-red-300 hover:shadow-lg hover:scale-105 transition-all duration-300 cursor-pointer group">
                <p className="text-sm font-semibold text-gray-600 uppercase mb-2 group-hover:text-red-600 transition-colors">🎯 Tổng điểm</p>
                <p className="text-4xl font-bold text-red-600 group-hover:scale-110 transition-transform">{((answerStats.correct / answerStats.total) * 10).toFixed(1)}</p>
                <p className="text-sm text-gray-500 mt-1">/ 10</p>
              </div>
            </div>
          </div>
        </section>

        {/* Wrong Answers Section */}
        {wrongAnswers.length > 0 && (
          <section className="mb-8">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 group cursor-pointer hover:border-red-400 transition-all duration-500">
              <h2 className="text-2xl font-bold text-gray-800 mb-6 flex items-center gap-3">
                <span className="text-3xl animate-bounce">📋</span>
                Các câu trả lời sai ({wrongAnswers.length} câu)
              </h2>
              <div className="space-y-6">
              {wrongAnswers.map((wrong, idx) => (
                <div key={idx} className="bg-gradient-to-r from-red-50 to-orange-50 border-3 border-red-300 rounded-lg p-6 hover:shadow-lg hover:scale-[1.01] transition-all duration-300 group cursor-pointer">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="bg-gradient-to-r from-red-600 to-orange-500 text-white px-4 py-2 rounded-lg font-bold text-lg group-hover:scale-110 transition-transform">
                      Câu {wrong.questionIndex + 1}
                    </span>
                    <span className="text-sm font-semibold text-gray-600 bg-gray-200 px-3 py-1 rounded group-hover:bg-gray-300 transition-colors">
                      {idx + 1}/{wrongAnswers.length}
                    </span>
                  </div>

                  <p className="text-lg font-semibold text-gray-800 mb-6 p-4 bg-white rounded-lg border-l-4 border-red-600 group-hover:border-orange-500 transition-colors group-hover:bg-gray-50">
                    {wrong.question}
                  </p>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div className="bg-white p-4 rounded-lg border-3 border-red-400 hover:shadow-md hover:scale-105 transition-all duration-300">
                      <p className="text-xs font-bold text-red-600 uppercase mb-2 tracking-wider">❌ Câu trả lời của bạn:</p>
                      <p className="text-gray-800 font-semibold text-base group-hover:text-red-600 transition-colors">{wrong.userAnswer}</p>
                    </div>
                    <div className="bg-white p-4 rounded-lg border-3 border-green-400 hover:shadow-md hover:scale-105 transition-all duration-300">
                      <p className="text-xs font-bold text-green-600 uppercase mb-2 tracking-wider">✅ Đáp án đúng:</p>
                      <p className="text-gray-800 font-semibold text-base group-hover:text-green-600 transition-colors">{wrong.correctAnswer}</p>
                    </div>
                  </div>
                </div>
              ))}
            </div>
            </div>
          </section>
        )}

        {/* No Wrong Answers */}
        {wrongAnswers.length === 0 && (
          <section className="mb-8">
            <div className="bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 text-center group cursor-pointer hover:border-red-400 transition-all duration-500">
              <p className="text-4xl mb-4 animate-bounce">🎉</p>
              <h2 className="text-2xl font-bold text-red-600 mb-2">Hoàn hảo!</h2>
              <p className="text-gray-600 text-lg">Bạn đã trả lời đúng tất cả các câu hỏi</p>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
