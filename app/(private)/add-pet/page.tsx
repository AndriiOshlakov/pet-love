import Container from '@/components/Container/Container';
import css from './AddPet.module.css';
import AddPetImageComponent from '@/components/AddPetImageComponent/AddPetImageComponent';
import AddPetForm from '@/components/AddPetForm/AddPetForm';

export default function AddPetPage() {
  return (
    <Container>
      <section className={css.box}>
        <AddPetImageComponent />
        <AddPetForm />
      </section>
    </Container>
  );
}
