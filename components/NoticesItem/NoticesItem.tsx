'use client';

import Image from 'next/image';
import css from './NoticesItem.module.css';
import { Notice } from '@/types/Notice';

interface Props {
  item: Notice;
}

export default function NoticesItem({ item }: Props) {
  return (
    <div className={css.notice}>
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
          <button className={css.btn}>Learn more</button>
          <button className={css.heart}>
            <svg width={18} height={18}>
              <use href="/symbol-defs.svg#heart" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
