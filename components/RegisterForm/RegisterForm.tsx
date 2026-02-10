'use client';

import css from './RegisterForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { register as registerUser } from '@/lib/api/serverApi';
import { useAuthStore } from '@/lib/store/AuthStore';

export const registrationSchema = yup.object({
  name: yup.string().required('Name is required'),

  email: yup
    .string()
    .required('Email is required')
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Invalid email format'),

  password: yup
    .string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters'),

  confirmPassword: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('password')], 'Passwords do not match'),
});

interface RegistrationFormData {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
}

export default function RegisterForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);

  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
  } = useForm<RegistrationFormData>({
    resolver: yupResolver(registrationSchema),
  });
  const onSubmit = async (data: RegistrationFormData) => {
    try {
      const user = await registerUser({
        name: data.name,
        email: data.email,
        password: data.password,
      });

      if (user) {
        setUser(user);
      }

      router.push('/profile');
    } catch (error: any) {
      toast(error?.data?.message || 'Registration failed');
      //   alert(error.response?.data?.message || 'Registration failed');
    }
  };

  return (
    <div>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)}>
        {/* NAME */}
        <input placeholder="Name" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}

        {/* EMAIL */}
        <input placeholder="Email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}

        {/* PASSWORD */}
        <input type="password" placeholder="Password" {...register('password')} />
        {errors.password && <p>{errors.password.message}</p>}

        {/* CONFIRM PASSWORD */}
        <input type="password" placeholder="Confirm password" {...register('confirmPassword')} />
        {errors.confirmPassword && <p>{errors.confirmPassword.message}</p>}

        <button type="submit" disabled={isSubmitting}>
          Registration
        </button>
      </form>
    </div>
  );
}
