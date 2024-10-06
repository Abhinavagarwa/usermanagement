// src/components/UserForm.tsx
import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { User } from '../types';

interface UserFormProps {
  user?: User | null;
  onSubmit: (formData: User) => void;
}

const schema = yup.object().shape({
  name: yup.string().required('Name is required').min(3, 'Name must be at least 3 characters'),
  email: yup.string().email('Invalid email').required('Email is required'),
  phone: yup.string().required('Phone is required'),
  address: yup.object().shape({
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
  }),
  company: yup
    .object({
      name: yup.string().nullable().notRequired().min(3, 'Company name must be at least 3 characters'),
    })
    .nullable()
    .notRequired(), 
  website: yup.string().nullable().url('Website must be a valid URL'),
});

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    resolver: yupResolver(schema),
    defaultValues: user ? { ...user, username: `USER-${user.username}`,  company: user.company ?? { name: null },} : {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <input {...register('name')} placeholder="Name" />
      {errors.name && <p>{errors.name.message}</p>}

      <input {...register('email')} placeholder="Email" />
      {errors.email && <p>{errors.email.message}</p>}

      <input {...register('phone')} placeholder="Phone" />
      {errors.phone && <p>{errors.phone.message}</p>}

      <input {...register('address.street')} placeholder="Street" />
      {errors.address?.street && <p>{errors.address.street.message}</p>}

      <input {...register('address.city')} placeholder="City" />
      {errors.address?.city && <p>{errors.address.city.message}</p>}

      <input {...register('company.name')} placeholder="Company (Optional)" />
      {errors.company?.name && <p>{errors.company.name.message}</p>}

      <input {...register('website')} placeholder="Website (Optional)" />
      {errors.website && <p>{errors.website.message}</p>}

      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;


