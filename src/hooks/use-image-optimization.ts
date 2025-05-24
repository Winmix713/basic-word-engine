import React from 'react';
import { compressImage } from '../utils/image-utils';

interface ImageOptimizationProps {
  iconImage: string | null;
  contentImage: string | null;
  cardType: string;
}

export const useImageOptimization = ({ 
  iconImage, 
  contentImage, 
  cardType 
}: ImageOptimizationProps) => {
  const [optimizedIconImage, setOptimizedIconImage] = React.useState<string | null>(null);
  const [optimizedContentImage, setOptimizedContentImage] = React.useState<string | null>(null);
  
  // Process icon image
  React.useEffect(() => {
    // Handle placeholder text
    if (iconImage === 'IMAGE_DATA_EXISTS') {
      // Try session storage first (temporary storage)
      const sessionIcon = sessionStorage.getItem(`icon_${cardType}`);
      if (sessionIcon) {
        setOptimizedIconImage(sessionIcon);
      } else {
        // Use HeroUI image service for placeholder
        const placeholderUrl = `https://img.heroui.chat/image/avatar?w=200&h=200&u=${cardType}_icon_${Date.now()}`;
        setOptimizedIconImage(placeholderUrl);
      }
    } 
    // Handle large images that need compression
    else if (iconImage && iconImage.length > 100000 && iconImage.startsWith('data:')) {
      // Compress the image
      compressImage(iconImage, 200, 200, 0.8)
        .then(compressed => {
          setOptimizedIconImage(compressed);
          // Store in session storage for temporary use
          sessionStorage.setItem(`icon_${cardType}`, compressed);
        })
        .catch(error => {
          console.error('Error compressing icon image:', error);
          setOptimizedIconImage(iconImage);
        });
    } 
    // Use as-is for small images or URLs
    else {
      setOptimizedIconImage(iconImage);
    }
  }, [iconImage, cardType]);
  
  // Process content image
  React.useEffect(() => {
    // Handle placeholder text
    if (contentImage === 'IMAGE_DATA_EXISTS') {
      // Try session storage first
      const sessionContent = sessionStorage.getItem(`content_${cardType}`);
      if (sessionContent) {
        setOptimizedContentImage(sessionContent);
      } else {
        // Use HeroUI image service for placeholder
        const placeholderUrl = `https://img.heroui.chat/image/ai?w=800&h=600&u=${cardType}_content_${Date.now()}`;
        setOptimizedContentImage(placeholderUrl);
      }
    } 
    // Handle large images that need compression
    else if (contentImage && contentImage.length > 100000 && contentImage.startsWith('data:')) {
      // Compress the image
      compressImage(contentImage, 800, 600, 0.7)
        .then(compressed => {
          setOptimizedContentImage(compressed);
          // Store in session storage for temporary use
          sessionStorage.setItem(`content_${cardType}`, compressed);
        })
        .catch(error => {
          console.error('Error compressing content image:', error);
          setOptimizedContentImage(contentImage);
        });
    } 
    // Use as-is for small images or URLs
    else {
      setOptimizedContentImage(contentImage);
    }
  }, [contentImage, cardType]);
  
  return {
    optimizedIconImage,
    optimizedContentImage
  };
};