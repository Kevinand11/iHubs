<template>

</template>

<script>
    import { mapActions,mapGetters } from "vuex"

    export default {
        name:"Register",
        data(){
            return {
                form: new Form({
                    name: '',
                    email: '',
                    password: '',
                    password_confirmation:''
                }),
                busy:false,
                submitted:false,
            }
        },
        computed:{
            ...mapGetters(["getIntended","authRoutes"]),
            isEmpty(){ return !(this.form.name && this.form.email && this.form.password && this.form.password_confirmation) }
        },
        methods:{
            ...mapActions(["setAuth","setToken","clearIntended"]),
            regUser(){
                this.busy = true;
                this.$Progress.start();
                this.form.post(this.authRoutes.register).then(response=>{
                    this.setToken({ token: response.data.token, remember: true });
                    axios.get(this.authRoutes.profile).then(response=>{
                        this.setAuth({ user: response.data, remember: true });
                        this.busy = false;
						this.$router.push(this.getIntended);
						this.clearIntended();
						this.$Progress.finish();
						new toast({ type: 'success', title: "User registered successfully!" });
					}).catch(()=>{
                        this.busy = false;
						this.$Progress.fail();
						new toast({ type: 'error', title: "Error retrieving profile" });
					});
                }).catch(()=>{
                    this.busy = false;
					this.$Progress.fail();
					new toast({ type: 'error', title: "Error creating user!" });
                });
            }
        }
    }
</script>
