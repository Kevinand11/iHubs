<template>
    <v-card>
        <v-card-title>Login</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    label="Email Address"
                    v-model="form.email"
                    type="email"
                    autocomplete="email"
                    prepend-icon="mail"
                ></v-text-field>
                <v-text-field
                    label="Enter your password"
                    v-model="form.password"
                    hint="At least 8 characters"
                    min="8"
                    prepend-icon="fas fa-lock"
                    :append-icon="visible ? 'visibility' : 'visibility_off'"
                    @click:append="toggleVisible"
                    :type="visible ? 'text' : 'password'"
                    autocomplete="password"
                ></v-text-field>
                <v-switch label="Remember Me?" v-model="rememberMe"></v-switch>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn to="/register">Register</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click.prevent="loginUser" :loading="busy">Login</v-btn>
        </v-card-actions>
    </v-card>
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
            toggleVisible(){
                this.visible = !this.visible;
            },
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
					new toast({ type: 'error', title: "Invalid credentials" });
                });
            },
        }
    }
</script>
