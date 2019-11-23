<template>
    <v-card :color="appInfo.lighter" class="my-5 pa-3 black--text" elevation="24" hover>
        <v-card-title primary-title>
            <v-layout row wrap>
                <v-flex xs2 class="text-center">
                    <img style="width: 80px;" src="../assets/boy.png" alt=""/>
                </v-flex>
                <v-flex xs10>
                    <p class="display-1 mb-0">{{ post.user.name }}</p>
                    <p class="font-italic mt-0 headline">{{ post.user.role | roles }}</p>
                </v-flex>
            </v-layout>
        </v-card-title>
        <v-card-text class="display-1">{{ post.message }}</v-card-text>
        <v-card-actions>
            <v-card-text class="headline">Tags: {{ post.id }}&nbsp;|&nbsp;{{ post.tags.join(" | ") }}</v-card-text>
            <v-spacer></v-spacer>
            <v-btn fab x-large :color="appInfo.lighter" class="mx-5">
                <v-icon color="white">fas fa-download</v-icon>
            </v-btn>
            <v-btn fab x-large :color="appInfo.lighter">
                <v-icon color="white">fas fa-heart</v-icon>
            </v-btn>
        </v-card-actions>
    </v-card>
</template>

<script>
    import { mapGetters } from "vuex";

    export default {
        name: "Post",
        props: {
            post: { required:true, type: Object }
        },
        computed: {
            ...mapGetters(["appInfo"])
        }
    }
</script>