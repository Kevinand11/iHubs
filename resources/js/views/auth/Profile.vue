<template>
    <h1>{{ this.getAuth  }}</h1>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name:"Profile",
        computed: {
            ...mapGetters(['getAuth'])
        }
    }
</script>