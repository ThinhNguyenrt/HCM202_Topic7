import { AlertTriangle } from 'lucide-react';

/**
 * BombPopup Component - Displays bomb hit notification
 * @param {boolean} isOpen - Whether popup is open
 * @param {Function} onClose - Close handler
 */
function BombPopup({ isOpen, onClose }) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/70 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-md mx-4">
        {/* Bomb Icon */}
        <div className="text-center mb-6">
          <div className="inline-block text-7xl mb-4 animate-pulse">💣</div>
          <AlertTriangle className="w-12 h-12 text-red-600 mx-auto" />
        </div>

        {/* Message */}
        <h2 className="text-3xl font-bold text-red-600 text-center mb-4">
          NỔ BOM!
        </h2>
        <p className="text-lg text-gray-700 text-center mb-6">
          Đã dính bom! Bị trừ 5 điểm
        </p>

        {/* Close Button */}
        <button
          onClick={onClose}
          className="w-full bg-gradient-to-r from-red-600 to-orange-600 hover:from-red-700 hover:to-orange-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
        >
          Kết thúc lượt
        </button>
      </div>
    </div>
  );
}

export default BombPopup;
