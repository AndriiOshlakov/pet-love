import Image from 'next/image';
import css from './AddPetImageComponent.module.css';

export default function AddPetImageComponent() {
  return (
    <div className={css.container}>
      <picture>
        <source
          media="(min-width: 1280px)"
          srcSet="/addPet/addPetDesc.png"
          width={592}
          height={654}
        />
        <source
          media="(min-width: 768px)"
          srcSet="/addPet/addPetTab.png"
          width={704}
          height={248}
        />

        <Image
          src="/addPet/addPetMob.png"
          alt={'Animal picture'}
          priority
          className={css.img}
          width={335}
          height={213}
        />
      </picture>
    </div>
  );
}
