'use client';

import css from './EditUserProfileModalComponent.module.css';
import * as Yup from 'yup';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useAuthStore } from '@/lib/store/AuthStore';
import Image from 'next/image';
import toast, { Toaster } from 'react-hot-toast';
import { editUser } from '@/lib/api/serverApi';

export const editUserSchema = Yup.object({
  name: Yup.string(),

  email: Yup.string().matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, {
    message: 'Invalid email format',
    excludeEmptyString: true,
  }),

  avatar: Yup.string().matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/, {
    message: 'Avatar must be valid image URL',
    excludeEmptyString: true,
  }),

  phone: Yup.string().matches(/^\+38\d{10}$/, {
    message: 'Phone must be in format +380XXXXXXXXX',
    excludeEmptyString: true,
  }),
});

type FormValues = Yup.InferType<typeof editUserSchema>;

type Props = {
  onClose: () => void;
};

export default function EditUserProfileModalComponent({ onClose }: Props) {
  const user = useAuthStore((state) => state.user);
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting, isDirty },
    watch,
  } = useForm({
    resolver: yupResolver(editUserSchema),
    defaultValues: {
      name: user?.name || '',
      email: user?.email || '',
      avatar: user?.avatar || '',
      phone: user?.phone || '',
    },
  });

  const avatarValue = watch('avatar');

  const onSubmit = async (data: FormValues) => {
    if (!user) return;

    const payload = {
      name: data.name || user.name,
      email: data.email || user.email,
      avatar: data.avatar || user.avatar,
      phone: data.phone || user.phone,
    };

    try {
      const res = await editUser(payload);
      setUser(res);
      toast('Profile updated successfully');
      setTimeout(() => {
        onClose();
      }, 1500);
    } catch (error: any) {
      toast.error(error?.response?.data?.message || 'Failed to update profile');
    }
  };

  return (
    <div className={css.box}>
      <Toaster />
      <button className={css.closeBtn} onClick={onClose}>
        <svg width={24} height={24} className={css.closeIcon}>
          <use href="/symbol-defs.svg#x" />
        </svg>
      </button>
      <h3 className={css.title}>Edit information</h3>
      <form onSubmit={handleSubmit(onSubmit)} className={css.editForm}>
        {/* Avatar preview */}
        {avatarValue && (
          <Image
            src={avatarValue}
            alt="Avatar preview"
            width={80}
            height={80}
            className={css.avatar}
          />
        )}

        <input {...register('avatar')} />
        {errors.avatar && <p>{errors.avatar.message}</p>}

        <input {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}

        <input {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}

        <input {...register('phone')} />
        {errors.phone && <p>{errors.phone.message}</p>}

        <button className={css.submitBtn} type="submit" disabled={!isDirty || isSubmitting}>
          Save
        </button>
      </form>
    </div>
  );
}
