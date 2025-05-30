
import React from 'react';
import { Button } from '../ui/button';
import {
  Bold,
  Italic,
  Underline,
  AlignLeft,
  AlignCenter,
  AlignRight,
  List,
  ListOrdered,
} from 'lucide-react';

interface ToolbarProps {
  onFormatClick: (command: string) => void;
}

const Toolbar: React.FC<ToolbarProps> = ({ onFormatClick }) => {
  return (
    <div className="flex items-center space-x-1 p-2 border-b">
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFormatClick('bold')}
        data-command="bold"
      >
        <Bold className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFormatClick('italic')}
        data-command="italic"
      >
        <Italic className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFormatClick('underline')}
        data-command="underline"
      >
        <Underline className="h-4 w-4" />
      </Button>
      <div className="w-px h-4 bg-border mx-2" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFormatClick('justifyLeft')}
        data-command="justifyLeft"
      >
        <AlignLeft className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFormatClick('justifyCenter')}
        data-command="justifyCenter"
      >
        <AlignCenter className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFormatClick('justifyRight')}
        data-command="justifyRight"
      >
        <AlignRight className="h-4 w-4" />
      </Button>
      <div className="w-px h-4 bg-border mx-2" />
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFormatClick('insertUnorderedList')}
        data-command="insertUnorderedList"
      >
        <List className="h-4 w-4" />
      </Button>
      <Button
        variant="ghost"
        size="sm"
        onClick={() => onFormatClick('insertOrderedList')}
        data-command="insertOrderedList"
      >
        <ListOrdered className="h-4 w-4" />
      </Button>
    </div>
  );
};

export default Toolbar;
