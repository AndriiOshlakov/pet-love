'use client';

import { useAuthStore } from '@/lib/store/AuthStore';
import css from './Profile.module.css';
import { useEffect } from 'react';
import { getFullUser } from '@/lib/api/serverApi';

export default function Profile() {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  useEffect(() => {
    const fetchCurrentUser = async () => {
      try {
        const currentUser = await getFullUser();
        setUser(currentUser);
      } catch (error) {
        console.error('Failed to fetch user:', error);
      }
    };

    fetchCurrentUser();
  }, [setUser]);

  return (
    <section className={css.wrapper}>
      <h1>Profile page</h1>
      {user ? (
        <div>
          <p>Name: {user.name}</p>
          <p>Email: {user.email}</p>
          <p>Favorites: {user.noticesFavorites?.length ?? 0}</p>
        </div>
      ) : (
        <p>Loading user...</p>
      )}
    </section>
  );
}
