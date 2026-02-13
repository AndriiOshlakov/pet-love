'use client';

import Link from 'next/link';
import css from './Sidebar.module.css';
import { usePathname } from 'next/navigation';
import { useAuthStore } from '@/lib/store/AuthStore';
import { useState } from 'react';
import Modal from '../Modal/Modal';
import LogoutConfirmComponent from '../LogoutConfirmComponent/LogoutConfirmComponent';

type Props = {
  onClose: () => void;
  isOpen: boolean;
};

export default function Sidebar({ onClose, isOpen }: Props) {
  const pathname = usePathname();
  const isHome = pathname === '/home';
  const user = useAuthStore((state) => state.user);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
    <div className={`${css.overlay} ${isOpen ? css.show : ''}`}>
      <aside
        className={`${isHome ? css.sidebarHome : ''} ${css.sidebar} ${isOpen ? css.open : ''}`}
      >
        <button onClick={onClose} className={`${isHome ? css.closeBtnHome : ''} ${css.closeBtn}`}>
          <svg width={32} height={32}>
            <use href="/symbol-defs.svg#x" />
          </svg>
        </button>
        <nav className={`${css.nav} ${isHome ? css.navHome : ''}`}>
          <ul className={`${css.navList} ${isHome ? css.navListHome : ''}`}>
            <li>
              <Link
                href="/news"
                className={`${css.link} ${isHome ? css.linkHome : ''} ${pathname === '/news' ? css.active : ''}`}
              >
                News
              </Link>
            </li>
            <li>
              <Link
                href="/notices"
                className={`${css.link} ${isHome ? css.linkHome : ''} ${pathname === '/notices' ? css.active : ''}`}
              >
                Find pet
              </Link>
            </li>
            <li>
              <Link
                href="/friends"
                className={`${css.link} ${isHome ? css.linkHome : ''} ${pathname === '/friends' ? css.active : ''}`}
              >
                Our friends
              </Link>
            </li>
          </ul>
        </nav>
        {!user && (
          <div className={`${css.auth} ${isHome ? css.authHome : ''}`}>
            <Link
              href="/login"
              onClick={onClose}
              className={`${css.login} ${isHome ? css.loginHome : ''}`}
            >
              LOG IN
            </Link>
            <Link
              href="/register"
              onClick={onClose}
              className={`${css.register} ${isHome ? css.registerHome : ''}`}
            >
              REGISTRATION
            </Link>
          </div>
        )}
        {user && (
          <button
            className={`${css.logoutBtn} ${isHome ? css.logoutBtnHome : ''}`}
            onClick={() => setIsLogoutOpen(true)}
          >
            LOG OUT
          </button>
        )}
        {isLogoutOpen && (
          <Modal onClose={() => setIsLogoutOpen(false)}>
            <LogoutConfirmComponent
              onClose={() => setIsLogoutOpen(false)}
              onSidebarClose={onClose}
            />
          </Modal>
        )}
      </aside>
    </div>
  );
}
