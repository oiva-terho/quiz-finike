import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { Home } from './routes/home/home.component';
import { Navigation } from './routes/navigation/navigation.component';
import { SignInForm } from './routes/sign-in/sign-in.component';
import { SignUpForm } from './routes/sign-up/sign-up.component';
import { checkUserSession } from './store/user/user.action';

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='games' element={<div>Games component</div>} />
        <Route path='photos' element={<div>Photos component</div>} />
        <Route path='sign-in' element={<SignInForm />} />
        <Route path='sign-up' element={<SignUpForm />} />
      </Route>
    </Routes>
  );
}

export default App;
