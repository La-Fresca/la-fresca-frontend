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
import AddFoods from '@pages/BranchManager/Foods/AddFood';
import FoodItem from '@pages/FoodItem';
import AllFoodItems from '@pages/AllFoodItems';
import FoodList from '@pages/BranchManager/FoodList';
import { Gallery } from '@components/Gallery/Gallery';
import DiscountList from './pages/BranchManager/FoodList/DiscountList';
import Cart from '@pages/Cart';
import Checkout from '@pages/Checkout';
import { OrderHistory } from './components/User/OrderHistory/OrderHistory';
import User from '@pages/BranchManager/Users';
import UserAdd from '@pages/BranchManager/Users/AddUser';
import UserEdit from '@pages/BranchManager/Users/EditUser';

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
      <Route
        path="cart"
        element={
          <>
            <PageTitle title="La Fresca | Cart" />
            <Cart />
          </>
        }
      />
      <Route
        path="orderhistory"
        element={
          <>
            <PageTitle title="La Fresca | Order History" />
            <OrderHistory />
          </>
        }
      />

      <Route
        path="checkout"
        element={
          <>
            <PageTitle title="La Fresca | Checkout" />
            <Checkout />  
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
      <Route path="foods">
        <Route
          index
          element={
            <>
              <PageTitle title="La Fresca | Food List" />
              <FoodList />
            </>
          }
        />
        <Route
          path="add"
          element={
            <>
              <PageTitle title="Branch Manager | Add Food" />
              <AddFoods />
            </>
          }
        />
      </Route>
      <Route path="users">
        <Route
          index
          element={
            <>
              <PageTitle title="Branch Manager | Users" />
              <User />
            </>
          }
        />
        <Route
          path="add"
          element={
            <>
              <PageTitle title="Branch Manager | Add User" />
              <UserAdd />
            </>
          }
        />
        <Route
          path="edit/:userId"
          element={
            <>
              <PageTitle title="Branch Manager | Edit User" />
              <UserEdit />
            </>
          }
        />
      </Route>
      <Route
        path="discountlist"
        element={
          <>
            <PageTitle title="Branch Manager | Discount List" />
            <DiscountList />
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
