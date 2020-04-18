<template>
    <v-card class="my-5 pa-3" elevation="24">
        <!-- <v-card-title primary-title>
            <v-layout align-content-center>
                <v-flex>
                    <img style="width: 100px;" src="../../assets/boy.png" alt="" class="rounded-circle"/><br>
                    <v-card-text class="display-1">{{ user.name }}</v-card-text>
                    <v-card-text class="headline">{{ user.role | roles }}</v-card-text>
                    <v-btn>Suscribe</v-btn>
                </v-flex>
            </v-layout>
        </v-card-title>
        <v-card-actions>
            <v-card-text class="headline">Tags: {{ post.id }}&nbsp;|&nbsp;{{ post.tags.join(" | ") }}</v-card-text>
            <v-spacer></v-spacer>
            <v-btn fab x-large :color="appInfo.lighter" class="mx-5">
                <v-icon color="white">fas fa-download</v-icon>
            </v-btn>
            <v-btn fab x-large :color="appInfo.lighter">
                <v-icon color="white">fas fa-heart</v-icon>
            </v-btn>
        </v-card-actions> -->
    </v-card>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name:"Profile",
        data(){
            return {
                user: {}
            }
        },
        computed: {
            ...mapGetters(['getAuth'])
        },
        mounted(){
            this.user = this.getAuth;
        }
    }
</script>