<template>
	<v-app-bar :color="appInfo.primary" dark height="120px" max-height="120px" elevation="24" class="ma-1">
		<img src="../../assets/logo.png" height="100px" alt="" :class="{ 'hidden-sm-and-down': getModel || showLang }">
		<v-toolbar-title class="white--text display-3 ml-2" :class="{ 'hidden-sm-and-down': getModel || showLang }">{{ appInfo.name }}</v-toolbar-title>
		<v-spacer></v-spacer>
		<v-toolbar-items v-if="!getModel">
			<v-btn text :to="link.route" v-for="link in navLinks" :key="link.id" class="mx-3">
				<v-icon size="50px" :color="appInfo.secondary">{{ link.icon }}</v-icon>
			</v-btn>
			<v-btn text @click="toggleModel" class="mx-3">
				<v-icon size="50px" :color="appInfo.secondary">search</v-icon>
			</v-btn>
			<v-menu bottom left offset-y>
				<template v-slot:activator="{ on }">
					<v-btn text class="mx-3" v-on="on">
						<v-icon size="50px" :color="appInfo.secondary">more_vert</v-icon>
					</v-btn>
				</template>
				<v-list :color="appInfo.primary" dark>
					<v-subheader class="display-1">More ...</v-subheader>
					<v-list-item v-for="link in xLinks" :key="link.id" :to="link.route">
						<v-list-item-icon>
							<v-icon size="40px" :color="appInfo.secondary">{{ link.icon }}</v-icon>
						</v-list-item-icon>
						<v-list-item-content>
							<v-list-item-title class="display-2">{{ link.name }}</v-list-item-title>
						</v-list-item-content>
					</v-list-item>
				</v-list>
			</v-menu>
		</v-toolbar-items>
		<v-text-field hide-details v-model="search" prepend-icon="close" append-icon="search" single-line
			v-if="getModel" @click:prepend="toggleModel" @click:append="searchIt" @click.prevent="searchIt"
			placeholder="Search" @focusout="toggleModel" text auotomplete="search"></v-text-field>
	</v-app-bar>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name: "Toolbar",
        data(){
            return {
            	model: false,
                search: "",
                navLinks:[
                    {id:1, name:'Home', icon:'home', route:'/'},
					{id:2, name:'Alerts', icon:'fas fa-bell', route:'/alerts'},
					{id:3, name:'Saved', icon:'fas fa-download', route:'/saved'}
				],
				xLinks: [
					{id:1, name:'My Profile', icon:'fas fa-user', route:'/profile'},
					{id:2, name:'Login', icon:'fas fa-bell', route:'/login'},
					{id:3, name:'Register', icon:'fas fa-download', route:'/register'},
				 ],
				showLang: false,
            }
        },
        computed:{
            ...mapGetters(['appInfo','getLogo']),
			getModel(){ return this.model },
        },
		methods:{
			toggleModel(){
        		this.model = !this.model;
				this.search = '';
			},
			searchIt(){
        		if(this.search){
					console.log(this.search);
					this.search = '';
				}
			}
		}
    }
</script>
