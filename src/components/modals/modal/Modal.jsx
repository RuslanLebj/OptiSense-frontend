import React from 'react';

const Modal = ({ isOpen, close, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        {children}
        <button onClick={close} className="mt-4">Закрыть</button>
      </div>
    </div>
  );
};

export default Modal;