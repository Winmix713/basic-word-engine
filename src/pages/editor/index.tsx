import React, { useState } from 'react';
import { Icon } from '@iconify/react';
import { Card, CardBody } from "@heroui/react";
import { EditorHeader } from './components/editor-header';
import { EditorPreview } from './components/editor-preview';
import { Tabs } from './components/ui/Tabs';
import { BasicSettingsTab } from './components/tabs/BasicSettingsTab';
import { BorderSettingsTab } from './components/tabs/BorderSettingsTab';
import { BackgroundTab } from './components/tabs/background-tab';
import { ShadowsTab } from './components/tabs/shadows-tab';
import { CssTab } from './components/tabs/css-tab';
import { useCardManager } from '../../context/card-manager-context';
import { useUndoRedo } from './context/UndoRedoContext';
import { useEditorState } from './hooks/use-editor-state';
import { cardTypes } from './constants/card-types';
import { presets } from './constants/presets';
import { generateCssCode } from './utils/css-generator';
import { compressImage } from '../../utils/image-utils';

const EditorPage: React.FC = () => {
  // Get card manager context
  const {
    cards,
    activeCardId,
    setActiveCardId,
    createNewCard,
    updateCard,
    deleteCard,
    toggleCardActive,
    resetCardToDefault
  } = useCardManager();

  // Get undo/redo context
  const { addToHistory, undo, redo, canUndo, canRedo } = useUndoRedo();

  // Get editor state
  const editorState = useEditorState();

  // Local state for modals
  const [showNewCardModal, setShowNewCardModal] = useState(false);
  const [showSaveModal, setShowSaveModal] = useState(false);
  const [showResetModal, setShowResetModal] = useState(false);

  // Local state for new card
  const [newCardType, setNewCardType] = useState(cardTypes[0].key);
  const [newCardTitle, setNewCardTitle] = useState('');
  const [newCardDescription, setNewCardDescription] = useState('');

  // Get active card
  const activeCard = cards.find(card => card.id === activeCardId);

  // Handle image uploads
  const handleIconImageUpload = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const compressed = await compressImage(
            e.target.result as string,
            200,
            200,
            0.8
          );
          editorState.setIconImage(compressed);
          editorState.setUseCustomIcon(true);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading icon image:', error);
    }
  };

  const handleContentImageUpload = async (file: File) => {
    try {
      const reader = new FileReader();
      reader.onload = async (e) => {
        if (e.target?.result) {
          const compressed = await compressImage(
            e.target.result as string,
            800,
            600,
            0.7
          );
          editorState.setContentImage(compressed);
          editorState.setUseCustomContent(true);
        }
      };
      reader.readAsDataURL(file);
    } catch (error) {
      console.error('Error uploading content image:', error);
    }
  };

  // Handle border radius changes
  const handleBorderRadiusChange = (corner: string, value: string) => {
    if (editorState.linkBorderRadius) {
      // Update all corners if linked
      editorState.setCardBorderRadiusTopLeft(value);
      editorState.setCardBorderRadiusTopRight(value);
      editorState.setCardBorderRadiusBottomLeft(value);
      editorState.setCardBorderRadiusBottomRight(value);
    } else {
      // Update only the specified corner
      switch (corner) {
        case 'TopLeft':
          editorState.setCardBorderRadiusTopLeft(value);
          break;
        case 'TopRight':
          editorState.setCardBorderRadiusTopRight(value);
          break;
        case 'BottomLeft':
          editorState.setCardBorderRadiusBottomLeft(value);
          break;
        case 'BottomRight':
          editorState.setCardBorderRadiusBottomRight(value);
          break;
      }
    }
  };

  // Generate tabs
  const tabs = [
    {
      key: 'basic',
      title: 'Basic Settings',
      content: (
        <BasicSettingsTab
          cardState={editorState}
          updateCardState={(key, value) => {
            editorState[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`](value);
            addToHistory(editorState);
          }}
          cardTypes={cardTypes}
          handleIconImageUpload={handleIconImageUpload}
          handleContentImageUpload={handleContentImageUpload}
        />
      )
    },
    {
      key: 'border',
      title: 'Border Settings',
      content: (
        <BorderSettingsTab
          cardState={editorState}
          updateCardState={(key, value) => {
            editorState[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`](value);
            addToHistory(editorState);
          }}
          handleBorderRadiusChange={handleBorderRadiusChange}
        />
      )
    },
    {
      key: 'background',
      title: 'Background',
      content: (
        <BackgroundTab
          cardState={editorState}
          updateCardState={(updates) => {
            Object.entries(updates).forEach(([key, value]) => {
              editorState[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`](value);
            });
            addToHistory(editorState);
          }}
          addToHistory={addToHistory}
        />
      )
    },
    {
      key: 'shadows',
      title: 'Shadows',
      content: (
        <ShadowsTab
          cardState={editorState}
          updateCardState={(updates) => {
            Object.entries(updates).forEach(([key, value]) => {
              editorState[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`](value);
            });
            addToHistory(editorState);
          }}
          addToHistory={addToHistory}
          applyPreset={(presetId) => {
            // Apply preset settings
            const preset = presets.find(p => p.id === presetId);
            if (preset) {
              // Update state with preset values
              // ... preset application logic
              addToHistory(editorState);
            }
          }}
        />
      )
    },
    {
      key: 'css',
      title: 'Generated CSS',
      content: (
        <CssTab
          cardState={editorState}
          updateCardState={(updates) => {
            Object.entries(updates).forEach(([key, value]) => {
              editorState[`set${key.charAt(0).toUpperCase()}${key.slice(1)}`](value);
            });
          }}
          generateCssCode={() => generateCssCode(editorState)}
        />
      )
    }
  ];

  return (
    <div className="min-h-screen bg-[#1a1a24] text-white">
      <div className="container mx-auto px-4 py-6">
        <EditorHeader
          cards={cards}
          activeCardId={activeCardId}
          setActiveCardId={setActiveCardId}
          activeCard={activeCard}
          onNewCard={() => setShowNewCardModal(true)}
          onDeleteCard={deleteCard}
          onToggleActive={toggleCardActive}
          onSave={() => setShowSaveModal(true)}
          onReset={() => setShowResetModal(true)}
          undo={undo}
          redo={redo}
          canUndo={canUndo}
          canRedo={canRedo}
        />

        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 mt-6">
          <div className="lg:col-span-3">
            <Card className="bg-[#212131] border-[#2a2a3c]">
              <CardBody>
                <Tabs
                  tabs={tabs}
                  defaultSelectedKey="basic"
                  className="w-full"
                  ariaLabel="Card Editor Settings"
                />
              </CardBody>
            </Card>
          </div>

          <div className="lg:col-span-2">
            <EditorPreview cardState={editorState} />
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditorPage;

export { EditorPage }