<template>
    <v-app>
        <app-toolbar />
        <v-content>
            <v-container fluid>
				<vue-progress-bar />
				<router-view />
			</v-container>
        </v-content>
        <app-footer />
    </v-app>
</template>

<script>
	import { mapGetters, mapActions } from "vuex";
    import Toolbar from "./components/app/Toolbar";
    import Footer from "./components/app/Footer";

    export default {
        name: "App",
        components: {
            "app-toolbar": Toolbar,
            "app-footer": Footer
        },
        beforeMount() {
			this.loginUserAutomatically();
		},
		computed: {
			...mapGetters(["authRoutes"]),
		},
		methods: {
			...mapActions(["setAuth", "setToken","logout"]),
			loginUserAutomatically() {
				if (this.$cookies.isKey("oauth") && this.$cookies.isKey("user")) {
					this.setToken({ token: this.$cookies.get("oauth"), remember: true });
					this.setAuth({ user :this.$cookies.get("user"), remember: true });
					axios.get(this.authRoutes.profile).then(response=>{
						this.setAuth({ user: response.data, remember: true });
					}).catch(()=>{
						this.logout();
					});
				}
			},
		}
    };
</script>
