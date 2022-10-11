import { Suspense, lazy } from 'react';
import { Navigate } from 'react-router-dom';
import { RouteObject } from 'react-router';
import SidebarLayout from 'src/layouts/SidebarLayout';
import BaseLayout from 'src/layouts/BaseLayout';
import SuspenseLoader from 'src/components/SuspenseLoader';
import SingleProduct from './pages/singleProduct/SingleProduct';
import { Checkout } from './pages/Checkout/Checkout';
import { LoginForm } from './pages/Login/LoginForm';
import { LoginCreate } from './pages/Login/LoginCreate';
import { ProtectedRoute } from './helpers/ProtectedRoute';
import { UserStorage } from './context/UserContext';


const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );



// Dashboards
const Overview = Loader(lazy(() => import('src/content/dashboards/Overview')));

// Applications

const RegisterCategory = Loader(
  lazy(() => import('src/content/applications/Category'))
);

const RegisterProduct = Loader(
  lazy(() => import('src/content/applications/Products'))
);

const Budget = Loader(
  lazy(() => import('src/content/applications/Budgets'))
);
const Clients = Loader(
  lazy(() => import('src/content/applications/Clients'))
);
const Devolution = Loader(
  lazy(() => import('src/content/applications/Devolution'))
);
const Ship = Loader(
  lazy(() => import('src/content/applications/Ship'))
);


const Orders = Loader(
  lazy(() => import('src/content/applications/Orders'))
);
const UserProfile = Loader(
  lazy(() => import('src/content/applications/Users/profile'))
);

const UserSettings = Loader(
  lazy(() => import('src/content/applications/Users/settings'))
);

const Brands = Loader(
  lazy(() => import('src/content/applications/Brands/'))
);


// Components
const Buttons = Loader(
  lazy(() => import('src/content/pages/Components/Buttons'))
);

const Modals = Loader(
  lazy(() => import('src/content/pages/Components/Modals'))
);

const Accordions = Loader(
  lazy(() => import('src/content/pages/Components/Accordions'))
);

const Tabs = Loader(lazy(() => import('src/content/pages/Components/Tabs')));

const Badges = Loader(
  lazy(() => import('src/content/pages/Components/Badges'))
);

const Tooltips = Loader(
  lazy(() => import('src/content/pages/Components/Tooltips'))
);

const Avatars = Loader(
  lazy(() => import('src/content/pages/Components/Avatars'))
);

const Cards = Loader(lazy(() => import('src/content/pages/Components/Cards')));
const Forms = Loader(lazy(() => import('src/content/pages/Components/Forms')));


// Status
const Status404 = Loader(
  lazy(() => import('src/content/pages/Status/Status404'))
);
const Status500 = Loader(
  lazy(() => import('src/content/pages/Status/Status500'))
);
const StatusComingSoon = Loader(
  lazy(() => import('src/content/pages/Status/ComingSoon'))
);
const StatusMaintenance = Loader(
  lazy(() => import('src/content/pages/Status/Maintenance'))
);

const routes: RouteObject[] = [
  {
    path: '',
    element: <BaseLayout />,
    children: [
      {
        path: '/',
        element: <UserStorage>
                  <LoginForm/>
                </UserStorage>
      },
      {
        path: 'overview',
        element: <Navigate to="/overview" replace />
      },
      {
        path: '/produto/:id',
        element: <UserStorage>
                  <SingleProduct />
                  </UserStorage>
      },
      {
        path: '/login',
        element: 
              <UserStorage>
                <LoginForm/>
              </UserStorage>
      },
      {
        path: '/cadastro',
        element: <LoginCreate />
      },
      {
        path: 'checkout',
        element: <UserStorage>
                  <Checkout/>
                </UserStorage>
      },

      {
        path: 'status',
        children: [
          {
            path: '',
            element: <Navigate to="404" replace />
          },
          {
            path: '404',
            element: <Status404 />
          },
          {
            path: '500',
            element: <Status500 />
          },
          {
            path: 'maintenance',
            element: <StatusMaintenance />
          },
          {
            path: 'coming-soon',
            element: <StatusComingSoon />
          }
        ]
      },
      {
        path: '*',
        element: <Status404 />
      }
    ]
  },


  {
    path: 'dashboard',
   
    element:  <UserStorage>
                <SidebarLayout />
              </UserStorage>,
    children: [
      {
        path: '',
        element: 
          <ProtectedRoute>
            <UserStorage>
              <Navigate to="geral" replace />
            </UserStorage>
          </ProtectedRoute>
      },
      {
        path: 'geral',
        element:  
            <ProtectedRoute>
              <UserStorage>
                <Overview/>
              </UserStorage>
            </ProtectedRoute>
        
      },
      {
        path: 'pedidos',
        element:  <ProtectedRoute>
                    <UserStorage>
                      <Orders/>
                    </UserStorage>
                  </ProtectedRoute>
      },
      {
        path: 'devolucao',
        element:  <ProtectedRoute>
                    <UserStorage>
                      <Devolution/>
                    </UserStorage>
                  </ProtectedRoute>
      },
      {
        path: 'clientes',
        element:  <ProtectedRoute>
                    <UserStorage>
                      <Clients/>
                    </UserStorage>
                  </ProtectedRoute>
      },
      {
        path: 'cadastrar-categoria',
        element:  <ProtectedRoute>
                    <UserStorage>
                    <RegisterCategory />
                    </UserStorage>
                  </ProtectedRoute>
        
      },
      {
        path: 'cadastrar-produto',
        element:  <ProtectedRoute>
                    <UserStorage>
                      <RegisterProduct />
                    </UserStorage>
                  </ProtectedRoute>
      },

      {
        path: 'orcamentos',
        element:  <ProtectedRoute>
                    <Budget />
                  </ProtectedRoute>
      },

      {
        path: 'frete',
        element:  <ProtectedRoute>
                    <UserStorage>
                      <Ship/>
                    </UserStorage>
                  </ProtectedRoute>
      },
      {
        path: 'cadastrar-marca',
        element:  <ProtectedRoute>
                    <Brands />
                  </ProtectedRoute>
      },
      {
        path: 'perfil',
        children: [
          {
            path: '',
            element: <Navigate to="detalhes" replace />
          },
          {
            path: 'detalhes',
            element:  <ProtectedRoute>
                      <UserStorage>
                       <UserProfile />
                      </UserStorage>
                      </ProtectedRoute>
          },
          {
            path: 'configuracoes',
            element:  <ProtectedRoute>
                      <UserStorage>
                       <UserSettings />
                      </UserStorage>
                      </ProtectedRoute>
          }
        ]
      }
    ]
  },
  {
    path: '/components',
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="buttons" replace />
      },
      {
        path: 'buttons',
        element: <Buttons />
      },
      {
        path: 'modals',
        element: <Modals />
      },
      {
        path: 'accordions',
        element: <Accordions />
      },
      {
        path: 'tabs',
        element: <Tabs />
      },
      {
        path: 'badges',
        element: <Badges />
      },
      {
        path: 'tooltips',
        element: <Tooltips />
      },
      {
        path: 'avatars',
        element: <Avatars />
      },
      {
        path: 'cards',
        element: <Cards />
      },
      {
        path: 'forms',
        element: <Forms />
      }
    ]
  }
];

export default routes;
