'use client';

import css from './AddPetForm.module.css';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { addMyPet, AddPetProps } from '@/lib/api/serverApi';
import { useRef, useState } from 'react';
import { useRouter } from 'next/navigation';

export const addPetSchema = Yup.object({
  title: Yup.string().required('Title is required'),

  name: Yup.string().required('Name is required'),

  imgURL: Yup.string().required('Image is required'),

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
  const [preview, setPreview] = useState('');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const [isSelectOpen, setIsSelectOpen] = useState(false);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty },
    // watch,
  } = useForm({
    resolver: yupResolver(addPetSchema),
  });

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    const localPreview = URL.createObjectURL(file);
    setPreview(localPreview);

    const formData = new FormData();
    formData.append('file', file);
    formData.append('upload_preset', 'my_preset');

    try {
      toast.loading('Завантаження фото...');

      const response = await fetch('https://api.cloudinary.com/v1_1/dntlokfoh/image/upload', {
        method: 'POST',
        body: formData,
      });

      const result = await response.json();
      const uploadedUrl = result.secure_url;

      setValue('imgURL', uploadedUrl, { shouldDirty: true });

      toast.dismiss();
      toast.success('Фото завантажено!');
    } catch (error) {
      toast.dismiss();
      toast.error('Помилка завантаження');
    }
  };

  // const avatarValue = watch('imgURL');

  const onSubmit = async (data: FormValues) => {
    const payload = {
      title: data.title,
      name: data.name,
      sex: data.sex,
      species: data.species,
      birthday: data.birthday,
      imgURL: data.imgURL,
    };
    try {
      const res = await addMyPet(payload);
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
        {!preview && (
          <div className={css.iconBox}>
            <svg width={34} height={34} className={css.icon}>
              <use href="/symbol-defs.svg#cat-footprint" />
            </svg>
          </div>
        )}
        {preview && (
          <Image src={preview} alt="Avatar preview" width={68} height={68} className={css.avatar} />
        )}
        <div className={css.uploadBox}>
          <input
            type="file"
            accept="image/*"
            className={css.hiddenInput}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <input
            {...register('imgURL')}
            readOnly // Щоб користувач не міг випадково зламати посилання руками
            className={`${css.urlInput} ${css.input}`}
            placeholder={preview}
          />
          {/* Кастомна кнопка */}
          <button
            type="button"
            className={css.uploadBtn}
            onClick={() => fileInputRef.current?.click()}
          >
            Upload photo
            <svg width={18} height={18}>
              <use href="/symbol-defs.svg#upload-cloud" />
            </svg>
          </button>
        </div>
        <div className={css.inputsWrapper}>
          {/* <input {...register('imgURL')} placeholder="Enter URL" className={css.input} />
          {errors.imgURL && <p style={{ color: 'red' }}>{errors.imgURL.message}</p>} */}

          <input {...register('title')} placeholder="Title" className={css.input} />
          {errors.title && <p style={{ color: 'red' }}>{errors.title.message}</p>}

          <input {...register('name')} placeholder="Pet’s Name" className={css.input} />
          {errors.name && <p style={{ color: 'red' }}>{errors.name.message}</p>}

          <label className={css.birthdayLabel}>
            <input
              {...register('birthday')}
              placeholder="xxxx-xx-xx"
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
