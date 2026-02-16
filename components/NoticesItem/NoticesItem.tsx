'use client';

import Image from 'next/image';
import css from './NoticesItem.module.css';
import { useAuthStore } from '@/lib/store/AuthStore';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import AttentionComponent from '../AttentionComponent/AttentionComponent';
import NoticeItemComponent from '../NoticeItemComponent/NoticeItemComponent';
import { addToFavorites, fetchOneNotice, removeFromFavorites } from '@/lib/api/serverApi';
import { Pet } from '@/types/Pet';

interface Props {
  item: Pet;
}

export default function NoticesItem({ item }: Props) {
  const [isAttentionModalOpen, setIsAttentionModalOpen] = useState(false);
  const [isLearnMoreModalOpen, setIsLearnMoreModalOpen] = useState(false);
  const [currentPet, setCurrentPet] = useState<Pet | null>(null);
  const favorites = useAuthStore((state) => state.user?.noticesFavorites);
  const addFavorite = useAuthStore((state) => state.addFavorite);
  const removeFavorite = useAuthStore((state) => state.removeFavorite);

  const isFavorite = favorites?.some((fav) => fav._id === item._id) ?? false;

  const user = useAuthStore((state) => state.user);
  const handleToggleFavorite = async () => {
    try {
      if (isFavorite) {
        removeFavorite(item._id);
        await removeFromFavorites(item._id);
      } else {
        addFavorite(item);
        await addToFavorites(item._id);
      }
    } catch (error) {
      console.error(error);
    }
  };

  const addToFvourite = () => {
    if (!user) {
      setIsAttentionModalOpen(true);
    }
    handleToggleFavorite();
  };
  const handleLearnMoreClick = async () => {
    if (!user) {
      setIsAttentionModalOpen(true);
      return;
    }

    const pet = await fetchOneNotice(item._id);
    setCurrentPet(pet);
    setIsLearnMoreModalOpen(true);
  };

  return (
    <div className={css.notice}>
      {isAttentionModalOpen && (
        <Modal onClose={() => setIsAttentionModalOpen(false)}>
          <AttentionComponent onClose={() => setIsAttentionModalOpen(false)} />
        </Modal>
      )}
      {isLearnMoreModalOpen && currentPet && (
        <Modal onClose={() => setIsLearnMoreModalOpen(false)}>
          <NoticeItemComponent pet={currentPet} onClose={() => setIsLearnMoreModalOpen(false)} />
        </Modal>
      )}
      <Image className={css.img} width={287} height={178} alt="animal" src={item.imgURL} />
      <div className={css.wrapper}>
        <div className={css.box}>
          <h3 className={css.animal}>{item.title}</h3>
          <div className={css.starBox}>
            <svg width={16} height={16} className={css.star}>
              <use href="/symbol-defs.svg#star" />
            </svg>
            <span>{item.popularity}</span>
          </div>
        </div>
        <div className={css.infoBox}>
          <div>
            <p className={css.subtitle}>Name</p>
            <p className={css.value}>{item.name}</p>
          </div>
          <div>
            <p className={css.subtitle}>Birthday</p>
            <p className={css.value}>{item.birthday}</p>
          </div>
          <div>
            <p className={css.subtitle}>Sex</p>
            <p className={css.value}>{item.sex}</p>
          </div>
          <div>
            <p className={css.subtitle}>Species</p>
            <p className={css.value}>{item.species}</p>
          </div>
          <div>
            <p className={css.subtitle}>Category</p>
            <p className={css.value}>{item.category}</p>
          </div>
        </div>
        <p className={css.text}>{item.comment}</p>
        <p className={css.price}>{item.price ? `$${item.price}` : 'Free'}</p>
        <div className={css.btnBox}>
          <button className={css.btn} onClick={handleLearnMoreClick}>
            Learn more
          </button>
          <button className={isFavorite ? css.activeHeart : css.heart} onClick={addToFvourite}>
            <svg width={18} height={18}>
              <use href="/symbol-defs.svg#heart" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
