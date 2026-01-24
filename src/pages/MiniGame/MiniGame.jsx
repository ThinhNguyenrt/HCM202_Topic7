import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import {
  initializeGame,
  getQuestionById
} from '../../data/minigameQuizData.js';
import Cell from '../../components/minigame/Cell.jsx';
import ScoreBoard from '../../components/minigame/ScoreBoard.jsx';
import QuestionModal from '../../components/minigame/QuestionModal.jsx';
import BombPopup from '../../components/minigame/BombPopup.jsx';
import { Play, Zap } from 'lucide-react';

const TOTAL_TURNS = 10;

function MiniGame() {
  const navigate = useNavigate();
  const [gameState, setGameState] = useState(null);
  const [currentTurn, setCurrentTurn] = useState(1);
  const [group1Score, setGroup1Score] = useState(0);
  const [group2Score, setGroup2Score] = useState(0);
  const [selectedCell, setSelectedCell] = useState(null);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  const [showBombPopup, setShowBombPopup] = useState(false);
  const [gameStarted, setGameStarted] = useState(false);
  const [gameFinished, setGameFinished] = useState(false);

  // Khởi tạo game
  const handleStartGame = () => {
    const initialCells = initializeGame();
    setGameState(initialCells);
    setGameStarted(true);
    setCurrentTurn(1);
    setGroup1Score(0);
    setGroup2Score(0);
    setGameFinished(false);
  };

  // Reset game
  const handleResetGame = () => {
    setGameState(null);
    setGameStarted(false);
    setCurrentTurn(1);
    setGroup1Score(0);
    setGroup2Score(0);
    setSelectedCell(null);
    setShowQuestionModal(false);
    setShowBombPopup(false);
    setGameFinished(false);
  };

  // Xử lý click vào ô
  const handleCellClick = (cellIndex) => {
    const cell = gameState[cellIndex];

    if (cell.isRevealed) return;

    setSelectedCell(cellIndex);

    if (cell.isBomb) {
      setShowBombPopup(true);
    } else {
      setShowQuestionModal(true);
    }
  };

  // Xử lý đáp án từ modal
  const handleAnswerQuestion = (isCorrect) => {
    setShowQuestionModal(false);

    const currentGroup = currentTurn % 2 === 1 ? 1 : 2;
    const points = isCorrect ? 10 : 0;

    // Cập nhật điểm
    if (currentGroup === 1) {
      setGroup1Score(prev => prev + points);
    } else {
      setGroup2Score(prev => prev + points);
    }

    // Đánh dấu ô đã được trả lời
    if (selectedCell !== null) {
      const newGameState = [...gameState];
      newGameState[selectedCell] = {
        ...newGameState[selectedCell],
        isRevealed: true
      };
      setGameState(newGameState);
    }

    // Chuyển lượt
    advanceTurn();
  };

  // Xử lý dính bom
  const handleBombHit = () => {
    setShowBombPopup(false);

    const currentGroup = currentTurn % 2 === 1 ? 1 : 2;

    // Cập nhật điểm (trừ 5)
    if (currentGroup === 1) {
      setGroup1Score(prev => Math.max(0, prev - 5));
    } else {
      setGroup2Score(prev => Math.max(0, prev - 5));
    }

    // Đánh dấu ô đã được trả lời
    if (selectedCell !== null) {
      const newGameState = [...gameState];
      newGameState[selectedCell] = {
        ...newGameState[selectedCell],
        isRevealed: true
      };
      setGameState(newGameState);
    }

    // Chuyển lượt
    advanceTurn();
  };

  // Chuyển lượt
  const advanceTurn = () => {
    if (currentTurn < TOTAL_TURNS) {
      setCurrentTurn(prev => prev + 1);
      setSelectedCell(null);
    } else {
      // Game kết thúc
      setGameFinished(true);
    }
  };

  // Xem kết quả
  const handleViewResults = () => {
    const finalScore = {
      group1Score,
      group2Score,
      winner: group1Score > group2Score ? 1 : group2Score > group1Score ? 2 : 0
    };
    navigate('/results', { state: finalScore });
  };

  if (!gameStarted) {
    return (
      <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-12">
        <div className="max-w-4xl mx-auto">
          {/* Welcome Section */}
          <div className="text-center mb-12">
            <div className="inline-block mb-6">
              <Zap className="w-16 h-16 text-yellow-400 animate-pulse" />
            </div>
            <h1 className="text-5xl font-bold text-white mb-4">
              Minigame Thuyết Trình
            </h1>
            <p className="text-2xl text-purple-200 mb-2">
              Tư tưởng Hồ Chí Minh về Đại đoàn kết dân tộc
            </p>
            <p className="text-lg text-gray-300">
              Trò chơi 2 nhóm, 10 lượt chơi trên lưới 5x5
            </p>
          </div>

          {/* Game Rules */}
          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 mb-8 border border-white/20">
            <h2 className="text-2xl font-bold text-yellow-400 mb-6">Luật Chơi</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-gray-100">
              <div>
                <h3 className="font-bold text-lg mb-2 text-white">🎮 Cơ chế Chơi</h3>
                <ul className="space-y-2 text-sm">
                  <li>• 25 ô (5x5), 6 ô bom, 19 ô câu hỏi</li>
                  <li>• 10 lượt (Nhóm 1: 1,3,5,7,9 | Nhóm 2: 2,4,6,8,10)</li>
                  <li>• Tự động chuyển lượt sau mỗi ô</li>
                  <li>• Không được click lại ô đã chơi</li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg mb-2 text-white">⭐ Điểm Số</h3>
                <ul className="space-y-2 text-sm">
                  <li>• ✓ Trả lời đúng: +10 điểm</li>
                  <li>• ✗ Trả lời sai: 0 điểm</li>
                  <li>• 💣 Dính bom: -5 điểm</li>
                  <li>• Nhóm nào được nhiều điểm hơn sẽ chiến thắng</li>
                </ul>
              </div>
            </div>
          </div>

          {/* Start Button */}
          <div className="text-center">
            <button
              onClick={handleStartGame}
              className="inline-flex items-center gap-3 bg-gradient-to-r from-green-500 to-emerald-600 hover:from-green-600 hover:to-emerald-700 text-white font-bold py-4 px-12 rounded-xl text-xl transition-all duration-300 transform hover:scale-110 shadow-lg"
            >
              <Play className="w-6 h-6" />
              Bắt Đầu Trò Chơi
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-br from-slate-900 via-purple-900 to-slate-900 px-4 py-8">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-white mb-2">
            Minigame - Tư Tưởng Hồ Chí Minh
          </h1>
          <p className="text-lg text-purple-200">
            Lượt {currentTurn}/{TOTAL_TURNS}
          </p>
        </div>

        {/* ScoreBoard */}
        <ScoreBoard
          group1Score={group1Score}
          group2Score={group2Score}
          currentTurn={currentTurn}
          totalTurns={TOTAL_TURNS}
        />

        {/* Game Grid */}
        <div className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/20 mb-8">
          <div className="grid grid-cols-5 gap-3">
            {gameState &&
              gameState.map((cell, index) => (
                <Cell
                  key={cell.id}
                  cellNumber={cell.id}
                  isRevealed={cell.isRevealed}
                  isBomb={cell.isBomb}
                  disabled={gameFinished || cell.isRevealed}
                  onClick={() => handleCellClick(index)}
                />
              ))}
          </div>
        </div>

        {/* Game Finished Section */}
        {gameFinished && (
          <div className="bg-gradient-to-r from-green-600 to-emerald-600 rounded-2xl p-8 text-center shadow-2xl mb-8">
            <h2 className="text-3xl font-bold text-white mb-4">🎉 Trò Chơi Kết Thúc!</h2>
            <div className="grid grid-cols-2 gap-4 mb-8">
              <div className="bg-blue-500/30 backdrop-blur rounded-lg p-4">
                <p className="text-white text-lg font-semibold">Nhóm 1</p>
                <p className="text-white text-4xl font-bold">{group1Score}</p>
              </div>
              <div className="bg-orange-500/30 backdrop-blur rounded-lg p-4">
                <p className="text-white text-lg font-semibold">Nhóm 2</p>
                <p className="text-white text-4xl font-bold">{group2Score}</p>
              </div>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <button
                onClick={handleViewResults}
                className="bg-white hover:bg-gray-100 text-green-600 font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Xem Kết Quả
              </button>
              <button
                onClick={handleResetGame}
                className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg transition-all duration-200 transform hover:scale-105"
              >
                Chơi Lại
              </button>
            </div>
          </div>
        )}

        {/* Reset Button (only when game is running) */}
        {!gameFinished && (
          <div className="text-center mb-8">
            <button
              onClick={handleResetGame}
              className="bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-6 rounded-lg transition-all duration-200"
            >
              Thoát Trò Chơi
            </button>
          </div>
        )}
      </div>

      {/* Modals */}
      {gameState && selectedCell !== null && (
        <>
          {!gameState[selectedCell].isBomb && (
            <QuestionModal
              question={getQuestionById(gameState[selectedCell].questionId)}
              isOpen={showQuestionModal}
              onClose={() => setShowQuestionModal(false)}
              onAnswer={handleAnswerQuestion}
            />
          )}
          {gameState[selectedCell].isBomb && (
            <BombPopup
              isOpen={showBombPopup}
              onClose={handleBombHit}
            />
          )}
        </>
      )}
    </div>
  );
}

export default MiniGame;
