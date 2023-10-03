import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import DocumentMeta from 'react-document-meta';

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
  const meta = {
    title: 'Quiz Finike',
    description:
      'Квиз в Финике. Посмотрите статистику и фото интеллектуальной коммандной игры для русскоязычных в Турции',
    keywords: ['quiz', 'intellectual', 'Turkey', 'Finike', 'team game'],
    viewport: { width: 'device-width', initialScale: 1 },
    openGraph: {
      type: 'website',
      url: 'https://quiz-finike.web.app/',
      title: 'Quiz Finike',
      description:
        'Квиз в Финике, Турция. Посмотрите статистику и фото интеллектуальной коммандной игры для русскоязычных в Турции',
      siteName: 'Quiz Finike',
      images: [
        {
          url: '/preview.jpg',
        },
      ],
    },
    twitter: {
      title: 'Quiz Finike',
      description:
        'Квиз в Финике, Турция. Посмотрите статистику и фото интеллектуальной коммандной игры для русскоязычных в Турции',
      card: 'summary_large_image',
      site: '@site',
      creator: '@creator',
      images: '/preview.jpg',
    },
  };
  return (
    <DocumentMeta {...meta}>
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
    </DocumentMeta>
  );
}

export default App;
