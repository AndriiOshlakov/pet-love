'use client';

import { useState } from 'react';
import css from './MyFavoritePetsComponent.module.css';
import { User } from '@/types/User';
import FavoritePetItemComponent from '../FavoritePetItemComponent/FavoritePetItemComponent';
import NoticesViewedItemComponent from '../NoticesViewedItemComponent/NoticesViewedItemComponent';

interface Props {
  currentUser: User | null;
}

export default function MyFavoritePetsComponent({ currentUser }: Props) {
  const [isActive, setIsActive] = useState(true);

  return (
    <div className={css.box}>
      <div className={css.btnBox}>
        <button
          onClick={() => setIsActive(true)}
          className={`${isActive ? css.activeBtn : ''} ${css.btn}`}
        >
          My favorite pets
        </button>
        <button
          onClick={() => setIsActive(false)}
          className={`${!isActive ? css.activeBtn : ''} ${css.btn}`}
        >
          Viewed
        </button>
      </div>
      <ul className={css.list}>
        {isActive
          ? currentUser?.noticesFavorites.map((item) => (
              <li key={item._id}>
                <FavoritePetItemComponent item={item} />
              </li>
            ))
          : currentUser?.noticesViewed?.map((item) => (
              <li key={item._id}>
                <NoticesViewedItemComponent item={item} />
              </li>
            ))}
      </ul>
      {isActive && currentUser?.noticesFavorites.length === 0 && (
        <p className={css.text}>
          Oops, <span className={css.span}>looks like there aren't any furries</span> on our
          adorable page yet. Do not worry! View your pets on the "find your favorite pet" page and
          add them to your favorites.
        </p>
      )}
      {!isActive && currentUser?.noticesViewed?.length === 0 && (
        <p className={css.text}>
          Oops, <span className={css.span}>looks like there aren't any furries</span> on our
          adorable page yet. Do not worry! View your pets on the "find your favorite pet" page and
          add them to your favorites.
        </p>
      )}
    </div>
  );
}
