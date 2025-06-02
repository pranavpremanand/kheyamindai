import React from 'react';
import { Link } from 'react-router-dom';
import { FaChevronRight, FaHome } from 'react-icons/fa';

const Breadcrumb = ({ items, className = "" }) => {
  if (!items || items.length === 0) return null;

  return (
    <nav 
      className={`flex items-center space-x-2 text-sm text-gray-600 mb-6 ${className}`}
      aria-label="Breadcrumb"
    >
      <ol className="flex items-center space-x-2">
        {items.map((item, index) => (
          <li key={index} className="flex items-center">
            {index > 0 && (
              <FaChevronRight className="w-3 h-3 text-gray-400 mx-2" />
            )}
            
            {item.current ? (
              <span 
                className="text-gray-900 font-medium"
                aria-current="page"
              >
                {index === 0 && <FaHome className="w-4 h-4 inline mr-1" />}
                {item.title}
              </span>
            ) : (
              <Link
                to={item.url}
                className="text-blue-600 hover:text-blue-800 transition-colors duration-200 flex items-center"
              >
                {index === 0 && <FaHome className="w-4 h-4 inline mr-1" />}
                {item.title}
              </Link>
            )}
          </li>
        ))}
      </ol>
    </nav>
  );
};

export default Breadcrumb;