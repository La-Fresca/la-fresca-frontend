import createStore from 'react-auth-kit/createStore';
import AuthProvider from 'react-auth-kit';
import RequireAuth from '@/components/AuthOutlet';
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
import KitchenManagerLayout from '@/layouts/KitchenManagerLayout';
import LoginPage from '@/pages/User/LogIn';
import RegistrationPage from '@/pages/User/Registration';
import UserLayout from '@/layouts/UserLayout';
import AddFoods from '@/pages/BranchManager/Foods/AddFood';
import FoodItem from '@/pages/FoodItem';
import AllFoodItems from '@/pages/AllFoodItems';
import FoodList from '@/pages/BranchManager/FoodList';
import { Gallery } from '@/components/Gallery/Gallery';
import DiscountList from '@/pages/BranchManager/FoodList/DiscountList';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import { OrderHistory } from '@/components/User/OrderHistory/OrderHistory';
import User from '@/pages/BranchManager/Users';
import UserAdd from '@/pages/BranchManager/Users/AddUser';
import UserEdit from '@/pages/BranchManager/Users/EditUser';
import EditFoods from '@/pages/BranchManager/Foods/EditFood';
import AddCategories from '@/pages/BranchManager/Categories/AddCategories';
import EditCategory from '@/pages/BranchManager/Categories/EditCategory';
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
import AssignWaiter from '@/pages/KitchenManager/AssignWaiters';
import AssignDelivery from '@/pages/KitchenManager/AssignDelivery';
import DeliveryLayout from '@/layouts/DeliveryLayout';
import { OnDelivery } from '@/pages/DeliveryPerson/OnDelivery';
import KitchenManagerDashboard from '@/pages/KitchenManager/Dashboard';
import Unauthorized from '@/components/Unauthorized';
import WaiterLayout from '@/layouts/WaiterLayout';
import WaiterDashboard from '@/pages/Waiter/dashboard';
import ServedOrders from '@/pages/Waiter/servedOrders';
import CashierLayout from '@/layouts/CashierLayout';
import PhysicalOrder from '@pages/Cashier/PhysicalOrder';
import UserProfile from '@components/User/Profile/Profile';
import DeliveryHome from '@pages/DeliveryPerson/Home';
import History from '@/pages/DeliveryPerson/History';
import OrderQueue from '@/pages/DeliveryPerson/OrderQueue';
import ViewInventory from '@/pages/Storekeeper/InventoryList';
import AddInventory from '@/pages/Storekeeper/AddInventory';
import EditInventory from '@/pages/Storekeeper/EditInventory';
import ViewGrnByCollection from '@/pages/Storekeeper/GrnListByCollection';
import FoodCombo from '@/pages/FoodCombo';
import SystemAdminLayout from '@/layouts/SystemAdminLayout';
import SystemLogs from '@/pages/SystemAdmin/systemLogs';
import TopManagerLayout from '@/layouts/TopManagerLayout';

// Top level manager
import Dashboard_TLM from '@/pages/TopLevelManager/Dashboard';
import BranchDasboard_TLM from '@/pages/TopLevelManager/Branches/view';
import BranchList from '@/pages/TopLevelManager/Branches/BranchList';
import AddBranches from '@/pages/TopLevelManager/Branches/AddBranch';
import Inventory_TLM from '@/pages/TopLevelManager/Inventory';

const { refresh } = useAuth();
const cookieProtocol = (import.meta as any).env.VITE_COOKIE_PROTOCOL;

const store = createStore({
  authName: '_auth',
  authType: 'cookie',
  cookieDomain: window.location.hostname,
  cookieSecure: window.location.protocol === cookieProtocol,
  refresh: refresh,
});

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
    </Route>
    <Route path="/">
      <Route
        path="login"
        element={
          <>
            <PageTitle title="La Fresca | Log In" />
            <LoginPage />
          </>
        }
      />
      <Route
        path="register"
        element={
          <>
            <PageTitle title="La Fresca | Register" />
            <RegistrationPage />
          </>
        }
      />
      <Route
        path="unauthorized"
        element={
          <>
            <PageTitle title="La Fresca | Unauthorized" />
            <Unauthorized />
          </>
        }
      />
      <Route
        path="testwaiterModal"
        element={
          <>
            <PageTitle title="La Fresca | testModal" />
            <AssignWaiter />
          </>
        }
      />
      <Route
        path="testdeliveryModal"
        element={
          <>
            <PageTitle title="La Fresca | Food Items" />
            <AssignDelivery />
          </>
        }
      />
    </Route>
    <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
      <Route path="/" element={<UserLayout />}>
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
        <Route path="menuitems">
          <Route
            index
            element={
              <>
                <PageTitle title="La Fresca | Menu Items" />
                <AllFoodItems />
              </>
            }
          />
          <Route
            path="viewfooditem/:itemId"
            element={
              <>
                <PageTitle title="La Fresca | Food Item" />
                <FoodItem />
              </>
            }
          />
          <Route
            path="viewfoodcombo/:comboId"
            element={
              <>
                <PageTitle title="La Fresca | Food Item" />
                <FoodCombo />
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
                <EditCategory />
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
              <PageTitle title="Store Keeper | Inventory" />
              <ViewInventory />
            </>
          }
        />
        <Route
          path="add"
          element={
            <>
              <PageTitle title="Storekeeper | Add Inventory" />
              <AddInventory />
            </>
          }
        />
        <Route
          path="view/:collection"
          element={
            <>
              <PageTitle title="Storekeeper | Inventory" />
              <ViewGrnByCollection />
            </>
          }
        />
        <Route
          path="edit/:inventoryId"
          element={
            <>
              <PageTitle title="Storekeeper | Edit Inventory" />
              <EditInventory />
            </>
          }
        />
        <Route path="stock">
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
                <PageTitle title="Store Keeper | Add Stock" />
                <AddGrn />
              </>
            }
          />
          <Route
            path="edit/:stockId"
            element={
              <>
                <PageTitle title="Store Keeper | Edit Stock" />
                <EditGrn />
              </>
            }
          />
        </Route>
      </Route>
      <Route path="kitchen-manager/*" element={<KitchenManagerLayout />}>
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
      <Route path="waiter/*" element={<WaiterLayout />}>
        <Route
          index
          element={
            <>
              <PageTitle title="Waiter | Dashboard" />
              <WaiterDashboard />
            </>
          }
        />
        <Route
          path="served-orders"
          element={
            <>
              <PageTitle title="Waiter | served-orders" />
              <ServedOrders />
            </>
          }
        ></Route>
      </Route>
      <Route path="system-admin/*" element={<SystemAdminLayout />}>
        <Route
          index
          element={
            <>
              <PageTitle title="system admin | Dashboard" />
              <Dashboard />
            </>
          }
        />
        <Route
          path="system-logs"
          element={
            <>
              <PageTitle title="system admin | System Logs" />
              <SystemLogs />
            </>
          }
        />
        <Route
          path="reports"
          element={
            <>
              <PageTitle title="system admin | Reports" />
              <Sales />
            </>
          }
        />
        <Route
          path="backups"
          element={
            <>
              <PageTitle title="system admin | Backup & Restore" />
              <Sales />
            </>
          }
        />
        {/* -------------- Routes to add ---------------- */}
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
        <Route
          path="profile"
          element={
            <>
              <PageTitle title="cashier | profile" />
              <UserProfile />
            </>
          }
        ></Route>
      </Route>
      <Route path="deliveryperson/*" element={<DeliveryLayout />}>
        <Route
          index
          element={
            <>
              <PageTitle title="Delivery | Home" />
              <DeliveryHome />
            </>
          }
        />
        <Route path="path">
          <Route
            index
            element={
              <>
                <PageTitle title="Delivery | Ongoing" />
                <OnDelivery />
              </>
            }
          />
        </Route>
        <Route path="history">
          <Route
            index
            element={
              <>
                <PageTitle title="Delivery | History" />
                <History />
              </>
            }
          />
        </Route>
        <Route path="queue">
          <Route
            index
            element={
              <>
                <PageTitle title="Delivery | Order Queue" />
                <OrderQueue />
              </>
            }
          />
        </Route>
      </Route>
      <Route path="top-level-manager/*" element={<TopManagerLayout />}>
        <Route
          index
          element={
            <>
              <PageTitle title="La Fresca | Top Level Manager" />
              <Dashboard_TLM />
            </>
          }
        />
        <Route path="branches">
          <Route
            index
            element={
              <>
                <PageTitle title="Top Manager | Branch List" />
                <BranchList />
              </>
            }
          />
          <Route
            path="add"
            element={
              <>
                <PageTitle title="Top Manager | Add Branch " />
                <AddBranches />
              </>
            }
          />
          <Route
            path="edit/:branchId"
            element={
              <>
                <PageTitle title="Top Manager | Edit Branch " />
              </>
            }
          />
          <Route
            path="view/:branchId"
            element={
              <>
                <PageTitle title="Top Manager | View Branch" />
                <BranchDasboard_TLM />
              </>
            }
          />
        </Route>
        <Route
          path="sales"
          element={
            <>
              <PageTitle title="Top-level Manager | Sales" />
              <Sales />
            </>
          }
        />
        <Route path="categories">
          <Route
            index
            element={
              <>
                <PageTitle title="Top-level Manager | Food Categories" />
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
                <EditCategory />
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
                <PageTitle title="Top-level Manager | Add Food" />
                <AddFoods />
              </>
            }
          />
          <Route
            path="edit/:foodId"
            element={
              <>
                <PageTitle title="Top-level Manager | Edit Food" />
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
                <PageTitle title="Top-level Manager | Food Combos" />
                <Combos />
              </>
            }
          />
          <Route
            path="add"
            element={
              <>
                <PageTitle title="Top-level Manager | Add Food Combo" />
                <AddCombos />
              </>
            }
          />
          <Route
            path="edit/:comboId"
            element={
              <>
                <PageTitle title="Top-level Manager | Edit Food Combo" />
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
                <PageTitle title="Top-level Manager | Users" />
                <User />
              </>
            }
          />
          <Route
            path="add"
            element={
              <>
                <PageTitle title="Top-level Manager | Add User" />
                <UserAdd />
              </>
            }
          />
          <Route
            path="edit/:userId"
            element={
              <>
                <PageTitle title="Top-level Manager | Edit User" />
                <UserEdit />
              </>
            }
          />
        </Route>
        <Route path="inventory">
          <Route
            index
            element={
              <>
                <PageTitle title="Top-level Manager | Inventory" />
                <Inventory_TLM />
              </>
            }
          />
          <Route
            path="add"
            element={
              <>
                <PageTitle title="Top-level Manager | Add Branch" />
              </>
            }
          />
          <Route
            path="edit/:userId"
            element={
              <>
                <PageTitle title="Top-level Manager | Edit Branch" />
              </>
            }
          />
          <Route
            path="view/:branchId"
            element={
              <>
                <PageTitle title="Top-level Manager | View Branch" />
                <BranchDasboard_TLM />
              </>
            }
          />
        </Route>
        <Route
          path="discountlist"
          element={
            <>
              <PageTitle title="Top-level Manager | Discount List" />
              <DiscountList />
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
