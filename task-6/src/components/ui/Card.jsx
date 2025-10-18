const Card = ({ children, className = '' }) => (
    <div className={`bg-white p-6 rounded-xl shadow-lg transition-shadow duration-300 hover:shadow-xl ${className}`}>
      {children}
    </div>
);

export default Card;