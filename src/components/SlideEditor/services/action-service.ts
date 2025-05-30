import { EditorState, Slide } from '../types';
import { generateUniqueId, debounce } from '../utils/editor-utils';
import { EDITOR_CONFIG } from '../config/editor-config';
import { RendererService } from './renderer-service';
import { toast } from '@/hooks/use-toast';

export class ActionService {
  private state: EditorState;
  private domElements: Record<string, HTMLElement>;
  private renderer: RendererService;
  private stateUpdateCallback?: (newState: EditorState) => void;

  constructor(
    state: EditorState, 
    domElements: Record<string, HTMLElement>, 
    renderer: RendererService,
    stateUpdateCallback?: (newState: EditorState) => void
  ) {
    this.state = state;
    this.domElements = domElements;
    this.renderer = renderer;
    this.stateUpdateCallback = stateUpdateCallback;
  }

  private updateState(newState: EditorState): void {
    this.state = newState;
    // Notify the hook about state changes if callback provided
    if (this.stateUpdateCallback) {
      this.stateUpdateCallback(newState);
    }
  }

  createNewSlide(): void {
    try {
      if (this.state.presentation.slides.length >= EDITOR_CONFIG.LIMITS.MAX_SLIDES) {
        toast({
          title: "Maximum slides reached",
          description: `You cannot create more than ${EDITOR_CONFIG.LIMITS.MAX_SLIDES} slides.`,
          variant: "destructive"
        });
        return;
      }
      
      const newSlide: Slide = {
        id: generateUniqueId(),
        title: EDITOR_CONFIG.DEFAULTS.SLIDE_TITLE,
        subtitle: EDITOR_CONFIG.DEFAULTS.SLIDE_SUBTITLE,
        content: EDITOR_CONFIG.DEFAULTS.SLIDE_CONTENT,
        background: '',
        elements: []
      };
      
      const updatedState = {
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
      
      this.updateState(updatedState);
      
      this.renderer.updatePresentationTitle();
      this.renderer.updateLastEdited();
      this.renderer.updateSlideIndicator();
      
      toast({
        title: "Slide created",
        description: "New slide has been added to your presentation."
      });
    } catch (error) {
      console.error('Error creating new slide:', error);
      toast({
        title: "Error",
        description: "Failed to create a new slide.",
        variant: "destructive"
      });
    }
  }

  deleteSlide(index: number): void {
    try {
      if (index < 0 || index >= this.state.presentation.slides.length) return;
      
      const newSlides = [...this.state.presentation.slides];
      newSlides.splice(index, 1);
      
      let newCurrentIndex = this.state.ui.currentSlideIndex;
      
      // Adjust current slide index if necessary
      if (this.state.ui.currentSlideIndex === index) {
        if (index === this.state.presentation.slides.length) {
          // Was the last slide, go to new last slide
          newCurrentIndex = Math.max(0, this.state.presentation.slides.length - 2);
        }
        // Otherwise keep the same index which now points to the next slide
      } else if (this.state.ui.currentSlideIndex > index) {
        // Adjust for the removed slide
        newCurrentIndex--;
      }
      
      // If no slides left, reset current index
      if (newSlides.length === 0) {
        newCurrentIndex = -1;
      }
      
      const updatedState = {
        ...this.state,
        presentation: {
          ...this.state.presentation,
          slides: newSlides,
          lastEdited: new Date()
        },
        ui: {
          ...this.state.ui,
          currentSlideIndex: newCurrentIndex,
          isDirty: true
        }
      };
      
      this.updateState(updatedState);
      
      this.renderer.updateLastEdited();
      this.renderer.updateSlideIndicator();
      
      toast({
        title: "Slide deleted",
        description: "The slide has been removed from your presentation."
      });
    } catch (error) {
      console.error('Error deleting slide:', error);
      toast({
        title: "Error",
        description: "Failed to delete the slide.",
        variant: "destructive"
      });
    }
  }

  selectSlide(index: number): void {
    try {
      if (index < 0 || index >= this.state.presentation.slides.length) return;
      
      const updatedState = {
        ...this.state,
        ui: {
          ...this.state.ui,
          currentSlideIndex: index
        }
      };
      
      this.updateState(updatedState);
      this.renderer.updateSlideIndicator();
    } catch (error) {
      console.error('Error selecting slide:', error);
      toast({
        title: "Error",
        description: "Failed to select the slide.",
        variant: "destructive"
      });
    }
  }

  goToPrevSlide(): void {
    if (this.state.ui.currentSlideIndex > 0) {
      this.selectSlide(this.state.ui.currentSlideIndex - 1);
    }
  }

  goToNextSlide(): void {
    if (this.state.ui.currentSlideIndex < this.state.presentation.slides.length - 1) {
      this.selectSlide(this.state.ui.currentSlideIndex + 1);
    }
  }

  updateSlideContent(field: keyof Slide, content: string): void {
    try {
      const currentSlide = this.renderer.getCurrentSlide();
      if (!currentSlide) return;
      
      // Create a copy of the current slides
      const updatedSlides = [...this.state.presentation.slides];
      const slideIndex = this.state.ui.currentSlideIndex;
      
      // Create a new slide object with the updated field
      const updatedSlide = { ...currentSlide };
      
      // Fix the type error by ensuring we assign the correct type based on the field
      if (field === 'elements') {
        // If trying to update elements field, parse the string as JSON
        try {
          updatedSlide[field] = JSON.parse(content);
        } catch (e) {
          console.error('Failed to parse elements as JSON:', e);
          updatedSlide[field] = [];
          toast({
            title: "Invalid format",
            description: "Could not parse the elements data.",
            variant: "destructive"
          });
        }
      } else {
        // Validate and sanitize input for other fields
        const sanitizedContent = this.sanitizeContent(content, field);
        // For other fields (title, subtitle, content, background) use the string directly
        (updatedSlide[field] as string) = sanitizedContent;
      }
      
      // Update the slide in the array
      updatedSlides[slideIndex] = updatedSlide;
      
      // Update the state
      const updatedState = {
        ...this.state,
        presentation: {
          ...this.state.presentation,
          slides: updatedSlides,
          lastEdited: new Date()
        },
        ui: {
          ...this.state.ui,
          isDirty: true
        }
      };
      
      this.updateState(updatedState);
      this.renderer.updateLastEdited();
    } catch (error) {
      console.error('Error updating slide content:', error);
      toast({
        title: "Error",
        description: "Failed to update the slide content.",
        variant: "destructive"
      });
    }
  }

  private sanitizeContent(content: string, field: keyof Slide): string {
    // Implement content validation based on field type
    if (content.length > 10000) {
      // Truncate extremely long content to prevent performance issues
      content = content.substring(0, 10000);
      toast({
        title: "Content truncated",
        description: "The content was too long and has been truncated.",
        variant: "destructive"
      });
    }
    
    // Additional field-specific validation could be added here
    return content;
  }

  formatText(command: string): void {
    try {
      document.execCommand(command, false);
      this.renderer.updateToolbarState();
    } catch (error) {
      console.error('Error formatting text:', error);
      toast({
        title: "Error",
        description: "Failed to format the text.",
        variant: "destructive"
      });
    }
  }

  savePresentation = debounce(() => {
    try {
      const updatedState = {
        ...this.state,
        presentation: {
          ...this.state.presentation,
          lastEdited: new Date()
        },
        ui: {
          ...this.state.ui,
          isDirty: false
        }
      };
      
      this.updateState(updatedState);
      this.renderer.updateLastEdited();
      
      // Generate version identifier for concurrent edit protection
      const version = generateUniqueId();
      const presentationWithVersion = {
        ...this.state.presentation,
        version,
        lastEdited: new Date()
      };
      
      // Check for existing version before saving
      this.checkForConcurrentEdits(() => {
        localStorage.setItem(
          EDITOR_CONFIG.STORAGE.CURRENT_PRESENTATION, 
          JSON.stringify(presentationWithVersion)
        );
        
        // Update presentation list
        this.updatePresentationsList(presentationWithVersion);
        
        toast({
          title: "Presentation saved",
          description: "Your presentation has been saved successfully."
        });
      });
      
    } catch (error) {
      console.error('Error saving presentation:', error);
      toast({
        title: "Save failed",
        description: "Failed to save your presentation. Please try again or download a backup.",
        variant: "destructive"
      });
    }
  }, EDITOR_CONFIG.DEBOUNCE.SAVE);
  
  private checkForConcurrentEdits(onSuccess: () => void): void {
    try {
      const savedData = localStorage.getItem(EDITOR_CONFIG.STORAGE.CURRENT_PRESENTATION);
      
      if (!savedData) {
        // No existing data, safe to proceed
        onSuccess();
        return;
      }
      
      const savedPresentation = JSON.parse(savedData);
      
      // If versions don't match and the saved version is newer than current
      if (
        savedPresentation.version && 
        savedPresentation.version !== this.state.presentation.version &&
        new Date(savedPresentation.lastEdited) > new Date(this.state.presentation.lastEdited)
      ) {
        // Handle concurrent edit conflict
        toast({
          title: "Editing conflict detected",
          description: "Someone else may have edited this presentation. Save anyway?",
          variant: "destructive",
          action: (
            <button 
              onClick={onSuccess}
              className="bg-destructive text-destructive-foreground px-3 py-2 rounded"
            >
              Save anyway
            </button>
          )
        });
      } else {
        // No conflict, proceed with save
        onSuccess();
      }
    } catch (error) {
      console.error('Error checking for concurrent edits:', error);
      // In case of error checking, still try to save
      onSuccess();
    }
  }
  
  private updatePresentationsList(presentation: any): void {
    try {
      // Get existing presentations list
      const listJson = localStorage.getItem(EDITOR_CONFIG.STORAGE.PRESENTATIONS_LIST) || '[]';
      const presentationsList = JSON.parse(listJson);
      
      const presentationSummary = {
        id: presentation.id,
        title: presentation.title,
        lastEdited: presentation.lastEdited,
        slideCount: presentation.slides.length,
        version: presentation.version
      };
      
      const existingIndex = presentationsList.findIndex((p: any) => p.id === presentation.id);
      
      if (existingIndex >= 0) {
        presentationsList[existingIndex] = presentationSummary;
      } else {
        presentationsList.push(presentationSummary);
      }
      
      localStorage.setItem(
        EDITOR_CONFIG.STORAGE.PRESENTATIONS_LIST, 
        JSON.stringify(presentationsList)
      );
    } catch (error) {
      console.error('Error updating presentations list:', error);
      toast({
        title: "Warning",
        description: "Failed to update the presentations list.",
        variant: "destructive"
      });
    }
  }
}
