import Container from '@/components/Container/Container';
import css from './Register.module.css';
import Title from '@/components/Title/Title';
import RegisterForm from '@/components/RegisterForm/RegisterForm';
import FormImage from '@/components/FormImage/FormImage';

export default function Register() {
  return (
    <Container>
      <div className={css.box}>
        <FormImage
          mobileSrc="/cat.jpg"
          tabletSrc="/catTab.jpg"
          desktopSrc="/catDesc.jpg"
          src="/imgRegisterDesc.png"
        />
        <div className={css.wrapper}>
          <Title title="Registration" />
          <p className={css.text}>Thank you for your interest in our platform.</p>
          <RegisterForm />
        </div>
      </div>
    </Container>
  );
}
