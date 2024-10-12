import React from 'react';

export const Success = ({ count, onClickExit }) => {
  return (
    <div class="success-block">
      <img src="/src/assets/success.svg" alt="Success" />
      <h3>Успешно!</h3>
      <p>Всем {count} пользователям отправлено приглашение.</p>
      <button onClick={onClickExit} className="send-invite-btn">Назад</button>
    </div>
  );
};
