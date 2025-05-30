
export const EDITOR_CONFIG = {
  DEFAULTS: {
    PRESENTATION_TITLE: 'Untitled Presentation',
    SLIDE_TITLE: 'New Slide',
    SLIDE_SUBTITLE: 'Subtitle',
    SLIDE_CONTENT: 'Click to add content'
  },
  LIMITS: {
    MAX_SLIDES: 100,
    DEFAULT_ZOOM: 1,
    MIN_ZOOM: 0.25,
    MAX_ZOOM: 3
  },
  STORAGE: {
    CURRENT_PRESENTATION: 'current-slide-presentation',
    PRESENTATIONS_LIST: 'presentations-list'
  },
  DEBOUNCE: {
    SAVE: 1000,
    SEARCH: 300
  }
};
