import React from 'react';

import auth from './resources';
import { STATUS } from './constants';

const SessionContext = React.createContext({});

const SessionProvider = ({ children }) => {
  const [user, setUser] = React.useState(null);
  const [status, setStatus] = React.useState(STATUS.init);

  const state = { user, status };
  const actions = { signOut: auth.signOut, signIn: auth.signIn };

  React.useEffect(
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
