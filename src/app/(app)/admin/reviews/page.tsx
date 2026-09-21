'use client';

import { useState } from 'react';

type Review = {
  id: string;
  userName: string;
  reviewableType: 'place' | 'venue' | 'away_guide';
  reviewableName: string;
  rating: number;
  title: string;
  content: string;
  visitDate: string;
  status: 'pending' | 'approved' | 'rejected';
  createdAt: string;
};

const SAMPLE_REVIEWS: Review[] = [
  { id: '1', userName: 'SpursNorth', reviewableType: 'place', reviewableName: 'The Bricklayers Arms', rating: 5, title: 'Perfect pre-match pub', content: 'Great atmosphere before the match. Packed but well-run, good beer selection and friendly staff. Highly recommend getting there early.', visitDate: '2026-09-17', status: 'pending', createdAt: '2026-09-18' },
  { id: '2', userName: 'YidArmy92', reviewableType: 'venue', reviewableName: 'Emirates Stadium', rating: 3, title: 'Decent enough away day', content: 'View from the away end is okay, bit far from the pitch. Easy to get to on the Piccadilly line. Concourse is cramped.', visitDate: '2026-09-10', status: 'pending', createdAt: '2026-09-11' },
  { id: '3', userName: 'N17Fan', reviewableType: 'place', reviewableName: 'Beavertown Tottenham', rating: 4, title: 'Great food and beer', content: 'Brilliant craft beer selection right by the stadium. Food is excellent. Can get very busy on matchdays but worth the wait.', visitDate: '2026-09-17', status: 'pending', createdAt: '2026-09-18' },
  { id: '4', userName: 'AwayDayLad', reviewableType: 'away_guide', reviewableName: 'Away Guide: Chelsea', rating: 5, title: 'Saved my day', content: 'Used this guide for the Chelsea away and it was spot on. The pub recommendations were great and the transport advice was really helpful.', visitDate: '2026-09-10', status: 'approved', createdAt: '2026-09-11' },
  { id: '5', userName: 'TottenhamTil', reviewableType: 'place', reviewableName: 'The Corner Pin', rating: 2, title: 'Not what it used to be', content: 'Has gone downhill. Service was slow and the beer was off. Shame because it used to be a great spot.', visitDate: '2026-09-03', status: 'pending', createdAt: '2026-09-04' },
  { id: '6', userName: 'SpursAbroad', reviewableType: 'venue', reviewableName: 'Old Trafford', rating: 3, title: 'Showing its age', content: 'Away end is fine but the stadium really needs updating. Food options limited and overpriced.', visitDate: '2026-08-27', status: 'rejected', createdAt: '2026-08-28' },
  { id: '7', userName: 'LilyWhite', reviewableType: 'place', reviewableName: 'Premier Inn Tottenham Hale', rating: 4, title: 'Good value stay', content: 'Clean, comfortable, and close to the ground. Staff were helpful. Would stay again for a midweek match.', visitDate: '2026-09-17', status: 'pending', createdAt: '2026-09-18' },
  { id: '8', userName: 'COYSForever', reviewableType: 'place', reviewableName: 'The Antwerp Arms', rating: 5, title: 'Best pub near the ground', content: 'Community-owned gem. Real ales, great vibe, proper football pub. The beer garden is a bonus. Always my first stop.', visitDate: '2026-09-17', status: 'pending', createdAt: '2026-09-18' },
];

function StarRating({ rating }: { rating: number }) {
  return (
    <div className="flex items-center gap-0.5">
      {[1, 2, 3, 4, 5].map((star) => (
        <svg
          key={star}
          className={`w-3.5 h-3.5 ${star <= rating ? 'text-gold' : 'text-border'}`}
          fill="currentColor"
          viewBox="0 0 20 20"
        >
          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
        </svg>
      ))}
    </div>
  );
}

export default function AdminReviews() {
  const [statusFilter, setStatusFilter] = useState<string>('pending');
  const [reviews, setReviews] = useState(SAMPLE_REVIEWS);

  const filtered = statusFilter === 'all'
    ? reviews
    : reviews.filter((r) => r.status === statusFilter);

  function handleAction(id: string, action: 'approved' | 'rejected') {
    setReviews((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: action } : r))
    );
  }

  const pendingCount = reviews.filter((r) => r.status === 'pending').length;

  return (
    <div>
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 mb-6">
        <div>
          <h1 className="text-2xl font-bold font-heading tracking-wide text-foreground">Reviews</h1>
          <p className="text-sm text-muted mt-1">
            Moderate user reviews
            {pendingCount > 0 && (
              <span className="ml-2 badge badge-warning">{pendingCount} pending</span>
            )}
          </p>
        </div>
      </div>

      {/* Filters */}
      <div className="flex gap-2 mb-4">
        {['pending', 'approved', 'rejected', 'all'].map((status) => (
          <button
            key={status}
            onClick={() => setStatusFilter(status)}
            className={`px-3 py-1.5 rounded-full text-xs font-medium transition-colors ${
              statusFilter === status
                ? 'bg-navy text-white'
                : 'bg-border/50 text-muted hover:text-foreground'
            }`}
          >
            {status.charAt(0).toUpperCase() + status.slice(1)}
            {status === 'pending' && pendingCount > 0 && (
              <span className="ml-1.5 bg-white/20 px-1.5 py-0.5 rounded-full text-[10px]">{pendingCount}</span>
            )}
          </button>
        ))}
      </div>

      {/* Review Cards */}
      <div className="space-y-3">
        {filtered.map((review) => (
          <div key={review.id} className="card p-4">
            <div className="flex items-start justify-between gap-3">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-2 flex-wrap">
                  <span className="font-medium text-sm text-foreground">{review.userName}</span>
                  <span className="text-xs text-muted">reviewed</span>
                  <span className="text-sm font-medium text-foreground">{review.reviewableName}</span>
                  <span className={`badge text-[10px] ${
                    review.reviewableType === 'place' ? 'badge-blue'
                    : review.reviewableType === 'venue' ? 'badge-gold'
                    : 'badge-muted'
                  }`}>
                    {review.reviewableType}
                  </span>
                </div>

                <div className="flex items-center gap-2 mt-1.5">
                  <StarRating rating={review.rating} />
                  {review.title && (
                    <span className="text-sm font-medium text-foreground">{review.title}</span>
                  )}
                </div>

                <p className="text-sm text-muted mt-2 leading-relaxed">{review.content}</p>

                <div className="flex items-center gap-3 mt-2 text-xs text-muted-light">
                  <span>Visited: {review.visitDate}</span>
                  <span>Submitted: {review.createdAt}</span>
                </div>
              </div>

              {/* Actions */}
              <div className="flex flex-col gap-1.5 shrink-0">
                {review.status === 'pending' ? (
                  <>
                    <button
                      onClick={() => handleAction(review.id, 'approved')}
                      className="btn btn-sm bg-success text-white hover:bg-success/90"
                    >
                      Approve
                    </button>
                    <button
                      onClick={() => handleAction(review.id, 'rejected')}
                      className="btn btn-sm bg-error text-white hover:bg-error/90"
                    >
                      Reject
                    </button>
                  </>
                ) : (
                  <span className={`badge ${
                    review.status === 'approved' ? 'badge-success' : 'badge-error'
                  }`}>
                    {review.status}
                  </span>
                )}
              </div>
            </div>
          </div>
        ))}

        {filtered.length === 0 && (
          <div className="card p-12 text-center text-muted">
            No reviews found for this filter.
          </div>
        )}
      </div>
    </div>
  );
}
