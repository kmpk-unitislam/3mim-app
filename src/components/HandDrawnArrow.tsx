export const HandDrawnArrow = ({ className = '' }: { className?: string }) => {
  return (
    <svg 
      viewBox="0 0 100 100" 
      fill="none" 
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      stroke="currentColor" 
      strokeWidth="3" 
      strokeLinecap="round" 
      strokeLinejoin="round"
    >
      <path d="M55 15 C 30 50, 80 40, 40 75 L 15 90 M 15 90 L 30 80 M 15 90 L 25 100" />
    </svg>
  );
};
