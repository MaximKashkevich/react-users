import React from 'react';
import { Skeleton } from './Skeleton';
import { User } from './User';

export const Users = ({
  items,
  isLoading,
  searchQuery,
  onChangeSearchQuery,
  invite,
  onClickInvite,
  success,
  onClickSuccess
}) => {
  console.log(searchQuery);
  return (
    <>
      <div className="search">
        <svg viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
          <path d="M12.9 14.32a8 8 0 1 1 1.41-1.41l5.35 5.33-1.42 1.42-5.33-5.34zM8 14A6 6 0 1 0 8 2a6 6 0 0 0 0 12z" />
        </svg>
        <input
          value={searchQuery}
          onChange={onChangeSearchQuery}
          type="text"
          placeholder="Найти пользователя..."
        />
      </div>
      {isLoading ? (
        <div className="skeleton-list">
          <Skeleton />
          <Skeleton />
          <Skeleton />
        </div>
      ) : (
        <ul className="users-list">
          {items
            .filter((item) => {
              const fullname = (item.first_name + item.last_name).toLowerCase();
              return fullname.includes(searchQuery.toLowerCase()) || item.email.toLowerCase().includes(searchQuery.toLowerCase());
            })
            .map((obj) => (
              <User onClickInvite={onClickInvite} isInvited={invite.includes(obj.id)} key={obj.id} {...obj} /* Либо email={obj.email} и т.д.*/ />
            ))}
        </ul>
      )}
      <button onClick={onClickSuccess} className="send-invite-btn">Отправить приглашение</button>
    </>
  );
};