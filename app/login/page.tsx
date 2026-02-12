import Container from '@/components/Container/Container';
import css from './Login.module.css';
import FormImage from '@/components/FormImage/FormImage';
import Title from '@/components/Title/Title';
import LoginForm from '@/components/LoginForm/LoginForm';

export default function Login() {
  return (
    <Container>
      <div className={css.box}>
        <FormImage
          mobileSrc="/dog.jpg"
          tabletSrc="/dogTab.jpg"
          desktopSrc="/dogDesc.jpg"
          src="/imgLoginDesc.png"
        />
        <div className={css.wrapper}>
          <Title title="Log in" />
          <p className={css.text}>
            Welcome! Please enter your credentials to login to the platform:
          </p>
          <LoginForm />
        </div>
      </div>
    </Container>
  );
}
