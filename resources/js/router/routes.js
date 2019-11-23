const Home = () => import("../views/Home.vue");

const Login = () => import("../views/auth/Login.vue");
const Register = () => import("../views/auth/Register.vue");

const NotFound = () => import("../views/NotFound.vue");

export default [
	{ path: "/", name: "Home", component: Home },
	{ path: "/login", name: "Login", component: Login },
	{ path: "/register", name: "Register", component: Register },
	{ path: "*", name: "NotFound", component: NotFound }
];
