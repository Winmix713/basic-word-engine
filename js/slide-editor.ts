
/**
 * SlideSwift Editor TypeScript Module
 * This file re-exports the functionality from the main TypeScript implementation
 * to maintain compatibility with existing code
 */
import { initSlideEditor } from '../src/components/SlideEditor/slide-editor';

// Re-export the main function
export { initSlideEditor };

// Auto-initialize if this file is loaded directly in a browser
if (typeof window !== 'undefined') {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initSlideEditor);
  } else {
    // Document already loaded
    initSlideEditor();
  }
}
