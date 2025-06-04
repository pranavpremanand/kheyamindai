import React from 'react';
import { useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import { generateCanonicalUrl } from '../../utils/canonicalUrl';

/**
 * Higher-order component that adds canonical URL to any page component
 * @param {React.ComponentType} WrappedComponent - The component to wrap
 * @returns {React.ComponentType} - The wrapped component with canonical URL
 */
const withCanonical = (WrappedComponent) => {
    return function WithCanonicalComponent(props) {
        const location = useLocation();
        const canonicalUrl = generateCanonicalUrl(location.pathname);

        return (
            <>
                <Helmet>
                    <link rel="canonical" href={canonicalUrl} />
                </Helmet>
                <WrappedComponent {...props} />
            </>
        );
    };
};

export default withCanonical; 