/**
 * Image Optimization Utilities
 * Handles image compression, format conversion, and responsive loading
 */

/**
 * Generate responsive image srcSet
 */
export const generateSrcSet = (basePath, sizes = [320, 640, 768, 1024, 1280, 1920]) => {
  return sizes.map(size => {
    const extension = basePath.split('.').pop();
    const pathWithoutExt = basePath.replace(`.${extension}`, '');
    return `${pathWithoutExt}-${size}w.${extension} ${size}w`;
  }).join(', ');
};

/**
 * Generate WebP alternative path
 */
export const getWebPPath = (imagePath) => {
  const extension = imagePath.split('.').pop();
  return imagePath.replace(`.${extension}`, '.webp');
};

/**
 * Check WebP support
 */
export const supportsWebP = () => {
  if (typeof window === 'undefined') return false;
  
  const canvas = document.createElement('canvas');
  canvas.width = 1;
  canvas.height = 1;
  
  return canvas.toDataURL('image/webp').indexOf('data:image/webp') === 0;
};

/**
 * Preload critical images
 */
export const preloadImage = (src, as = 'image') => {
  if (typeof window === 'undefined') return;
  
  const link = document.createElement('link');
  link.rel = 'preload';
  link.as = as;
  link.href = src;
  document.head.appendChild(link);
};

/**
 * Preload multiple images
 */
export const preloadImages = (images) => {
  images.forEach(src => preloadImage(src));
};

/**
 * Image compression utility (client-side)
 */
export const compressImage = (file, quality = 0.8, maxWidth = 1920) => {
  return new Promise((resolve) => {
    const canvas = document.createElement('canvas');
    const ctx = canvas.getContext('2d');
    const img = new Image();
    
    img.onload = () => {
      // Calculate new dimensions
      let { width, height } = img;
      
      if (width > maxWidth) {
        height = (height * maxWidth) / width;
        width = maxWidth;
      }
      
      canvas.width = width;
      canvas.height = height;
      
      // Draw and compress
      ctx.drawImage(img, 0, 0, width, height);
      
      canvas.toBlob(resolve, 'image/jpeg', quality);
    };
    
    img.src = URL.createObjectURL(file);
  });
};

/**
 * Get optimal image format based on browser support
 */
export const getOptimalImageFormat = (originalPath) => {
  const webpSupported = supportsWebP();
  
  if (webpSupported) {
    return getWebPPath(originalPath);
  }
  
  return originalPath;
};

/**
 * Image loading performance tracker
 */
export const trackImagePerformance = (imageSrc, startTime) => {
  const loadTime = performance.now() - startTime;
  
  // Log slow loading images
  if (loadTime > 1000) {
    //console.warn(`Slow image load: ${imageSrc} took ${Math.round(loadTime)}ms`);
  }
  
  // Send to analytics if available
  if (typeof window !== 'undefined' && typeof window.gtag !== 'undefined') {
    // eslint-disable-next-line no-undef
    window.gtag('event', 'image_load_time', {
      image_src: imageSrc,
      load_time: Math.round(loadTime),
      performance_category: loadTime > 1000 ? 'slow' : 'fast'
    });
  }
  
  return loadTime;
};

/**
 * Responsive image sizes configuration
 */
export const getResponsiveSizes = (breakpoints = {
  mobile: 320,
  tablet: 768,
  desktop: 1024,
  large: 1280
}) => {
  return `
    (max-width: ${breakpoints.mobile}px) ${breakpoints.mobile}px,
    (max-width: ${breakpoints.tablet}px) ${breakpoints.tablet}px,
    (max-width: ${breakpoints.desktop}px) ${breakpoints.desktop}px,
    ${breakpoints.large}px
  `;
};

/**
 * Critical image identification
 */
export const identifyCriticalImages = () => {
  const criticalImages = [];
  const viewportHeight = window.innerHeight;
  
  document.querySelectorAll('img').forEach((img, index) => {
    const rect = img.getBoundingClientRect();
    
    // Image is in viewport or close to it
    if (rect.top < viewportHeight + 100) {
      criticalImages.push({
        element: img,
        src: img.src,
        position: index,
        isAboveFold: rect.top < viewportHeight
      });
    }
  });
  
  return criticalImages;
};

/**
 * Image optimization recommendations
 */
export const getImageOptimizationRecommendations = () => {
  const images = document.querySelectorAll('img');
  const recommendations = [];
  
  images.forEach((img, index) => {
    const issues = [];
    
    // Check for missing lazy loading
    if (!img.loading && !img.dataset.lazy) {
      const rect = img.getBoundingClientRect();
      if (rect.top > window.innerHeight) {
        issues.push('Add lazy loading for below-fold images');
      }
    }
    
    // Check for missing alt text
    if (!img.alt) {
      issues.push('Add descriptive alt text for accessibility');
    }
    
    // Check for oversized images
    if (img.naturalWidth && img.offsetWidth) {
      const ratio = img.naturalWidth / img.offsetWidth;
      if (ratio > 2) {
        issues.push(`Image is ${ratio.toFixed(1)}x larger than display size`);
      }
    }
    
    // Check for missing srcset
    if (!img.srcset && img.offsetWidth > 300) {
      issues.push('Consider adding responsive srcset for better performance');
    }
    
    if (issues.length > 0) {
      recommendations.push({
        image: index + 1,
        src: img.src,
        issues
      });
    }
  });
  
  return recommendations;
};

/**
 * Automatic image optimization for existing images
 */
export const optimizeExistingImages = () => {
  // Use requestIdleCallback to prevent blocking main thread
  const optimize = () => {
    const images = document.querySelectorAll('img:not([data-optimized])');
    
    images.forEach((img, index) => {
      // Batch process in small chunks to prevent blocking
      setTimeout(() => {
        // Skip if already loaded or loading
        if (img.complete || img.loading === 'lazy') {
          img.dataset.optimized = 'true';
          return;
        }

        const rect = img.getBoundingClientRect();
        
        // Add lazy loading for below-fold images
        if (rect.top > window.innerHeight + 200) {
          img.loading = 'lazy';
        }
        
        // Add error handling
        if (!img.onerror) {
          img.onerror = () => {
            console.warn('Image failed to load:', img.src);
          };
        }
        
        // Add load tracking for performance
        if (!img.onload && img.src) {
          const startTime = performance.now();
          img.onload = () => {
            const loadTime = performance.now() - startTime;
            if (loadTime > 1000) {
              console.warn(`Slow image load: ${img.src} took ${Math.round(loadTime)}ms`);
            }
          };
        }
        
        // Add optimization flag
        img.dataset.optimized = 'true';
      }, index * 10); // Stagger processing
    });
  };

  // Use requestIdleCallback if available, otherwise setTimeout
  if (typeof requestIdleCallback !== 'undefined') {
    requestIdleCallback(optimize, { timeout: 1000 });
  } else {
    setTimeout(optimize, 100);
  }
};

/**
 * Image format detection and conversion suggestions
 */
export const analyzeImageFormats = () => {
  const images = document.querySelectorAll('img');
  const analysis = {
    total: images.length,
    formats: {},
    suggestions: []
  };
  
  images.forEach((img) => {
    const extension = img.src.split('.').pop().toLowerCase();
    analysis.formats[extension] = (analysis.formats[extension] || 0) + 1;
    
    // Suggest WebP for JPEG/PNG
    if (['jpg', 'jpeg', 'png'].includes(extension) && supportsWebP()) {
      analysis.suggestions.push({
        src: img.src,
        current: extension,
        suggested: 'webp',
        reason: 'WebP provides better compression'
      });
    }
  });
  
  return analysis;
};