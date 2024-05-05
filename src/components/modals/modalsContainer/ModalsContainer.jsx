import React from 'react';
import { useModal } from '../../../contexts/ModalContext';
import MediaContentModal from '../mediaContentModal/MediaContentModal';
import Modal from '../modal/Modal';

const ModalsContainer = () => {
  // Используем для изменения состояния при закрытии модальног окна
  const { modals, toggleModal } = useModal();

  return (
    <>
      <MediaContentModal isOpen={modals.mediaContent} close={() => toggleModal('mediaContent')} />
      <Modal isOpen={modals.camera} close={() => toggleModal('camera')}>Добавление новой камеры</Modal>
      <Modal isOpen={modals.screen} close={() => toggleModal('screen')}>Добавление нового экрана</Modal>
    </>
  );
};

export default ModalsContainer;