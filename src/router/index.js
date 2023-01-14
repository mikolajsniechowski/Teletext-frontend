import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TVScreen from "@/components/TVScreen";
import LoginView from "@/views/LoginView";
import SignUpView from "@/views/SignUpView";
import ProfileView from "@/views/ProfileView";
import AnnouncementFormView from "@/views/AnnouncementFormView";
import store from "../store/index";
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
    },
    {
      path: "/profile",
      name: "profile",
      component: ProfileView,
      meta: { requiredAuth: true}
    },
    {
      path: "/announcementform",
      name: "AnnouncementFormView",
      component: AnnouncementFormView
    }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

router.beforeEach((to,from, next) => {
    console.log(store.getters["auth/getAuthData"].token);
    if(!store.getters["auth/getAuthData"].token){
        const access_token = localStorage.getItem("access_token");
        const refresh_token = localStorage.getItem("refresh_token");
        if(access_token){
            const data = {
                access_token:access_token,
                refresh_token:refresh_token
            };
            store.commit('auth/saveTokenData',data);
        }
    }
    const auth = store.getters["auth/isTokenActive"];

    if(to.fullPath == "/"){
        return next();
    }
    else if(auth && !to.meta.requiredAuth){
        return next({path:"/tv"});
    }
    else if(!auth && to.meta.requiredAuth){
        return next({path: '/login'});
    }

    return next();
});

export default router
