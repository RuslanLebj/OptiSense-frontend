import React, { createContext, useContext, useState } from 'react';

// Создаём контекст с помощью функции createContext, инициализируем его без начального значения
const ModalContext = createContext();

// Хук useModal для получения доступа к контексту
export const useModal = () => useContext(ModalContext);

// Компонент-провайдер, который оборачивает дочерние компоненты и предоставляет им доступ к контексту
export const ModalProvider = ({ children }) => {
  // Состояние для хранения состояний модальных окон
  const [modals, setModals] = useState({
    mediaContent: false,
    camera: false,
    screen: false
  });

  // Функция для переключения видимости модальных окон
  const toggleModal = (modalName) => {
    // Обновляем состояние, переключая значение указанного модального окна
    setModals(prev => ({ ...prev, [modalName]: !prev[modalName] }));
  };

  // Передаём объект с состоянием и функцией переключения в провайдер контекста
  return (
    <ModalContext.Provider value={{ modals, toggleModal }}>
      {children}
    </ModalContext.Provider>
  );
};