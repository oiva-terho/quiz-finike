import { Route, Routes } from 'react-router-dom';

import { Home } from './routes/home/home.component';
import { Navigation } from './routes/navigation/navigation.component';

function App() {
  return (
    <Routes>
      <Route path='/' element={<Navigation />}>
        <Route index element={<Home />} />
        <Route path='games' element={<div>Games component</div>} />
        <Route path='photos' element={<div>Photos component</div>} />
        <Route path='auth' element={<div>Sign in component</div>} />
      </Route>
    </Routes>
  );
}

export default App;
