import React from 'react';

const statusConfig = {
  Applied: {
    className: 'bg-blue-500/10 text-blue-700 border-blue-800/20',
    label: 'Applied',
  },
  Interviewing: {
    className: 'bg-yellow-500/10 text-yellow-500 border-yellow-800/20',
    label: 'Interviewing',
  },
  Offer: {
    className: 'bg-status-offer/10 text-green-950 border-status-offer/20',
    label: 'Offer',
  },
  Rejected: {
    className: 'bg-red-500/10 text-red-700 border-red-500/20',
    label: 'Rejected',
  },
};

const StatusBadge = ({ status }) => {
  const config = statusConfig[status];

  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${config.className}`}
    >
      {config.label}
    </span>
  );
};

export default StatusBadge;
