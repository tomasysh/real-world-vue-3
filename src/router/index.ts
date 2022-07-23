import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import EventList from '@/views/EventList.vue';
import EventDetails from '@/views/EventDetails.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'EventList',
    component: EventList,
    props: (route) => ({ page: (+route.query.page!) || 1})
  },
  {
    path: '/event/:id',
    name: 'EventDetails',
    // NOTE: 可以使用 function 格式化 params, query 後回傳。
    props: (route) => ({ eventId: route.params.id }),
    // props: true,
    component: EventDetails
  },
  {
    path: '/about',
    name: 'About',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () =>
      import(/* webpackChunkName: 'about' */ '../views/About.vue'),
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
