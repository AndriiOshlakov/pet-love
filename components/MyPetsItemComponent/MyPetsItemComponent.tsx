'use client';

import { Pet } from '@/types/Pet';
import css from './MyPetsItemComponent.module.css';
import Image from 'next/image';
import { removeMypet } from '@/lib/api/serverApi';
import { useAuthStore } from '@/lib/store/AuthStore';

interface Props {
  pet: Pet;
}

export default function MyPetsItemComponent({ pet }: Props) {
  const removePet = useAuthStore((state) => state.removePet);
  const deletePet = () => {
    removeMypet(pet._id);
    removePet(pet._id);
  };
  return (
    <div className={css.box}>
      <Image src={pet.imgURL} width={66} height={66} alt="Pet avatar" className={css.avatar} />
      <div className={css.infoBox}>
        <h4 className={css.title}>{pet.title.slice(0, 18)}</h4>
        <div className={css.wrapper}>
          <p className={css.text}>
            Name
            <span className={css.span}>{pet.name}</span>
          </p>
          <p className={css.text}>
            Birthday
            <span className={css.span}>
              {new Date(pet.birthday).toLocaleDateString('sv-SE').replace(/-/g, '.')}
            </span>
          </p>
          <p className={css.text}>
            Sex
            <span className={css.span}>{pet.sex}</span>
          </p>
          <p className={css.text}>
            Species
            <span className={css.span}>{pet.species}</span>
          </p>
        </div>
      </div>
      <button className={css.btn} onClick={deletePet}>
        <svg width={16} height={16} className={css.icon}>
          <use href="/symbol-defs.svg#trash" />
        </svg>
      </button>
    </div>
  );
}
