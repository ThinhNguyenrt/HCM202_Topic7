import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchLeaderboard();
  }, []);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      // Chỉ sử dụng một orderBy để tránh cần composite index
      const q = query(
        collection(db, 'quizResults'),
        orderBy('score', 'desc'),
        limit(100)
      );
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      
      // Sắp xếp lại bằng JavaScript: điểm cao trước, nếu điểm bằng thì thời gian nhanh hơn
      results.sort((a, b) => {
        if (a.score !== b.score) {
          return b.score - a.score; // Điểm cao hơn lên trước
        }
        return a.timeTaken - b.timeTaken; // Nếu điểm bằng, thời gian nhanh hơn lên trước
      });
      
      setLeaderboard(results);
    } catch (error) {
      console.error('Lỗi khi lấy leaderboard:', error);
    } finally {
      setLoading(false);
    }
  };

  const getMedalEmoji = (position) => {
    if (position === 1) return '🥇';
    if (position === 2) return '🥈';
    if (position === 3) return '🥉';
    return position;
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 p-4 md:p-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-3">
            🏆 Bảng xếp hạng
          </h1>
          <Link
            to="/quiz"
            className="px-6 py-3 bg-white hover:bg-gray-100 text-indigo-600 font-bold rounded-lg transition duration-300"
          >
            ← Quay lại
          </Link>
        </div>

        {loading ? (
          <div className="flex justify-center items-center py-20">
            <div className="text-white text-2xl font-bold">⏳ Đang tải dữ liệu...</div>
          </div>
        ) : leaderboard.length === 0 ? (
          <div className="bg-white rounded-2xl shadow-xl p-12 text-center">
            <p className="text-2xl text-gray-500 mb-4">Chưa có dữ liệu</p>
            <Link
              to="/quiz"
              className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg inline-block"
            >
              Bắt đầu làm quiz
            </Link>
          </div>
        ) : (
          <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
            {/* Leaderboard Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-indigo-600 to-purple-600 text-white">
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Xếp hạng</th>
                    <th className="px-6 py-4 text-left text-sm font-bold uppercase tracking-wider">Tên</th>
                    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Điểm</th>
                    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Đúng/Tổng</th>
                    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Thời gian</th>
                    <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Ngày</th>
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((item, index) => {
                    const percentage = Math.round((item.correct / item.total) * 100);
                    const time = `${Math.floor(item.timeTaken / 60)}:${(item.timeTaken % 60)
                      .toString()
                      .padStart(2, '0')}`;
                    const date = new Date(item.completedAt).toLocaleDateString('vi-VN');

                    return (
                      <tr
                        key={item.id}
                        className={`border-b transition duration-300 hover:bg-indigo-50 ${
                          index === 0
                            ? 'bg-yellow-50'
                            : index === 1
                            ? 'bg-gray-100'
                            : index === 2
                            ? 'bg-orange-50'
                            : ''
                        }`}
                      >
                        <td className="px-6 py-4 font-bold text-lg text-gray-800">
                          {getMedalEmoji(index + 1)}
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-indigo-600 to-purple-600 flex items-center justify-center text-white font-bold text-sm">
                              {item.username.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-gray-800">{item.username}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-block px-4 py-2 bg-indigo-100 text-indigo-600 font-bold rounded-lg text-lg">
                            {percentage}%
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-gray-800">
                          <span className="text-green-600 font-bold">{item.correct}</span> /{' '}
                          <span className="text-gray-500">{item.total}</span>
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-gray-800">{time}</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">{date}</td>
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Summary Stats */}
            <div className="bg-gray-50 px-6 py-6 border-t border-gray-200 grid grid-cols-2 md:grid-cols-4 gap-4">
              <div className="text-center">
                <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-1">
                  Tổng người chơi
                </p>
                <p className="text-3xl font-bold text-indigo-600">{leaderboard.length}</p>
              </div>
              <div className="text-center">
                <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-1">
                  Điểm cao nhất
                </p>
                <p className="text-3xl font-bold text-green-600">
                  {Math.round((leaderboard[0].correct / leaderboard[0].total) * 100)}%
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-1">
                  Thời gian nhanh nhất
                </p>
                <p className="text-3xl font-bold text-purple-600">
                  {Math.floor(leaderboard[0].timeTaken / 60)}:{(leaderboard[0].timeTaken % 60)
                    .toString()
                    .padStart(2, '0')}
                </p>
              </div>
              <div className="text-center">
                <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-1">
                  Điểm trung bình
                </p>
                <p className="text-3xl font-bold text-indigo-600">
                  {Math.round(
                    leaderboard.reduce((sum, item) => sum + (item.correct / item.total) * 100, 0) /
                      leaderboard.length
                  )}%
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
