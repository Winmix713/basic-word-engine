
import { EditorState, Slide } from '../types';
import { EDITOR_CONFIG } from '../config/editor-config';
import { generateUniqueId } from '../utils/editor-utils';

export class ActionService {
  private state: EditorState;
  private setState: (newState: EditorState) => void;

  constructor(
    state: EditorState,
    setState: (newState: EditorState) => void
  ) {
    this.state = state;
    this.setState = setState;
  }

  addSlide = (): void => {
    const newSlide: Slide = {
      id: generateUniqueId(),
      title: EDITOR_CONFIG.DEFAULTS.SLIDE_TITLE,
      subtitle: EDITOR_CONFIG.DEFAULTS.SLIDE_SUBTITLE,
      content: EDITOR_CONFIG.DEFAULTS.SLIDE_CONTENT,
      background: '',
      elements: []
    };

    const newState = {
      ...this.state,
      presentation: {
        ...this.state.presentation,
        slides: [...this.state.presentation.slides, newSlide],
        lastEdited: new Date()
      },
      ui: {
        ...this.state.ui,
        currentSlideIndex: this.state.presentation.slides.length,
        isDirty: true
      }
    };

    this.setState(newState);
  };

  deleteSlide = (index: number): void => {
    if (this.state.presentation.slides.length <= 1) {
      return;
    }

    const slides = [...this.state.presentation.slides];
    slides.splice(index, 1);

    let newCurrentIndex = this.state.ui.currentSlideIndex;
    if (index === newCurrentIndex) {
      newCurrentIndex = Math.max(0, index - 1);
    } else if (index < newCurrentIndex) {
      newCurrentIndex--;
    }

    const newState = {
      ...this.state,
      presentation: {
        ...this.state.presentation,
        slides,
        lastEdited: new Date()
      },
      ui: {
        ...this.state.ui,
        currentSlideIndex: newCurrentIndex,
        isDirty: true
      }
    };

    this.setState(newState);
  };

  selectSlide = (index: number): void => {
    const newState = {
      ...this.state,
      ui: {
        ...this.state.ui,
        currentSlideIndex: index
      }
    };

    this.setState(newState);
  };

  updateSlideContent = (field: keyof Slide, content: string): void => {
    const currentIndex = this.state.ui.currentSlideIndex;
    if (currentIndex < 0 || currentIndex >= this.state.presentation.slides.length) {
      return;
    }

    const slides = [...this.state.presentation.slides];
    slides[currentIndex] = {
      ...slides[currentIndex],
      [field]: content
    };

    const newState = {
      ...this.state,
      presentation: {
        ...this.state.presentation,
        slides,
        lastEdited: new Date()
      },
      ui: {
        ...this.state.ui,
        isDirty: true
      }
    };

    this.setState(newState);
  };

  formatText = (command: string): void => {
    try {
      document.execCommand(command, false);
    } catch (error) {
      console.warn('Text formatting command failed:', command, error);
    }
  };

  savePresentation = (): void => {
    try {
      const dataToSave = JSON.stringify(this.state.presentation);
      localStorage.setItem(EDITOR_CONFIG.STORAGE.CURRENT_PRESENTATION, dataToSave);
      
      const newState = {
        ...this.state,
        ui: {
          ...this.state.ui,
          isDirty: false
        }
      };

      this.setState(newState);
      console.log('Presentation saved successfully');
    } catch (error) {
      console.error('Failed to save presentation:', error);
    }
  };
}
