import { Navigate, Route, Routes } from 'react-router-dom';
import { routes, routeSegments } from './services/routes';
import { AppErrorBoundary } from './app/error-boundary';
import { QueryProvider } from './app/query-provider';
import { ThemeProvider } from './app/theme-provider';
import { AppLayout } from './components/app-layout/AppLayout';
import { PostPage } from './pages/post-page/PostPage';
import { PostsPage } from './pages/posts-page/PostsPage';

export default function App() {
  return (
    <ThemeProvider>
      <QueryProvider>
        <AppErrorBoundary>
          <Routes>
            <Route path="/" element={<AppLayout />}>
              <Route index element={<Navigate to={routes.href.postsFirstPage()} replace />} />
              <Route path={routeSegments.posts} element={<PostsPage />} />
              <Route path={routeSegments.postById} element={<PostPage />} />
            </Route>
          </Routes>
        </AppErrorBoundary>
      </QueryProvider>
    </ThemeProvider>
  );
}
