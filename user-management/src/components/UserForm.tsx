import React from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import * as yup from 'yup';
import { User } from '../types';

const schema = yup.object().shape({
    name: yup.string().required('Name is required').min(3, 'Minimum 3 characters'),
  email: yup.string().required('Email is required').email('Invalid email format'),
  phone: yup.string().required('Phone number is required'),
  username: yup.string().required('Username is required').min(3, 'Minimum 3 characters'),
  address: yup.object({
    street: yup.string().required('Street is required'),
    city: yup.string().required('City is required'),
  }).required(),
  company: yup.object({
    name: yup.string().nullable(),
  }).nullable(),
  website: yup.string().nullable(),
});

interface UserFormProps {
  user?: User;
  onSubmit: (data: User) => void;
}

const UserForm: React.FC<UserFormProps> = ({ user, onSubmit }) => {
  const { register, handleSubmit, formState: { errors } } = useForm<User>({
    resolver:yupResolver(schema),
    defaultValues: user
       ? {
      ...user,
      username: `USER-${user.username}`,
      company: user.company ? { name: user.company.name || '' } : { name: '' },
    }
  : {},
  });

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <div>
        <label>Name:</label>
        <input type="text" {...register('name')} />
        {errors.name && <p>{errors.name.message}</p>}
      </div>
      <div>
        <label>Email:</label>
        <input type="email" {...register('email')} />
        {errors.email && <p>{errors.email.message}</p>}
      </div>
      <div>
        <label>Phone:</label>
        <input type="text" {...register('phone')} />
        {errors.phone && <p>{errors.phone.message}</p>}
      </div>
      <div>
        <label>Username:</label>
        <input type="text" {...register('username')} readOnly />
        {errors.username && <p>{errors.username.message}</p>}
      </div>
      <div>
        <label>Street:</label>
        <input type="text" {...register('address.street')} />
        {errors.address?.street && <p>{errors.address.street.message}</p>}
      </div>
      <div>
        <label>City:</label>
        <input type="text" {...register('address.city')} />
        {errors.address?.city && <p>{errors.address.city.message}</p>}
      </div>
      <div>
        <label>Company Name:</label>
        <input type="text" {...register('company')} />
        {errors.company && <p>{errors.company.message}</p>}
      </div>
      <div>
        <label>Website:</label>
        <input type="url" {...register('website')} />
        {errors.website && <p>{errors.website.message}</p>}
      </div>
      <button type="submit">Submit</button>
    </form>
  );
};

export default UserForm;
