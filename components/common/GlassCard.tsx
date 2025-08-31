import React from 'react';

interface GlassCardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: (e: React.MouseEvent<HTMLDivElement>) => void;
}

const GlassCard: React.FC<GlassCardProps> = ({ children, className, onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-card-bg dark:bg-dark-card-bg backdrop-blur-xl rounded-2xl shadow-lg border border-card-border dark:border-dark-card-border p-6 transition-all duration-300 hover:shadow-xl text-text-body dark:text-dark-text-body ${className}`}
    >
      {children}
    </div>
  );
};

export default GlassCard;