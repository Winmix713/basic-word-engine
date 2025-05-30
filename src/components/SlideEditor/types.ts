
export interface Slide {
  id: string;
  title: string;
  subtitle: string;
  content: string;
  background: string;
  elements: any[];
}

export interface EditorState {
  presentation: {
    id: string;
    title: string;
    lastEdited: Date;
    theme: string;
    slides: Slide[];
  };
  ui: {
    currentSlideIndex: number;
    zoomLevel: number;
    isFullscreen: boolean;
    isPresentationMode: boolean;
    isDirty: boolean;
    isEditingTitle: boolean;
  };
}

export interface SlideEditorProps {
  initialState?: Partial<EditorState>;
}
