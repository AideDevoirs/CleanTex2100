import React, { useEffect, useState } from 'react';

import ReviewForm from '../components/ReviewForm';

const REVIEWS_PER_PAGE = 4;

const ReviewsPage = () => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [page, setPage] = useState(1);

  // Charger les avis depuis le fichier JSON
  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data.reverse())) // Les plus récents en premier
      .catch(() => setReviews([]));
  }, []);

  // Ajouter un nouvel avis (en local)
  const handleReviewSubmit = (review: {
    rating: number;
    author: string;
    message: string;
  }) => {
    const newReview = {
      ...review,
      date: new Date().toLocaleString(),
    };
    setReviews((prev) => [newReview, ...prev]);
  };

  // Pagination
  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const displayedReviews = reviews.slice(
    (page - 1) * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE
  );

  return (
    <div className="container mx-auto xl:px-20 lg:px-12 sm:px-6 px-4 py-12">
      <h1 className="text-3xl font-extrabold text-center mb-8 text-blue-900">
        Beoordelingen
      </h1>
      <div className="max-w-xl mx-auto bg-white rounded-lg shadow-lg p-6 mb-10">
        <ReviewForm onSubmit={handleReviewSubmit} />
      </div>
      <div className="max-w-2xl mx-auto">
        <h2 className="text-2xl font-bold mb-4 text-blue-800">
          Recente beoordelingen
        </h2>
        {displayedReviews.length === 0 ? (
          <p className="text-gray-500 text-center">Nog geen beoordelingen.</p>
        ) : (
          <ul className="space-y-4">
            {displayedReviews.map((review, idx) => (
              <li
                key={idx}
                className="bg-gradient-to-r from-blue-100 via-white to-blue-50 border border-blue-200 rounded-xl p-6 shadow transition hover:scale-105"
              >
                <div className="flex justify-between items-center mb-2">
                  <span>
                    {/* Affiche les étoiles */}
                    {[1, 2, 3, 4, 5].map((star) => (
                      <span
                        key={star}
                        className={
                          star <= review.rating
                            ? 'text-red-700 text-2xl'
                            : 'text-gray-300 text-2xl'
                        }
                      >
                        ★
                      </span>
                    ))}
                  </span>
                  <span className="text-xs text-gray-400">{review.date}</span>
                </div>
                <div className="text-lg text-gray-800 mb-1">
                  {review.message}
                </div>
                <div className="text-sm text-gray-600">— {review.author}</div>
              </li>
            ))}
          </ul>
        )}
        {/* Pagination */}
        {totalPages > 1 && (
          <div className="flex justify-center mt-6 space-x-2">
            <button
              className={`px-3 py-1 rounded bg-blue-200 text-blue-900 font-bold disabled:opacity-50`}
              onClick={() => setPage(page - 1)}
              disabled={page === 1}
            >
              Vorige
            </button>
            <span className="px-3 py-1 font-bold text-blue-900">
              {page} / {totalPages}
            </span>
            <button
              className={`px-3 py-1 rounded bg-blue-200 text-blue-900 font-bold disabled:opacity-50`}
              onClick={() => setPage(page + 1)}
              disabled={page === totalPages}
            >
              Volgende
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ReviewsPage;
