
import { EditorState, Slide } from '../types';
import { getContrastColor, formatDate } from '../utils/editor-utils';
import { EDITOR_CONFIG } from '../config/editor-config';
import { toast } from '@/hooks/use-toast';

export class RendererService {
  private state: EditorState;
  private domElements: Record<string, HTMLElement>;

  constructor(state: EditorState, domElements: Record<string, HTMLElement>) {
    this.state = state;
    this.domElements = domElements;
  }

  getCurrentSlide(): Slide | null {
    try {
      const { slides } = this.state.presentation;
      const { currentSlideIndex } = this.state.ui;
      
      if (currentSlideIndex >= 0 && currentSlideIndex < slides.length) {
        return slides[currentSlideIndex];
      }
      
      return null;
    } catch (error) {
      console.error('Error getting current slide:', error);
      toast({
        title: 'Error',
        description: 'Failed to retrieve the current slide',
        variant: 'destructive'
      });
      return null;
    }
  }

  updatePresentationTitle(): void {
    try {
      const titleElement = this.domElements.presentationTitle;
      if (!titleElement) return;
      
      titleElement.textContent = this.state.presentation.title || EDITOR_CONFIG.DEFAULTS.PRESENTATION_TITLE;
    } catch (error) {
      console.error('Error updating presentation title:', error);
    }
  }

  updateLastEdited(): void {
    try {
      const lastEditedElement = this.domElements.presentationLastEdited;
      if (!lastEditedElement) return;
      
      lastEditedElement.textContent = `Last edited: ${formatDate(this.state.presentation.lastEdited)}`;
    } catch (error) {
      console.error('Error updating last edited timestamp:', error);
    }
  }

  updateSlideIndicator(): void {
    try {
      const indicatorElement = this.domElements.slideIndicator;
      if (!indicatorElement) return;
      
      const total = this.state.presentation.slides.length;
      const current = this.state.ui.currentSlideIndex + 1;
      
      indicatorElement.textContent = total > 0 ? `${current} / ${total}` : '- / -';
      
      // Update navigation buttons
      const prevButton = this.domElements.prevSlideButton;
      const nextButton = this.domElements.nextSlideButton;
      
      if (prevButton) {
        // Cast to HTMLButtonElement to access the disabled property
        (prevButton as HTMLButtonElement).disabled = current <= 1;
      }
      
      if (nextButton) {
        // Cast to HTMLButtonElement to access the disabled property
        (nextButton as HTMLButtonElement).disabled = current >= total || total === 0;
      }
    } catch (error) {
      console.error('Error updating slide indicator:', error);
    }
  }

  updateToolbarState(): void {
    try {
      if (!window.getSelection) return;
      
      const selection = window.getSelection();
      if (!selection || !selection.rangeCount) return;
      
      const toolbar = this.domElements.editorToolbar;
      if (!toolbar) return;

      const commands = [
        'bold', 'italic', 'underline', 'strikeThrough',
        'justifyLeft', 'justifyCenter', 'justifyRight',
        'insertUnorderedList', 'insertOrderedList'
      ];
      
      commands.forEach(cmd => {
        const button = toolbar.querySelector(`[data-command="${cmd}"]`);
        if (!button) return;
        
        const isActive = document.queryCommandState(cmd);
        button.setAttribute('aria-pressed', String(isActive));
        button.classList.toggle('bg-editor-light', isActive);
      });
    } catch (error) {
      console.error('Error updating toolbar state:', error);
    }
  }
}
