export const defaultFeedback = {
  overallFeedback: 'Excellent work by the team. The air quality map is highly interactive and maps telemetry well.',
  strengths: 'Very solid frontend design using Tailwind. Solid implementation of real-time maps.',
  weaknesses: 'Backend API error handling is sparse. Need more logging.',
  suggestions: 'Suggest adding notification logs when sensor triggers high warning states.',
  recommendation: 'highly_recommended' // highly_recommended, recommended, review_again, rejected
};

export const recommendationsList = [
  { label: 'Highly Recommended', value: 'highly_recommended', color: 'bg-emerald-500/10 text-emerald-400 border-emerald-500/20' },
  { label: 'Recommended', value: 'recommended', color: 'bg-blue-500/10 text-blue-400 border-blue-500/20' },
  { label: 'Review Again', value: 'review_again', color: 'bg-amber-500/10 text-amber-400 border-amber-500/20' },
  { label: 'Rejected', value: 'rejected', color: 'bg-red-500/10 text-red-400 border-red-500/20' }
];
