import React from 'react';
import { motion } from 'framer-motion';
import { 
  Card, CardBody, Tabs, Tab, Input, Select, SelectItem, 
  Slider, Switch, Button, Tooltip, Divider, Chip, 
  Accordion, AccordionItem, RadioGroup, Radio,
  Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, useDisclosure
} from "@heroui/react";
import { Icon } from '@iconify/react';
import { DndContext, DragEndEvent, useSensor, useSensors, PointerSensor } from '@dnd-kit/core';
import { SortableContext, useSortable, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ColorPicker } from '../color-picker';
import { useImageOptimization } from '../../../hooks/use-image-optimization';

// Define the card element types
type CardElementType = 'header' | 'image' | 'text' | 'button' | 'divider' | 'rating' | 'price' | 'badge' | 'icon';

// Define the card element interface
interface CardElement {
  id: string;
  type: CardElementType;
  content?: string;
  properties: Record<string, any>;
}

// Define the card style interface
interface CardStyle {
  width: string;
  height: string;
  backgroundColor: string;
  backgroundOpacity: number;
  borderRadius: string;
  borderWidth: string;
  borderColor: string;
  borderOpacity: number;
  shadow: string;
  padding: string;
  gap: string;
  backgroundImage?: string;
  backgroundGradient?: {
    from: string;
    to: string;
    direction: string;
  };
  glassEffect: boolean;
}

// Define the card template interface
interface CardTemplate {
  id: string;
  name: string;
  elements: CardElement[];
  style: CardStyle;
}

// Default card style
const defaultCardStyle: CardStyle = {
  width: '320px',
  height: 'auto',
  backgroundColor: '#1e1e2e',
  backgroundOpacity: 100,
  borderRadius: '16px',
  borderWidth: '1px',
  borderColor: '#ffffff',
  borderOpacity: 10,
  shadow: 'md',
  padding: '24px',
  gap: '16px',
  glassEffect: false
};

// Default card elements
const defaultCardElements: CardElement[] = [
  {
    id: 'header-1',
    type: 'header',
    content: 'Card Title',
    properties: {
      fontSize: 'text-xl',
      fontWeight: 'font-semibold',
      color: '#ffffff',
      alignment: 'left'
    }
  },
  {
    id: 'text-1',
    type: 'text',
    content: 'This is a description of the card with some details about what it contains or represents.',
    properties: {
      fontSize: 'text-sm',
      fontWeight: 'font-normal',
      color: '#a1a1aa',
      alignment: 'left'
    }
  },
  {
    id: 'divider-1',
    type: 'divider',
    properties: {
      color: '#ffffff',
      opacity: 10,
      thickness: '1px',
      style: 'solid'
    }
  },
  {
    id: 'button-1',
    type: 'button',
    content: 'Learn More',
    properties: {
      variant: 'solid',
      color: 'primary',
      size: 'md',
      radius: 'md',
      fullWidth: false,
      icon: 'lucide:arrow-right',
      iconPosition: 'right'
    }
  }
];

// Default card template
const defaultCardTemplate: CardTemplate = {
  id: 'default',
  name: 'Default Card',
  elements: defaultCardElements,
  style: defaultCardStyle
};

// Predefined templates
const cardTemplates: CardTemplate[] = [
  defaultCardTemplate,
  {
    id: 'pricing',
    name: 'Pricing Card',
    elements: [
      {
        id: 'badge-1',
        type: 'badge',
        content: 'Popular',
        properties: {
          color: 'primary',
          variant: 'flat',
          size: 'sm',
          placement: 'top-right'
        }
      },
      {
        id: 'header-1',
        type: 'header',
        content: 'Pro Plan',
        properties: {
          fontSize: 'text-2xl',
          fontWeight: 'font-bold',
          color: '#ffffff',
          alignment: 'center'
        }
      },
      {
        id: 'price-1',
        type: 'price',
        content: '29',
        properties: {
          currency: '$',
          period: '/month',
          fontSize: 'text-4xl',
          fontWeight: 'font-bold',
          color: '#ffffff',
          alignment: 'center'
        }
      },
      {
        id: 'divider-1',
        type: 'divider',
        properties: {
          color: '#ffffff',
          opacity: 10,
          thickness: '1px',
          style: 'solid'
        }
      },
      {
        id: 'text-1',
        type: 'text',
        content: 'All features from Basic plan plus:',
        properties: {
          fontSize: 'text-sm',
          fontWeight: 'font-medium',
          color: '#a1a1aa',
          alignment: 'left'
        }
      },
      {
        id: 'text-2',
        type: 'text',
        content: '✓ Unlimited projects\n✓ Priority support\n✓ Advanced analytics\n✓ Custom domains',
        properties: {
          fontSize: 'text-sm',
          fontWeight: 'font-normal',
          color: '#ffffff',
          alignment: 'left'
        }
      },
      {
        id: 'button-1',
        type: 'button',
        content: 'Get Started',
        properties: {
          variant: 'solid',
          color: 'primary',
          size: 'lg',
          radius: 'md',
          fullWidth: true,
          icon: '',
          iconPosition: 'left'
        }
      }
    ],
    style: {
      ...defaultCardStyle,
      backgroundGradient: {
        from: '#1e1e2e',
        to: '#2d2b42',
        direction: 'to-br'
      },
      borderWidth: '1px',
      borderColor: '#6366f1',
      borderOpacity: 20,
      shadow: 'lg',
      padding: '32px',
      gap: '20px'
    }
  },
  {
    id: 'product',
    name: 'Product Card',
    elements: [
      {
        id: 'image-1',
        type: 'image',
        properties: {
          src: 'https://img.heroui.chat/image/fashion?w=800&h=600&u=product-1',
          aspectRatio: 'aspect-video',
          objectFit: 'cover',
          borderRadius: 'rounded-lg'
        }
      },
      {
        id: 'header-1',
        type: 'header',
        content: 'Modern Jacket',
        properties: {
          fontSize: 'text-lg',
          fontWeight: 'font-semibold',
          color: '#ffffff',
          alignment: 'left'
        }
      },
      {
        id: 'rating-1',
        type: 'rating',
        properties: {
          value: 4.5,
          max: 5,
          size: 'sm',
          color: '#fbbf24'
        }
      },
      {
        id: 'price-1',
        type: 'price',
        content: '89.99',
        properties: {
          currency: '$',
          period: '',
          fontSize: 'text-xl',
          fontWeight: 'font-bold',
          color: '#ffffff',
          alignment: 'left'
        }
      },
      {
        id: 'button-1',
        type: 'button',
        content: 'Add to Cart',
        properties: {
          variant: 'flat',
          color: 'primary',
          size: 'md',
          radius: 'md',
          fullWidth: false,
          icon: 'lucide:shopping-cart',
          iconPosition: 'left'
        }
      }
    ],
    style: {
      ...defaultCardStyle,
      backgroundColor: '#18181b',
      borderRadius: '12px',
      shadow: 'md',
      padding: '16px',
      gap: '12px'
    }
  },
  {
    id: 'feature',
    name: 'Feature Card',
    elements: [
      {
        id: 'icon-1',
        type: 'icon',
        properties: {
          name: 'lucide:zap',
          size: '48px',
          color: '#3b82f6',
          background: 'bg-blue-500/10',
          padding: 'p-3',
          borderRadius: 'rounded-xl'
        }
      },
      {
        id: 'header-1',
        type: 'header',
        content: 'Lightning Fast',
        properties: {
          fontSize: 'text-xl',
          fontWeight: 'font-bold',
          color: '#ffffff',
          alignment: 'left'
        }
      },
      {
        id: 'text-1',
        type: 'text',
        content: 'Our optimized platform ensures your applications run at peak performance with minimal latency.',
        properties: {
          fontSize: 'text-sm',
          fontWeight: 'font-normal',
          color: '#a1a1aa',
          alignment: 'left'
        }
      },
      {
        id: 'button-1',
        type: 'button',
        content: 'Learn More',
        properties: {
          variant: 'light',
          color: 'primary',
          size: 'sm',
          radius: 'md',
          fullWidth: false,
          icon: 'lucide:arrow-right',
          iconPosition: 'right'
        }
      }
    ],
    style: {
      ...defaultCardStyle,
      backgroundColor: '#18181b',
      glassEffect: true,
      borderRadius: '16px',
      borderWidth: '0px',
      shadow: 'md',
      padding: '24px',
      gap: '16px'
    }
  }
];

// Sortable element component
const SortableElement: React.FC<{
  element: CardElement;
  onEdit: (id: string) => void;
  onDelete: (id: string) => void;
}> = ({ element, onEdit, onDelete }) => {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: element.id,
  });
  
  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    zIndex: isDragging ? 10 : 1,
    opacity: isDragging ? 0.8 : 1,
  };
  
  // Render element preview based on type
  const renderElementPreview = () => {
    switch (element.type) {
      case 'header':
        return <div className="font-semibold">{element.content}</div>;
      case 'text':
        return <div className="text-sm text-gray-400 truncate">{element.content}</div>;
      case 'image':
        return <div className="text-sm">Image Element</div>;
      case 'button':
        return <div className="text-sm">Button: {element.content}</div>;
      case 'divider':
        return <div className="text-sm">Divider</div>;
      case 'rating':
        return <div className="text-sm">Rating: {element.properties.value} / {element.properties.max}</div>;
      case 'price':
        return <div className="text-sm">Price: {element.properties.currency}{element.content}</div>;
      case 'badge':
        return <div className="text-sm">Badge: {element.content}</div>;
      case 'icon':
        return <div className="text-sm">Icon: {element.properties.name}</div>;
      default:
        return <div>Unknown Element</div>;
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      className={`
        p-3 mb-2 rounded-md border border-white/10 bg-gray-800
        flex items-center justify-between
        ${isDragging ? 'shadow-lg' : ''}
      `}
    >
      <div className="flex items-center gap-2">
        <div {...attributes} {...listeners} className="cursor-grab p-1">
          <Icon icon="lucide:grip-vertical" className="text-gray-400" />
        </div>
        <div className="flex-1">
          <div className="text-xs text-gray-500 uppercase">{element.type}</div>
          {renderElementPreview()}
        </div>
      </div>
      <div className="flex gap-1">
        <Button
          isIconOnly
          size="sm"
          variant="light"
          onPress={() => onEdit(element.id)}
        >
          <Icon icon="lucide:edit-2" className="text-gray-400" />
        </Button>
        <Button
          isIconOnly
          size="sm"
          variant="light"
          color="danger"
          onPress={() => onDelete(element.id)}
        >
          <Icon icon="lucide:trash-2" className="text-gray-400" />
        </Button>
      </div>
    </div>
  );
};

// Element editor component
const ElementEditor: React.FC<{
  element: CardElement;
  onUpdate: (updatedElement: CardElement) => void;
  onClose: () => void;
}> = ({ element, onUpdate, onClose }) => {
  const [editedElement, setEditedElement] = React.useState<CardElement>({ ...element });
  
  const handlePropertyChange = (property: string, value: any) => {
    setEditedElement(prev => ({
      ...prev,
      properties: {
        ...prev.properties,
        [property]: value
      }
    }));
  };
  
  const handleContentChange = (content: string) => {
    setEditedElement(prev => ({
      ...prev,
      content
    }));
  };
  
  const handleSave = () => {
    onUpdate(editedElement);
    onClose();
  };
  
  // Render editor based on element type
  const renderEditor = () => {
    switch (element.type) {
      case 'header':
        return (
          <>
            <Input
              label="Header Text"
              value={editedElement.content || ''}
              onValueChange={handleContentChange}
              className="mb-4"
            />
            <Select
              label="Font Size"
              selectedKeys={[editedElement.properties.fontSize]}
              onChange={(e) => handlePropertyChange('fontSize', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="text-sm" value="text-sm">Small</SelectItem>
              <SelectItem key="text-base" value="text-base">Medium</SelectItem>
              <SelectItem key="text-lg" value="text-lg">Large</SelectItem>
              <SelectItem key="text-xl" value="text-xl">X-Large</SelectItem>
              <SelectItem key="text-2xl" value="text-2xl">2X-Large</SelectItem>
              <SelectItem key="text-3xl" value="text-3xl">3X-Large</SelectItem>
            </Select>
            <Select
              label="Font Weight"
              selectedKeys={[editedElement.properties.fontWeight]}
              onChange={(e) => handlePropertyChange('fontWeight', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="font-normal" value="font-normal">Normal</SelectItem>
              <SelectItem key="font-medium" value="font-medium">Medium</SelectItem>
              <SelectItem key="font-semibold" value="font-semibold">Semibold</SelectItem>
              <SelectItem key="font-bold" value="font-bold">Bold</SelectItem>
            </Select>
            <ColorPicker
              label="Text Color"
              value={editedElement.properties.color}
              onChange={(value) => handlePropertyChange('color', value)}
              className="mb-4"
            />
            <Select
              label="Text Alignment"
              selectedKeys={[editedElement.properties.alignment]}
              onChange={(e) => handlePropertyChange('alignment', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="left" value="left">Left</SelectItem>
              <SelectItem key="center" value="center">Center</SelectItem>
              <SelectItem key="right" value="right">Right</SelectItem>
            </Select>
          </>
        );
      case 'text':
        return (
          <>
            <Input
              label="Text Content"
              value={editedElement.content || ''}
              onValueChange={handleContentChange}
              className="mb-4"
            />
            <Select
              label="Font Size"
              selectedKeys={[editedElement.properties.fontSize]}
              onChange={(e) => handlePropertyChange('fontSize', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="text-xs" value="text-xs">Extra Small</SelectItem>
              <SelectItem key="text-sm" value="text-sm">Small</SelectItem>
              <SelectItem key="text-base" value="text-base">Medium</SelectItem>
              <SelectItem key="text-lg" value="text-lg">Large</SelectItem>
            </Select>
            <Select
              label="Font Weight"
              selectedKeys={[editedElement.properties.fontWeight]}
              onChange={(e) => handlePropertyChange('fontWeight', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="font-normal" value="font-normal">Normal</SelectItem>
              <SelectItem key="font-medium" value="font-medium">Medium</SelectItem>
              <SelectItem key="font-semibold" value="font-semibold">Semibold</SelectItem>
              <SelectItem key="font-bold" value="font-bold">Bold</SelectItem>
            </Select>
            <ColorPicker
              label="Text Color"
              value={editedElement.properties.color}
              onChange={(value) => handlePropertyChange('color', value)}
              className="mb-4"
            />
            <Select
              label="Text Alignment"
              selectedKeys={[editedElement.properties.alignment]}
              onChange={(e) => handlePropertyChange('alignment', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="left" value="left">Left</SelectItem>
              <SelectItem key="center" value="center">Center</SelectItem>
              <SelectItem key="right" value="right">Right</SelectItem>
            </Select>
          </>
        );
      case 'button':
        return (
          <>
            <Input
              label="Button Text"
              value={editedElement.content || ''}
              onValueChange={handleContentChange}
              className="mb-4"
            />
            <Select
              label="Button Variant"
              selectedKeys={[editedElement.properties.variant]}
              onChange={(e) => handlePropertyChange('variant', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="solid" value="solid">Solid</SelectItem>
              <SelectItem key="bordered" value="bordered">Bordered</SelectItem>
              <SelectItem key="light" value="light">Light</SelectItem>
              <SelectItem key="flat" value="flat">Flat</SelectItem>
              <SelectItem key="faded" value="faded">Faded</SelectItem>
              <SelectItem key="shadow" value="shadow">Shadow</SelectItem>
              <SelectItem key="ghost" value="ghost">Ghost</SelectItem>
            </Select>
            <Select
              label="Button Color"
              selectedKeys={[editedElement.properties.color]}
              onChange={(e) => handlePropertyChange('color', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="default" value="default">Default</SelectItem>
              <SelectItem key="primary" value="primary">Primary</SelectItem>
              <SelectItem key="secondary" value="secondary">Secondary</SelectItem>
              <SelectItem key="success" value="success">Success</SelectItem>
              <SelectItem key="warning" value="warning">Warning</SelectItem>
              <SelectItem key="danger" value="danger">Danger</SelectItem>
            </Select>
            <Select
              label="Button Size"
              selectedKeys={[editedElement.properties.size]}
              onChange={(e) => handlePropertyChange('size', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="sm" value="sm">Small</SelectItem>
              <SelectItem key="md" value="md">Medium</SelectItem>
              <SelectItem key="lg" value="lg">Large</SelectItem>
            </Select>
            <Select
              label="Button Radius"
              selectedKeys={[editedElement.properties.radius]}
              onChange={(e) => handlePropertyChange('radius', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="none" value="none">None</SelectItem>
              <SelectItem key="sm" value="sm">Small</SelectItem>
              <SelectItem key="md" value="md">Medium</SelectItem>
              <SelectItem key="lg" value="lg">Large</SelectItem>
              <SelectItem key="full" value="full">Full</SelectItem>
            </Select>
            <Switch
              isSelected={editedElement.properties.fullWidth}
              onValueChange={(value) => handlePropertyChange('fullWidth', value)}
              className="mb-4"
            >
              Full Width
            </Switch>
            <Input
              label="Icon (Iconify name)"
              placeholder="e.g. lucide:arrow-right"
              value={editedElement.properties.icon || ''}
              onValueChange={(value) => handlePropertyChange('icon', value)}
              className="mb-4"
              startContent={
                editedElement.properties.icon && (
                  <Icon icon={editedElement.properties.icon} className="text-default-400" />
                )
              }
            />
            <Select
              label="Icon Position"
              selectedKeys={[editedElement.properties.iconPosition]}
              onChange={(e) => handlePropertyChange('iconPosition', e.target.value)}
              className="mb-4"
              isDisabled={!editedElement.properties.icon}
            >
              <SelectItem key="left" value="left">Left</SelectItem>
              <SelectItem key="right" value="right">Right</SelectItem>
            </Select>
          </>
        );
      case 'divider':
        return (
          <>
            <ColorPicker
              label="Divider Color"
              value={editedElement.properties.color}
              onChange={(value) => handlePropertyChange('color', value)}
              className="mb-4"
            />
            <Slider
              label="Opacity"
              step={1}
              maxValue={100}
              minValue={0}
              value={editedElement.properties.opacity}
              onChange={(value) => handlePropertyChange('opacity', value)}
              className="mb-4"
            />
            <Input
              label="Thickness"
              value={editedElement.properties.thickness}
              onValueChange={(value) => handlePropertyChange('thickness', value)}
              className="mb-4"
            />
            <Select
              label="Style"
              selectedKeys={[editedElement.properties.style]}
              onChange={(e) => handlePropertyChange('style', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="solid" value="solid">Solid</SelectItem>
              <SelectItem key="dashed" value="dashed">Dashed</SelectItem>
              <SelectItem key="dotted" value="dotted">Dotted</SelectItem>
            </Select>
          </>
        );
      case 'image':
        return (
          <>
            <Input
              label="Image URL"
              value={editedElement.properties.src || ''}
              onValueChange={(value) => handlePropertyChange('src', value)}
              className="mb-4"
            />
            <Select
              label="Aspect Ratio"
              selectedKeys={[editedElement.properties.aspectRatio]}
              onChange={(e) => handlePropertyChange('aspectRatio', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="aspect-auto" value="aspect-auto">Auto</SelectItem>
              <SelectItem key="aspect-square" value="aspect-square">Square (1:1)</SelectItem>
              <SelectItem key="aspect-video" value="aspect-video">Video (16:9)</SelectItem>
              <SelectItem key="aspect-[4/3]" value="aspect-[4/3]">4:3</SelectItem>
              <SelectItem key="aspect-[3/2]" value="aspect-[3/2]">3:2</SelectItem>
            </Select>
            <Select
              label="Object Fit"
              selectedKeys={[editedElement.properties.objectFit]}
              onChange={(e) => handlePropertyChange('objectFit', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="cover" value="cover">Cover</SelectItem>
              <SelectItem key="contain" value="contain">Contain</SelectItem>
              <SelectItem key="fill" value="fill">Fill</SelectItem>
            </Select>
            <Select
              label="Border Radius"
              selectedKeys={[editedElement.properties.borderRadius]}
              onChange={(e) => handlePropertyChange('borderRadius', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="rounded-none" value="rounded-none">None</SelectItem>
              <SelectItem key="rounded-sm" value="rounded-sm">Small</SelectItem>
              <SelectItem key="rounded" value="rounded">Medium</SelectItem>
              <SelectItem key="rounded-lg" value="rounded-lg">Large</SelectItem>
              <SelectItem key="rounded-xl" value="rounded-xl">Extra Large</SelectItem>
              <SelectItem key="rounded-full" value="rounded-full">Full</SelectItem>
            </Select>
          </>
        );
      case 'rating':
        return (
          <>
            <Slider
              label="Rating Value"
              step={0.5}
              maxValue={5}
              minValue={0}
              value={editedElement.properties.value}
              onChange={(value) => handlePropertyChange('value', value)}
              className="mb-4"
            />
            <Slider
              label="Max Rating"
              step={1}
              maxValue={10}
              minValue={1}
              value={editedElement.properties.max}
              onChange={(value) => handlePropertyChange('max', value)}
              className="mb-4"
            />
            <Select
              label="Size"
              selectedKeys={[editedElement.properties.size]}
              onChange={(e) => handlePropertyChange('size', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="sm" value="sm">Small</SelectItem>
              <SelectItem key="md" value="md">Medium</SelectItem>
              <SelectItem key="lg" value="lg">Large</SelectItem>
            </Select>
            <ColorPicker
              label="Star Color"
              value={editedElement.properties.color}
              onChange={(value) => handlePropertyChange('color', value)}
              className="mb-4"
            />
          </>
        );
      case 'price':
        return (
          <>
            <Input
              label="Price Amount"
              value={editedElement.content || ''}
              onValueChange={handleContentChange}
              className="mb-4"
            />
            <Input
              label="Currency Symbol"
              value={editedElement.properties.currency || '$'}
              onValueChange={(value) => handlePropertyChange('currency', value)}
              className="mb-4"
            />
            <Input
              label="Period"
              value={editedElement.properties.period || ''}
              onValueChange={(value) => handlePropertyChange('period', value)}
              placeholder="e.g. /month, /year"
              className="mb-4"
            />
            <Select
              label="Font Size"
              selectedKeys={[editedElement.properties.fontSize]}
              onChange={(e) => handlePropertyChange('fontSize', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="text-lg" value="text-lg">Large</SelectItem>
              <SelectItem key="text-xl" value="text-xl">X-Large</SelectItem>
              <SelectItem key="text-2xl" value="text-2xl">2X-Large</SelectItem>
              <SelectItem key="text-3xl" value="text-3xl">3X-Large</SelectItem>
              <SelectItem key="text-4xl" value="text-4xl">4X-Large</SelectItem>
            </Select>
            <Select
              label="Font Weight"
              selectedKeys={[editedElement.properties.fontWeight]}
              onChange={(e) => handlePropertyChange('fontWeight', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="font-normal" value="font-normal">Normal</SelectItem>
              <SelectItem key="font-medium" value="font-medium">Medium</SelectItem>
              <SelectItem key="font-semibold" value="font-semibold">Semibold</SelectItem>
              <SelectItem key="font-bold" value="font-bold">Bold</SelectItem>
            </Select>
            <ColorPicker
              label="Text Color"
              value={editedElement.properties.color}
              onChange={(value) => handlePropertyChange('color', value)}
              className="mb-4"
            />
            <Select
              label="Text Alignment"
              selectedKeys={[editedElement.properties.alignment]}
              onChange={(e) => handlePropertyChange('alignment', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="left" value="left">Left</SelectItem>
              <SelectItem key="center" value="center">Center</SelectItem>
              <SelectItem key="right" value="right">Right</SelectItem>
            </Select>
          </>
        );
      case 'badge':
        return (
          <>
            <Input
              label="Badge Text"
              value={editedElement.content || ''}
              onValueChange={handleContentChange}
              className="mb-4"
            />
            <Select
              label="Badge Color"
              selectedKeys={[editedElement.properties.color]}
              onChange={(e) => handlePropertyChange('color', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="default" value="default">Default</SelectItem>
              <SelectItem key="primary" value="primary">Primary</SelectItem>
              <SelectItem key="secondary" value="secondary">Secondary</SelectItem>
              <SelectItem key="success" value="success">Success</SelectItem>
              <SelectItem key="warning" value="warning">Warning</SelectItem>
              <SelectItem key="danger" value="danger">Danger</SelectItem>
            </Select>
            <Select
              label="Badge Variant"
              selectedKeys={[editedElement.properties.variant]}
              onChange={(e) => handlePropertyChange('variant', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="solid" value="solid">Solid</SelectItem>
              <SelectItem key="bordered" value="bordered">Bordered</SelectItem>
              <SelectItem key="light" value="light">Light</SelectItem>
              <SelectItem key="flat" value="flat">Flat</SelectItem>
              <SelectItem key="faded" value="faded">Faded</SelectItem>
            </Select>
            <Select
              label="Badge Size"
              selectedKeys={[editedElement.properties.size]}
              onChange={(e) => handlePropertyChange('size', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="sm" value="sm">Small</SelectItem>
              <SelectItem key="md" value="md">Medium</SelectItem>
              <SelectItem key="lg" value="lg">Large</SelectItem>
            </Select>
            <Select
              label="Badge Placement"
              selectedKeys={[editedElement.properties.placement]}
              onChange={(e) => handlePropertyChange('placement', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="top-right" value="top-right">Top Right</SelectItem>
              <SelectItem key="top-left" value="top-left">Top Left</SelectItem>
              <SelectItem key="bottom-right" value="bottom-right">Bottom Right</SelectItem>
              <SelectItem key="bottom-left" value="bottom-left">Bottom Left</SelectItem>
              <SelectItem key="inline" value="inline">Inline</SelectItem>
            </Select>
          </>
        );
      case 'icon':
        return (
          <>
            <Input
              label="Icon Name"
              placeholder="e.g. lucide:zap"
              value={editedElement.properties.name || ''}
              onValueChange={(value) => handlePropertyChange('name', value)}
              className="mb-4"
              startContent={
                editedElement.properties.name && (
                  <Icon icon={editedElement.properties.name} className="text-default-400" />
                )
              }
            />
            <Input
              label="Icon Size"
              value={editedElement.properties.size || '24px'}
              onValueChange={(value) => handlePropertyChange('size', value)}
              className="mb-4"
            />
            <ColorPicker
              label="Icon Color"
              value={editedElement.properties.color}
              onChange={(value) => handlePropertyChange('color', value)}
              className="mb-4"
            />
            <Select
              label="Background"
              selectedKeys={[editedElement.properties.background]}
              onChange={(e) => handlePropertyChange('background', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="none" value="none">None</SelectItem>
              <SelectItem key="bg-primary-500/10" value="bg-primary-500/10">Primary Light</SelectItem>
              <SelectItem key="bg-secondary-500/10" value="bg-secondary-500/10">Secondary Light</SelectItem>
              <SelectItem key="bg-success-500/10" value="bg-success-500/10">Success Light</SelectItem>
              <SelectItem key="bg-warning-500/10" value="bg-warning-500/10">Warning Light</SelectItem>
              <SelectItem key="bg-danger-500/10" value="bg-danger-500/10">Danger Light</SelectItem>
              <SelectItem key="bg-gray-500/10" value="bg-gray-500/10">Gray Light</SelectItem>
            </Select>
            <Input
              label="Padding"
              value={editedElement.properties.padding || 'p-2'}
              onValueChange={(value) => handlePropertyChange('padding', value)}
              className="mb-4"
            />
            <Select
              label="Border Radius"
              selectedKeys={[editedElement.properties.borderRadius]}
              onChange={(e) => handlePropertyChange('borderRadius', e.target.value)}
              className="mb-4"
            >
              <SelectItem key="rounded-none" value="rounded-none">None</SelectItem>
              <SelectItem key="rounded" value="rounded">Medium</SelectItem>
              <SelectItem key="rounded-md" value="rounded-md">Medium Large</SelectItem>
              <SelectItem key="rounded-lg" value="rounded-lg">Large</SelectItem>
              <SelectItem key="rounded-xl" value="rounded-xl">Extra Large</SelectItem>
              <SelectItem key="rounded-full" value="rounded-full">Full</SelectItem>
            </Select>
          </>
        );
      default:
        return <div>No editor available for this element type</div>;
    }
  };

  return (
    <Card className="w-full">
      <CardBody>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold">Edit {element.type}</h3>
          <Button
            isIconOnly
            size="sm"
            variant="light"
            onPress={onClose}
          >
            <Icon icon="lucide:x" />
          </Button>
        </div>
        
        {renderEditor()}
        
        <div className="flex justify-end mt-4">
          <Button
            color="primary"
            onPress={handleSave}
          >
            Save Changes
          </Button>
        </div>
      </CardBody>
    </Card>
  );
};

// Card style editor component
const CardStyleSettings: React.FC<{
  style: CardStyle;
  onUpdate: (updatedStyle: CardStyle) => void;
}> = ({ style, onUpdate }) => {
  const [editedStyle, setEditedStyle] = React.useState<CardStyle>({ ...style });
  
  const handleStyleChange = (property: keyof CardStyle, value: any) => {
    setEditedStyle(prev => ({
      ...prev,
      [property]: value
    }));
    onUpdate({
      ...editedStyle,
      [property]: value
    });
  };
  
  const handleGradientChange = (property: keyof typeof editedStyle.backgroundGradient, value: string) => {
    const updatedGradient = {
      ...(editedStyle.backgroundGradient || { from: '#1e1e2e', to: '#2d2b42', direction: 'to-br' }),
      [property]: value
    };
    
    setEditedStyle(prev => ({
      ...prev,
      backgroundGradient: updatedGradient
    }));
    
    onUpdate({
      ...editedStyle,
      backgroundGradient: updatedGradient
    });
  };
  
  return (
    <div className="space-y-4">
      <Accordion>
        <AccordionItem key="dimensions" aria-label="Dimensions" title="Dimensions & Layout">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Width"
              value={editedStyle.width}
              onValueChange={(value) => handleStyleChange('width', value)}
            />
            <Input
              label="Height"
              value={editedStyle.height}
              onValueChange={(value) => handleStyleChange('height', value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Padding"
              value={editedStyle.padding}
              onValueChange={(value) => handleStyleChange('padding', value)}
            />
            <Input
              label="Gap Between Elements"
              value={editedStyle.gap}
              onValueChange={(value) => handleStyleChange('gap', value)}
            />
          </div>
        </AccordionItem>
        
        <AccordionItem key="background" aria-label="Background" title="Background">
          <RadioGroup
            label="Background Type"
            orientation="horizontal"
            defaultValue={editedStyle.backgroundGradient ? "gradient" : (editedStyle.backgroundImage ? "image" : "color")}
            className="mb-4"
          >
            <Radio 
              value="color" 
              onChange={() => {
                setEditedStyle(prev => ({ ...prev, backgroundGradient: undefined, backgroundImage: undefined }));
                onUpdate({ ...editedStyle, backgroundGradient: undefined, backgroundImage: undefined });
              }}
            >
              Solid Color
            </Radio>
            <Radio 
              value="gradient" 
              onChange={() => {
                const gradient = { from: '#1e1e2e', to: '#2d2b42', direction: 'to-br' };
                setEditedStyle(prev => ({ ...prev, backgroundGradient: gradient, backgroundImage: undefined }));
                onUpdate({ ...editedStyle, backgroundGradient: gradient, backgroundImage: undefined });
              }}
            >
              Gradient
            </Radio>
            <Radio 
              value="image" 
              onChange={() => {
                setEditedStyle(prev => ({ 
                  ...prev, 
                  backgroundImage: 'https://img.heroui.chat/image/ai?w=800&h=600&u=card-bg', 
                  backgroundGradient: undefined 
                }));
                onUpdate({ 
                  ...editedStyle, 
                  backgroundImage: 'https://img.heroui.chat/image/ai?w=800&h=600&u=card-bg', 
                  backgroundGradient: undefined 
                });
              }}
            >
              Image
            </Radio>
          </RadioGroup>
          
          {!editedStyle.backgroundGradient && !editedStyle.backgroundImage && (
            <>
              <ColorPicker
                label="Background Color"
                value={editedStyle.backgroundColor}
                onChange={(value) => handleStyleChange('backgroundColor', value)}
                className="mb-4"
              />
              <Slider
                label="Background Opacity"
                step={1}
                maxValue={100}
                minValue={0}
                value={editedStyle.backgroundOpacity}
                onChange={(value) => handleStyleChange('backgroundOpacity', value)}
                className="mb-4"
              />
            </>
          )}
          
          {editedStyle.backgroundGradient && (
            <div className="space-y-4">
              <ColorPicker
                label="Gradient From"
                value={editedStyle.backgroundGradient.from}
                onChange={(value) => handleGradientChange('from', value)}
              />
              <ColorPicker
                label="Gradient To"
                value={editedStyle.backgroundGradient.to}
                onChange={(value) => handleGradientChange('to', value)}
              />
              <Select
                label="Gradient Direction"
                selectedKeys={[editedStyle.backgroundGradient.direction]}
                onChange={(e) => handleGradientChange('direction', e.target.value)}
              >
                <SelectItem key="to-r" value="to-r">Left to Right</SelectItem>
                <SelectItem key="to-l" value="to-l">Right to Left</SelectItem>
                <SelectItem key="to-b" value="to-b">Top to Bottom</SelectItem>
                <SelectItem key="to-t" value="to-t">Bottom to Top</SelectItem>
                <SelectItem key="to-tr" value="to-tr">Top Left to Bottom Right</SelectItem>
                <SelectItem key="to-tl" value="to-tl">Top Right to Bottom Left</SelectItem>
                <SelectItem key="to-br" value="to-br">Top Left to Bottom Right</SelectItem>
                <SelectItem key="to-bl" value="to-bl">Top Right to Bottom Left</SelectItem>
              </Select>
            </div>
          )}
          
          {editedStyle.backgroundImage && (
            <Input
              label="Background Image URL"
              value={editedStyle.backgroundImage}
              onValueChange={(value) => handleStyleChange('backgroundImage', value)}
              className="mb-4"
            />
          )}
          
          <Switch
            isSelected={editedStyle.glassEffect}
            onValueChange={(value) => handleStyleChange('glassEffect', value)}
            className="mt-4"
          >
            Glass Effect (Backdrop Blur)
          </Switch>
        </AccordionItem>
        
        <AccordionItem key="border" aria-label="Border" title="Border & Shadow">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <Input
              label="Border Radius"
              value={editedStyle.borderRadius}
              onValueChange={(value) => handleStyleChange('borderRadius', value)}
            />
            <Input
              label="Border Width"
              value={editedStyle.borderWidth}
              onValueChange={(value) => handleStyleChange('borderWidth', value)}
            />
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <ColorPicker
              label="Border Color"
              value={editedStyle.borderColor}
              onChange={(value) => handleStyleChange('borderColor', value)}
            />
            <Slider
              label="Border Opacity"
              step={1}
              maxValue={100}
              minValue={0}
              value={editedStyle.borderOpacity}
              onChange={(value) => handleStyleChange('borderOpacity', value)}
            />
          </div>
          <Select
            label="Shadow"
            selectedKeys={[editedStyle.shadow]}
            onChange={(e) => handleStyleChange('shadow', e.target.value)}
            className="mb-4"
          >
            <SelectItem key="none" value="none">None</SelectItem>
            <SelectItem key="sm" value="sm">Small</SelectItem>
            <SelectItem key="md" value="md">Medium</SelectItem>
            <SelectItem key="lg" value="lg">Large</SelectItem>
          </Select>
        </AccordionItem>
      </Accordion>
    </div>
  );
};

// Card preview component
const CardPreview: React.FC<{
  elements: CardElement[];
  style: CardStyle;
}> = ({ elements, style }) => {
  // Convert style object to CSS styles
  const cardStyles: React.CSSProperties = {
    width: style.width,
    height: style.height === 'auto' ? 'auto' : style.height,
    backgroundColor: style.backgroundGradient 
      ? undefined 
      : `${style.backgroundColor}${style.backgroundOpacity < 100 ? Math.round(style.backgroundOpacity / 100 * 255).toString(16).padStart(2, '0') : ''}`,
    borderRadius: style.borderRadius,
    border: `${style.borderWidth} solid ${style.borderColor}${style.borderOpacity < 100 ? Math.round(style.borderOpacity / 100 * 255).toString(16).padStart(2, '0') : ''}`,
    boxShadow: style.shadow === 'none' 
      ? 'none' 
      : style.shadow === 'sm' 
        ? '0 1px 2px 0 rgba(0, 0, 0, 0.05)' 
        : style.shadow === 'md' 
          ? '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)' 
          : '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
    padding: style.padding,
    display: 'flex',
    flexDirection: 'column',
    gap: style.gap,
    backgroundImage: style.backgroundImage 
      ? `url(${style.backgroundImage})` 
      : style.backgroundGradient 
        ? `linear-gradient(${style.backgroundGradient.direction.replace('to-', 'to ')}, ${style.backgroundGradient.from}, ${style.backgroundGradient.to})` 
        : undefined,
    backgroundSize: style.backgroundImage ? 'cover' : undefined,
    backgroundPosition: style.backgroundImage ? 'center' : undefined,
    backdropFilter: style.glassEffect ? 'blur(8px)' : undefined,
    WebkitBackdropFilter: style.glassEffect ? 'blur(8px)' : undefined,
  };
  
  // Render card elements
  const renderElement = (element: CardElement) => {
    switch (element.type) {
      case 'header':
        return (
          <h3 
            key={element.id}
            className={`${element.properties.fontSize} ${element.properties.fontWeight} text-${element.properties.alignment}`}
            style={{ color: element.properties.color }}
          >
            {element.content}
          </h3>
        );
      case 'text':
        return (
          <p 
            key={element.id}
            className={`${element.properties.fontSize} ${element.properties.fontWeight} text-${element.properties.alignment} whitespace-pre-line`}
            style={{ color: element.properties.color }}
          >
            {element.content}
          </p>
        );
      case 'button':
        return (
          <Button
            key={element.id}
            variant={element.properties.variant as any}
            color={element.properties.color as any}
            size={element.properties.size as any}
            radius={element.properties.radius as any}
            fullWidth={element.properties.fullWidth}
            startContent={element.properties.icon && element.properties.iconPosition === 'left' && (
              <Icon icon={element.properties.icon} />
            )}
            endContent={element.properties.icon && element.properties.iconPosition === 'right' && (
              <Icon icon={element.properties.icon} />
            )}
          >
            {element.content}
          </Button>
        );
      case 'divider':
        return (
          <div 
            key={element.id}
            className="w-full"
            style={{
              height: element.properties.thickness,
              backgroundColor: `${element.properties.color}${element.properties.opacity < 100 ? Math.round(element.properties.opacity / 100 * 255).toString(16).padStart(2, '0') : ''}`,
              borderStyle: element.properties.style,
              borderWidth: element.properties.style !== 'solid' ? element.properties.thickness : 0,
              borderColor: element.properties.style !== 'solid' ? `${element.properties.color}${element.properties.opacity < 100 ? Math.round(element.properties.opacity / 100 * 255).toString(16).padStart(2, '0') : ''}` : undefined,
              borderTop: element.properties.style !== 'solid' ? undefined : 0,
              borderLeft: element.properties.style !== 'solid' ? undefined : 0,
              borderRight: element.properties.style !== 'solid' ? undefined : 0,
            }}
          />
        );
      case 'image':
        return (
          <div 
            key={element.id}
            className={`w-full ${element.properties.aspectRatio} overflow-hidden ${element.properties.borderRadius}`}
          >
            <img 
              src={element.properties.src || 'https://img.heroui.chat/image/ai?w=800&h=600&u=placeholder'}
              alt="Card image"
              className={`w-full h-full object-${element.properties.objectFit}`}
            />
          </div>
        );
      case 'rating':
        return (
          <div key={element.id} className="flex items-center">
            {Array.from({ length: element.properties.max }).map((_, index) => (
              <Icon
                key={index}
                icon={index < element.properties.value ? 'lucide:star' : 'lucide:star'}
                className={`${element.properties.size === 'sm' ? 'text-lg' : element.properties.size === 'md' ? 'text-xl' : 'text-2xl'} ${index < element.properties.value ? 'opacity-100' : 'opacity-30'}`}
                style={{ color: element.properties.color }}
              />
            ))}
            <span className="ml-2 text-sm text-gray-400">{element.properties.value}/{element.properties.max}</span>
          </div>
        );
      case 'price':
        return (
          <div 
            key={element.id}
            className={`${element.properties.fontSize} ${element.properties.fontWeight} text-${element.properties.alignment}`}
            style={{ color: element.properties.color }}
          >
            <span className="text-sm align-top">{element.properties.currency}</span>
            <span>{element.content}</span>
            <span className="text-sm text-gray-400">{element.properties.period}</span>
          </div>
        );
      case 'badge':
        const badgePlacement = element.properties.placement;
        return (
          <div key={element.id} className={`
            ${badgePlacement === 'top-right' ? 'absolute top-2 right-2' : 
              badgePlacement === 'top-left' ? 'absolute top-2 left-2' : 
              badgePlacement === 'bottom-right' ? 'absolute bottom-2 right-2' : 
              badgePlacement === 'bottom-left' ? 'absolute bottom-2 left-2' : 
              'relative'
            }
          `}>
            <Chip
              color={element.properties.color as any}
              variant={element.properties.variant as any}
              size={element.properties.size as any}
            >
              {element.content}
            </Chip>
          </div>
        );
      case 'icon':
        return (
          <div 
            key={element.id}
            className={`inline-flex items-center justify-center ${element.properties.background !== 'none' ? element.properties.background : ''} ${element.properties.padding} ${element.properties.borderRadius}`}
          >
            <Icon 
              icon={element.properties.name || 'lucide:help-circle'} 
              style={{ 
                fontSize: element.properties.size,
                color: element.properties.color
              }} 
            />
          </div>
        );
      default:
        return <div key={element.id}>Unknown element type</div>;
    }
  };

  return (
    <motion.div
      className="relative"
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <div style={cardStyles}>
        {elements.map(element => renderElement(element))}
      </div>
    </motion.div>
  );
};

// Main card style editor component
export const CardStyleEditor: React.FC = () => {
  const [templates, setTemplates] = React.useState<CardTemplate[]>(cardTemplates);
  const [activeTemplate, setActiveTemplate] = React.useState<CardTemplate>(templates[0]);
  const [elements, setElements] = React.useState<CardElement[]>(activeTemplate.elements);
  const [cardStyle, setCardStyle] = React.useState<CardStyle>(activeTemplate.style);
  const [editingElement, setEditingElement] = React.useState<CardElement | null>(null);
  const [showAddElementModal, setShowAddElementModal] = React.useState<boolean>(false);
  
  // DnD sensors
  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );
  
  // Handle template change
  const handleTemplateChange = (templateId: string) => {
    const template = templates.find(t => t.id === templateId);
    if (template) {
      setActiveTemplate(template);
      setElements(template.elements);
      setCardStyle(template.style);
    }
  };
  
  // Handle drag end
  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    
    if (over && active.id !== over.id) {
      const oldIndex = elements.findIndex(e => e.id === active.id);
      const newIndex = elements.findIndex(e => e.id === over.id);
      
      const newElements = [...elements];
      const [removed] = newElements.splice(oldIndex, 1);
      newElements.splice(newIndex, 0, removed);
      
      setElements(newElements);
    }
  };
  
  // Handle element edit
  const handleEditElement = (elementId: string) => {
    const element = elements.find(e => e.id === elementId);
    if (element) {
      setEditingElement(element);
    }
  };
  
  // Handle element update
  const handleUpdateElement = (updatedElement: CardElement) => {
    setElements(prev => prev.map(e => e.id === updatedElement.id ? updatedElement : e));
  };
  
  // Handle element delete
  const handleDeleteElement = (elementId: string) => {
    setElements(prev => prev.filter(e => e.id !== elementId));
  };
  
  // Handle add element
  const handleAddElement = (type: CardElementType) => {
    const newElement: CardElement = {
      id: `${type}-${Date.now()}`,
      type,
      content: type === 'header' ? 'New Header' : 
               type === 'text' ? 'New text content' : 
               type === 'button' ? 'Button' : 
               type === 'badge' ? 'New' : 
               type === 'price' ? '99.99' : undefined,
      properties: getDefaultPropertiesForType(type)
    };
    
    setElements(prev => [...prev, newElement]);
    setShowAddElementModal(false);
  };
  
  // Get default properties for element type
  const getDefaultPropertiesForType = (type: CardElementType) => {
    switch (type) {
      case 'header':
        return {
          fontSize: 'text-xl',
          fontWeight: 'font-semibold',
          color: '#ffffff',
          alignment: 'left'
        };
      case 'text':
        return {
          fontSize: 'text-sm',
          fontWeight: 'font-normal',
          color: '#a1a1aa',
          alignment: 'left'
        };
      case 'button':
        return {
          variant: 'solid',
          color: 'primary',
          size: 'md',
          radius: 'md',
          fullWidth: false,
          icon: '',
          iconPosition: 'right'
        };
      case 'divider':
        return {
          color: '#ffffff',
          opacity: 10,
          thickness: '1px',
          style: 'solid'
        };
      case 'image':
        return {
          src: 'https://img.heroui.chat/image/ai?w=800&h=600&u=placeholder',
          aspectRatio: 'aspect-video',
          objectFit: 'cover',
          borderRadius: 'rounded-lg'
        };
      case 'rating':
        return {
          value: 4,
          max: 5,
          size: 'md',
          color: '#fbbf24'
        };
      case 'price':
        return {
          currency: '$',
          period: '/month',
          fontSize: 'text-2xl',
          fontWeight: 'font-bold',
          color: '#ffffff',
          alignment: 'left'
        };
      case 'badge':
        return {
          color: 'primary',
          variant: 'flat',
          size: 'sm',
          placement: 'top-right'
        };
      case 'icon':
        return {
          name: 'lucide:zap',
          size: '24px',
          color: '#3b82f6',
          background: 'bg-blue-500/10',
          padding: 'p-2',
          borderRadius: 'rounded-lg'
        };
      default:
        return {};
    }
  };
  
  // Handle style update
  const handleStyleUpdate = (updatedStyle: CardStyle) => {
    setCardStyle(updatedStyle);
  };
  
  // Handle save template
  const handleSaveTemplate = () => {
    // Update existing template
    const updatedTemplates = templates.map(t => 
      t.id === activeTemplate.id 
        ? { ...t, elements, style: cardStyle } 
        : t
    );
    
    setTemplates(updatedTemplates);
    setActiveTemplate({ ...activeTemplate, elements, style: cardStyle });
  };
  
  // Handle create new template
  const handleCreateNewTemplate = () => {
    const newTemplate: CardTemplate = {
      id: `template-${Date.now()}`,
      name: `Custom Template ${templates.length + 1}`,
      elements: [...elements],
      style: { ...cardStyle }
    };
    
    setTemplates(prev => [...prev, newTemplate]);
    setActiveTemplate(newTemplate);
  };
  
  // Handle export template
  const handleExportTemplate = () => {
    const templateData = {
      ...activeTemplate,
      elements,
      style: cardStyle
    };
    
    const dataStr = JSON.stringify(templateData, null, 2);
    const dataUri = `data:application/json;charset=utf-8,${encodeURIComponent(dataStr)}`;
    
    const exportFileDefaultName = `${activeTemplate.name.toLowerCase().replace(/\s+/g, '-')}.json`;
    
    const linkElement = document.createElement('a');
    linkElement.setAttribute('href', dataUri);
    linkElement.setAttribute('download', exportFileDefaultName);
    linkElement.click();
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#1e1e2e] to-[#0d0d21] p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex justify-between items-center mb-8">
          <h1 className="text-3xl font-bold text-white">Card Style Editor</h1>
          <div className="flex gap-2">
            <Select
              label="Template"
              selectedKeys={[activeTemplate.id]}
              onChange={(e) => handleTemplateChange(e.target.value)}
              className="w-48"
            >
              {templates.map(template => (
                <SelectItem key={template.id} value={template.id}>
                  {template.name}
                </SelectItem>
              ))}
            </Select>
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:save" />}
              onPress={handleSaveTemplate}
            >
              Save
            </Button>
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:plus" />}
              onPress={handleCreateNewTemplate}
            >
              New
            </Button>
            <Button
              variant="flat"
              startContent={<Icon icon="lucide:download" />}
              onPress={handleExportTemplate}
            >
              Export
            </Button>
          </div>
        </div>
        
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left side: Elements & Style Editor */}
          <div className="lg:col-span-2">
            <Card className="bg-[#1e1e2e]/80 backdrop-blur-md border border-white/10">
              <CardBody>
                <Tabs aria-label="Card Editor Options">
                  <Tab key="elements" title="Elements">
                    <div className="py-4">
                      <div className="flex justify-between items-center mb-4">
                        <h3 className="text-xl font-semibold text-white">Card Elements</h3>
                        <Button
                          color="primary"
                          startContent={<Icon icon="lucide:plus" />}
                          onPress={() => setShowAddElementModal(true)}
                        >
                          Add Element
                        </Button>
                      </div>
                      
                      <DndContext sensors={sensors} onDragEnd={handleDragEnd}>
                        <SortableContext items={elements.map(e => e.id)} strategy={verticalListSortingStrategy}>
                          <div className="space-y-2">
                            {elements.map(element => (
                              <SortableElement
                                key={element.id}
                                element={element}
                                onEdit={handleEditElement}
                                onDelete={handleDeleteElement}
                              />
                            ))}
                          </div>
                        </SortableContext>
                      </DndContext>
                      
                      {elements.length === 0 && (
                        <div className="text-center py-8 border border-dashed border-white/20 rounded-lg">
                          <p className="text-white/60">No elements added yet. Click "Add Element" to start building your card.</p>
                        </div>
                      )}
                      
                      {editingElement && (
                        <div className="mt-6">
                          <ElementEditor
                            element={editingElement}
                            onUpdate={handleUpdateElement}
                            onClose={() => setEditingElement(null)}
                          />
                        </div>
                      )}
                    </div>
                  </Tab>
                  
                  <Tab key="style" title="Card Style">
                    <div className="py-4">
                      <CardStyleSettings
                        style={cardStyle}
                        onUpdate={handleStyleUpdate}
                      />
                    </div>
                  </Tab>
                </Tabs>
              </CardBody>
            </Card>
          </div>
          
          {/* Right side: Preview */}
          <div>
            <Card className="bg-[#1e1e2e]/80 backdrop-blur-md border border-white/10 sticky top-6">
              <CardBody>
                <h3 className="text-xl font-semibold text-white mb-4">Preview</h3>
                <div className="flex justify-center">
                  <CardPreview
                    elements={elements}
                    style={cardStyle}
                  />
                </div>
              </CardBody>
            </Card>
          </div>
        </div>
      </div>
      
      {/* Add Element Modal */}
      <Modal isOpen={showAddElementModal} onOpenChange={setShowAddElementModal}>
        <ModalContent>
          {(onClose) => (
            <>
              <ModalHeader className="flex flex-col gap-1">Add Element</ModalHeader>
              <ModalBody>
                <div className="grid grid-cols-2 gap-2">
                  <Button
                    variant="flat"
                    className="h-24 flex flex-col gap-2"
                    onPress={() => handleAddElement('header')}
                  >
                    <Icon icon="lucide:heading-1" className="text-2xl" />
                    <span>Header</span>
                  </Button>
                  <Button
                    variant="flat"
                    className="h-24 flex flex-col gap-2"
                    onPress={() => handleAddElement('text')}
                  >
                    <Icon icon="lucide:text" className="text-2xl" />
                    <span>Text</span>
                  </Button>
                  <Button
                    variant="flat"
                    className="h-24 flex flex-col gap-2"
                    onPress={() => handleAddElement('image')}
                  >
                    <Icon icon="lucide:image" className="text-2xl" />
                    <span>Image</span>
                  </Button>
                  <Button
                    variant="flat"
                    className="h-24 flex flex-col gap-2"
                    onPress={() => handleAddElement('button')}
                  >
                    <Icon icon="lucide:mouse-pointer-click" className="text-2xl" />
                    <span>Button</span>
                  </Button>
                  <Button
                    variant="flat"
                    className="h-24 flex flex-col gap-2"
                    onPress={() => handleAddElement('divider')}
                  >
                    <Icon icon="lucide:minus" className="text-2xl" />
                    <span>Divider</span>
                  </Button>
                  <Button
                    variant="flat"
                    className="h-24 flex flex-col gap-2"
                    onPress={() => handleAddElement('rating')}
                  >
                    <Icon icon="lucide:star" className="text-2xl" />
                    <span>Rating</span>
                  </Button>
                  <Button
                    variant="flat"
                    className="h-24 flex flex-col gap-2"
                    onPress={() => handleAddElement('price')}
                  >
                    <Icon icon="lucide:dollar-sign" className="text-2xl" />
                    <span>Price</span>
                  </Button>
                  <Button
                    variant="flat"
                    className="h-24 flex flex-col gap-2"
                    onPress={() => handleAddElement('badge')}
                  >
                    <Icon icon="lucide:bookmark" className="text-2xl" />
                    <span>Badge</span>
                  </Button>
                  <Button
                    variant="flat"
                    className="h-24 flex flex-col gap-2"
                    onPress={() => handleAddElement('icon')}
                  >
                    <Icon icon="lucide:zap" className="text-2xl" />
                    <span>Icon</span>
                  </Button>
                </div>
              </ModalBody>
              <ModalFooter>
                <Button variant="flat" onPress={onClose}>
                  Cancel
                </Button>
              </ModalFooter>
            </>
          )}
        </ModalContent>
      </Modal>
    </div>
  );
};