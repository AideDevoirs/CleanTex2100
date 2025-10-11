import React, { useState } from 'react';

interface ReviewFormProps {
  onSubmit?: (review: {
    rating: number;
    author: string;
    message: string;
  }) => void;
}

const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
  const [rating, setRating] = useState<number>(5);
  const [author, setAuthor] = useState('');
  const [message, setMessage] = useState('');
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    await fetch('/api/reviews', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ rating, author, message }),
    });
    setLoading(false);
    setAuthor('');
    setMessage('');
    setRating(5);
    if (onSubmit) onSubmit({ rating, author, message });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 bg-white rounded-xl shadow-lg p-8 border-2 border-red-700"
    >
      <div>
        <label className="block text-sm font-bold text-red-700 mb-1">
          Uw beoordeling (sterren)
        </label>
        <div className="flex space-x-2 w-full justify-between">
          {[1, 2, 3, 4, 5].map((star) => (
            <button
              type="button"
              key={star}
              onClick={() => setRating(star)}
              className={`text-5xl focus:outline-none ${
                rating >= star ? 'text-red-700' : 'text-gray-300'
              }`}
              aria-label={`${star} sterren`}
              style={{ width: '20%' }}
            >
              ★
            </button>
          ))}
        </div>
      </div>
      <div>
        <label className="block text-sm font-bold text-red-700 mb-1">
          Uw naam
        </label>
        <input
          type="text"
          placeholder="Uw naam"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
          className="w-full border border-red-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-700"
        />
      </div>
      <div>
        <label className="block text-sm font-bold text-red-700 mb-1">
          Uw beoordeling
        </label>
        <textarea
          placeholder="Uw beoordeling"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          required
          className="w-full border border-red-700 rounded-md p-2 focus:outline-none focus:ring-2 focus:ring-red-700"
          rows={4}
        />
      </div>
      <button
        type="submit"
        className="w-full bg-red-700 text-white font-bold py-2 rounded-md hover:bg-red-800 transition"
        disabled={loading}
      >
        {loading ? 'Verzenden...' : 'Versturen'}
      </button>
    </form>
  );
};

export default ReviewForm;
