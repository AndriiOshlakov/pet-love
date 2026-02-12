'use client';

import css from './LoginForm.module.css';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { useRouter } from 'next/navigation';
import * as yup from 'yup';
import toast, { Toaster } from 'react-hot-toast';
import { login as loginUser } from '@/lib/api/serverApi';
import { useAuthStore } from '@/lib/store/AuthStore';
import Link from 'next/link';
import { useState } from 'react';

export const loginSchema = yup.object({
  email: yup
    .string()
    .required('Email is required')
    .matches(/^[\w-]+(\.[\w-]+)*@([\w-]+\.)+[a-zA-Z]{2,7}$/, 'Enter a valid Email'),

  password: yup
    .string()
    .required('Password is required')
    .min(7, 'Password must be at least 7 characters'),
});

interface LoginFormData {
  email: string;
  password: string;
}

export default function LoginForm() {
  const router = useRouter();
  const setUser = useAuthStore((state) => state.setUser);
  const [isPassword, setIsPassword] = useState(true);

  const togglePassword = () => setIsPassword(!isPassword);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<LoginFormData>({
    resolver: yupResolver(loginSchema),
  });
  const onSubmit = async (data: LoginFormData) => {
    try {
      const user = await loginUser({
        email: data.email,
        password: data.password,
      });

      if (user) {
        setUser(user);
      }

      router.push('/profile');
    } catch (error: any) {
      toast(error?.data?.message || 'Login failed');
    }
  };

  const passwordValue = watch('password');

  return (
    <div className={css.box}>
      <Toaster />
      <form onSubmit={handleSubmit(onSubmit)} className={css.form}>
        <label className={css.label}>
          <input
            placeholder="Email"
            {...register('email')}
            className={`${css.input} ${errors.email ? css.inputError : ''}`}
          />
          {errors.email && <p style={{ color: '#ef2447' }}>{errors.email.message}</p>}
        </label>
        <label className={css.label}>
          <input
            type={isPassword ? 'password' : 'text'}
            placeholder="Password"
            {...register('password')}
            className={`${css.input} ${errors.password ? css.inputError : ''}  ${!errors.password && passwordValue?.length >= 7 ? css.inputSuccess : ''}`}
          />
          {!isPassword && (
            <svg className={css.eye} width={18} height={18} onClick={togglePassword}>
              <use href="/symbol-defs.svg#eye-off" />
            </svg>
          )}
          {isPassword && (
            <svg className={css.eye} width={18} height={18} onClick={togglePassword}>
              <use href="/symbol-defs.svg#eye" />
            </svg>
          )}
          {errors.password && <p style={{ color: '#ef2447' }}>{errors.password.message}</p>}
          {!errors.password && passwordValue?.length >= 7 && (
            <p className={css.success}>Password is secure</p>
          )}
          {!errors.password && passwordValue?.length >= 7 && (
            <svg width={18} height={18} className={css.check}>
              <use href="/symbol-defs.svg#check" />
            </svg>
          )}
        </label>
        <button type="submit" disabled={isSubmitting} className={css.btn}>
          LOG IN
        </button>
        <p className={css.text}>
          Don’t have an account?
          <Link href={'/register'} className={css.link}>
            Register
          </Link>
        </p>
      </form>
    </div>
  );
}
