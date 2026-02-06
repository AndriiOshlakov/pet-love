import { Friend } from '@/types/Friend';
import css from './FriendsList.module.css';
import FriendsItem from '../FriendsItem/FriendsItem';

interface Props {
  list: Friend[];
}

export default function FriendsList({ list }: Props) {
  return (
    <ul className={css.list}>
      {list.map((friend) => (
        <li key={friend._id}>
          <FriendsItem friend={friend} />
        </li>
      ))}
    </ul>
  );
}
