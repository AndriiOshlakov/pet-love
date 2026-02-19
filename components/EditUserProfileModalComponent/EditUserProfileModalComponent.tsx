'use client';

import css from './EditUserProfileModalComponent.module.css';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthStore } from '@/lib/store/AuthStore';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { editUser } from '@/lib/api/serverApi';
import { useState, useRef } from 'react';

export const editUserSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().matches(
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    'Invalid email format',
  ),
  avatar: Yup.mixed(),
  phone: Yup.string().matches(/^\+38\d{10}$/, 'Format: +380XXXXXXXXX'),
});

type FormValues = {
  name: string;
  email: string;
  avatar: any;
  phone: string;
};

type Props = {
  onClose: () => void;
};

export default function EditUserProfileModalComponent({ onClose }: Props) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const [preview, setPreview] = useState(user?.avatar || '');
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors, isSubmitting, isDirty },
  } = useForm<FormValues>({
    resolver: yupResolver(editUserSchema) as any,
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      avatar: user?.avatar || '',
      phone: user?.phone || '',
    },
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

      setValue('avatar', uploadedUrl, { shouldDirty: true });

      toast.dismiss();
      toast.success('Фото завантажено!');
    } catch (error) {
      toast.dismiss();
      toast.error('Помилка завантаження');
    }
  };

  const onSubmit = async (data: FormValues) => {
    if (!user) return;

    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar,
    };

    try {
      const res = await editUser(payload);
      setUser(res);
      toast.success('Profile updated successfully');
      setTimeout(onClose, 1500);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className={css.box}>
      <Toaster />
      <button className={css.closeBtn} onClick={onClose}>
        <svg>
          <use href="/symbol-defs.svg#x" />
        </svg>
      </button>
      <h3 className={css.title}>Edit information</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={css.editForm}>
        <Image
          src={preview || '/symbol-defs.svg#user'}
          alt="Avatar"
          width={80}
          height={80}
          className={css.avatar}
        />

        <div className={css.uploadBox}>
          <input
            type="file"
            accept="image/*"
            className={css.hiddenInput}
            ref={fileInputRef}
            onChange={handleFileChange}
          />
          <input {...register('avatar')} readOnly className={css.urlInput} placeholder={preview} />
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

        <input {...register('name')} placeholder="Name" className={css.input} />
        {errors.name && <p className={css.error}>{errors.name.message}</p>}

        <input {...register('email')} placeholder="Email" className={css.input} />
        {errors.email && <p className={css.error}>{errors.email.message}</p>}

        <input {...register('phone')} placeholder="Phone" className={css.input} />
        {errors.phone && <p className={css.error}>{errors.phone.message}</p>}

        <button className={css.submitBtn} type="submit" disabled={isSubmitting}>
          Save
        </button>
      </form>
    </div>
  );
}
