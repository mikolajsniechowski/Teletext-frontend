import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
import TVScreen from "@/components/TVScreen";
import LoginView from "@/views/LoginView";
import SignUpView from "@/views/SignUpView";
import ProfileView from "@/views/ProfileView";
import AnnouncementFormView from "@/views/AnnouncementFormView";
import PollsView from "@/views/PollsView";
import AboutView from "@/views/AboutView";
import UserAnnouncementsView from "@/views/UserAnnouncementsView"
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
      component: ProfileView
    },
    {
      path: "/announcementform",
      name: "AnnouncementForm",
      component: AnnouncementFormView
    },
    {
      path: "/polls",
      name: "Polls",
      component: PollsView
    },
    {
      path: "/userannouncement",
      name: "UserAnnouncement",
      component: UserAnnouncementsView
    },
    {
      path:"/aboutus",
      name: "Aboutus",
      component:AboutView
    }
]


const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
})

export default router
