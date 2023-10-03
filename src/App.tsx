import { Suspense, lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';

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
  const host = window.location.hostname;
  const meta = {
    title: 'Quiz in Finike',
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
      images: `https://${host}/preview.png`,
    },
    twitter: {
      title: 'Quiz Finike',
      description:
        'Квиз в Финике, Турция. Посмотрите статистику и фото интеллектуальной коммандной игры для русскоязычных в Турции',
      card: 'summary_large_image',
      site: '@site',
      creator: '@creator',
      images: `https://${host}/preview.png`,
    },
  };
  return (
    <Suspense fallback={<Spinner />}>
      <Helmet>
        <title>{meta.title}</title>
        <meta name='description' content={meta.description} />
        <meta name='keywords' content={meta.keywords.join(', ')} />
        <meta
          name='viewport'
          content={`width=${meta.viewport.width}, initial-scale=${meta.viewport.initialScale}`}
        />

        {/* OpenGraph */}
        <meta property='og:type' content={meta.openGraph.type} />
        <meta property='og:url' content={meta.openGraph.url} />
        <meta property='og:title' content={meta.openGraph.title} />
        <meta property='og:description' content={meta.openGraph.description} />
        <meta property='og:site_name' content={meta.openGraph.siteName} />
        <meta property='og:image' content={meta.openGraph.images} />

        {/* Twitter */}
        <meta name='twitter:title' content={meta.twitter.title} />
        <meta name='twitter:description' content={meta.twitter.description} />
        <meta name='twitter:card' content={meta.twitter.card} />
        <meta name='twitter:site' content={meta.twitter.site} />
        <meta name='twitter:creator' content={meta.twitter.creator} />
        <meta name='twitter:image' content={meta.twitter.images} />
      </Helmet>
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
