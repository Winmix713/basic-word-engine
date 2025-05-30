
import React from 'react';
import { useSlideEditor } from './useSlideEditor';
import SlideList from './SlideList';
import SlideCanvas from './SlideCanvas';
import Toolbar from './Toolbar';
import { Button } from '../ui/button';
import { Plus, Save } from 'lucide-react';
import type { SlideEditorProps } from './types';

const SlideEditor: React.FC<SlideEditorProps> = ({ initialState }) => {
  const { state, actions } = useSlideEditor(initialState);
  const { presentation, ui } = state;
  const currentSlide = presentation.slides[ui.currentSlideIndex] || null;

  return (
    <div className="h-screen flex">
      {/* Sidebar */}
      <div className="w-64 border-r bg-muted/10 flex flex-col">
        <div className="p-4 border-b">
          <Button 
            className="w-full"
            onClick={actions.addSlide}
          >
            <Plus className="h-4 w-4 mr-2" />
            New Slide
          </Button>
        </div>
        <SlideList
          slides={presentation.slides}
          currentSlideIndex={ui.currentSlideIndex}
          onSlideSelect={actions.selectSlide}
          onSlideDelete={actions.deleteSlide}
        />
      </div>

      {/* Main Content */}
      <div className="flex-1 flex flex-col">
        <div className="flex items-center justify-between p-4 border-b">
          <h1 className="text-xl font-semibold">{presentation.title}</h1>
          <Button 
            variant={ui.isDirty ? "default" : "outline"}
            onClick={actions.savePresentation}
          >
            <Save className="h-4 w-4 mr-2" />
            Save
          </Button>
        </div>
        <Toolbar onFormatClick={actions.formatText} />
        <div className="flex-1 overflow-auto p-8 bg-accent/5">
          <div className="max-w-4xl mx-auto bg-background shadow-lg rounded-lg overflow-hidden">
            <SlideCanvas
              slide={currentSlide}
              onContentChange={actions.updateSlideContent}
            />
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlideEditor;
