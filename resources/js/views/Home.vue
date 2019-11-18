<template>
    <div class="container row my-3">
        <table class="table table-striped table-condensed">
            <thead>
                <tr>
                    <th>Id</th>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Password</th>
                    <th></th>
                </tr>
            </thead>
            <tbody>
                <tr v-for="user in allUsers" :key="user.id">
                    <td>{{user.id}}</td>
                    <td>{{user.name}}</td>
                    <td>{{user.email}}</td>
                    <td>{{user.password}}</td>
                    <td>
                        <a><i class="fas fa-pen text-warning"></i></a>
                        &nbsp;|&nbsp;
                        <a><i class="fas fa-trash text-danger"></i></a>
                    </td>
                </tr>
            </tbody>
        </table>
    </div>
</template>

<script>
import { mapGetters, mapActions } from "vuex";

export default {
    name: "home",
    data(){
        return {};
    },
    methods: {
        ...mapActions([]),
    }, 
    computed: {
        ...mapGetters(["allUsers"]),
    }
}
</script>


