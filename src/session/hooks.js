import React from 'react';

import SessionContext from './context';

export function useSession() {
  const {
    actions: { signIn, signOut },
    state: { status },
  } = React.useContext(SessionContext);

  return { signIn, signOut, status };
}

export function useUser() {
  const {
    state: { user },
  } = React.useContext(SessionContext);

  return user;
}
