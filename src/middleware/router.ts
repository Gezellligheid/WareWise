import { getAuth, onAuthStateChanged } from "firebase/auth";
import { RouteRecordRaw, createRouter, createWebHistory } from "vue-router";
import { getUser } from "./firebase";

const routes: RouteRecordRaw[] = [
  {
    path: "/",
    name: "Home",
    component: () => import("../views/Home.vue"),
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("../views/Login.vue"),
  },
  {
    path: "/firstteam",
    name: "FirstTeam",
    component: () => import("../views/OnboardingTeam.vue"),
  },
  {
    path: "/jointeam",
    name: "Jointeam",
    component: () => import("../views/teams/JoinTeam.vue"),
  },
  {
    path: "/createteam",
    name: "CreateTeam",
    component: () => import("../views/teams/CreateTeam.vue"),
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes,
});

const userIsInATeam = true;

// router.beforeEach((to, from, next) => {
//   onAuthStateChanged(getAuth(), (user) => {
//     if (user) {
//       console.log("User is logged in");
//       // if user goes to the login page, redirect to home
//       // if user has no team redirect to onboarding
//       if (to.path === "/login") {
//         next({ force: true, path: "/" });
//       }
//       if (!userIsInATeam && to.path !== "/firstteam") {
//         next({ force: true, path: "/firstteam" });
//       }
//     }
//   });
//   // next();
// });

const teamOnboardingPages = ["/firstteam", "/jointeam", "/createteam"];

router.beforeEach(async (to, from, next) => {
  const user = await getUser();
  console.log(user);
  if (user != null) {
    console.log("User is logged in");
    if (to.path === "/login") {
      return next({ force: true, path: "/" });
    } else if (!userIsInATeam && !teamOnboardingPages.includes(to.path)) {
      return next({ force: true, path: "/firstteam" });
    } else {
      return next();
    }
  } else {
    console.log("User is not logged in");
    if (to.path != "/login") {
      console.log("Going to login");
      return next({ path: "/login" });
    } else {
      console.log("Going to login");
      return next();
    }
    // return next({ force: true, path: "/login" });
  }
});

export default router;
