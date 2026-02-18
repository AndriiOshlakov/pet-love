'use client';

import Image from 'next/image';
import css from './NoticeItemComponent.module.css';
import { useAuthStore } from '@/lib/store/AuthStore';
import { addToFavorites, removeFromFavorites } from '@/lib/api/serverApi';
import { Pet } from '@/types/Pet';

interface Props {
  onClose: () => void;
  pet: Pet;
}

export default function NoticeItemComponent({ onClose, pet }: Props) {
  const favorites = useAuthStore((state) => state.user?.noticesFavorites);
  const addFavorite = useAuthStore((state) => state.addFavorite);
  const removeFavorite = useAuthStore((state) => state.removeFavorite);

  const isFavorite = favorites?.some((fav) => fav._id === pet._id) ?? false;

  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        await removeFromFavorites(pet._id); // запит на бекенд
        removeFavorite(pet._id); // оновлення Zustand
      } else {
        await addToFavorites(pet._id); // запит на бекенд
        addFavorite(pet); // оновлення Zustand
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <div className={css.box}>
      <div className={css.imgBox}>
        <Image src={pet.imgURL} className={css.img} width={120} height={120} alt="Pet avatar" />
        <div className={css.categoryBox}>
          {pet.category.charAt(0).toUpperCase() + pet.category.slice(1)}
        </div>
      </div>
      <h3 className={css.title}>{pet.title}</h3>
      <div className={css.popularity}>
        {[1, 2, 3, 4, 5].map((i) => (
          <svg key={i} width={16} height={16} className={css.star}>
            <use href="/symbol-defs.svg#star" />
          </svg>
        ))}
        <p>{pet.popularity}</p>
      </div>
      <div className={css.wrapper}>
        <p>
          Name
          <span>{pet.name}</span>
        </p>
        <p>
          Birthday
          <span>{pet.birthday ? pet.birthday.split('-').join('.') : 'Unknown'}</span>
        </p>
        <p>
          Sex
          <span>{pet.sex}</span>
        </p>
        <p>
          Species
          <span>{pet.species}</span>
        </p>
      </div>
      <p className={css.comment}>{pet.comment}</p>
      {pet.price ? (
        <p className={css.price}>${pet.price.toFixed(2)}</p>
      ) : (
        <p className={css.price}>Free</p>
      )}
      <div className={css.btnBox}>
        <button className={css.btn} onClick={handleToggleFavorite}>
          {isFavorite ? 'Remove from' : ' Add to'}
          <svg width={18} height={18}>
            <use href="/symbol-defs.svg#heart" />
          </svg>
        </button>
        <a href={`mailto:${pet.user.email}`} target="blanc" onClick={onClose} className={css.btn}>
          Contact
        </a>
      </div>
      <button className={css.closeBtn} onClick={onClose}>
        <svg width={24} height={24} className={css.closeIcon}>
          <use href="/symbol-defs.svg#x" />
        </svg>
      </button>
    </div>
  );
}
