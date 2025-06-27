/**
 * Icon Optimization Utilities
 * Reduces bundle size by loading only used icons
 */

import React from 'react';

// Commonly used icons - load these eagerly
export const EagerIcons = {
  // Navigation icons
  Menu: () => import('react-icons/fa').then(mod => ({ default: mod.FaBars })),
  Close: () => import('react-icons/fa').then(mod => ({ default: mod.FaTimes })),
  
  // Social icons
  Facebook: () => import('react-icons/fa').then(mod => ({ default: mod.FaFacebook })),
  Twitter: () => import('react-icons/fa').then(mod => ({ default: mod.FaTwitter })),
  LinkedIn: () => import('react-icons/fa').then(mod => ({ default: mod.FaLinkedin })),
  Instagram: () => import('react-icons/fa').then(mod => ({ default: mod.FaInstagram })),
  
  // Contact icons
  Phone: () => import('react-icons/fa').then(mod => ({ default: mod.FaPhone })),
  Email: () => import('react-icons/fa').then(mod => ({ default: mod.FaEnvelope })),
  Location: () => import('react-icons/fa').then(mod => ({ default: mod.FaMapMarkerAlt })),
  
  // Arrow icons
  ArrowRight: () => import('react-icons/fa').then(mod => ({ default: mod.FaArrowRight })),
  ArrowLeft: () => import('react-icons/fa').then(mod => ({ default: mod.FaArrowLeft })),
  ArrowUp: () => import('react-icons/fa').then(mod => ({ default: mod.FaArrowUp })),
  
  // Common UI icons
  Check: () => import('react-icons/fa').then(mod => ({ default: mod.FaCheck })),
  Star: () => import('react-icons/fa').then(mod => ({ default: mod.FaStar })),
  Heart: () => import('react-icons/fa').then(mod => ({ default: mod.FaHeart })),
  Search: () => import('react-icons/fa').then(mod => ({ default: mod.FaSearch })),
};

// Less common icons - load these lazily
export const LazyIcons = {
  // Service icons
  Robot: () => import('react-icons/fa').then(mod => ({ default: mod.FaRobot })),
  Brain: () => import('react-icons/fa').then(mod => ({ default: mod.FaBrain })),
  Cog: () => import('react-icons/fa').then(mod => ({ default: mod.FaCog })),
  Database: () => import('react-icons/fa').then(mod => ({ default: mod.FaDatabase })),
  Cloud: () => import('react-icons/fa').then(mod => ({ default: mod.FaCloud })),
  
  // Business icons
  Building: () => import('react-icons/fa').then(mod => ({ default: mod.FaBuilding })),
  Chart: () => import('react-icons/fa').then(mod => ({ default: mod.FaChartLine })),
  Users: () => import('react-icons/fa').then(mod => ({ default: mod.FaUsers })),
  Handshake: () => import('react-icons/fa').then(mod => ({ default: mod.FaHandshake })),
  
  // Technology icons
  Code: () => import('react-icons/fa').then(mod => ({ default: mod.FaCode })),
  Mobile: () => import('react-icons/fa').then(mod => ({ default: mod.FaMobile })),
  Desktop: () => import('react-icons/fa').then(mod => ({ default: mod.FaDesktop })),
  Globe: () => import('react-icons/fa').then(mod => ({ default: mod.FaGlobe })),
};

// Icon cache to prevent duplicate imports
const iconCache = new Map();

// Optimized icon loader
export const loadIcon = async (iconName, isEager = false) => {
  // Check cache first
  if (iconCache.has(iconName)) {
    return iconCache.get(iconName);
  }

  try {
    const iconSet = isEager ? EagerIcons : LazyIcons;
    const iconLoader = iconSet[iconName] || LazyIcons[iconName] || EagerIcons[iconName];
    
    if (!iconLoader) {
      //console.warn(`Icon ${iconName} not found`);
      return null;
    }

    const iconModule = await iconLoader();
    const IconComponent = iconModule.default;
    
    // Cache the loaded icon
    iconCache.set(iconName, IconComponent);
    
    return IconComponent;
  } catch (error) {
    console.error(`Failed to load icon ${iconName}:`, error);
    return null;
  }
};

// React component for optimized icon loading
export const OptimizedIcon = ({ name, eager = false, fallback = null, ...props }) => {
  const [IconComponent, setIconComponent] = React.useState(null);
  const [loading, setLoading] = React.useState(true);

  React.useEffect(() => {
    loadIcon(name, eager)
      .then(setIconComponent)
      .finally(() => setLoading(false));
  }, [name, eager]);

  if (loading) {
    return fallback || <div className="w-4 h-4 bg-gray-200 animate-pulse rounded" />;
  }

  if (!IconComponent) {
    return fallback || <div className="w-4 h-4 bg-gray-300 rounded" />;
  }

  return <IconComponent {...props} />;
};

// Preload critical icons
export const preloadCriticalIcons = () => {
  const criticalIcons = ['Menu', 'Close', 'Phone', 'Email', 'ArrowRight'];
  
  criticalIcons.forEach(iconName => {
    loadIcon(iconName, true);
  });
};

// Bundle size analysis for icons
export const analyzeIconUsage = () => {
  // if (process.env.NODE_ENV === 'development') {
  //   console.group('Icon Usage Analysis');
  //   console.log('Cached icons:', Array.from(iconCache.keys()));
  //   console.log('Cache size:', iconCache.size);
  //   console.groupEnd();
  // }
};

// Initialize icon optimizations
export const initIconOptimizations = () => {
  preloadCriticalIcons();
  
  // Analyze usage in development
  if (process.env.NODE_ENV === 'development') {
    setTimeout(analyzeIconUsage, 5000);
  }
};

// Custom SVG icons for better performance (inline SVGs)
export const InlineSVGIcons = {
  Logo: ({ className = "w-8 h-8", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5" />
    </svg>
  ),
  
  AI: ({ className = "w-8 h-8", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-2 15l-5-5 1.41-1.41L10 14.17l7.59-7.59L19 8l-9 9z" />
    </svg>
  ),
  
  Chatbot: ({ className = "w-8 h-8", ...props }) => (
    <svg className={className} viewBox="0 0 24 24" fill="currentColor" {...props}>
      <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 17.93c-3.94-.49-7-3.85-7-7.93 0-.62.08-1.21.21-1.79L9 15v1c0 1.1.9 2 2 2v1.93zm6.9-2.54c-.26-.81-1-1.39-1.9-1.39h-1v-3c0-.55-.45-1-1-1H8v-2h2c.55 0 1-.45 1-1V7h2c1.1 0 2-.9 2-2v-.41c2.93 1.19 5 4.06 5 7.41 0 2.08-.8 3.97-2.1 5.39z" />
    </svg>
  ),
  
  Arrow: ({ className = "w-4 h-4", direction = "right", ...props }) => {
    const rotations = {
      right: "0",
      left: "180",
      up: "-90",
      down: "90"
    };
    
    return (
      <svg 
        className={className} 
        viewBox="0 0 24 24" 
        fill="currentColor" 
        style={{ transform: `rotate(${rotations[direction]}deg)` }}
        {...props}
      >
        <path d="M8.59 16.59L13.17 12 8.59 7.41 10 6l6 6-6 6-1.41-1.41z" />
      </svg>
    );
  }
};

export default OptimizedIcon;