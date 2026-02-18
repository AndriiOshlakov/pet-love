'use client';

import { User } from '@/types/User';
import css from './UserInfoComponent.module.css';
import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import MyPetsItemComponent from '../MyPetsItemComponent/MyPetsItemComponent';
import LogoutConfirmComponent from '../LogoutConfirmComponent/LogoutConfirmComponent';
import Modal from '../Modal/Modal';
import EditUserProfileModalComponent from '../EditUserProfileModalComponent/EditUserProfileModalComponent';

interface Props {
  currentUser: User | null;
}

export default function UserInfoComponent({ currentUser }: Props) {
  const [isModalEditUserOpen, setIsModalEditUserOpen] = useState(false);
  const [isLogoutOpen, setIsLogoutOpen] = useState(false);

  return (
    <div className={css.userInfo}>
      <div className={css.box}>
        <div>
          <p>User</p>
          <svg width={18} height={18}>
            <use href="/symbol-defs.svg#user" />
          </svg>
        </div>
        <button className={css.editBtn} onClick={() => setIsModalEditUserOpen(true)}>
          <svg width={18} height={18}>
            <use href="/symbol-defs.svg#pencil" />
          </svg>
        </button>
      </div>
      {currentUser?.avatar ? (
        <Image
          src={currentUser.avatar}
          className={css.avatar}
          alt="User avatar"
          width={94}
          height={94}
        />
      ) : (
        <button className={css.editUserBtn} onClick={() => setIsModalEditUserOpen(true)}>
          <div className={css.iconBox}>
            <svg width={40} height={40} className={css.userIcon}>
              <use href="/symbol-defs.svg#user" />
            </svg>
          </div>
          <p>Upload photo</p>
        </button>
      )}
      <h3 className={css.subtitle}>My information</h3>
      <div className={css.userInfoWrapper}>
        <div>{currentUser?.name}</div>
        <div>{currentUser?.email}</div>
        <div>{currentUser?.phone ? currentUser.phone : '+380'}</div>
      </div>
      <div className={css.myPetsBox}>
        <h4>My pets</h4>
        <Link href="/add-pet" className={css.link}>
          Add pet
          <svg width={18} height={18}>
            <use href="/symbol-defs.svg#plus" />
          </svg>
        </Link>
      </div>
      {currentUser?.pets && currentUser.pets.length > 0 && (
        <ul className={css.list}>
          {currentUser.pets.map((item) => (
            <li key={item._id}>
              <MyPetsItemComponent pet={item} />
            </li>
          ))}
        </ul>
      )}
      <button className={css.logoutBtn} onClick={() => setIsLogoutOpen(true)}>
        LOG OUT
      </button>
      {isLogoutOpen && (
        <Modal onClose={() => setIsLogoutOpen(false)}>
          <LogoutConfirmComponent onClose={() => setIsLogoutOpen(false)} />
        </Modal>
      )}
      {isModalEditUserOpen && (
        <Modal onClose={() => setIsModalEditUserOpen(false)}>
          <EditUserProfileModalComponent onClose={() => setIsModalEditUserOpen(false)} />
        </Modal>
      )}
    </div>
  );
}
