import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Home.vue';
import Login from '../views/Login.vue';
import Displine from '../views/Displine.vue';
import CloudNote from '../views/CloudNote.vue';
import UpdatePwd from '../views/UpdatePwd';
import UpdateNick from '../views/UpdateNick';
import UpdateInviteCode from '../views/UpdateInviteCode';
import ProjectItem from '@/components/ProjectItem.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home,
    children: [
      {
        path: '/update_pwd',
        component: UpdatePwd,
      },
      {
        path: '/update_nick',
        component: UpdateNick,
      },
      {
        path: '/update_invitecode',
        component: UpdateInviteCode,
      },
      {
        path: '/',
        component: ProjectItem,
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: Login,
  },
  {
    path: '/displine',
    name: 'Displine',
    component: Displine,
  },
  {
    path: '/cloud_note',
    name: 'CloudNote',
    component: CloudNote,
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
