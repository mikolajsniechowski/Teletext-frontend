import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TVScreen from "@/components/TVScreen";
import LoginView from "@/views/LoginView";
import SignUpView from "@/views/SignUpView";
const routes = [
  {
    path: '/',
    name: 'home',
    component: HomeView,
    redirect: '/tv/1'
  },
  {
    path: '/tv',
    name: 'tv',
    component: HomeView,
    redirect: '/tv/1',
    children: [
        {
          path: ':page',
          name: 'tvscreen',
          component: TVScreen,
          props: route=> ({ id: parseInt(route.params.page) }),
          children: [
          {
         path: ':subpage',
        name: 'tvscreen.subpage',
        component: TVScreen,
        props: route=> ({id2: parseInt(route.params.subpage)})
      }
    ]
  }
    ]
  },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: "/signup",
      name: "signup",
      component: SignUpView
    }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
