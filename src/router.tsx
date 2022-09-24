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


const Loader = (Component) => (props) =>
  (
    <Suspense fallback={<SuspenseLoader />}>
      <Component {...props} />
    </Suspense>
  );



// Dashboards
const Overview = Loader(lazy(() => import('src/content/dashboards/Overview')));

// Applications
const Messenger = Loader(
  lazy(() => import('src/content/applications/Messenger'))
);

const RegisterCategory = Loader(
  lazy(() => import('src/content/applications/RegisterCategory'))
);

const RegisterProduct = Loader(
  lazy(() => import('src/content/applications/RegisterProduct'))
);

const Clients = Loader(
  lazy(() => import('src/content/applications/Clients'))
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
        element: <LoginForm />
      },
      {
        path: 'overview',
        element: <Navigate to="/overview" replace />
      },
      {
        path: '/produto/ecolift-50',
        element: <SingleProduct />
      },
      {
        path: '/login',
        element: <LoginForm />
      },
      {
        path: '/cadastro',
        element: <LoginCreate />
      },
      {
        path: 'checkout',
        element: <Checkout/>
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
    element: <SidebarLayout />,
    children: [
      {
        path: '',
        element: <Navigate to="geral" replace />
      },
      {
        path: 'geral',
        element:  <ProtectedRoute>
                    <Overview/>
                  </ProtectedRoute>
      },
      {
        path: 'pedidos',
        element:  <ProtectedRoute>
                    <Orders/>
                  </ProtectedRoute>
      },
      {
        path: 'clientes',
        element:  <ProtectedRoute>
                    <Clients/>
                  </ProtectedRoute>
      },
      {
        path: 'cadastrar-categoria',
        element:  <ProtectedRoute>
                    <RegisterCategory />
                  </ProtectedRoute>
        
      },
      {
        path: 'cadastrar-produto',
        element:  <ProtectedRoute>
                    <RegisterProduct />
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
                       <UserProfile />
                      </ProtectedRoute>
          },
          {
            path: 'configuracoes',
            element:  <ProtectedRoute>
                        <UserSettings />
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
