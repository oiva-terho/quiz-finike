import { Suspense, lazy, useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { Route, Routes } from 'react-router-dom';

import { checkUserSession } from './store/user/user.action';
import { Spinner } from './components/spinner/spinner.component';

const Home = lazy(() => import('./routes/home/home.component'));
const Navigation = lazy(() => import('./routes/navigation/navigation.component'));
const Games = lazy(() => import('./routes/games/games.component'));
const AddGame = lazy(() => import('./routes/add-game/add-game.component'));
const Gallery = lazy(() => import('./routes/gallery/gallery.component'));
const SignInForm = lazy(() => import('./routes/sign-in/sign-in.component'));
const SignUpForm = lazy(() => import('./routes/sign-up/sign-up.component'));
const Statistics = lazy(() => import('./routes/statistics/statistics.component'));

function App() {
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(checkUserSession());
  }, [dispatch]);

  return (
    <Suspense fallback={<Spinner />}>
      <Routes>
        <Route path='/' element={<Navigation />}>
          <Route index element={<Home />} />
          <Route path='games'>
            <Route index element={<Games />} />
            <Route path='/games/add' element={<AddGame />} />
          </Route>
          <Route path='gallery' element={<Gallery />} />
          <Route path='sign-in' element={<SignInForm />} />
          <Route path='sign-up' element={<SignUpForm />} />
          <Route path='statistics' element={<Statistics />} />
        </Route>
      </Routes>
    </Suspense>
  );
}

export default App;
