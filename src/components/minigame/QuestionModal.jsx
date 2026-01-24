import { useState } from 'react';
import { X, CheckCircle, XCircle } from 'lucide-react';

/**
 * QuestionModal Component
 * @param {Object} props
 * @param {Object} props.question - Question object with id, question, options, correct
 * @param {boolean} props.isOpen - Whether modal is open
 * @param {Function} props.onClose - Close handler
 * @param {Function} props.onAnswer - Answer submission handler
 */
function QuestionModal({ question, isOpen, onClose, onAnswer }) {
  const [selectedAnswer, setSelectedAnswer] = useState(null);
  const [showFeedback, setShowFeedback] = useState(false);
  const [isCorrect, setIsCorrect] = useState(false);

  const handleSelectAnswer = (index) => {
    if (showFeedback) return;
    setSelectedAnswer(index);
    const correct = index === question.correct;
    setIsCorrect(correct);
    setShowFeedback(true);
  };

  const handleClose = () => {
    onAnswer(isCorrect);
    setSelectedAnswer(null);
    setShowFeedback(false);
    onClose();
  };

  if (!isOpen || !question) return null;

  const options = ['A', 'B', 'C', 'D'];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-2xl p-8 w-full max-w-2xl mx-4 max-h-[90vh] overflow-y-auto">
        {/* Close Button */}
        <button
          onClick={handleClose}
          disabled={!showFeedback}
          className="absolute top-4 right-4 p-2 hover:bg-gray-100 rounded-full transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          title={showFeedback ? 'Đóng' : 'Chọn đáp án trước'}
        >
          <X className="w-6 h-6" />
        </button>

        {/* Question */}
        <div className="mb-8">
          <h2 className="text-2xl font-bold text-gray-800 mb-4">
            {question.question}
          </h2>
        </div>

        {/* Answers */}
        <div className="space-y-3 mb-8">
          {question.options.map((option, index) => (
            <button
              key={index}
              onClick={() => handleSelectAnswer(index)}
              disabled={showFeedback}
              className={`
                w-full p-4 rounded-lg text-left font-semibold transition-all duration-200
                border-2 transform hover:scale-105
                ${
                  selectedAnswer === index
                    ? isCorrect
                      ? 'border-green-500 bg-green-50 text-green-900'
                      : 'border-red-500 bg-red-50 text-red-900'
                    : showFeedback && index === question.correct
                    ? 'border-green-500 bg-green-50 text-green-900'
                    : 'border-gray-300 bg-gray-50 text-gray-900 hover:border-blue-400 hover:bg-blue-50'
                }
                ${showFeedback ? 'cursor-default' : 'cursor-pointer'}
              `}
            >
              <span className="flex items-center justify-between">
                <span>
                  <span className="font-bold text-lg mr-3">{options[index]}.</span>
                  {option}
                </span>
                {selectedAnswer === index && showFeedback && (
                  isCorrect ? (
                    <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                  ) : (
                    <XCircle className="w-6 h-6 text-red-600 flex-shrink-0" />
                  )
                )}
                {showFeedback && index === question.correct && selectedAnswer !== index && (
                  <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                )}
              </span>
            </button>
          ))}
        </div>

        {/* Feedback Message */}
        {showFeedback && (
          <div className={`mb-6 p-4 rounded-lg text-center font-bold ${
            isCorrect
              ? 'bg-green-100 text-green-900'
              : 'bg-red-100 text-red-900'
          }`}>
            {isCorrect ? (
              <>
                <CheckCircle className="w-8 h-8 mx-auto mb-2 text-green-600" />
                <p className="text-lg">Chính xác! +10 điểm</p>
              </>
            ) : (
              <>
                <XCircle className="w-8 h-8 mx-auto mb-2 text-red-600" />
                <p className="text-lg">Sai rồi! 0 điểm</p>
              </>
            )}
          </div>
        )}

        {/* Close Button */}
        {showFeedback && (
          <button
            onClick={handleClose}
            className="w-full bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white font-bold py-3 px-6 rounded-lg transition-all duration-200 transform hover:scale-105"
          >
            Kết thúc lượt
          </button>
        )}
      </div>
    </div>
  );
}

export default QuestionModal;
