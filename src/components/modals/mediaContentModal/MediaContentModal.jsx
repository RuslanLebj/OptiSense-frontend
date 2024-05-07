import React, { useState } from 'react';
import Modal from '../modal/Modal';
import axios from 'axios';

const MediaContentModal = ({ isOpen, close }) => {
  const [file, setFile] = useState(null);

  const handleFileChange = (event) => {
    setFile(event.target.files[0]);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (!file) {
      alert('Пожалуйста, выберите файл для загрузки.');
      return;
    }
    const formData = new FormData();
    formData.append('video', file);

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/mediacontent/', formData);
      alert(`Файл ${file.name} успешно загружен`);
      close();
    } catch (error) {
      console.error('Ошибка загрузки файла:', error);
      alert('Ошибка при загрузке файла. Проверьте консоль для деталей.');
    }
  };

  return (
    <Modal isOpen={isOpen} close={close} title={'Загрузка медиа-контента'}>
      <div className="space-y-4">
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

export default MediaContentModal;