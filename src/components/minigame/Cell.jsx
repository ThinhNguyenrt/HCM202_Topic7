/**
 * Cell Component - Individual grid cell
 * @param {number} cellNumber - Cell number (1-25)
 * @param {boolean} isRevealed - Whether cell has been revealed
 * @param {boolean} isBomb - Whether cell is a bomb
 * @param {Function} onClick - Click handler
 * @param {boolean} disabled - Whether cell is disabled
 */
function Cell({ cellNumber, isRevealed, isBomb, onClick, disabled }) {
  return (
    <button
      onClick={onClick}
      disabled={disabled || isRevealed}
      className={`
        w-full aspect-square rounded-lg font-bold text-lg transition-all duration-300
        border-2 flex items-center justify-center cursor-pointer transform
        ${isRevealed ? 'cursor-not-allowed' : 'hover:scale-110'}
        ${
          isBomb && isRevealed
            ? 'bg-red-500 border-red-700 text-white'
            : isRevealed
            ? 'bg-green-400 border-green-600 text-white'
            : 'bg-gradient-to-br from-blue-500 to-blue-600 border-blue-700 text-white hover:from-blue-600 hover:to-blue-700 hover:shadow-lg'
        }
        ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
      `}
      title={isRevealed ? (isBomb ? '💣 Bom!' : 'Đã trả lời') : `Ô số ${cellNumber}`}
    >
      {isRevealed ? (
        isBomb ? (
          <span className="text-3xl">💣</span>
        ) : (
          <span className="text-green-700">✓</span>
        )
      ) : (
        <span>{cellNumber}</span>
      )}
    </button>
  );
}

export default Cell;
