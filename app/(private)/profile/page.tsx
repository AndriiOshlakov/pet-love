'use client';

import { useAuthStore } from '@/lib/store/AuthStore';
import css from './Profile.module.css';
import { useEffect } from 'react';
import { getFullUser } from '@/lib/api/serverApi';
import Container from '@/components/Container/Container';
import UserInfoComponent from '@/components/UserInfoComponent/UserInfoComponent';
import MyFavoritePetsComponent from '@/components/MyFavoritePetsComponent/MyFavoritePetsComponent';

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
    <Container>
      <section className={css.profile}>
        <UserInfoComponent currentUser={user} />
        <MyFavoritePetsComponent currentUser={user} />
      </section>
    </Container>
  );
}
