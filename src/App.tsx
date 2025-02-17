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
//import DiscountList from '@/pages/BranchManager/FoodList/DiscountList';
import Cart from '@/pages/Cart';
import Checkout from '@/pages/Checkout';
import { OrderHistory } from '@/components/User/OrderHistory/OrderHistory';
import User from '@/pages/BranchManager/Users';
import UserAdd from '@/pages/BranchManager/Users/AddUser';
import UserEdit from '@/pages/BranchManager/Users/EditUser';
import EditFoods from '@/pages/BranchManager/Foods/EditFood';
import DiscountList from '@/pages//BranchManager/Discounts';
import DiscountAdd from '@/pages/BranchManager/Discounts/AddDiscounts';
import DiscountEdit from '@/pages/BranchManager/Discounts/EditDiscounts';
import AddCategories from '@/pages/BranchManager/Categories/AddCategories';
import EditCategory from '@/pages/BranchManager/Categories/EditCategory';
import ViewCategories from '@/pages/BranchManager/Categories/ViewCategories';
import AddCombos from '@/pages/BranchManager/FoodCombos/Add';
import Combos from '@/pages/BranchManager/FoodCombos';
import Complaints from '@pages/BranchManager/Complaints/index';
import ViewComplaint from '@pages/BranchManager/Complaints/view';
import Discount from '@/pages/Discount';
import ContactUs from '@/pages/ContactUs';
import EditCombos from '@/pages/BranchManager/FoodCombos/Edit';
import Sales from '@/pages/BranchManager/Sales';
import StorekeeperLayout from '@/layouts/StorekeeperLayout';
import ViewGrns from '@/pages/Storekeeper/GrnList';
import AddGrn from '@/pages/Storekeeper/AddGrn';
import EditGrn from '@/pages/Storekeeper/EditGrn';
import ViewGrns_BM from '@/pages/BranchManager/Inventory/GrnList';
import AddGrn_BM from '@/pages/BranchManager/Inventory/AddGrn';
import EditGrn_BM from '@/pages/BranchManager/Inventory/EditGrn';
import AssignWaiter from '@/pages/KitchenManager/AssignWaiters';
import AssignDelivery from '@/pages/KitchenManager/AssignDelivery';
import DeliveryPersonsList from '@/pages/KitchenManager/DeliveryPersons/index';
import WaiterList from '@/pages/KitchenManager/Waiter/index';
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
import ViewInventory_BM from '@/pages/BranchManager/Inventory/InventoryList';
import AddInventory_BM from '@/pages/BranchManager/Inventory/AddInventory';
import EditInventory_BM from '@/pages/BranchManager/Inventory/EditInventory';
import ViewGrnByCollection from '@/pages/Storekeeper/GrnListByCollection';
import ViewGrnByCollection_BM from '@/pages/BranchManager/Inventory/GrnListByCollection';
import FoodCombo from '@/pages/FoodCombo';
import SystemAdminLayout from '@/layouts/SystemAdminLayout';
import SystemLogs from '@/pages/SystemAdmin/systemLogs';
import TopManagerLayout from '@/layouts/TopManagerLayout';
import { OrderHistoryDetails } from '@/components/User/OrderHistory/OrderHistoryDetails';
import WaiterComponent from './components/Waiter/WaiterComponent';

// Top level manager
import Dashboard_TLM from '@/pages/TopLevelManager/Dashboard';
import BranchDasboard_TLM from '@/pages/TopLevelManager/Branches/ViewBranch';
import BranchList from '@/pages/TopLevelManager/Branches/BranchList';
import EditBranch from './pages/TopLevelManager/Branches/EditBranch';
import AddBranches from '@/pages/TopLevelManager/Branches/AddBranch';
import Inventory_TLM from '@/pages/TopLevelManager/Inventory';
import Discount_TLM from '@/pages/TopLevelManager/Discount';
import FoodList_TLM from './pages/TopLevelManager/Foods/index';
import ComboList_TLM from './pages/TopLevelManager/FoodCombos/index';
import AddBm from '@pages/TopLevelManager/ManageBM/AddBm';
import EditBm from '@pages/TopLevelManager/ManageBM/EditBm';
import BranchManagers from '@pages/TopLevelManager/ManageBM/index';
import BranchManagerList from './pages/TopLevelManager/BrancheManager/index';
import AddBranchManager from './pages/TopLevelManager/BrancheManager/AddBranchManager';
import EditBranchManager from './pages/TopLevelManager/BrancheManager/EditBranchManager';

import ViewInventory_TLM from './pages/TopLevelManager/Inventory/view';
import ViewInventoryByName_TLM from './pages/TopLevelManager/Inventory/viewByName';
import Stock_TLM from '@/pages/TopLevelManager/Stock/view';
import StockBranchList_TLM from '@/pages/TopLevelManager/Stock';
import Backup from '@/pages/SystemAdmin/backup';
import AssignBranch from './pages/Home/selectBranch';

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
    {/* Public Routes */}
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
      <Route
        path="gallery"
        element={
          <>
            <PageTitle title="La Fresca | Gallery" />
            <Gallery />
          </>
        }
      />
    </Route>

    {/* Protected Routes */}
    <Route element={<RequireAuth allowedRoles={['USER', 'ADMIN']} />}>
      <Route path="/" element={<UserLayout />}>
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
          path="checkout"
          element={
            <>
              <PageTitle title="La Fresca | Checkout" />
              <Checkout />
            </>
          }
        />
        <Route
          path="orderHistory"
          element={
            <>
              <PageTitle title="La Fresca | Order History" />
              <OrderHistory />
            </>
          }
        />
        <Route
          path="orderhistory/:orderId"
          element={
            <>
              <PageTitle title="La Fresca | Order History Details" />
              <OrderHistoryDetails />
            </>
          }
        />
      </Route>
    </Route>

    {/* Branch Manager Routes */}
    <Route element={<RequireAuth allowedRoles={['BRANCH_MANAGER', 'ADMIN']} />}>
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
        <Route path="complaints">
          <Route
            index
            element={
              <>
                <PageTitle title="Branch Manager | Complaints" />
                <Complaints />
              </>
            }
          />
          <Route
            path="view/:complaintId"
            element={
              <>
                <PageTitle title="Branch Manager | View Complaint" />
                <ViewComplaint />
              </>
            }
          />
        </Route>

        <Route path="inventory">
          <Route
            index
            element={
              <>
                <PageTitle title="Store Keeper | Inventory" />
                <ViewInventory_BM />
              </>
            }
          />
          <Route
            path="add"
            element={
              <>
                <PageTitle title="Storekeeper | Add Inventory" />
                <AddInventory_BM />
              </>
            }
          />
          <Route
            path="view/:collection"
            element={
              <>
                <PageTitle title="Storekeeper | Inventory" />
                <ViewGrnByCollection_BM />
              </>
            }
          />
          <Route
            path="edit/:inventoryId"
            element={
              <>
                <PageTitle title="Storekeeper | Edit Inventory" />
                <EditInventory_BM />
              </>
            }
          />
        </Route>

        <Route path="stock">
          <Route
            index
            element={
              <>
                <PageTitle title="Storekeeper | GRN List" />
                <ViewGrns_BM />
              </>
            }
          />
          <Route
            path="add"
            element={
              <>
                <PageTitle title="Store Keeper | Add Stock" />
                <AddGrn_BM />
              </>
            }
          />
          <Route
            path="edit/:stockId"
            element={
              <>
                <PageTitle title="Store Keeper | Edit Stock" />
                <EditGrn_BM />
              </>
            }
          />
        </Route>

        <Route path="discounts">
          <Route
            index
            element={
              <>
                <PageTitle title="Branch Manager | DiscountList" />
                <DiscountList />
              </>
            }
          />
          <Route
            path="add"
            element={
              <>
                <PageTitle title="Branch Manager | Add Discounts" />
                <DiscountAdd />
              </>
            }
          />
          <Route
            path="edit/:menuItemId"
            element={
              <>
                <PageTitle title="Branch Manager | Edit Discounts" />
                <DiscountEdit />
              </>
            }
          />
        </Route>
      </Route>
    </Route>

    {/* Kitchen Manager Routes */}
    <Route
      element={
        <RequireAuth
          allowedRoles={['KITCHEN_MANAGER', 'ADMIN', 'BRANCH_MANAGER']}
        />
      }
    >
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

        <Route path="deliveryPersons">
          <Route
            index
            element={
              <>
                <PageTitle title="Kitchen Manager | Delivery Persons List" />
                <DeliveryPersonsList />
              </>
            }
          />
        </Route>

        <Route path="waiters">
          <Route
            index
            element={
              <>
                <PageTitle title="Kitchen Manager | Waiters List" />
                <WaiterList />
              </>
            }
          />
        </Route>
      </Route>
    </Route>

    {/* Storekeeper Routes */}
    <Route
      element={
        <RequireAuth
          allowedRoles={['STORE_KEEPER', 'ADMIN', 'BRANCH_MANAGER']}
        />
      }
    >
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
    </Route>

    {/* Waiter Routes */}
    <Route
      element={
        <RequireAuth allowedRoles={['WAITER', 'ADMIN', 'BRANCH_MANAGER']} />
      }
    >
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

        <Route
          path="sss"
          element={
            <>
              <PageTitle title="Waiter | sss" />
              <WaiterComponent />
            </>
          }
        ></Route>
      </Route>
    </Route>

    {/* System Admin Routes */}
    <Route element={<RequireAuth allowedRoles={['SYSTEM_ADMIN', 'ADMIN']} />}>
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
              <Backup />
            </>
          }
        />
        {/* -------------- Routes to add ---------------- */}
      </Route>
    </Route>

    {/* Cashier Routes */}
    <Route
      element={
        <RequireAuth allowedRoles={['CASHIER', 'ADMIN', 'BRANCH_MANAGER']} />
      }
    >
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
    </Route>

    {/* Delivery Person Routes */}
    <Route
      element={
        <RequireAuth
          allowedRoles={['DELIVERY_PERSON', 'ADMIN', 'BRANCH_MANAGER']}
        />
      }
    >
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
    </Route>

    {/* Top Level Manager Routes */}
    <Route element={<RequireAuth allowedRoles={['ADMIN']} />}>
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
                <PageTitle title="Top Level Manager | Branch List" />
                <BranchList />
              </>
            }
          />
          <Route
            path="add"
            element={
              <>
                <PageTitle title="Top Level Manager | Add Branch " />
                <AddBranches />
              </>
            }
          />
          <Route
            path="edit/:branchId"
            element={
              <>
                <PageTitle title="Top Level Manager | Edit Branch " />
                <EditBranch />
              </>
            }
          />
          <Route
            path="view/:branchId"
            element={
              <>
                <PageTitle title="Top Level Manager | View Branch" />
                <BranchDasboard_TLM />
              </>
            }
          />
        </Route>

        <Route
          path="sales"
          element={
            <>
              <PageTitle title="Top Level Manager | Sales" />
              <Sales />
            </>
          }
        />

        <Route path="categories">
          <Route
            index
            element={
              <>
                <PageTitle title="Top Level Manager | Food Categories" />
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
                <PageTitle title="Top Level Manager | Food Item List" />
                <FoodList_TLM />
              </>
            }
          />
        </Route>

        <Route path="food-combos">
          <Route
            index
            element={
              <>
                <PageTitle title="Top Level Manager | Food Combos" />
                <ComboList_TLM />
              </>
            }
          />
        </Route>

        <Route path="branchmanagers">
          <Route
            index
            element={
              <>
                <PageTitle title="Top Level Manager | Users" />
                <BranchManagerList />
              </>
            }
          />
          <Route
            path="add"
            element={
              <>
                <PageTitle title="Top Level Manager | Add User" />
                <AddBranchManager />
              </>
            }
          />
          <Route
            path="edit/:userId"
            element={
              <>
                <PageTitle title="Top Level Manager | Edit User" />
                <EditBranchManager />
              </>
            }
          />
        </Route>

        <Route path="inventory">
          <Route
            index
            element={
              <>
                <PageTitle title="Top Level Manager | Inventory" />
                <Inventory_TLM />
              </>
            }
          />
          <Route
            path="view"
            element={
              <>
                <PageTitle title="Top Level Manager | View Inventory" />
                <ViewInventory_TLM />
              </>
            }
          />
          <Route
            path="viewCollections/:collection"
            element={
              <>
                <PageTitle title="Top Level Manager | View Inventory By Name" />
                <ViewInventoryByName_TLM />
              </>
            }
          />
        </Route>

        <Route path="stock">
          <Route
            index
            element={
              <>
                <PageTitle title="Top Level Manager | Stock" />
                <StockBranchList_TLM />
              </>
            }
          />
          <Route
            path="view"
            element={
              <>
                <PageTitle title="Top Level Manager | View Stock" />
                <Stock_TLM />
              </>
            }
          />
          <Route
            path="viewCollections/:collection"
            element={
              <>
                <PageTitle title="Top Level Manager | View Inventory By Name" />
                <ViewInventoryByName_TLM />
              </>
            }
          />
        </Route>

        <Route
          path="discountlist"
          element={
            <>
              <PageTitle title="Top Level Manager | Discount List" />
              <Discount_TLM />
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
