import css from './Button.module.css';

interface Props {
  text: string;
  onClick?: () => void;
}

export default function Button({ text, onClick }: Props) {
  return (
    <button onClick={onClick} className={css.btn}>
      {text}
    </button>
  );
}
