import React from 'react';

type ContextProps = {
  access_token?: string
};

export const CommonContext = React.createContext<Partial<ContextProps>>({});

export const CommonProvider = ({ children, token }: any) => {


  return (
    <CommonContext.Provider
      value={{
        access_token: token
      }}>
      {children}
    </CommonContext.Provider>
  );
};
