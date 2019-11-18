import Home from "../views/Home.vue";
import NotFound from "../views/NotFound.vue";

export default [
    { path: '/', name: 'Home', component: Home },
    { path: '*', name: 'NotFound', component: NotFound }
]
