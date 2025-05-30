
export const EDITOR_CONFIG = {
  // Storage keys
  STORAGE: {
    CURRENT_PRESENTATION: 'current-slide-presentation',
    PRESENTATIONS_LIST: 'slide-presentations-list'
  },
  // Default values
  DEFAULTS: {
    PRESENTATION_TITLE: 'Untitled Presentation',
    SLIDE_TITLE: 'Slide Title',
    SLIDE_SUBTITLE: 'Slide Subtitle',
    SLIDE_CONTENT: '<p>Click to add text</p>'
  },
  // Element selectors
  SELECTORS: {
    SLIDE_ITEM: '.slide-item',
    DELETE_SLIDE_BUTTON: '.delete-slide-button',
    TOOLBAR_BUTTON: '[data-command]'
  },
  // Limits and constraints
  LIMITS: {
    MAX_SLIDES: 100,
    MIN_ZOOM: 0.25,
    MAX_ZOOM: 3,
    DEFAULT_ZOOM: 1
  },
  // Debounce timings
  DEBOUNCE: {
    CONTENT_EDIT: 300,
    SEARCH: 200,
    SAVE: 1000
  }
} as const;
