'use client';

import { useState } from 'react';
import css from './SearcNewsComponent.module.css';
import * as Yup from 'yup';
import { ErrorMessage, Field, Form, Formik } from 'formik';

export const searchSchema = Yup.object({
  keyword: Yup.string().trim().min(2, 'Мінімум 2 символи').max(50, 'Максимум 50 символів'),
});

interface Props {
  onSearch: (value: string) => void;
  onPage: (page: number) => void;
}

export default function SearchNewsForm({ onSearch, onPage }: Props) {
  return (
    <div>
      <Formik
        initialValues={{ keyword: '' }}
        validationSchema={searchSchema}
        onSubmit={(values) => {
          onSearch(values.keyword.trim());
          onPage(1);
        }}
      >
        {({ values, setFieldValue }) => (
          <Form className={css.form}>
            <Field name="keyword" type="text" className={css.input} placeholder="Search" />
            <ErrorMessage component="p" name="keyword" />
            <button type="submit" className={css.submitBtn}>
              <svg width={18} height={18}>
                <use href="/symbol-defs.svg#search" />
              </svg>
            </button>
            {values.keyword && (
              <button
                onClick={() => {
                  setFieldValue('keyword', '');
                  onSearch('');
                }}
                className={css.clearBtn}
              >
                <svg width={18} height={18}>
                  <use href="/symbol-defs.svg#x" />
                </svg>
              </button>
            )}
          </Form>
        )}
      </Formik>
    </div>
  );
}
