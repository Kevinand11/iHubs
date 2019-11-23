<template>

</template>

<script>
    import { mapActions,mapGetters } from "vuex"

    export default {
        name:"Login",
        data(){
            return {
                form: new Form({
                    email: '',
                    password: ''
                }),
                rememberMe:true,
                submitted:false,
                busy:false,
                visible:false,
            }
        },
        computed:{
            ...mapGetters(["getIntended","getAuth","authRoutes"]),
            isEmpty(){ return !(this.form.email && this.form.password) }
        },
        methods:{
            ...mapActions(["setAuth","setToken","clearIntended"]),
            loginUser(){
                this.busy = true;
                this.submitted = true;
                this.$Progress.start();
                this.form.post(this.authRoutes.login).then(response=>{
                    this.setToken({ token: response.data.token, remember: this.rememberMe });
                    axios.get(this.authRoutes.profile).then(response=>{
                        this.setAuth({ user: response.data, remember: this.rememberMe });
                        this.busy = false;
						this.$router.push(this.getIntended);
						this.clearIntended();
						this.$Progress.finish();
						new toast({ type: 'success', title: "Logged in successfully!" });
					}).catch(()=>{
                        this.busy = false;
						this.$Progress.fail();
						new toast({ type: 'error', title: "Error retrieving profile" });
					});
                }).catch(()=>{
					this.busy = false;
					this.$Progress.fail();
					new toast({ type: 'error', title: this.$t('loginError') });
                });
            },
        }
    }
</script>
