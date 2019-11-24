<template>
    <v-card>
        <v-card-title>Login</v-card-title>
        <v-card-text>
            <v-form>
                <v-text-field
                    label="Name"
                    v-model="form.name"
                    type="text"
                    autocomplete="name"
                    prepend-icon="fas fa-user"
                ></v-text-field>
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
                <v-text-field
                    label="Confirm your password"
                    v-model="form.password_confirmation"
                    hint="Passwords must match"
                    min="8"
                    prepend-icon="fas fa-lock"
                    :append-icon="visible ? 'visibility' : 'visibility_off'"
                    @click:append="toggleVisible"
                    :type="visible ? 'text' : 'password'"
                    autocomplete="password"
                ></v-text-field>
            </v-form>
        </v-card-text>
        <v-card-actions>
            <v-btn to="/login">Login</v-btn>
            <v-spacer></v-spacer>
            <v-btn @click.prevent="regUser" :loading="busy">Register</v-btn>
        </v-card-actions>
    </v-card>
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
                visible: false
            }
        },
        computed:{
            ...mapGetters(["getIntended","authRoutes"]),
            isEmpty(){ return !(this.form.name && this.form.email && this.form.password && this.form.password_confirmation) }
        },
        methods:{
            ...mapActions(["setAuth","setToken","clearIntended"]),
            toggleVisible(){
                this.visible = !this.visible;
            },
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
