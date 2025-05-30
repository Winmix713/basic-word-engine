import { useState, useCallback, useEffect, useRef } from 'react';
import { EditorState, Slide } from './types';
import { useToast } from '@/hooks/use-toast';
import { 
  generateUniqueId, 
  createDefaultSlide,
  createDefaultState 
} from './slide-editor';
import { RendererService } from './services/renderer-service';
import { ActionService } from './services/action-service';

/**
 * Custom hook for managing the SlideEditor state and actions
 */
export const useSlideEditor = (initialState?: Partial<EditorState>) => {
  const { toast } = useToast();
  const [state, setState] = useState<EditorState>(() => ({
    presentation: {
      id: generateUniqueId(),
      title: 'Untitled Presentation',
      lastEdited: new Date(),
      theme: 'default',
      slides: [],
      ...initialState?.presentation
    },
    ui: {
      currentSlideIndex: -1,
      zoomLevel: 1,
      isFullscreen: false,
      isPresentationMode: false,
      isDirty: false,
      isEditingTitle: false,
      ...initialState?.ui
    }
  }));

  // Create refs for services to maintain service instances across renders
  const domElementsRef = useRef<Record<string, HTMLElement>>({});
  const rendererServiceRef = useRef<RendererService | null>(null);
  const actionServiceRef = useRef<ActionService | null>(null);

  // Initialize services when the component mounts or state changes
  useEffect(() => {
    // Create renderer and action services if they don't exist or if state changed externally
    if (!rendererServiceRef.current) {
      rendererServiceRef.current = new RendererService(state, domElementsRef.current);
    }
    
    if (!actionServiceRef.current) {
      actionServiceRef.current = new ActionService(
        state, 
        domElementsRef.current,
        rendererServiceRef.current,
        // Pass state update callback to keep hook state in sync with service state
        (newState: EditorState) => setState(newState)
      );
    }
  }, [state]);

  // Method to register DOM elements with the services
  const registerDomElement = useCallback((id: string, element: HTMLElement | null) => {
    if (element) {
      domElementsRef.current[id] = element;
    } else {
      delete domElementsRef.current[id];
    }
  }, []);

  // Load presentation from localStorage on initial mount
  useEffect(() => {
    try {
      const savedPresentation = localStorage.getItem('current-slide-presentation');
      if (savedPresentation) {
        const parsedPresentation = JSON.parse(savedPresentation);
        setState(prevState => ({
          ...prevState,
          presentation: {
            ...parsedPresentation,
            lastEdited: new Date(parsedPresentation.lastEdited)
          }
        }));
        
        toast({
          title: "Presentation loaded",
          description: "Your previous presentation has been loaded successfully."
        });
      }
    } catch (error) {
      console.error('Error loading presentation from localStorage:', error);
      toast({
        title: "Error loading presentation",
        description: "Failed to load your saved presentation.",
        variant: "destructive"
      });
    }
  }, [toast]);

  // Add slide action
  const addSlide = useCallback(() => {
    if (actionServiceRef.current) {
      actionServiceRef.current.createNewSlide();
    } else {
      // Fallback implementation if service is not available
      setState(prev => {
        try {
          const newSlide: Slide = {
            id: generateUniqueId(),
            ...createDefaultSlide()
          };
          
          return {
            ...prev,
            presentation: {
              ...prev.presentation,
              slides: [...prev.presentation.slides, newSlide],
              lastEdited: new Date()
            },
            ui: {
              ...prev.ui,
              currentSlideIndex: prev.presentation.slides.length,
              isDirty: true
            }
          };
        } catch (error) {
          console.error('Error adding slide:', error);
          toast({
            title: "Error",
            description: "Failed to add a new slide.",
            variant: "destructive"
          });
          return prev;
        }
      });
    }
  }, [toast]);

  // Delete slide action
  const deleteSlide = useCallback((index: number) => {
    if (actionServiceRef.current) {
      actionServiceRef.current.deleteSlide(index);
    } else {
      // Fallback implementation if service is not available
      setState(prev => {
        try {
          const newSlides = [...prev.presentation.slides];
          newSlides.splice(index, 1);
          
          let newCurrentIndex = prev.ui.currentSlideIndex;
          if (prev.ui.currentSlideIndex === index) {
            // Was the current slide, adjust index
            newCurrentIndex = Math.min(index, newSlides.length - 1);
          } else if (prev.ui.currentSlideIndex > index) {
            // Adjust for the removed slide
            newCurrentIndex--;
          }
          
          return {
            ...prev,
            presentation: {
              ...prev.presentation,
              slides: newSlides,
              lastEdited: new Date()
            },
            ui: {
              ...prev.ui,
              currentSlideIndex: newCurrentIndex >= 0 ? newCurrentIndex : -1,
              isDirty: true
            }
          };
        } catch (error) {
          console.error('Error deleting slide:', error);
          toast({
            title: "Error",
            description: "Failed to delete the slide.",
            variant: "destructive"
          });
          return prev;
        }
      });
    }
  }, [toast]);

  // Update slide content action
  const updateSlideContent = useCallback((field: keyof Slide, content: string) => {
    if (actionServiceRef.current) {
      actionServiceRef.current.updateSlideContent(field, content);
    } else {
      // Fallback implementation if service is not available
      setState(prev => {
        try {
          const { currentSlideIndex } = prev.ui;
          if (currentSlideIndex === -1) return prev;

          // Input validation
          if (content.length > 10000) {
            toast({
              title: "Content too long",
              description: "The content has been truncated to prevent performance issues.",
              variant: "destructive"
            });
            content = content.substring(0, 10000);
          }

          const newSlides = [...prev.presentation.slides];
          const currentSlide = { ...newSlides[currentSlideIndex] };

          if (field === 'elements') {
            try {
              currentSlide[field] = JSON.parse(content);
            } catch (e) {
              console.error('Failed to parse elements as JSON:', e);
              currentSlide[field] = [];
            }
          } else {
            (currentSlide[field] as string) = content;
          }

          newSlides[currentSlideIndex] = currentSlide;

          return {
            ...prev,
            presentation: {
              ...prev.presentation,
              slides: newSlides,
              lastEdited: new Date()
            },
            ui: {
              ...prev.ui,
              isDirty: true
            }
          };
        } catch (error) {
          console.error('Error updating slide content:', error);
          toast({
            title: "Error",
            description: "Failed to update the slide content.",
            variant: "destructive"
          });
          return prev;
        }
      });
    }
  }, [toast]);

  // Select slide action
  const selectSlide = useCallback((index: number) => {
    if (actionServiceRef.current) {
      actionServiceRef.current.selectSlide(index);
    } else {
      // Fallback implementation if service is not available
      setState(prev => ({
        ...prev,
        ui: {
          ...prev.ui,
          currentSlideIndex: index
        }
      }));
    }
  }, []);

  // Format text action
  const formatText = useCallback((command: string) => {
    if (actionServiceRef.current) {
      actionServiceRef.current.formatText(command);
    } else {
      // Fallback implementation if service is not available
      try {
        document.execCommand(command, false);
      } catch (error) {
        console.error('Error formatting text:', error);
        toast({
          title: "Error",
          description: "Failed to format the text.",
          variant: "destructive"
        });
      }
    }
  }, [toast]);

  // Save presentation action
  const savePresentation = useCallback(() => {
    if (actionServiceRef.current) {
      actionServiceRef.current.savePresentation();
    } else {
      // Fallback implementation if service is not available
      setState(prev => {
        try {
          const updatedPresentation = {
            ...prev.presentation,
            lastEdited: new Date()
          };
          
          localStorage.setItem(
            'current-slide-presentation',
            JSON.stringify(updatedPresentation)
          );
          
          toast({
            title: "Changes saved",
            description: "Your presentation has been saved successfully."
          });
          
          return {
            ...prev,
            presentation: updatedPresentation,
            ui: { ...prev.ui, isDirty: false }
          };
        } catch (error) {
          console.error('Error saving presentation:', error);
          toast({
            title: "Error",
            description: "Failed to save your presentation.",
            variant: "destructive"
          });
          return prev;
        }
      });
    }
  }, [toast]);

  return {
    state,
    actions: {
      addSlide,
      deleteSlide,
      updateSlideContent,
      selectSlide,
      formatText,
      savePresentation,
      registerDomElement
    }
  };
};
