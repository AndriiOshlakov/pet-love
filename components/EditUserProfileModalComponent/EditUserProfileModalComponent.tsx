// 'use client';

// import css from './EditUserProfileModalComponent.module.css';
// import * as Yup from 'yup';
// import { useForm } from 'react-hook-form';
// import { yupResolver } from '@hookform/resolvers/yup';
// import { useAuthStore } from '@/lib/store/AuthStore';
// import Image from 'next/image';
// import toast, { Toaster } from 'react-hot-toast';
// import { editUser } from '@/lib/api/serverApi';

// export const editUserSchema = Yup.object({
//   name: Yup.string(),

//   email: Yup.string().matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, {
//     message: 'Invalid email format',
//     excludeEmptyString: true,
//   }),

//   avatar: Yup.string().matches(/^https?:\/\/.*\.(?:png|jpg|jpeg|gif|bmp|webp)$/, {
//     message: 'Avatar must be valid image URL',
//     excludeEmptyString: true,
//   }),

//   phone: Yup.string().matches(/^\+38\d{10}$/, {
//     message: 'Phone must be in format +380XXXXXXXXX',
//     excludeEmptyString: true,
//   }),
// });

// type FormValues = Yup.InferType<typeof editUserSchema>;

// type Props = {
//   onClose: () => void;
// };

// export default function EditUserProfileModalComponent({ onClose }: Props) {
//   const user = useAuthStore((state) => state.user);
//   const setUser = useAuthStore((state) => state.setUser);

//   const {
//     register,
//     handleSubmit,
//     formState: { errors, isSubmitting, isDirty },
//     watch,
//   } = useForm({
//     resolver: yupResolver(editUserSchema),
//     defaultValues: {
//       name: user?.name || '',
//       email: user?.email || '',
//       avatar: user?.avatar || '',
//       phone: user?.phone || '',
//     },
//   });

//   const avatarValue = watch('avatar');

//   const onSubmit = async (data: FormValues) => {
//     if (!user) return;

//     const payload = {
//       name: data.name || user.name,
//       email: data.email || user.email,
//       avatar: data.avatar || user.avatar,
//       phone: data.phone || user.phone,
//     };

//     try {
//       const res = await editUser(payload);
//       setUser(res);
//       toast('Profile updated successfully');
//       setTimeout(() => {
//         onClose();
//       }, 1500);
//     } catch (error: any) {
//       toast.error(error?.response?.data?.message || 'Failed to update profile');
//     }
//   };

//   return (
//     <div className={css.box}>
//       <Toaster />
//       <button className={css.closeBtn} onClick={onClose}>
//         <svg width={24} height={24} className={css.closeIcon}>
//           <use href="/symbol-defs.svg#x" />
//         </svg>
//       </button>
//       <h3 className={css.title}>Edit information</h3>
//       <form onSubmit={handleSubmit(onSubmit)} className={css.editForm}>
//         {/* Avatar preview */}
//         {avatarValue && (
//           <Image
//             src={avatarValue}
//             alt="Avatar preview"
//             width={80}
//             height={80}
//             className={css.avatar}
//           />
//         )}

//         <input {...register('avatar')} />
//         {errors.avatar && <p>{errors.avatar.message}</p>}

//         <input {...register('name')} />
//         {errors.name && <p>{errors.name.message}</p>}

//         <input {...register('email')} />
//         {errors.email && <p>{errors.email.message}</p>}

//         <input {...register('phone')} />
//         {errors.phone && <p>{errors.phone.message}</p>}

//         <button className={css.submitBtn} type="submit" disabled={!isDirty || isSubmitting}>
//           Save
//         </button>
//       </form>
//     </div>
//   );
// }

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

// 1. Оновлюємо схему: прибираємо суворий URL-матчинг для аватара,
// оскільки ми будемо передавати або файл, або вже існуючий URL
export const editUserSchema = Yup.object({
  name: Yup.string().required('Name is required'),
  email: Yup.string().matches(
    /^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/,
    'Invalid email format',
  ),
  avatar: Yup.mixed(), // Змінюємо на mixed для підтримки файлу
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

  // Локальний стан для прев'ю обраного фото
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

    // Створюємо звичайний об'єкт, який відповідає інтерфейсу EditUserProps
    const payload = {
      name: data.name,
      email: data.email,
      phone: data.phone,
      avatar: data.avatar, // Тут буде або старий URL, або новий Base64 рядок
    };

    try {
      // Тепер типи співпадають: об'єкт передається в об'єкт
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
          <input
            {...register('avatar')}
            readOnly // Щоб користувач не міг випадково зламати посилання руками
            className={css.urlInput}
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
