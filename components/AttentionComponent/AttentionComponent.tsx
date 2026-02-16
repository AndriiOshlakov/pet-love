'use client';

import Image from 'next/image';
import css from './AttentionComponent.module.css';
import Link from 'next/link';

interface Props {
  onClose: () => void;
}

export default function AttentionComponent({ onClose }: Props) {
  return (
    <div className={css.box}>
      <Image src="/dog-image.png" className={css.img} width={80} height={80} alt="Dog avatar" />
      <h3 className={css.title}>Attention</h3>
      <p className={css.text}>
        We would like to remind you that certain functionality is available only to authorized
        users.If you have an account, please log in with your credentials. If you do not already
        have an account, you must register to access these features.
      </p>
      <div className={css.wrapper}>
        <Link href="/login" className={css.link} onClick={onClose}>
          Log In
        </Link>
        <Link href="/register" className={css.link} onClick={onClose}>
          Registration
        </Link>
      </div>
      <button className={css.closeBtn} onClick={onClose}>
        <svg width={24} height={24} className={css.closeIcon}>
          <use href="/symbol-defs.svg#x" />
        </svg>
      </button>
    </div>
  );
}
