/**
 * Storage utility functions to handle localStorage and sessionStorage
 * with error handling and size management
 */

/**
 * Stores card data safely in localStorage or sessionStorage
 * @param key The storage key
 * @param data The data to store
 * @param useSession Whether to use sessionStorage instead of localStorage
 */
export const storeCardData = (key: string, data: any, useSession: boolean = false): void => {
  try {
    // Create a copy of the data to modify before saving
    const dataToSave = Array.isArray(data) ? data.map(card => {
      // Create a shallow copy of the card
      const cardCopy = { ...card };
      
      // Remove large image data from localStorage
      // Instead, store a flag indicating an image exists
      if (cardCopy.iconImage && typeof cardCopy.iconImage === 'string' && cardCopy.iconImage.length > 10000) {
        // Store a small version in sessionStorage for quick access
        sessionStorage.setItem(`icon_${card.id}`, cardCopy.iconImage);
        // Replace with a flag in localStorage
        cardCopy.iconImage = 'IMAGE_DATA_EXISTS';
      }
      
      if (cardCopy.contentImage && typeof cardCopy.contentImage === 'string' && cardCopy.contentImage.length > 10000) {
        // Store a small version in sessionStorage for quick access
        sessionStorage.setItem(`content_${card.id}`, cardCopy.contentImage);
        // Replace with a flag in localStorage
        cardCopy.contentImage = 'IMAGE_DATA_EXISTS';
      }
      
      return cardCopy;
    }) : data;
    
    const storage = useSession ? sessionStorage : localStorage;
    storage.setItem(key, JSON.stringify(dataToSave));
  } catch (error) {
    console.error('Error saving data to storage:', error);
    
    // If we hit a quota error, try to save without images
    if (error instanceof DOMException && error.name === 'QuotaExceededError') {
      try {
        const minimalData = Array.isArray(data) ? data.map(card => {
          const minimalCard = { ...card };
          // Remove all image data
          delete minimalCard.iconImage;
          delete minimalCard.contentImage;
          return minimalCard;
        }) : data;
        
        const storage = useSession ? sessionStorage : localStorage;
        storage.setItem(key, JSON.stringify(minimalData));
        console.log('Saved data without images due to storage limitations');
      } catch (fallbackError) {
        console.error('Failed to save even minimal data:', fallbackError);
        throw fallbackError;
      }
    } else {
      throw error;
    }
  }
};

/**
 * Loads card data from localStorage or sessionStorage
 * @param key The storage key
 * @param useSession Whether to use sessionStorage instead of localStorage
 * @returns The stored data or null if not found
 */
export const loadCardData = (key: string, useSession: boolean = false): any => {
  try {
    const storage = useSession ? sessionStorage : localStorage;
    const data = storage.getItem(key);
    return data ? JSON.parse(data) : null;
  } catch (error) {
    console.error('Error loading data from storage:', error);
    return null;
  }
};

/**
 * Clears all card data from storage
 * @param useSession Whether to clear sessionStorage instead of localStorage
 */
export const clearCardData = (useSession: boolean = false): void => {
  try {
    const storage = useSession ? sessionStorage : localStorage;
    
    // Get all keys that start with icon_ or content_
    const imageKeys: string[] = [];
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key && (key.startsWith('icon_') || key.startsWith('content_'))) {
        imageKeys.push(key);
      }
    }
    
    // Remove all image data
    imageKeys.forEach(key => storage.removeItem(key));
    
    console.log('Cleared all image data from storage');
  } catch (error) {
    console.error('Error clearing data from storage:', error);
  }
};

/**
 * Gets the total size of data in storage
 * @param useSession Whether to check sessionStorage instead of localStorage
 * @returns The total size in bytes
 */
export const getStorageSize = (useSession: boolean = false): number => {
  try {
    const storage = useSession ? sessionStorage : localStorage;
    let totalSize = 0;
    
    for (let i = 0; i < storage.length; i++) {
      const key = storage.key(i);
      if (key) {
        const value = storage.getItem(key) || '';
        totalSize += key.length + value.length;
      }
    }
    
    return totalSize;
  } catch (error) {
    console.error('Error calculating storage size:', error);
    return 0;
  }
};
