import Container from '@/components/Container/Container';
import Title from '@/components/Title/Title';
import css from './Friends.module.css';
import FriendsList from '@/components/FriendsList/FriendsList';
import { fetchFriends } from '@/lib/api/serverApi';

export const dynamic = 'force-dynamic';

export default async function Friends() {
  const ourFriends = await fetchFriends();

  return (
    <Container>
      <section className={css.wrapper}>
        <Title title="Our friends" />
        <FriendsList list={ourFriends} />
      </section>
    </Container>
  );
}
