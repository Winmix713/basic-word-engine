
import React from 'react';
import { Slide } from './types';

interface SlideCanvasProps {
  slide: Slide | null;
  onContentChange: (field: keyof Slide, content: string) => void;
}

const SlideCanvas: React.FC<SlideCanvasProps> = ({ slide, onContentChange }) => {
  if (!slide) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Select a slide to edit</p>
      </div>
    );
  }

  return (
    <div 
      className="slide-content flex flex-col h-full p-8" 
      data-slide-id={slide.id}
      style={{
        backgroundColor: slide.background || 'white',
      }}
    >
      <div
        className="slide-title mb-4 text-4xl font-bold"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onContentChange('title', e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: slide.title }}
      />
      <div
        className="slide-subtitle mb-8 text-2xl text-muted-foreground"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onContentChange('subtitle', e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: slide.subtitle }}
      />
      <div
        className="slide-body flex-1 text-lg"
        contentEditable
        suppressContentEditableWarning
        onBlur={(e) => onContentChange('content', e.currentTarget.innerHTML)}
        dangerouslySetInnerHTML={{ __html: slide.content }}
      />
    </div>
  );
};

export default SlideCanvas;
