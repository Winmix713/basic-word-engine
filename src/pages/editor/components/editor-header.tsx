import React from 'react';
import { Button, Select, SelectItem, Badge, Tooltip, Dropdown, DropdownTrigger, DropdownMenu, DropdownItem } from "@heroui/react";
import { Icon } from '@iconify/react';
import { Card } from '../../../context/card-manager-context';

// Define the props interface
interface EditorHeaderProps {
  cards: Card[];
  activeCardId: string | null;
  setActiveCardId: (id: string) => void;
  activeCard: Card | undefined;
  onNewCard: () => void;
  onDeleteCard: (id: string) => void;
  onToggleActive: (id: string) => void;
  onSave: () => void;
  onReset: () => void;
  undo: () => void;
  redo: () => void;
  canUndo: boolean;
  canRedo: boolean;
}

export const EditorHeader: React.FC<EditorHeaderProps> = ({
  cards,
  activeCardId,
  setActiveCardId,
  activeCard,
  onNewCard,
  onDeleteCard,
  onToggleActive,
  onSave,
  onReset,
  undo,
  redo,
  canUndo,
  canRedo
}) => {
  return (
    <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-8 gap-4">
      <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
        <h1 className="text-3xl font-bold text-white">Card Style Editor</h1>
        <Select
          aria-label="Select Card"
          placeholder="Select Card"
          selectedKeys={activeCardId ? [activeCardId] : []}
          onChange={(e) => setActiveCardId(e.target.value)}
          className="w-full sm:w-64"
        >
          {Array.isArray(cards) ? cards.map((card) => (
            <SelectItem key={card.id} value={card.id}>
              <div className="flex items-center gap-2">
                <span>{card.title}</span>
                {!card.isActive && (
                  <Badge color="warning" variant="flat" size="sm">Inactive</Badge>
                )}
              </div>
            </SelectItem>
          )) : (
            <SelectItem key="no-cards" value="">
              No cards available
            </SelectItem>
          )}
        </Select>
      </div>
      
      <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto">
        <Button 
          color="primary" 
          startContent={<Icon icon="lucide:plus" />}
          onPress={onNewCard}
          size="sm"
        >
          New Card
        </Button>
        
        {activeCardId && (
          <>
            <Dropdown>
              <DropdownTrigger>
                <Button 
                  color="default" 
                  variant="flat"
                  startContent={<Icon icon="lucide:more-horizontal" />}
                  size="sm"
                >
                  Actions
                </Button>
              </DropdownTrigger>
              <DropdownMenu aria-label="Card Actions">
                <DropdownItem 
                  key="toggle" 
                  startContent={<Icon icon={activeCard?.isActive ? "lucide:eye-off" : "lucide:eye"} />}
                  onPress={() => activeCardId && onToggleActive(activeCardId)}
                >
                  {activeCard?.isActive ? "Disable Card" : "Enable Card"}
                </DropdownItem>
                <DropdownItem 
                  key="delete" 
                  className="text-danger"
                  color="danger"
                  startContent={<Icon icon="lucide:trash-2" />}
                  onPress={() => activeCardId && onDeleteCard(activeCardId)}
                >
                  Delete Card
                </DropdownItem>
              </DropdownMenu>
            </Dropdown>
            
            <Button 
              color="success" 
              variant="flat"
              startContent={<Icon icon="lucide:save" />}
              onPress={onSave}
              size="sm"
            >
              Save
            </Button>
            
            <Button 
              color="danger" 
              variant="flat"
              startContent={<Icon icon="lucide:refresh-cw" />}
              onPress={onReset}
              size="sm"
            >
              Reset
            </Button>
            
            <Tooltip content="Undo">
              <Button 
                isIconOnly
                color="default" 
                variant="flat"
                isDisabled={!canUndo}
                onPress={undo}
                size="sm"
              >
                <Icon icon="lucide:undo" />
              </Button>
            </Tooltip>
            
            <Tooltip content="Redo">
              <Button 
                isIconOnly
                color="default" 
                variant="flat"
                isDisabled={!canRedo}
                onPress={redo}
                size="sm"
              >
                <Icon icon="lucide:redo" />
              </Button>
            </Tooltip>
          </>
        )}
      </div>
    </div>
  );
};