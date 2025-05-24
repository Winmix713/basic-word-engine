/**
 * Utility functions for image handling and compression
 */

/**
 * Compresses an image to reduce its size
 * @param imageDataUrl The image data URL to compress
 * @param maxWidth Maximum width of the compressed image
 * @param maxHeight Maximum height of the compressed image
 * @param quality Compression quality (0-1)
 * @returns Promise resolving to the compressed image data URL
 */
export const compressImage = (
  imageDataUrl: string,
  maxWidth: number,
  maxHeight: number,
  quality: number
): Promise<string> => {
  return new Promise((resolve, reject) => {
    try {
      // Create an image to load the data URL
      const img = new Image();
      img.onload = () => {
        // Calculate new dimensions while maintaining aspect ratio
        let width = img.width;
        let height = img.height;
        
        if (width > maxWidth) {
          height = (height * maxWidth) / width;
          width = maxWidth;
        }
        
        if (height > maxHeight) {
          width = (width * maxHeight) / height;
          height = maxHeight;
        }
        
        // Create a canvas to draw the resized image
        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        
        // Draw the image on the canvas
        const ctx = canvas.getContext('2d');
        if (!ctx) {
          reject(new Error('Could not get canvas context'));
          return;
        }
        
        ctx.drawImage(img, 0, 0, width, height);
        
        // Get the compressed data URL
        const compressedDataUrl = canvas.toDataURL('image/jpeg', quality);
        resolve(compressedDataUrl);
      };
      
      img.onerror = () => {
        reject(new Error('Failed to load image'));
      };
      
      img.src = imageDataUrl;
    } catch (error) {
      reject(error);
    }
  });
};

/**
 * Handles image errors by providing a fallback
 * @param event The error event
 * @param type The type of card
 */
export const handleImageError = (
  event: React.SyntheticEvent<HTMLImageElement, Event>,
  type: string
): void => {
  const img = event.currentTarget;
  
  // Set a placeholder image from HeroUI service
  img.src = `https://img.heroui.chat/image/ai?w=800&h=600&u=${type}_fallback_${Date.now()}`;
  
  // Add a class to indicate this is a fallback image
  img.classList.add('fallback-image');
};