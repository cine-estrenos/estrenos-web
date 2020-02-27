import React from 'react';

import auth from './resources';

const SessionContext = React.createContext({});

const SessionProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [status, setStatus] = React.useState('init');

  const state = { user, status };
  const actions = { signOut: auth.signOut, signIn: auth.signIn };

  React.useEffect(
    () =>
      auth.onChange((user) => {
        setUser(user);

        setStatus('restored');
      }),
    [],
  );

  return <SessionContext.Provider value={{ state, actions }}>{children}</SessionContext.Provider>;
};

export { SessionProvider as Provider, SessionContext as default };
