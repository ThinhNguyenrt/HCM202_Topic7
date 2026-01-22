import  { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { db } from '../config/firebase';
import { collection, query, orderBy, limit, getDocs } from 'firebase/firestore';
import { Link } from 'react-router-dom';
import { Trophy, Lock } from 'lucide-react';

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
      <div className="min-h-screen bg-gradient-to-r from-red-600 via-red-500 to-orange-500 flex items-center justify-center p-4">
        <div className="w-full max-w-2xl">
          <div className="bg-white rounded-3xl shadow-2xl p-12 md:p-16 animate-in fade-in slide-in-from-bottom-4 duration-500 hover:shadow-2xl transition-shadow">
            <div className="text-center mb-8">
              <div className="flex items-center justify-center gap-3 mb-4">
                <Lock className="w-12 h-12 text-red-600" />
                <h1 className="text-4xl md:text-5xl font-bold text-red-600">
                  Xác thực
                </h1>
              </div>
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
                  className={`w-full px-6 py-4 text-lg border-2 rounded-xl focus:outline-none transition duration-300 hover:border-red-400 ${
                    passwordError
                      ? 'border-red-500 focus:border-red-600 bg-red-50'
                      : 'border-red-300 focus:border-red-600 focus:bg-red-50'
                  }`}
                  autoFocus
                  onKeyPress={(e) => e.key === 'Enter' && handlePasswordSubmit(e)}
                />
                {passwordError && (
                  <p className="text-red-600 text-sm font-semibold mt-2 flex items-center gap-2 animate-pulse">
                    ⚠️ {passwordError}
                  </p>
                )}
              </div>

              <button
                type="submit"
                className="w-full bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold py-4 px-6 rounded-lg text-lg uppercase tracking-wider transition duration-300 transform hover:-translate-y-1 hover:shadow-lg hover:shadow-red-600/50"
              >
                Xác thực →
              </button>
            </form>

            <div className="mt-8 p-6 bg-gradient-to-r from-red-50 to-orange-50 rounded-xl border-2 border-red-200 group hover:border-red-400 transition-colors cursor-pointer">
              <p className="text-sm text-gray-600 text-center font-semibold group-hover:text-red-600 transition-colors">
                ℹ️ Nhập mật khẩu để truy cập bảng xếp hạng hôm nay
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  }

  // Main Leaderboard Screen
  return (
    <div className="min-h-screen bg-gradient-to-b from-red-600 via-red-500 to-orange-500 py-8 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-6xl mx-auto">
        {/* Header */}
        <section className="mb-8">
          <div className="bg-white rounded-2xl border-2 border-gray-200 p-6 md:p-8 group cursor-pointer hover:border-red-400 transition-all duration-500">
            <div className="flex items-center justify-between">
              <h1 className="text-4xl md:text-5xl font-bold text-gray-800 flex items-center gap-3">
                <Trophy className="w-12 h-12 text-yellow-500 animate-bounce" />
                Bảng xếp hạng
              </h1>
              <div className="flex gap-3">
                {!isAdmin ? (
                  <button
                    onClick={() => setShowAdminLogin(true)}
                    className="px-4 py-2 bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-bold rounded-lg transition duration-300 text-sm transform hover:scale-110 hover:shadow-lg"
                  >
                    👤 Admin
                  </button>
                ) : (
                  <button
                    onClick={handleAdminLogout}
                    className="px-4 py-2 bg-red-600 hover:bg-red-700 text-white font-bold rounded-lg transition duration-300 text-sm transform hover:scale-110 hover:shadow-lg"
                  >
                    Đăng xuất Admin
                  </button>
                )}
                <Link
                  to="/quiz"
                  className="px-6 py-3 bg-white hover:bg-yellow-50 text-red-600 font-bold rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg hover:-translate-y-1"
                >
                  ← Quay lại
                </Link>
              </div>
            </div>
          </div>
        </section>

        {/* Admin Login Modal */}
        {showAdminLogin && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
              <div className="bg-white rounded-2xl shadow-2xl p-8 max-w-md w-full hover:shadow-2xl transition-all duration-300 animate-in fade-in scale-in">
                <h2 className="text-2xl font-bold text-transparent bg-gradient-to-r from-red-600 to-orange-500 bg-clip-text mb-6">Đăng nhập Admin</h2>
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
                      className="w-full px-4 py-2 border-2 border-red-300 rounded-lg focus:outline-none focus:border-red-600 focus:ring-2 focus:ring-red-400/50 hover:border-red-400 transition-colors"
                      autoFocus
                    />
                  </div>
                  <div className="flex gap-3">
                    <button
                      type="submit"
                      className="flex-1 px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold rounded-lg transition duration-300 transform hover:scale-105 hover:shadow-lg"
                    >
                      Đăng nhập
                    </button>
                    <button
                      type="button"
                      onClick={() => {
                        setShowAdminLogin(false);
                        setAdminPassword('');
                      }}
                      className="flex-1 px-4 py-2 bg-gray-300 hover:bg-gray-400 text-gray-800 font-bold rounded-lg transition duration-300 transform hover:scale-105"
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
            <section className="mb-8">
              <div className="max-w-6xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-6 md:p-8 group cursor-pointer hover:border-red-400 transition-all duration-500">
                <span className="text-base text-gray-700 font-semibold group-hover:text-red-600 transition-colors flex items-center gap-2">
                  <span className="text-3xl">ℹ️</span>
                  Hiển thị bảng xếp hạng của ngày hôm nay - Xếp hạng theo số câu đúng nhiều nhất và thời gian nhanh nhất
                </span>
              </div>
            </section>
          )}

        {/* Leaderboard Table */}
        <section className="mb-8">
          <div className="max-w-6xl mx-auto bg-white rounded-2xl border-2 border-gray-200 p-8 md:p-10 group cursor-pointer hover:border-red-400 transition-all duration-500">
          {loading ? (
            <div className="flex justify-center items-center py-20">
              <div className="text-gray-800 text-2xl font-bold animate-pulse">⏳ Đang tải dữ liệu...</div>
            </div>
          ) : leaderboard.length === 0 ? (
            <div className="text-center">
              <p className="text-2xl text-gray-500 mb-4 flex items-center justify-center gap-2">
                <span className="text-4xl animate-bounce">📊</span>
                Chưa có dữ liệu
              </p>
              <Link
                to="/quiz"
                className="px-6 py-3 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-bold rounded-lg inline-block transform hover:scale-110 hover:shadow-lg transition-all"
              >
                Bắt đầu làm quiz
              </Link>
            </div>
        ) : (
          <>
            {/* Ranking Explanation */}
            <div className="mb-4 bg-white rounded-lg p-4 border-l-4 border-yellow-400 shadow-lg hover:shadow-xl transition-all duration-300 group cursor-pointer">
              <p className="text-sm text-gray-700 group-hover:text-gray-800 transition-colors">
                <span className="font-bold text-yellow-600 group-hover:text-yellow-700">🏆 Cơ chế xếp hạng:</span> Xếp hạng theo số câu đúng nhiều nhất trong ngày. Nếu cùng số câu đúng, xếp theo thời gian làm bài nhanh nhất. Top 3 sẽ được hiển thị.
              </p>
            </div>

            <div className="bg-white rounded-2xl shadow-2xl overflow-hidden hover:shadow-2xl transition-shadow duration-300">
            {/* Leaderboard Table */}
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-gradient-to-r from-red-600 via-red-500 to-orange-500 text-white">
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
                        className={`border-b transition duration-300 hover:scale-[1.01] hover:shadow-md transform hover:-translate-y-1 cursor-pointer ${
                          index === 0
                            ? 'bg-gradient-to-r from-yellow-50 to-yellow-100 hover:from-yellow-100 hover:to-yellow-200'
                            : index === 1
                            ? 'bg-gradient-to-r from-gray-100 to-gray-50 hover:from-gray-150 hover:to-gray-100'
                            : index === 2
                            ? 'bg-gradient-to-r from-orange-50 to-orange-100 hover:from-orange-100 hover:to-orange-200'
                            : 'hover:bg-red-50/50'
                        }`}
                      >
                        <td className="px-6 py-4 font-bold text-lg text-gray-800">
                          <span className="text-3xl">{getMedalEmoji(index + 1)}</span>
                        </td>
                        <td className="px-6 py-4">
                          <div className="flex items-center gap-3">
                            <div className="w-10 h-10 rounded-full bg-gradient-to-r from-red-600 to-orange-500 flex items-center justify-center text-white font-bold text-sm shadow-md hover:shadow-lg transition-shadow transform hover:scale-125">
                              {item.username.charAt(0).toUpperCase()}
                            </div>
                            <span className="font-semibold text-gray-800 hover:text-red-600 transition-colors">{item.username}</span>
                          </div>
                        </td>
                        <td className="px-6 py-4 text-center">
                          <span className="inline-block px-4 py-2 bg-gradient-to-r from-red-100 to-orange-100 text-red-700 font-bold rounded-lg text-lg hover:shadow-md transition-all duration-300 transform hover:scale-110">
                            {score}/10
                          </span>
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-gray-800">
                          <span className="text-green-600 font-bold text-lg">{item.correct}</span> /{' '}
                          <span className="text-gray-500">{item.total}</span>
                        </td>
                        <td className="px-6 py-4 text-center font-semibold text-gray-800 hover:text-red-600 transition-colors">{time}</td>
                        <td className="px-6 py-4 text-center text-sm text-gray-600">{date}</td>
                        {isAdmin && (
                          <td className="px-6 py-4 text-center">
                            <button
                              onClick={() => handleViewDetail(item)}
                              className="px-4 py-2 bg-gradient-to-r from-red-600 to-orange-500 hover:from-red-700 hover:to-orange-600 text-white font-semibold rounded-lg text-sm transition duration-300 transform hover:scale-110 hover:shadow-lg"
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
                  <p className="text-3xl font-bold text-red-600">
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
        </section>
      </div>
    </div>
  );
}
