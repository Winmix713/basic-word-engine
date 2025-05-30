
import { EDITOR_CONFIG } from './config/editor-config';
import { generateUniqueId, debounce } from './utils/editor-utils';
import { RendererService } from './services/renderer-service';
import { ActionService } from './services/action-service';
import type { EditorState, Slide } from './types';

export { generateUniqueId };

export function createDefaultSlide(): Slide {
  return {
    id: generateUniqueId(),
    title: EDITOR_CONFIG.DEFAULTS.SLIDE_TITLE,
    subtitle: EDITOR_CONFIG.DEFAULTS.SLIDE_SUBTITLE,
    content: EDITOR_CONFIG.DEFAULTS.SLIDE_CONTENT,
    background: '',
    elements: []
  };
}

export function createDefaultState(): EditorState {
  return {
    presentation: {
      id: generateUniqueId(),
      title: EDITOR_CONFIG.DEFAULTS.PRESENTATION_TITLE,
      lastEdited: new Date(),
      theme: 'default',
      slides: []
    },
    ui: {
      currentSlideIndex: -1,
      zoomLevel: EDITOR_CONFIG.LIMITS.DEFAULT_ZOOM,
      isFullscreen: false,
      isPresentationMode: false,
      isDirty: false,
      isEditingTitle: false
    }
  };
}

export function initSlideEditor(): void {
  console.log('SlideSwift Editor initialized');
}
