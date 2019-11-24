const Home = () => import("../views/Home.vue");

const Profile = () => import("../views/auth/Profile.vue");
const Login = () => import("../views/auth/Login.vue");
const Register = () => import("../views/auth/Register.vue");

const NotFound = () => import("../views/NotFound.vue");

export default [
	{ path: "/", name: "Home", component: Home },
	{ path: "/login", name: "Login", component: Login, meta: { isAuthRoute: true } },
	{ path: "/register", name: "Register", component: Register, meta: { isAuthRoute: true } },
	{ path: "/profile", name: "Profile", component: Profile, meta: { requiresAuth: true } },
	{ path: "*", name: "NotFound", component: NotFound }
];
