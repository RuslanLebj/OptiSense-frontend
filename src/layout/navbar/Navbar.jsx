import React, { useState } from 'react';
import { Bars3Icon, UserCircleIcon, PlusCircleIcon } from '@heroicons/react/24/outline'
import { useLocation } from 'react-router-dom';
import axios from 'axios'



// Модальные компоненты
const Modal = ({ isOpen, close, children }) => {
  if (!isOpen) return null;
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center">
      <div className="bg-white p-4 rounded">
        {children}
        <button onClick={close} className="mt-4">Закрыть</button>
      </div>
    </div>
  );
};

const MediaContentModal = ({ isOpen, close }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    const file = event.target.files[0]; // Получаем файл из input
    if (file) {
      setFile(file); // Обновляем состояние файла
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Пожалуйста, выберите файл для загрузки.');
      return;
    }
    const formData = new FormData();
    formData.append('video', file); // Добавляем файл в FormData

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/mediacontent/', formData, {
        headers: {
          'Content-Type': 'multipart/form-data' // Этот заголовок можно опустить, так как axios автоматически устанавливает нужный тип контента для FormData
        }
      });

      console.log("Ответ сервера:", response.data); // Ответ сервера
      alert(`Файл ${file.name} успешно загружен`);
      close(); // Закрыть модальное окно после загрузки
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
      alert('Ошибка при загрузке файла. Проверьте консоль для деталей.');
    }
  };

  return (
    <Modal isOpen={isOpen} close={close}>
      <div className="space-y-4">
        <h2 className="text-lg font-bold">Создание нового медиа-контента</h2>
        <form onSubmit={handleSubmit}>
          <input type="file" accept="video/*" onChange={handleFileChange} className="mb-2" />
          {file && <p>Выбран файл: {file.name}</p>}
          <button type="submit" className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700">
            Загрузить
          </button>
        </form>
      </div>
    </Modal>
  );
};



const Navbar = ({ toggleSidebar }) => {
  const location = useLocation();  // Получаем текущий маршрут
  const [isMediaContentModalOpen, setMediaContentModalOpen] = useState(false);
  const [isCameraModalOpen, setCameraModalOpen] = useState(false);
  const [isScreenModalOpen, setScreenModalOpen] = useState(false);

  // Функция для обработки клика по кнопке
  const handleActionButtonClick = () => {
    if (location.pathname.includes('/mediacontent')) {
      setMediaContentModalOpen(true);
    } else if (location.pathname.includes('/camera')) {
      setCameraModalOpen(true);
    } else if (location.pathname.includes('/screen')) {
      setScreenModalOpen(true);
    }
  };


  return (
    <header className="sticky top-0 z-20 md:h-20 bg-white border-b md:flex md:items-center md:justify-between p-4 pb-0 shadow-md md:pb-4">
      {/* Button for sidebar and Logo text */}
      <nav>
        <ul className="list-reset md:flex md:items-center">
          <li>
            <button onClick={toggleSidebar}
              className="text-gray-500 hover:text-black py-2 px-2 rounded-full transition-colors duration-300 ease-in-out">
              <Bars3Icon className="h-7 w-7" />
            </button>
          </li>
          <li>
            <h1 className="leading-none text-2xl text-gray-800 font-bold ml-5"> {/* Добавляем margin слева для выравнивания */}
              <a href="#">
                AdSenseVision
              </a>
            </h1>
          </li>
        </ul>
      </nav>
      {/* END Logo text or image */}

      {/* Search field */}
      <form className="mb-4 w-full md:mb-0 md:w-1/4">
        <label className="hidden" htmlFor="search-form">Search</label>
        <input className="bg-grey-lightest border-2 p-2 rounded-lg shadow-inner w-full" placeholder="Поиск" type="text" />
        <button className="hidden">Submit</button>
      </form>
      {/* END Search field */}

      {/* Global navigation */}
      <nav>
        <ul className="md:flex md:items-center">
          <li className="md:ml-4">
            <button
              onClick={handleActionButtonClick}
              className="text-gray-500 hover:text-black py-2 px-2 rounded-full transition-colors duration-300 ease-in-out">
              <PlusCircleIcon className="h-7 w-7" />
            </button>
          </li>
          <li className="md:ml-4">
            <button
              className="text-gray-500 hover:text-black py-2 px-2 rounded-full transition-colors duration-300 ease-in-out">
              <UserCircleIcon className="h-7 w-7" />
            </button>
          </li>
        </ul>
      </nav>
      {/* END Global navigation */}

      <MediaContentModal isOpen={isMediaContentModalOpen} close={() => setMediaContentModalOpen(false)} />
      <Modal isOpen={isCameraModalOpen} close={() => setCameraModalOpen(false)}>
        Добавление новой камеры
      </Modal>
      <Modal isOpen={isScreenModalOpen} close={() => setScreenModalOpen(false)}>
        Добавление нового экрана
      </Modal>

    </header>
  );
};

export default Navbar;