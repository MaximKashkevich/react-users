import React, { useEffect, useState } from 'react';
import './index.scss';
import { Success } from './components/Success';
import { Users } from './components/Users';

// Тут список пользователей: https://reqres.in/api/users
function App() {
  const [users, setUsers] = useState([]); // Храним список пользователей в стейте
  const [isLoading, setLoading] = useState(true); // Храним состояние загрузки в стейте
  const [searchQuery, setSearchQuery] = useState(''); // Храним поисковый запрос в стейте
  const [success, setSuccess] = useState(false); // Храним состояние успеха в стейте
  const [invite, setInvite] = useState([]); // Храним список приглашенных пользователей в стейте

  useEffect(() => {
    // Запрос к серверу для получения списка пользователей
    fetch('https://reqres.in/api/users')
      .then((res) => res.json())
      .then((json) => setUsers(json.data))
      .catch((error) => {
        console.error('Error:', error); // Логируем ошибку в консоль
        alert('Ошибка при получении списка пользователей!'); // Выводим сообщение об ошибке пользователю
      })
      .finally(() => setLoading(false)); // Устанавливаем состояние загрузки в false после получения ответа от сервера
  }, []); // Зависимостей у useEffect нет, поэтому он выполнится только один раз при монтировании компонента

  const onChangeSearchQuery = (event) => {
    // Обработчик события изменения поискового запроса
    setSearchQuery(event.target.value); // Устанавливаем новое значение поискового запроса в стейт
  };

  const onClickInvite = (id) => {
    // Обработчик события нажатия на кнопку приглашения
    if (invite.includes(id)) {
      // Если пользователь уже приглашен, удаляем его из списка приглашенных
      setInvite((prev) => prev.filter((_id) => _id !== id));
    } else {
      // Если пользователь еще не приглашен, добавляем его в список приглашенных
      setInvite((prev) => [...prev, id]);
    }
  };

  const onClickSuccess = () => {
    // Обработчик события нажатия на кнопку "Отправить приглашения"
    setSuccess(false); // Устанавливаем состояние успеха в false, чтобы показать список пользователей
  };

  const onClickExit = () => {
    // Обработчик события нажатия на кнопку "Выйти"
    setSuccess(true); // Устанавливаем состояние успеха в true, чтобы показать компонент Success
  };

  return (
    <div className="App">
      {success ? (
        <Users
          onChangeSearchQuery={onChangeSearchQuery}
          searchQuery={searchQuery}
          items={users}
          isLoading={isLoading}
          onClickInvite={onClickInvite}
          invite={invite}
          success={success}
          onClickSuccess={onClickSuccess}
        />
      ) : (
        <Success count={invite.length} onClickExit={onClickExit} />
      )}
    </div>
  );
}

export default App;