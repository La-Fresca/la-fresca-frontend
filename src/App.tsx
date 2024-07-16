import { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';

import Loader from '@common/Loader';
import PageTitle from '@components/PageTitle';
import Home from '@pages/Home';
import Dashboard from '@pages/BranchManager/Dashboard';
import BranchManagerLayout from '@layouts/BranchManagerLayout';
import LoginPage from '@pages/User/LogIn';
import UserLayout from '@layouts/UserLayout';
import Foods from '@pages/BranchManager/Foods';
import FoodItem from '@pages/FoodItem';
import AllFoodItems from '@pages/AllFoodItems';
import FoodList from '@pages/BranchManager/FoodList';
import { Gallery } from '@components/Gallery/Gallery';

const routes = createRoutesFromElements(
  <Route>
    <Route path="/" element={<UserLayout />}>
      <Route
        index
        element={
          <>
            <PageTitle title="La Fresca | Home" />
            <Home />
          </>
        }
      />
      <Route
        path="gallery"
        element={
          <>
            <PageTitle title="La Fresca | Gallery" />
            <Gallery />
          </>
        }
      />
      <Route path="fooditems">
        <Route
          index
          element={
            <>
              <PageTitle title="La Fresca | Food Items" />
              <AllFoodItems />
            </>
          }
        />
        <Route
          path="viewfood/:itemId"
          element={
            <>
              <PageTitle title="La Fresca | Food Item" />
              <FoodItem />
            </>
          }
        />
      </Route>

      <Route
        path="login"
        element={
          <>
            <PageTitle title="La Fresca | Log In" />
            <LoginPage />
          </>
        }
      />
    </Route>

    <Route path="branch-manager/*" element={<BranchManagerLayout />}>
      <Route
        index
        element={
          <>
            <PageTitle title="Branch Manager | Dashboard" />
            <Dashboard />
          </>
        }
      />
      <Route
        path="foods"
        element={
          <>
            <PageTitle title="Branch Manager | Foods" />
            <Foods />
          </>
        }
      />
      <Route
        path="foodlist"
        element={
          <>
            <PageTitle title="Branch Manager | Foods List" />
            <FoodList />
          </>
        }
      />
    </Route>
  </Route>,
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

  return loading ? <Loader /> : <RouterProvider router={router} />;
}

export default App;
