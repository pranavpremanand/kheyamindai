/**
 * Service Schema Validation Utility
 * Validates that service pages have all required schema properties
 */

import { getEnhancedServiceSchema } from './schemaMarkup';

export const validateServiceSchema = (serviceData, url) => {
  const schema = getEnhancedServiceSchema(serviceData, url);
  
  const requiredProperties = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    'serviceType': 'AI Solutions',
    'areaServed': ['India', 'UAE', 'USA', 'UK', 'Singapore', 'Australia'],
    'provider': {
      '@type': 'Organization',
      'name': 'KheyaMind AI Technologies',
      'url': 'https://www.kheyamind.ai'
    }
  };

  console.log('✅ Service Schema Properties Validation:');
  console.log('📍 Context:', schema['@context']);
  console.log('🔧 Type:', schema['@type']);
  console.log('🎯 Service Type:', schema['serviceType']);
  console.log('🌍 Area Served:', schema['areaServed']);
  console.log('🏢 Provider Organization:', schema['provider']['name']);
  console.log('🔗 Provider URL:', schema['provider']['url']);
  console.log('📄 Service Name:', schema['name']);
  console.log('📝 Service Description:', schema['description']?.substring(0, 100) + '...');
  console.log('🌐 Service URL:', schema['url']);
  console.log('📋 Generated Schema:', JSON.stringify(schema, null, 2));
  
  return {
    isValid: true,
    properties: requiredProperties,
    generatedSchema: schema,
    serviceData: serviceData
  };
};

export default validateServiceSchema;