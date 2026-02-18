'use client';

import css from './AddPetForm.module.css';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { addMyPet, AddPetProps } from '@/lib/api/serverApi';
import { useState } from 'react';
import { useRouter } from 'next/navigation';

export const addPetSchema = Yup.object({
  title: Yup.string().required('Title is required'),

  name: Yup.string().required('Name is required'),

  imgURL: Yup.string()
    .matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/, {
      message: 'Image must be valid URL',
    })
    .required(),

  species: Yup.string()
    .oneOf([
      'dog',
      'cat',
      'monkey',
      'bird',
      'snake',
      'turtle',
      'lizard',
      'frog',
      'fish',
      'ants',
      'bees',
      'butterfly',
      'spider',
      'scorpion',
    ])
    .required('Species is required'),

  birthday: Yup.string()
    .matches(/^\d{4}-\d{2}-\d{2}$/, {
      message: 'Invalid date format. It should be xxxx-xx-xx',
    })
    .required('Birthday is required'),

  sex: Yup.string().oneOf(['male', 'female', 'unknown']).required('Sex is required'),
});

type FormValues = Yup.InferType<typeof addPetSchema>;

export default function AddPetForm() {
  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    watch,
  } = useForm({
    resolver: yupResolver(addPetSchema),
  });

  const avatarValue = watch('imgURL');

  const onSubmit = async (data: AddPetProps) => {
    try {
      const res = await addMyPet(data);
      router.push('/profile');
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className={css.box}>
      <Toaster />

      <h3 className={css.title}>
        Add my pet / <span>Personal details</span>
      </h3>
      <form onSubmit={handleSubmit(onSubmit)} className={css.editForm}>
        <div className={css.sexBox}>
          <label className={css.radioLabel}>
            <input type="radio" className={css.sexInput} {...register('sex')} value="female" />
            <div className={`${css.sexIconBoxFemale} ${css.sexIconBox}`}>
              <svg width={20} height={20}>
                <use href="/symbol-defs.svg#female" />
              </svg>
            </div>
          </label>
          <label className={css.radioLabel}>
            <input type="radio" className={css.sexInput} {...register('sex')} value="male" />
            <div className={`${css.sexIconBoxMale} ${css.sexIconBox}`}>
              <svg width={20} height={20}>
                <use href="/symbol-defs.svg#male" />
              </svg>
            </div>
          </label>
          <label className={css.radioLabel}>
            <input type="radio" className={css.sexInput} {...register('sex')} value="unknown" />
            <div className={`${css.sexIconBoxUnknown} ${css.sexIconBox}`}>
              <svg width={20} height={20}>
                <use href="/symbol-defs.svg#unknown" />
              </svg>
            </div>
          </label>
          {errors.sex && <p style={{ color: 'red' }}>{errors.sex.message}</p>}
        </div>
        {/* Avatar preview */}
        {!avatarValue && (
          <div className={css.iconBox}>
            <svg width={34} height={34} className={css.icon}>
              <use href="/symbol-defs.svg#cat-footprint" />
            </svg>
          </div>
        )}
        {avatarValue && (
          <Image
            src={avatarValue}
            alt="Avatar preview"
            width={68}
            height={68}
            className={css.avatar}
          />
        )}
        <div className={css.inputsWrapper}>
          <input {...register('imgURL')} placeholder="Enter URL" className={css.input} />
          {errors.imgURL && <p style={{ color: 'red' }}>{errors.imgURL.message}</p>}

          <input {...register('title')} placeholder="Title" className={css.input} />
          {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}

          <input {...register('name')} placeholder="Pet’s Name" className={css.input} />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}

          <label className={css.birthdayLabel}>
            <input
              {...register('birthday')}
              placeholder="00.00.0000"
              className={`${css.input} ${css.birthday}`}
            />
            {errors.birthday && <p style={{ color: 'red' }}>{errors.birthday.message}</p>}
            <svg width={18} height={18} className={css.chevron}>
              <use href="/symbol-defs.svg#calendar" />
            </svg>
          </label>

          <label className={css.selectLabel}>
            <select
              {...register('species')}
              className={`${css.input} ${css.select}`}
              onClick={() => setIsSelectOpen(!isSelectOpen)}
            >
              <option value="" style={{ color: '#26262680' }}>
                Type of pet
              </option>
              <option value="dog">Dog</option>
              <option value="cat">Cat</option>
              <option value="monkey">Monkey</option>
              <option value="bird">Bird</option>
              <option value="snake">Snake</option>
              <option value="turtle">Turtle</option>
              <option value="lizard">Lizard</option>
              <option value="frog">Frog</option>
              <option value="fish">Fish</option>
              <option value="ants">Ants</option>
              <option value="bees">Bees</option>
              <option value="butterfly">Butterfly</option>
              <option value="spider">Spider</option>
              <option value="scorpion">Scorpion</option>
            </select>
            {isSelectOpen && (
              <svg width={18} height={18} className={css.chevron}>
                <use href="/symbol-defs.svg#chevron-up" />
              </svg>
            )}
            {!isSelectOpen && (
              <svg width={18} height={18} className={css.chevron}>
                <use href="/symbol-defs.svg#chevron-down" />
              </svg>
            )}
            {errors.species && <p style={{ color: 'red' }}>{errors.species.message}</p>}
          </label>
        </div>
        <div className={css.btnsBox}>
          <button className={css.btn} onClick={() => router.push('/profile')}>
            Back
          </button>

          <button className={css.btn} type="submit" disabled={isSubmitting}>
            Submit
          </button>
        </div>
      </form>
    </div>
  );
}
