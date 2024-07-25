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
import { OrderHistory } from './components/User/OrderHistory/OrderHistory';
import User from '@pages/BranchManager/Users';
import UserAdd from '@pages/BranchManager/Users/AddUser';
import UserEdit from '@pages/BranchManager/Users/EditUser';
import EditFoods from '@pages/BranchManager/Foods/EditFood';
import AddCategories from '@pages/BranchManager/Categories/AddCategories';
import ViewCategories from '@pages/BranchManager/Categories/ViewCategories';
import WaiterLayout from '@layouts/WaiterLayout';
import CashierLayout from '@layouts/CashierLayout';
import Waiter from '@/pages/Waiter/dashboard';
import ServedOrders from '@pages/Waiter/servedOrders';
import PhysicalOrder from './pages/Cashier/PhysicalOrder';
import UserProfile from '@components/User/Profile/Profile';

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
      <Route path="categories">
        <Route
          index
          element={
            <>
              <PageTitle title="Branch Manager | Food Categories" />
              <ViewCategories />
            </>
          }
        />
        <Route
          path="add"
          element={
            <>
              <PageTitle title="La Fresca | Add Food Categories " />
              <AddCategories />
            </>
          }
        />
        <Route
          path="edit/:categoryId"
          element={
            <>
              <PageTitle title="La Fresca | Edit Food Categories " />
              <AddCategories />
            </>
          }
        />
      </Route>
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
        <Route
          path="edit/:foodId"
          element={
            <>
              <PageTitle title="Branch Manager | Edit Food" />
              <EditFoods />
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
    <Route path="waiter/*" element={<WaiterLayout />}>
      <Route
        index
        element={
          <>
            <PageTitle title="Waiter | Dashboard" />
            <Waiter />
          </>
        }
      />
     </Route> 

     <Route path="waiter/served-orders" element={<WaiterLayout />}>
      <Route
        index
        element={
          <>
            <PageTitle title="Waiter | served-orders" />
            <ServedOrders />
          </>
        }
      />
     </Route> 

     <Route path="cashier/*" element={<CashierLayout />}>
      <Route
        index
        element={
          <>
            <PageTitle title="cashier | Dashboard" />
            <PhysicalOrder />    
          </>
        }
      />
      </Route>

      <Route path="cashier/profile" element={<CashierLayout />}>
      <Route
        index
        element={
          <>
            <PageTitle title="cashier | profile" />
            <UserProfile />   
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
