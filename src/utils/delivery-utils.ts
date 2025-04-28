/**
 * Utility functions for delivery time estimation
 */

interface DeliveryZone {
  postalCodes: string[];
  minDeliveryTime: number; // in minutes
  maxDeliveryTime: number; // in minutes
}

// Define delivery zones by postal code
const deliveryZones: DeliveryZone[] = [
  // Zone 1 - City center (fastest delivery)
  {
    postalCodes: ['8001', '8002', '8003', '8004', '8005'],
    minDeliveryTime: 30,
    maxDeliveryTime: 45
  },
  // Zone 2 - Inner suburbs
  {
    postalCodes: ['8006', '8008', '8032', '8037', '8045', '8048'],
    minDeliveryTime: 45,
    maxDeliveryTime: 60
  },
  // Zone 3 - Outer areas
  {
    postalCodes: ['8046', '8049', '8050', '8051', '8052', '8057'],
    minDeliveryTime: 60,
    maxDeliveryTime: 90
  }
];

// Default delivery time if no specific zone is matched
const DEFAULT_MIN_DELIVERY_TIME = 60; // in minutes
const DEFAULT_MAX_DELIVERY_TIME = 90; // in minutes

/**
 * Get estimated delivery time range based on postal code
 * @param postalCode Customer's postal code
 * @returns Object containing min and max delivery time in minutes
 */
export const getDeliveryTimeRange = (postalCode: string): { min: number; max: number } => {
  // Find matching delivery zone
  const zone = deliveryZones.find(zone => 
    zone.postalCodes.includes(postalCode)
  );
  
  // Return delivery time range based on zone or default values
  return {
    min: zone ? zone.minDeliveryTime : DEFAULT_MIN_DELIVERY_TIME,
    max: zone ? zone.maxDeliveryTime : DEFAULT_MAX_DELIVERY_TIME
  };
};

/**
 * Calculate estimated delivery time based on postal code
 * @param postalCode Customer's postal code
 * @returns ISO string of estimated delivery time
 */
export const calculateEstimatedDeliveryTime = (postalCode: string): string => {
  const currentTime = new Date();
  const { min, max } = getDeliveryTimeRange(postalCode);
  
  // Use the max time to be conservative
  const deliveryTime = new Date(currentTime.getTime() + max * 60 * 1000);
  
  return deliveryTime.toISOString();
};

/**
 * Format delivery time range for display
 * @param postalCode Customer's postal code
 * @returns Formatted string (e.g., "30-45 minutes")
 */
export const formatDeliveryTimeRange = (postalCode: string): string => {
  const { min, max } = getDeliveryTimeRange(postalCode);
  return `${min}-${max} Minute`;
};

/**
 * Get formatted delivery time for display
 * @param postalCode Customer's postal code
 * @returns Formatted time (e.g., "13:45")
 */
export const getFormattedDeliveryTime = (postalCode: string): string => {
  const { max } = getDeliveryTimeRange(postalCode);
  const currentTime = new Date();
  const deliveryTime = new Date(currentTime.getTime() + max * 60 * 1000);
  
  const hours = deliveryTime.getHours();
  const minutes = deliveryTime.getMinutes();
  
  return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}`;
}; 