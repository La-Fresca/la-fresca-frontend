import { useEffect, useState } from 'react';
import { Route, Routes, useLocation } from 'react-router-dom';

import Loader from './common/Loader';
import PageTitle from './components/PageTitle';
import Home from './pages/Home';
import Dashboard from './pages/BranchManager/Dashboard';
import BranchManagerLayout from './layout/BranchManagerLayout';
import LoginPage from './pages/User/LogIn';

function App() {
  const [loading, setLoading] = useState<boolean>(true);
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  useEffect(() => {
    setTimeout(() => setLoading(false), 1000);
  }, []);

  return loading ? (
    <Loader />
  ) : (
    <Routes>
      <Route path="/" element={<><PageTitle title="La Fresca | Home" /><Home /> </>} />
      <Route path="/login" element={<><PageTitle title="La Fresca | Log In"/><LoginPage /> </>} />
      <Route path="/branch-manager" element={<BranchManagerLayout />}>
        <Route index element={<><PageTitle title="Dashboard" /><Dashboard /></>} />
      </Route>
    </Routes>
  );
}

export default App;
