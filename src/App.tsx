import { useEffect, useState } from 'react';
import { createBrowserRouter, RouterProvider, Route, createRoutesFromElements } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Home from './pages/Home';
import Dashboard from './pages/BranchManager/Dashboard';
import BranchManagerLayout from './layout/BranchManagerLayout';
import LoginPage from './pages/User/LogIn';

const routes = createRoutesFromElements(
  <Route>
    <Route path="/" element={<><PageTitle title="La Fresca | Home" /><Home /> </>} />
    <Route path="login" element={<><PageTitle title="La Fresca | Log In"/><LoginPage /> </>} />
    <Route path="branch-manager/*" element={<BranchManagerLayout />}>
      <Route index element={<><PageTitle title="Branch Manager | Dashboard" /><Dashboard /></>} />
      <Route path="orders" element={<><PageTitle title="Branch Manager | Orders" /></>} />
    </Route>
  </Route>
);

const router = createBrowserRouter(routes);

function App() {
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [router]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <RouterProvider router={router} />
  );
}

export default App;
