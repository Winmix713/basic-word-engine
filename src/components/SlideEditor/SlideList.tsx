
import React from 'react';
import { Slide } from './types';
import { Button } from '../ui/button';
import { Trash2 } from 'lucide-react';

interface SlideListProps {
  slides: Slide[];
  currentSlideIndex: number;
  onSlideSelect: (index: number) => void;
  onSlideDelete: (index: number) => void;
}

const SlideList: React.FC<SlideListProps> = ({
  slides,
  currentSlideIndex,
  onSlideSelect,
  onSlideDelete,
}) => {
  return (
    <div className="slide-list space-y-2 p-4">
      {slides.length === 0 ? (
        <p className="text-center text-muted-foreground text-sm p-4">
          No slides yet. Click "New Slide" to add one.
        </p>
      ) : (
        slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`slide-item flex flex-col p-2 rounded cursor-pointer relative group 
              ${currentSlideIndex === index ? 'bg-accent' : 'hover:bg-accent/50'}`}
            onClick={() => onSlideSelect(index)}
          >
            <div className="slide-preview aspect-[16/9] rounded bg-background mb-1 overflow-hidden">
              {slide.title && (
                <div className="text-xs font-medium mb-1 truncate p-2">
                  {slide.title}
                </div>
              )}
            </div>
            <div className="flex items-center justify-between text-xs">
              <span className="text-muted-foreground">Slide {index + 1}</span>
              <Button
                variant="ghost"
                size="sm"
                className="opacity-0 group-hover:opacity-100 transition-opacity"
                onClick={(e) => {
                  e.stopPropagation();
                  onSlideDelete(index);
                }}
              >
                <Trash2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
        ))
      )}
    </div>
  );
};

export default SlideList;
