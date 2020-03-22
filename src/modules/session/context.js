import React, { createContext, useState, useEffect } from 'react';

import auth from './resources';
import { STATUS } from './constants';

const SessionContext = createContext({});

const SessionProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [status, setStatus] = useState(STATUS.init);

  const state = { user, status };
  const actions = { signOut: auth.signOut, signIn: auth.signIn };

  useEffect(
    () =>
      auth.onChange((user) => {
        setUser(user);
        setStatus(STATUS.restored);
      }),
    [],
  );

  return <SessionContext.Provider value={{ state, actions }}>{children}</SessionContext.Provider>;
};

export { SessionProvider as Provider, SessionContext as default };
