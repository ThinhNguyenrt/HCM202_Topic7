import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';

export default function Leaderboard() {
  const navigate = useNavigate();
  const [screen, setScreen] = useState('password'); // password, main
  const [password, setPassword] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isAdmin, setIsAdmin] = useState(false);
  const [showAdminLogin, setShowAdminLogin] = useState(false);
  const [adminPassword, setAdminPassword] = useState('');

  // Kiểm tra xem đã xác thực password chưa
  useEffect(() => {
    const isAuthenticated = sessionStorage.getItem('leaderboardAuth') === 'true';
    if (isAuthenticated) {
      setScreen('main');
    }
  }, []);

  // Kiểm tra admin status từ localStorage khi component mount
  useEffect(() => {
    const adminStatus = localStorage.getItem('isAdmin') === 'true';
    setIsAdmin(adminStatus);
  }, []);

  const handlePasswordSubmit = (e) => {
    e.preventDefault();
    const trimmedPassword = password.trim();
    
    if (!trimmedPassword) {
      setPasswordError('Vui lòng nhập mật khẩu');
      return;
    }

    // Admin password - xác thực admin
    if (trimmedPassword === '123456') {
      setPasswordError('');
      setPassword('');
      sessionStorage.setItem('leaderboardAuth', 'true');
      localStorage.setItem('isAdmin', 'true');
      setIsAdmin(true);
      setScreen('main');
      return;
    }

    // User password
    if (trimmedPassword === 'user123') {
      setPasswordError('');
      setPassword('');
      sessionStorage.setItem('leaderboardAuth', 'true');
      setScreen('main');
      return;
    }

    // Sai password
    setPasswordError('Mật khẩu không đúng');
    setPassword('');
  };

  // Fetch leaderboard khi screen thay đổi thành 'main'
  useEffect(() => {
    if (screen === 'main') {
      fetchLeaderboard();
    }
  }, [screen]);

  const fetchLeaderboard = async () => {
    try {
      setLoading(true);
      // Lấy tất cả kết quả
      const q = query(
        collection(db, 'quizResults'),
        orderBy('completedAt', 'desc'),
        limit(100)
      );
      const querySnapshot = await getDocs(q);
      const results = [];
      querySnapshot.forEach((doc) => {
        results.push({ id: doc.id, ...doc.data() });
      });
      
      // Lọc theo ngày hôm nay
      const now = new Date();
      const todayResults = results.filter((item) => {
        const itemDate = new Date(item.completedAt);
        return (
          itemDate.getDate() === now.getDate() &&
          itemDate.getMonth() === now.getMonth() &&
          itemDate.getFullYear() === now.getFullYear()
        );
      });

      // Sắp xếp: số câu đúng giảm dần, rồi thời gian tăng dần
      todayResults.sort((a, b) => {
        if (a.correct !== b.correct) {
          return b.correct - a.correct; // Số câu đúng nhiều hơn lên trước
        }
        return a.timeTaken - b.timeTaken; // Nếu số câu bằng, thời gian nhanh hơn lên trước
      });

      // Xử lý logic top 3: nếu có >3 người cùng số câu đúng cao nhất, chỉ lấy 3 người
      let finalResults = [];
      if (todayResults.length > 0) {
        const maxCorrect = todayResults[0].correct;
        const topScorers = todayResults.filter(item => item.correct === maxCorrect);
        
        if (topScorers.length > 3) {
          // Chỉ lấy 3 người nhanh nhất
          finalResults = topScorers.slice(0, 3);
        } else {
          // Lấy tất cả từ maxCorrect trở xuống
          finalResults = todayResults;
        }
      }
      
      setLeaderboard(finalResults);
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

  const handleViewDetail = (user) => {
    navigate('/statistics', { state: { user } });
  };

  const handleAdminLogin = (e) => {
    e.preventDefault();
    const ADMIN_PASSWORD = '123456'; // Đồng bộ với password screen
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
  };

  // Password Screen
  if (screen === 'password') {
    return (
      <div className="min-h-screen bg-gradient-to-br from-purple-600 via-indigo-600 to-purple-800 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 animate-in fade-in slide-in-from-bottom-4 duration-500">
            <div className="text-center mb-8">
              <h1 className="text-4xl md:text-5xl font-bold text-indigo-600 mb-3">
                🔐 Xác thực
              </h1>
              <p className="text-gray-600 text-lg">
                Nhập mật khẩu để xem bảng xếp hạng
              </p>
            </div>

            <form onSubmit={handlePasswordSubmit} className="space-y-6">
              <div>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => {
                    setPassword(e.target.value);
                    setPasswordError('');
                  }}
                  placeholder="Nhập mật khẩu..."
                  className={`w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none transition duration-300 ${
                    passwordError
                      ? 'border-red-500 focus:border-red-600 bg-red-50'
                      : 'border-indigo-300 focus:border-indigo-600 focus:bg-indigo-50'
                  }`}
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit(e)}
                />
                {passwordError && (
                  <p className="text-red-600 text-sm font-semibold mt-2 flex items-center gap-2">
                    ⚠️ {passwordError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-indigo-600 to-purple-700 hover:from-indigo-700 hover:to-purple-800 text-white font-bold py-4 px-6 rounded-lg text-lg uppercase tracking-wider transition duration-300 transform hover:-translate-y-1 hover:shadow-lg"
              >
                Xác thực →
              </button>
            </form>

            <div className="mt-8 p-6 bg-indigo-50 rounded-xl border border-indigo-200">
              <p className="text-sm text-gray-600 text-center">
                ℹ️ Nhập mật khẩu để truy cập bảng xếp hạng
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Leaderboard Screen
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

          {/* Info Message */}
          {isAdmin && (
            <div className="bg-blue-50 rounded-lg shadow-lg p-4 border border-blue-200">
              <span className="text-sm text-blue-800 font-semibold">
                ℹ️ Hiển thị bảng xếp hạng của ngày hôm nay - Xếp hạng theo số câu đúng nhiều nhất và thời gian nhanh nhất
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
          <>
            {/* Ranking Explanation */}
            <div className="mb-4 bg-gradient-to-r from-purple-50 to-indigo-50 rounded-lg p-4 border-l-4 border-indigo-600">
              <p className="text-sm text-gray-700">
                <span className="font-bold text-indigo-600">🏆 Cơ chế xếp hạng:</span> Xếp hạng theo số câu đúng nhiều nhất trong ngày. Nếu cùng số câu đúng, xếp theo thời gian làm bài nhanh nhất. Top 3 sẽ được hiển thị.
              </p>
            </div>

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
                    {isAdmin && <th className="px-6 py-4 text-center text-sm font-bold uppercase tracking-wider">Hành động</th>}
                  </tr>
                </thead>
                <tbody>
                  {leaderboard.map((item, index) => {
                    const score = ((item.correct / item.total) * 10).toFixed(1);
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
                            {score}/10
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-gray-800">
                          <span className="text-green-600 font-bold">{item.correct}</span> /{' '}
                          <span className="text-gray-500">{item.total}</span>
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-gray-800">{time}</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">{date}</td>
                        {isAdmin && (
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleViewDetail(item)}
                              className="px-4 py-2 bg-indigo-600 hover:bg-indigo-700 text-white font-semibold rounded-lg text-sm transition duration-300"
                            >
                              Chi tiết
                            </button>
                          </td>
                        )}
                      </tr>
                    );
                  })}
                </tbody>
              </table>
            </div>

            {/* Summary Stats - Only for Admin */}
            {isAdmin && (
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
                    {((leaderboard[0].correct / leaderboard[0].total) * 10).toFixed(1)}/10
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-1">
                    Thời gian nhanh nhất
                  </p>
                  <p className="text-3xl font-bold text-purple-600">
                    {(() => {
                      const minTime = Math.min(...leaderboard.map(item => item.timeTaken));
                      return `${Math.floor(minTime / 60)}:${(minTime % 60).toString().padStart(2, '0')}`;
                    })()}
                  </p>
                </div>
                <div className="text-center">
                  <p className="text-xs uppercase text-gray-500 font-semibold tracking-wider mb-1">
                    Điểm trung bình
                  </p>
                  <p className="text-3xl font-bold text-indigo-600">
                    {(
                      leaderboard.reduce((sum, item) => sum + (item.correct / item.total) * 10, 0) /
                        leaderboard.length
                    ).toFixed(1)}/10
                  </p>
                </div>
              </div>
            )}
          </div>
          </>
        )}
      </div>
    </div>
  );
}
