import React from 'react';
import { XMarkIcon } from '@heroicons/react/24/outline'
import IconButton from '../../buttons/IconButton';
import MiddleTitle from '../../titles/middleTitle/MiddleTitle';

const Modal = ({ isOpen, close, children, title }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 z-20 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded relative flex flex-col">
        <div className="flex">
          <div className='flex-1'>
            <MiddleTitle title={title} />
          </div>
          <div className="self-end bg-gray-200"> {/* Контейнер для кнопки закрытия в верхнем правом углу */}
            <IconButton onClick={close}>
              <XMarkIcon className="h-6 w-6" />
            </IconButton>
          </div>
        </div>
        <div className="flex-1 pt-10"> {/* Контейнер для дочерних элементов, занимающий остальную часть пространства */}
          {children}
        </div>
      </div>
    </div>
  );
};

export default Modal;