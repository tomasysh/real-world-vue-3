import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import EventList from '@/views/EventList.vue';
import EventLayout from '@/views/Event/Layout.vue';
import EventDetails from '@/views/Event/Details.vue';
import EventRegister from '@/views/Event/Register.vue';
import EventCreate from '@/views/EventCreate.vue';
import EventEdit from '@/views/Event/Edit.vue';
import NotFound from '@/views/NotFound.vue';
import NetworkError from '@/views/NetworkError.vue';
import EventService from '@/services/EventService';
import NProgress from 'nprogress';
import GStore from '@/reactive';
import ErrorDisplay from '@/views/ErrorDisplay.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({ page: (+route.query.page!) || 1})
  },
  {
    path: '/events/:id',
    name: 'EventLayout',
    // NOTE: 可以使用 function 格式化 params, query 後回傳。
    // props: (route) => ({ eventId: route.params.id }),
    props: true,
    component: EventLayout,
    beforeEnter: (to) => {
      return EventService.getEvent(to.params.id)
        .then((response: any) => {
          GStore.event = response.data;
        })
        .catch((error: any) => {
          if (error.response && error.response.status == 404) {
            return {
              name: '404Resource',
              params: { resource: 'event' }
            };
          } else {
            return { name: 'NetworkError' };
          }
        })
    },
    children: [
      {
        path: '',
        name: 'EventDetails',
        component: EventDetails
      },
      {
        path: 'register',
        name: 'EventRegister',
        component: EventRegister
      },
      {
        path: 'edit',
        name: 'EventEdit',
        component: EventEdit,
        meta: { requireAuth: true }
      }
    ]
  },
  {
    path: '/eventCreate',
    name: 'EventCreate',
    component: EventCreate
  },
  {
    path: '/event/:afterEvent(.*)',
    redirect: (to) => ({ path: `/events/${ to.params.afterEvent }` })
  },
  {
    path: '/about-us',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'about' */ '../views/About.vue'),
    alias: '/about'
  },
  {
    path: '/:catchAll(.*)',
    name: 'NotFound',
    component: NotFound
  },
  {
    path: '/404/:resource',
    name: '404Resource',
    component: NotFound,
    props: true
  },
  {
    path: '/networkError',
    name:  'NetworkError',
    component: NetworkError
  },
  {
    path: '/error/:error',
    name: 'ErrorDisplay',
    props: true,
    component: ErrorDisplay
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
  scrollBehavior(to, form, savedPosition) {
    if (savedPosition) {
      return savedPosition;
    } else {
      return { top: 0 };
    }
  }
});

router.beforeEach((to: any, from: any) => {
  NProgress.start()

  const notAuthorized = true
  if (to.meta.requireAuth && notAuthorized) {
    GStore.flashMessage = 'Sorry, you are not authorized to view this page'

    setTimeout(() => {
      GStore.flashMessage = ''
    }, 3000)

    if (from.href) { // <--- If this navigation came from a previous page.
      return false
    } else {  // <--- Must be navigating directly
      return { path: '/' }  // <--- Push navigation to the root route.
    }
  }
})

router.afterEach(() => {
  NProgress.done()
});

export default router;
