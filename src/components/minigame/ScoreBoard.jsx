import { Users, Zap } from 'lucide-react';

/**
 * ScoreBoard Component - Displays team scores and turn info
 * @param {number} group1Score - Group 1 score
 * @param {number} group2Score - Group 2 score
 * @param {number} currentTurn - Current turn (1-10)
 * @param {number} totalTurns - Total turns (default 10)
 */
function ScoreBoard({ group1Score, group2Score, currentTurn, totalTurns }) {
  const currentGroup = currentTurn % 2 === 1 ? 1 : 2;
  const isGroup1Turn = currentGroup === 1;

  return (
    <div className="bg-gradient-to-r from-purple-600 to-indigo-600 rounded-xl shadow-2xl p-6 mb-6">
      {/* Turn Info */}
      <div className="text-center mb-6">
        <h2 className="text-white text-2xl font-bold mb-2">Lượt {currentTurn}/{totalTurns}</h2>
        <div className={`inline-flex items-center gap-3 px-6 py-3 rounded-full ${
          isGroup1Turn ? 'bg-blue-500' : 'bg-orange-500'
        }`}>
          <Zap className="w-5 h-5 text-white" />
          <span className="text-white font-bold text-lg">
            Đang đến lượt: {isGroup1Turn ? 'Nhóm 1' : 'Nhóm 2'}
          </span>
        </div>
      </div>

      {/* Scores */}
      <div className="grid grid-cols-2 gap-4">
        {/* Group 1 */}
        <div className={`rounded-lg p-4 transition-all duration-300 ${
          isGroup1Turn
            ? 'bg-blue-500 shadow-lg scale-105'
            : 'bg-blue-500/70'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-white" />
            <span className="text-white font-semibold text-sm">Nhóm 1</span>
          </div>
          <div className="text-white text-3xl font-bold">{group1Score}</div>
          <div className="text-blue-100 text-xs mt-1">điểm</div>
        </div>

        {/* Group 2 */}
        <div className={`rounded-lg p-4 transition-all duration-300 ${
          !isGroup1Turn
            ? 'bg-orange-500 shadow-lg scale-105'
            : 'bg-orange-500/70'
        }`}>
          <div className="flex items-center gap-2 mb-2">
            <Users className="w-5 h-5 text-white" />
            <span className="text-white font-semibold text-sm">Nhóm 2</span>
          </div>
          <div className="text-white text-3xl font-bold">{group2Score}</div>
          <div className="text-orange-100 text-xs mt-1">điểm</div>
        </div>
      </div>

      {/* Progress Bar */}
      <div className="mt-6">
        <div className="flex justify-between text-white text-xs mb-2">
          <span>Tiến độ</span>
          <span>{currentTurn}/{totalTurns}</span>
        </div>
        <div className="w-full bg-white/20 rounded-full h-2 overflow-hidden">
          <div
            className="bg-gradient-to-r from-yellow-400 to-green-400 h-full transition-all duration-300"
            style={{ width: `${(currentTurn / totalTurns) * 100}%` }}
          />
        </div>
      </div>
    </div>
  );
}

export default ScoreBoard;
