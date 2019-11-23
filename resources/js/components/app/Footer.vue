<template>
  	<v-footer dark :color="appInfo.primary">
		<v-card flat tile class="text-center" :class="appInfo.primary" width="100%">
			<v-card-text>
				<v-btn v-for="icon in icons" :key="icon.id" class="mx-3" icon>
					<v-icon size="24px" :color="icon.color" large>{{ icon.name }}</v-icon>
				</v-btn>
			</v-card-text>
            <v-card-text class="headline">
                <span>&copy; {{ new Date().getFullYear() }} - {{ appInfo.name }}</span>
			</v-card-text>
		</v-card>
  	</v-footer>
</template>

<script>
    import { mapGetters } from 'vuex';

    export default {
        name:"Footer",
        data: () => ({
            icons: [
                {id:1, name:'fab fa-facebook', color:"white"},
                {id:2, name:'fab fa-instagram', color:"white"},
                {id:3, name:'fab fa-twitter', color:"white"},
                {id:4, name:'fab fa-whatsapp', color:"white"},
                {id:5, name:'fab fa-linkedin', color:"white"},
            ]
        }),
        computed:{
            ...mapGetters(['appInfo']),
        }
    }
</script>
