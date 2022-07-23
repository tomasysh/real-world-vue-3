import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import EventList from '@/views/EventList.vue';
import EventLayout from '@/views/Event/Layout.vue';
import EventDetails from '@/views/Event/Details.vue';
import EventRegister from '@/views/Event/Register.vue';
import EventEdit from '@/views/Event/Edit.vue';

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
        component: EventEdit
      }
    ]
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
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
