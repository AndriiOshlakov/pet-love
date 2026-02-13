'use client';

import Image from 'next/image';
import css from './LogoutConfirmComponent.module.css';
import { useAuthStore } from '@/lib/store/AuthStore';
import { useRouter } from 'next/navigation';
import { logout } from '@/lib/api/serverApi';
import toast, { Toaster } from 'react-hot-toast';

interface Props {
  onClose: () => void;
  onSidebarClose?: () => void;
}

export default function LogoutConfirmComponent({ onClose, onSidebarClose }: Props) {
  const router = useRouter();
  const clearUser = useAuthStore((state) => state.clearUser);
  const logoutUser = () => {
    logout();
    toast('User logged out successfuly');
    clearUser();
    onClose();
    onSidebarClose?.();
    router.push('/');
  };
  return (
    <div className={css.box}>
      <Toaster />
      <Image src="/cat-image.png" className={css.img} width={80} height={80} alt="Cat avatar" />
      <h3 className={css.title}>Already leaving?</h3>
      <div className={css.wrapper}>
        <button className={css.btn} onClick={logoutUser}>
          Yes
        </button>
        <button className={css.btn} onClick={onClose}>
          Cancel
        </button>
      </div>
      <button className={css.closeBtn} onClick={onClose}>
        <svg width={24} height={24} className={css.closeIcon}>
          <use href="/symbol-defs.svg#x" />
        </svg>
      </button>
    </div>
  );
}
