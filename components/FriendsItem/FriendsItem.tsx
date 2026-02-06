'use client';

import { Friend } from '@/types/Friend';
import css from './FriendsItem.module.css';
import Image from 'next/image';

interface Props {
  friend: Friend;
}

export default function FriendsItem({ friend }: Props) {
  const workDays = friend.workDays ? friend.workDays.filter((day) => day.isOpen) : null;
  return (
    <div className={css.friend}>
      <Image width={80} height={80} alt="logo" src={friend.imageUrl} className={css.img} />
      <div className={css.work}>
        {!workDays || workDays.length === 0 ? 'closed' : ` ${workDays[0].from}-${workDays[0].to}`}
      </div>
      <div className={css.info}>
        <h2 className={css.subtitle}>{friend.title}</h2>
        <div className={css.nav}>
          <a href={`mailto:${friend.email}`} className={css.link}>
            Email:
            <span className={css.text}>{friend.email ? friend.email.trim().slice(0, 20) : ''}</span>
          </a>
          <a
            href={friend.addressUrl}
            target="_blank"
            rel="noopener noreferrer"
            className={css.link}
          >
            Address:
            <span className={css.text}>{friend.address ? friend.address.slice(0, 17) : ''}</span>
          </a>
          <a href={`tel:${friend.phone}`} className={css.link}>
            Phone:<span className={css.text}>{friend.phone}</span>
          </a>
        </div>
      </div>
    </div>
  );
}
