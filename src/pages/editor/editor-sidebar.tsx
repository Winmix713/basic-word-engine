import React from 'react';
import { Card, CardBody, Button, Badge } from "@heroui/react";
import { Icon } from '@iconify/react';

interface Card {
  id: string;
  type: string;
  title: string;
  description: string;
  isActive?: boolean;
}

interface EditorSidebarProps {
  cards: Card[];
  activeCardId: string | null;
  setActiveCardId: (id: string) => void;
  onDeleteCard: (id: string) => void;
  onToggleActive: (id: string) => void;
  onCreateNewCard: () => void;
}

export const EditorSidebar: React.FC<EditorSidebarProps> = ({
  cards,
  activeCardId,
  setActiveCardId,
  onDeleteCard,
  onToggleActive,
  onCreateNewCard
}) => {
  return (
    <Card className="bg-[#252538]/90 backdrop-blur-md border border-white/10 shadow-xl">
      <CardBody>
        <div className="flex justify-between items-center mb-4">
          <h3 className="text-xl font-semibold text-white flex items-center gap-2">
            <Icon icon="lucide:layers" />
            Cards
          </h3>
          <Button 
            size="sm"
            color="secondary"
            variant="flat"
            onPress={onCreateNewCard}
            startContent={<Icon icon="lucide:plus" />}
          >
            New Card
          </Button>
        </div>
        
        <div className="space-y-2 max-h-[500px] overflow-y-auto pr-2">
          {cards && cards.map((card) => (
            <div 
              key={card.id}
              className={`p-3 rounded-lg cursor-pointer transition-all duration-200 ${
                activeCardId === card.id 
                  ? 'bg-[#6d28d9] border border-[#8b5cf6]' 
                  : 'bg-[#1e1e30] border border-white/5 hover:bg-[#2e2e40]'
              }`}
              onClick={() => setActiveCardId(card.id)}
            >
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                    card.type === 'obsidian' ? 'bg-gradient-to-br from-[#7c3aed] to-[#a855f7]' :
                    card.type === 'figma' ? 'bg-gradient-to-br from-[#1e293b] to-[#334155]' :
                    card.type === 'redis' ? 'bg-gradient-to-br from-[#dc2626] to-[#ef4444]' :
                    card.type === 'terminal' ? 'bg-gradient-to-br from-[#374151] to-[#6b7280]' :
                    'bg-gradient-to-br from-[#0ea5e9] to-[#3b82f6]'
                  }`}>
                    {card.type === 'obsidian' && <span className="text-lg font-bold text-white">O</span>}
                    {card.type === 'figma' && <span className="text-lg font-bold text-white">F</span>}
                    {card.type === 'redis' && <span className="text-lg font-bold text-white">R</span>}
                    {card.type === 'terminal' && <span className="text-lg font-bold text-white">$</span>}
                    {card.type === 'docker' && <span className="text-lg text-white">🐳</span>}
                  </div>
                  <div>
                    <div className="text-white font-medium">{card.title}</div>
                    <div className="text-white/60 text-xs">{card.type}</div>
                  </div>
                </div>
                
                {card.isActive === false && (
                  <Badge color="warning" variant="flat" size="sm">Inactive</Badge>
                )}
              </div>
              
              {activeCardId === card.id && (
                <div className="flex gap-2 mt-3 pt-3 border-t border-white/10">
                  <Button 
                    size="sm"
                    variant="flat"
                    color={card.isActive !== false ? "warning" : "success"}
                    onPress={() => onToggleActive(card.id)}
                    className="flex-1"
                    startContent={<Icon icon={card.isActive !== false ? "lucide:eye-off" : "lucide:eye"} size={16} />}
                  >
                    {card.isActive !== false ? "Disable" : "Enable"}
                  </Button>
                  
                  <Button 
                    size="sm"
                    variant="flat"
                    color="danger"
                    onPress={() => onDeleteCard(card.id)}
                    className="flex-1"
                    startContent={<Icon icon="lucide:trash-2" size={16} />}
                    isDisabled={cards.length <= 1}
                  >
                    Delete
                  </Button>
                </div>
              )}
            </div>
          ))}
          
          {(!cards || cards.length === 0) && (
            <div className="text-center py-8 text-white/60">
              <Icon icon="lucide:inbox" className="mx-auto mb-2 text-3xl" />
              <p>No cards found</p>
              <Button 
                size="sm"
                color="secondary"
                variant="flat"
                onPress={onCreateNewCard}
                className="mt-4"
                startContent={<Icon icon="lucide:plus" />}
              >
                Create your first card
              </Button>
            </div>
          )}
        </div>
      </CardBody>
    </Card>
  );
};