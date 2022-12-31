import { createBrowserRouter, RouterProvider } from 'react-router-dom';
import { FlowPage } from './pages/flow';
import { Layout } from './layouts/layout';
import { ParsePage } from './pages/parse';

const router = createBrowserRouter([
  {
    path: '/',
    element: <FlowPage />,
  },
  {
    path: '/parse',
    element: <ParsePage />,
  },
]);

export const App = () => (
  <Layout>
    <RouterProvider router={router} />
  </Layout>
);
