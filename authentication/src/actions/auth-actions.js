'use server';

import { redirect } from 'next/navigation';
import { createUser } from '../services/repositories/user';
import { hashUserPassword, verifyPassword } from './hash';
import { createAuthSession } from './auth';
import { destroySession } from './auth';
import getUserByEmail from '../services/repositories/user';

export async function signup(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');

  let errors = {};

  if (!email.includes('@')) {
    errors.email = 'Email must be valid.';
  }

  if (password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const hashedPassword = hashUserPassword(password);
  try {
    const id = createUser(email, hashedPassword);
    await createAuthSession(id);
    redirect('/training');
  } catch (error) {
    if (error.code === 'SQLITE_CONSTRAINT_UNIQUE') {
      return {
        errors: {
          email: 'It seems like account is already exists with this email.',
        },
      };
    }

    throw error;
  }
}

export default async function login(prevState, formData) {
  const email = formData.get('email');
  const password = formData.get('password');
  let errors = {};

  if (!email.includes('@')) {
    errors.email = 'Email must be valid.';
  }

  if (password.trim().length < 8) {
    errors.password = 'Password must be at least 8 characters long.';
  }

  if (Object.keys(errors).length > 0) {
    return { errors };
  }

  const user = getUserByEmail(email);
  if (!user) {
    return {
      errors: {
        email: 'No user found with this email.',
      },
    };
  }

  const isValidPassword = verifyPassword(user.password, password);

  if (!isValidPassword) {
    return {
      errors: {
        password:
          'Could not log you in. Please check your credentials and try again.',
      },
    };
  }

  await createAuthSession(user.id);
  redirect('/training');
}

export async function auth(mode, prevState, formData) {
  if (mode === 'login') {
    return login(prevState, formData);
  }
  return signup(prevState, formData);
}


export async function logout() {
  await destroySession();
  redirect('/');
}
