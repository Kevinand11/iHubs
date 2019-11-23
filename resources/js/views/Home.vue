<template>
    <div>
        <post v-for="post in posts" :key="post.id" :post="post"/>
        <v-btn color="info" block v-if="more" @click="fetchPosts" :loading="busy">Load More</v-btn>
    </div>
</template>

<script>
    import { mapGetters } from "vuex";
    import Post from "../components/Post";

    export default {
        name: "Home",
        data(){
            return {
                posts: [],
                page: 1,
                more: true,
                busy: false
            };
        },
        methods: {
            fetchPosts(){
                this.busy = true;
                this.$Progress.start();
                axios.get(this.postsRoutes.index + this.page).then((res) => {
                    if(res.status == 200){
                        this.posts.push(...res.data.docs);
                        if(!res.data.pages || this.page == res.data.pages){
                            this.more = false;
                        }
                        this.page++;
                        this.busy = false;
                        this.$Progress.finish();
                    }else{
                        this.busy = false;
                        this.$Progress.fail();
                        new toast({ type: "error", title: "Error fetching posts" });
                    }
                }).catch((err) => {
                    this.busy = false;
                    this.$Progress.fail();
                    new toast({ type: "error", title: "Error fetching posts" });
                });
            }
        },
        computed: {
            ...mapGetters(["postsRoutes"]),
        },
        mounted(){
            this.fetchPosts();
        },
        components: {
            "post": Post
        }
    }
</script>