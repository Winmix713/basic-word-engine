import React from 'react';
import { Modal, ModalContent, ModalHeader, ModalBody, ModalFooter, Button, Input, Select, SelectItem } from "@heroui/react";

interface SaveModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: () => void;
}

export const SaveModal: React.FC<SaveModalProps> = ({ isOpen, onClose, onSave }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Save Changes</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to save changes to this card? This will update the card on the main page.</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onCloseModal}>
                Cancel
              </Button>
              <Button color="primary" onPress={onSave}>
                Save Changes
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

interface ResetModalProps {
  isOpen: boolean;
  onClose: () => void;
  onReset: () => void;
}

export const ResetModal: React.FC<ResetModalProps> = ({ isOpen, onClose, onReset }) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Reset Card</ModalHeader>
            <ModalBody>
              <p>Are you sure you want to reset this card to its default settings? This action cannot be undone.</p>
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onCloseModal}>
                Cancel
              </Button>
              <Button color="danger" onPress={onReset}>
                Reset Card
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};

interface NewCardModalProps {
  isOpen: boolean;
  onClose: () => void;
  onCreateCard: () => void;
  cardTypes: { key: string; label: string }[];
  newCardType: string;
  setNewCardType: (type: string) => void;
  newCardTitle: string;
  setNewCardTitle: (title: string) => void;
  newCardDescription: string;
  setNewCardDescription: (description: string) => void;
}

export const NewCardModal: React.FC<NewCardModalProps> = ({
  isOpen,
  onClose,
  onCreateCard,
  cardTypes,
  newCardType,
  setNewCardType,
  newCardTitle,
  setNewCardTitle,
  newCardDescription,
  setNewCardDescription
}) => {
  return (
    <Modal isOpen={isOpen} onOpenChange={onClose}>
      <ModalContent>
        {(onCloseModal) => (
          <>
            <ModalHeader className="flex flex-col gap-1">Create New Card</ModalHeader>
            <ModalBody>
              <Select
                label="Card Type"
                placeholder="Select a card type"
                selectedKeys={[newCardType]}
                onChange={(e) => setNewCardType(e.target.value)}
                className="w-full mb-4"
              >
                {cardTypes.map((type) => (
                  <SelectItem key={type.key} value={type.key}>
                    {type.label}
                  </SelectItem>
                ))}
              </Select>
              <Input 
                label="Title" 
                value={newCardTitle} 
                onValueChange={setNewCardTitle}
                className="mb-4"
              />
              <Input 
                label="Description" 
                value={newCardDescription} 
                onValueChange={setNewCardDescription}
              />
            </ModalBody>
            <ModalFooter>
              <Button variant="flat" onPress={onCloseModal}>
                Cancel
              </Button>
              <Button 
                color="primary" 
                onPress={onCreateCard}
                isDisabled={!newCardTitle || !newCardType}
              >
                Create Card
              </Button>
            </ModalFooter>
          </>
        )}
      </ModalContent>
    </Modal>
  );
};