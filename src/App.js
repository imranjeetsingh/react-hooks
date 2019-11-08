import React ,{useContext} from 'react';

import Ingredients from './components/Ingredients/Ingredients';
import Auth from '../src/components/Auth';
import {AuthContext} from './context/AuthContext';

const App = props => {
  const authConext = useContext(AuthContext);
  console.log(authConext)
  let content = <Auth />
  if(authConext.isAuth){
    content = <Ingredients />
  }
  return content;
};

export default App;
