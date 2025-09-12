import { BetterSqlite3Adapter } from '@lucia-auth/adapter-sqlite';
import db from '../services/repositories/db';
import { Lucia } from 'lucia';
import { cookies } from 'next/headers';

const adapter = new BetterSqlite3Adapter(db, {
  user: 'users',
  session: 'sessions',
});

const lucia = new Lucia(adapter, {
  sessionCookie: {
    expires: false,
    attributes: {
      secure: process.env.NODE_ENV === 'production',
    },
  },
});

export async function createAuthSession(userId) {
  const session = await lucia.createSession(userId, {});
  const sessionCookie = lucia.createSessionCookie(session.id);
  cookies().set({
    name: sessionCookie.name,
    value: sessionCookie.value,
    ...sessionCookie.attributes,
  });
}

export async function verifyAuth() {
  const sessionCookie = cookies().get(lucia.sessionCookieName);

  if (!sessionCookie || !sessionCookie.value) {
    return {
      user: null,
      session: null,
    };
  }

  const sessionId = sessionCookie.value;

  const result = await lucia.validateSession(sessionId);

  try {
    if (result.session && result.session.fresh) {
      const newSessionCookie = lucia.createSessionCookie(result.session.id);
      cookies().set({
        name: newSessionCookie.name,
        value: newSessionCookie.value,
        ...newSessionCookie.attributes,
      });
    }
    if (!result.session) {
      const blankSessionCookie = lucia.createBlankSessionCookie();
      cookies().set({
        name: blankSessionCookie.name,
        value: blankSessionCookie.value,
        ...blankSessionCookie.attributes,
      });
    }
  } catch (err) {
    // Optionally log error
  }

  return result;
}


export async function destroySession() {
  const { session } = await verifyAuth();

  if(!session){
    return{
      error: 'Unauthorized!'
    }
  }

  await lucia.invalidateSession(session.id);
  const blankSessionCookie = lucia.createBlankSessionCookie();
  cookies().set({
    name: blankSessionCookie.name,
    value: blankSessionCookie.value,
    ...blankSessionCookie.attributes,
  });
}