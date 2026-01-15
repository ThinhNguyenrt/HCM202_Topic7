import React, { useState, useEffect } from 'react';
import { db } from '../config/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');
  const [timeFilter, setTimeFilter] = useState('all'); // 'all', 'today', 'week', 'month'
  const [filteredLeaderboard, setFilteredLeaderboard] = useState([]);

  // Kiểm tra admin status từ localStorage khi component mount
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  // Lọc dữ liệu khi timeFilter thay đổi hoặc leaderboard thay đổi
  useEffect(() => {
    if (leaderboard.length > 0) {
      const now = new Date();
      const filtered = leaderboard.filter((item) => {
        const itemDate = new Date(item.completedAt);
        
        switch (timeFilter) {
          case 'today':
            return (
              itemDate.getDate() === now.getDate() &&
              itemDate.getMonth() === now.getMonth() &&
              itemDate.getFullYear() === now.getFullYear()
            );
          case 'week': {
            const weekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
            return itemDate >= weekAgo;
          }
          case 'month': {
            const monthAgo = new Date(now.getTime() - 30 * 24 * 60 * 60 * 1000);
            return itemDate >= monthAgo;
          }
          case 'all':
          default:
            return true;
        }
      });
      setFilteredLeaderboard(filtered);
    }
  }, [timeFilter, leaderboard]);

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

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const ADMIN_PASSWORD = 'admin123'; // Có thể thay đổi hoặc lưu trong env
    if (adminPassword === ADMIN_PASSWORD) {
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      setShowAdminLogin(false);
      setAdminPassword('');
    } else {
      alert('Mật khẩu admin không đúng');
      setAdminPassword('');
    }
  };

  const handleAdminLogout = () => {
    localStorage.removeItem('isAdmin');
    setIsAdmin(false);
    setTimeFilter('all');
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 p-4 md:p-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h1 className="text-4xl md:text-5xl font-bold text-white flex items-center gap-3">
              🏆 Bảng xếp hạng
            </h1>
            <div className="flex gap-3">
              {!isAdmin ? (
                <button
                  onClick={() => setShowAdminLogin(true)}
                  className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold rounded-lg transition duration-300 text-sm"
                >
                  👤 Admin
                </button>
              ) : (
                <button
                  onClick={handleAdminLogout}
                  className="px-4 py-2 bg-red-400 hover:bg-red-500 text-white font-bold rounded-lg transition duration-300 text-sm"
                >
                  Đăng xuất Admin
                </button>
              )}
              <Link
                to="/quiz"
                className="px-6 py-3 bg-white hover:bg-gray-100 text-indigo-600 font-bold rounded-lg transition duration-300"
              >
                ← Quay lại
              </Link>
            </div>
          </div>

          {/* Admin Login Modal */}
          {showAdminLogin && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full">
                <h2 className="text-2xl font-bold text-gray-800 mb-6">Đăng nhập Admin</h2>
                <form onSubmit={handleAdminLogin} className="space-y-4">
                  <div>
                    <label className="block text-sm font-semibold text-gray-700 mb-2">
                      Mật khẩu Admin
                    </label>
                    <input
                      type="password"
                      value={adminPassword}
                      onChange={(e) => setAdminPassword(e.target.value)}
                      placeholder="Nhập mật khẩu"
                      className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-bold rounded-lg transition duration-300"
                    >
                      Đăng nhập
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAdminLogin(false);
                        setAdminPassword('');
                      }}
                      className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg transition duration-300"
                    >
                      Hủy
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Admin Time Filter */}
          {isAdmin && (
            <div className="bg-white rounded-lg shadow-lg p-4 flex flex-wrap items-center gap-3">
              <span className="font-semibold text-gray-700">Lọc theo thời gian:</span>
              {['all', 'today', 'week', 'month'].map((filter) => (
                <button
                  key={filter}
                  onClick={() => setTimeFilter(filter)}
                  className={`px-4 py-2 rounded-lg font-semibold transition duration-300 ${
                    timeFilter === filter
                      ? 'bg-indigo-600 text-white'
                      : 'bg-gray-200 text-gray-800 hover:bg-gray-300'
                  }`}
                >
                  {filter === 'all'
                    ? 'Tất cả'
                    : filter === 'today'
                    ? 'Hôm nay'
                    : filter === 'week'
                    ? 'Tuần này'
                    : 'Tháng này'}
                </button>
              ))}
              <span className="ml-auto text-sm text-gray-600 font-semibold">
                {isAdmin && filteredLeaderboard.length > 0
                  ? `Hiển thị: ${filteredLeaderboard.length}/${leaderboard.length} kết quả`
                  : ''}
              </span>
            </div>
          )}
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
                  {(isAdmin ? filteredLeaderboard : leaderboard).map((item, index) => {
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
