import React, { useEffect, useState } from 'react';

const REVIEWS_PER_PAGE = 4;
const MAX_CHARS = 400; // nombre de caractères avant "meer"
const REVIEW_HEIGHT = 200; // hauteur fixe du bloc
const DROPDOWN_HEIGHT = 150; // hauteur de la zone déroulante

const ReviewsList = ({ refresh }: { refresh?: boolean }) => {
  const [reviews, setReviews] = useState<any[]>([]);
  const [page, setPage] = useState(1);
  const [expanded, setExpanded] = useState<number | null>(null);

  useEffect(() => {
    fetch('/api/reviews')
      .then((res) => res.json())
      .then((data) => setReviews(data.reverse()))
      .catch(() => setReviews([]));
  }, [refresh]);

  const totalPages = Math.ceil(reviews.length / REVIEWS_PER_PAGE);
  const displayedReviews = reviews.slice(
    (page - 1) * REVIEWS_PER_PAGE,
    page * REVIEWS_PER_PAGE
  );

  return (
    <div className="mt-8">
      <h2 className="text-xl font-bold mb-4 text-blue-800">
        Recente beoordelingen
      </h2>

      {displayedReviews.length === 0 ? (
        <p className="text-gray-500 text-center">Nog geen beoordelingen.</p>
      ) : (
        <ul className="space-y-4">
          {displayedReviews.map((review, idx) => {
            const text = String(review.message || '');
            const isLong = text.length > MAX_CHARS;
            const isExpanded = expanded === idx;

            const shortText = text.slice(0, MAX_CHARS);
            const remainingText = text.slice(MAX_CHARS);

            return (
              <li
                key={idx}
                className="bg-gradient-to-r from-blue-100 via-white to-blue-50 border border-blue-200 rounded-xl p-6 shadow"
                style={{
                  height: `${REVIEW_HEIGHT}px`,
                  display: 'flex',
                  flexDirection: 'column',
                  justifyContent: 'space-between',
                }}
              >
                {/* Étoiles et date */}
                <div className="flex justify-between items-center mb-2">
                  <span>
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
                  <span className="text-xs text-gray-400">
                    {new Date(review.date).toLocaleDateString(undefined, {
                      day: '2-digit',
                      month: '2-digit',
                      year: 'numeric',
                    })}
                  </span>
                </div>

                {/* Contenu principal */}
                <div className="flex-1 text-gray-800 mb-2 break-all overflow-hidden">
                  {isLong ? (
                    <>
                      <p>
                        {shortText}
                        <span>... </span>
                        <button
                          className="text-red-700 underline"
                          onClick={() => setExpanded(isExpanded ? null : idx)}
                        >
                          {isExpanded ? 'minder' : 'meer'}
                        </button>
                      </p>

                      {/* Liste déroulante */}
                      {isExpanded && (
                        <div
                          className="mt-2 p-2 border border-blue-300 rounded bg-white overflow-y-auto text-sm text-gray-700"
                          style={{ maxHeight: `${DROPDOWN_HEIGHT}px` }}
                        >
                          {remainingText.split('\n').map((line, i) => (
                            <p key={i}>{line}</p>
                          ))}
                        </div>
                      )}
                    </>
                  ) : (
                    <p>{text}</p>
                  )}
                </div>

                <div className="text-sm text-gray-600">— {review.author}</div>
              </li>
            );
          })}
        </ul>
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <div className="flex justify-center mt-6 space-x-2">
          <button
            className="px-3 py-1 rounded bg-blue-200 text-blue-900 font-bold disabled:opacity-50"
            onClick={() => {
              setExpanded(null);
              setPage((p) => Math.max(1, p - 1));
            }}
            disabled={page === 1}
          >
            Vorige
          </button>
          <span className="px-3 py-1 font-bold text-blue-900">
            {page} / {totalPages}
          </span>
          <button
            className="px-3 py-1 rounded bg-blue-200 text-blue-900 font-bold disabled:opacity-50"
            onClick={() => {
              setExpanded(null);
              setPage((p) => Math.min(totalPages, p + 1));
            }}
            disabled={page === totalPages}
          >
            Volgende
          </button>
        </div>
      )}
    </div>
  );
};

export default ReviewsList;
