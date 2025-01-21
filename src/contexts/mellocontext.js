import React from 'react';

const MelloContext = React.createContext({
     loggedIn: false,
     setLoginStatus: () => { },
     clearError: () => { }
});

export default MelloContext;