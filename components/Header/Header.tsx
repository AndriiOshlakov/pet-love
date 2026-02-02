'use client';

import { usePathname } from 'next/navigation';
import css from './Header.module.css';
import Link from 'next/link';
import { useState } from 'react';
import Sidebar from '../Sidebar/Sidebar';

export default function Header() {
  const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false);
  const toggleSidebarOpen = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };
  const pathname = usePathname();
  const isHome = pathname === '/home';
  return (
    <div className={`${isHome ? css.containerHome : css.container}`}>
      <section className={`${isHome ? css.headerHome : css.header}`}>
        <Link className={`${isHome ? css.logoHome : css.logo}`} href="/home">
          petl
          <svg className={`${isHome ? css.iconHome : css.icon}`}>
            <use href="/symbol-defs.svg#heart" />
          </svg>
          ve
        </Link>
        <nav>
          <ul className={`${isHome ? css.navListHome : css.navList}`}>
            <li>
              <Link
                href="/news"
                className={`${isHome ? css.linkHome : css.link} ${pathname === '/news' ? css.active : ''}`}
              >
                News
              </Link>
            </li>
            <li>
              <Link
                href="/notices"
                className={`${isHome ? css.linkHome : css.link} ${pathname === '/notices' ? css.active : ''}`}
              >
                Find pet
              </Link>
            </li>
            <li>
              <Link
                href="/friends"
                className={`${isHome ? css.linkHome : css.link} ${pathname === '/friends' ? css.active : ''}`}
              >
                Our friends
              </Link>
            </li>
          </ul>
        </nav>
        <div className={css.auth}>
          <Link href="/login" className={`${isHome ? css.loginHome : css.login}`}>
            LOG IN
          </Link>
          <Link href="/register" className={`${isHome ? css.registerHome : css.register}`}>
            REGISTRATION
          </Link>
        </div>
        <div></div>
        <button onClick={toggleSidebarOpen} className={`${isHome ? css.btnHome : css.btn}`}>
          <svg className={`${isHome ? css.burgerHome : css.burger}`}>
            <use href="/symbol-defs.svg#burger" />
          </svg>
        </button>
      </section>
      <Sidebar isOpen={isSidebarOpen} onClose={toggleSidebarOpen} />
    </div>
  );
}
