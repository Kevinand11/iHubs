<template>
	<v-app-bar :color="appInfo.primary" dark height="120px" max-height="120px" elevation="24" class="ma-1">
		<img src="../../assets/logo.png" height="80px" alt="" :class="{ 'hidden-sm-and-down': getModel || showLang }">
		<v-toolbar-title class="display-3 ml-2" :class="{ 'hidden-sm-and-down': getModel || showLang }">{{ appInfo.name }}</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items v-if="!getModel">
			<v-btn text :to="link.route" v-for="link in navLinks" :key="link.id" class="mx-3">
				<v-icon size="50px">{{ link.icon }}</v-icon>
			</v-btn>
			<v-btn text @click="toggleModel" class="mx-3">
				<v-icon size="50px">fas fa-search</v-icon>
			</v-btn>
			<v-menu bottom left offset-y>
				<template v-slot:activator="{ on }">
					<v-btn text class="mx-3" v-on="on">
						<v-icon size="50px">fas fa-bars</v-icon>
					</v-btn>
				</template>
				<v-list :color="appInfo.primary" dark class="pa-2" v-if="isLoggedIn">
					<v-list-item to="/profile">
						<v-list-item-icon>
							<v-icon size="50px">fas fa-user</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title class="display-1">My Profile</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
					<v-list-item @click="logoutUser">
						<v-list-item-icon>
							<v-icon size="50px">fas fa-sign-out-alt</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title class="display-1">Logout</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
				<v-list v-else :color="appInfo.primary" dark class="pa-2">
					<v-list-item v-for="link in notAuth" :key="link.id" :to="link.route">
						<v-list-item-icon>
							<v-icon size="50px">{{ link.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title class="display-1">{{ link.name }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-toolbar-items>
		<v-text-field hide-details v-model="search" prepend-icon="close" append-icon="search" single-line
			v-if="getModel" @click:prepend="toggleModel" @click:append="searchIt" @click.prevent="searchIt"
			placeholder="Search" @focusout="toggleModel" text auotomplete="search" large></v-text-field>
	</v-app-bar>
</template>

<script>
    import { mapGetters, mapActions } from 'vuex';

    export default {
        name: "Toolbar",
        data(){
            return {
            	model: false,
                search: "",
                navLinks:[
                    {id:1, name:'Home', icon:'fas fa-home', route:'/'},
					{id:2, name:'Alerts', icon:'fas fa-bell', route:'/alerts'},
					{id:3, name:'Saved', icon:'fas fa-folder-open', route:'/saved'}
				],
				notAuth: [
					{id:1, name:'Login', icon:'fas fa-sign-in-alt', route:'/login'},
					{id:2, name:'Register', icon:'fas fa-user-plus', route:'/register'},
				],
				showLang: false,
            }
        },
        computed:{
            ...mapGetters(['appInfo','getLogo','isLoggedIn']),
			getModel(){ return this.model },
        },
		methods:{
			...mapActions(['logout']),
			toggleModel(){
        		this.model = !this.model;
				this.search = '';
			},
			searchIt(){
        		if(this.search){
					console.log(this.search);
					this.search = '';
				}
			},
			logoutUser(){
				new swal({
					title: "Logout?",
					type: 'warning',  showCancelButton: true,
					confirmButtonColor: '#3085d6',  cancelButtonColor: '#d33',
                    confirmButtonText: "Yes, logout?",
                }).then((result) => {
                    if (result.value) {
						this.$Progress.start();
						this.logout();
						this.$router.push("/login");
						this.$Progress.finish();
						new toast({
							type: 'success',
							title: 'Logged out successfully',
						});
					}
				});
			}
		}
    }
</script>
