import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import AuthOutlet from '@auth-kit/react-router/AuthOutlet';
import { useAuth } from '@/api/useAuth';
import { useEffect, useState } from 'react';
import {
  createBrowserRouter,
  RouterProvider,
  Route,
  createRoutesFromElements,
} from 'react-router-dom';

import Loader from '@/common/Loader';
import PageTitle from '@/components/PageTitle';
import Home from '@/pages/Home';
import Dashboard from '@/pages/BranchManager/Dashboard';
import BranchManagerLayout from '@/layouts/BranchManagerLayout';
import LoginPage from '@/pages/User/LogIn';
import UserLayout from '@/layouts/UserLayout';
import AddFoods from '@/pages/BranchManager/Foods/AddFood';
import FoodItem from '@/pages/FoodItem';
import AllFoodItems from '@/pages/AllFoodItems';
import FoodList from '@/pages/BranchManager/FoodList';
import { Gallery } from '@/components/Gallery/Gallery';
import DiscountList from './pages/BranchManager/FoodList/DiscountList';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import { OrderHistory } from '@/components/User/OrderHistory/OrderHistory';
import User from '@/pages/BranchManager/Users';
import UserAdd from '@/pages/BranchManager/Users/AddUser';
import UserEdit from '@/pages/BranchManager/Users/EditUser';
import EditFoods from '@/pages/BranchManager/Foods/EditFood';
import AddCategories from '@/pages/BranchManager/Categories/AddCategories';
import ViewCategories from '@/pages/BranchManager/Categories/ViewCategories';
import AddCombos from '@/pages/BranchManager/FoodCombos/Add';
import Combos from '@/pages/BranchManager/FoodCombos';
import Discount from '@/pages/Discount';
import EditCombos from '@/pages/BranchManager/FoodCombos/Edit';
import Sales from '@/pages/BranchManager/Sales';
import StorekeeperLayout from '@/layouts/StorekeeperLayout';
import ViewGrns from '@/pages/Storekeeper/GrnList';
import AddGrn from '@/pages/Storekeeper/AddGrn';
import EditGrn from '@/pages/Storekeeper/EditGrn';
import KitchenManagerDashboard from '@/pages/KitchenManager/Dashboard';

const { refresh } = useAuth();

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === 'http:',
  refresh: refresh,
});

const routes = createRoutesFromElements(
  <Route>
    <Route
      path="login"
      element={
        <>
          <PageTitle title="La Fresca | Log In" />
          <LoginPage />
        </>
      }
    />
    <Route element={<AuthOutlet fallbackPath="/login" />}>
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
          path="viewcombo/:comboId"
          element={
            <>
              <PageTitle title="La Fresca | Food Combo" />
              <FoodItem />
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
          path="promotions"
          element={
            <>
              <PageTitle title="La Fresca | Promotions" />
              <Discount />
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
          path="sales"
          element={
            <>
              <PageTitle title="Branch Manager | Sales" />
              <Sales />
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
        <Route path="food-combos">
          <Route
            index
            element={
              <>
                <PageTitle title="Branch Manager | Food Combos" />
                <Combos />
              </>
            }
          />
          <Route
            path="add"
            element={
              <>
                <PageTitle title="Branch Manager | Add Food Combo" />
                <AddCombos />
              </>
            }
          />
          <Route
            path="edit/:comboId"
            element={
              <>
                <PageTitle title="Branch Manager | Edit Food Combo" />
                <EditCombos />
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
      <Route path="storekeeper/*" element={<StorekeeperLayout />}>
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
      <Route path="food-combos">
        <Route
          index
          element={
            <>
              <PageTitle title="Branch Manager | Food Combos" />
              <Combos />
            </>
          }
        />
        <Route
          path="add"
          element={
            <>
              <PageTitle title="Branch Manager | Add Food Combo" />
              <AddCombos />
            </>
          }
        />
        <Route
          path="edit/:comboId"
          element={
            <>
              <PageTitle title="Branch Manager | Edit Food Combo" />
              <EditCombos />
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
    
    <Route path="storekeeper/*" element={<StorekeeperLayout />}>
      <Route
        index
        element={
          <>
            <PageTitle title="Storekeeper | Inventory" />
          </>
        }
      />
      <Route path="grn">
        <Route
          index
          element={
            <>
              <PageTitle title="Storekeeper | GRN List" />
              <ViewGrns />
            </>
          }
        />
        <Route
          path="add"
          element={
            <>
              <PageTitle title="Storekeeper | Add GRN" />
              <AddGrn />
            </>
          }
        />
        <Route
          path="edit/:grnId"
          element={
            <>
              <PageTitle title="Storekeeper | Edit GRN" />
              <EditGrn />
              <PageTitle title="Storekeeper | Inventory" />
            </>
          }
        />
        <Route path="grn">
          <Route
            index
            element={
              <>
                <PageTitle title="Storekeeper | GRN List" />
                <ViewGrns />
              </>
            }
          />
          <Route
            path="add"
            element={
              <>
                <PageTitle title="Storekeeper | Add GRN" />
                <AddGrn />
              </>
            }
          />
          <Route
            path="edit/:grnId"
            element={
              <>
                <PageTitle title="Storekeeper | Edit GRN" />
                <EditGrn />
              </>
            }
          />
        </Route>
      </Route>
    </Route>

    <Route path="kitchen-manager/*" element={<StorekeeperLayout />}>
      <Route
        index
        element={
          <>
            <PageTitle title="La Fresca | Kitchen Manager" />
            <KitchenManagerDashboard />
          </>
        }
      />
      <Route path="d">
        <Route
          index
          element={
            <>
              <PageTitle title="Storekeeper | GRN List" />
              <ViewGrns />
            </>
          }
        />
      </Route>
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

  return loading ? (
    <Loader />
  ) : (
    <AuthProvider store={store}>
      <RouterProvider router={router} />
    </AuthProvider>
  );
}

export default App;
