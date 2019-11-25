<template>
	<v-dialog v-model="dialog" persistent v-if="isLoggedIn">
		<template v-slot:activator="{ on }">
			<v-btn fab :color="appInfo.primary" bottom right
				class="mr-12 mb-12" fixed x-large v-on="on">
				<v-icon color="white">fas fa-plus</v-icon>
			</v-btn>
		</template>
		<v-card>
			<v-card-title >
				<span class="headline">Create Post</span>
			</v-card-title>
			<v-card-text>
				<v-container>
					<v-row>
						<v-col cols="12">
							<v-textarea label="Message" required min=3
								clearable v-model="form.message"
								hint="Message content must contain at least 3 characters"
							></v-textarea>
						</v-col>
						<v-col cols="12">
							<v-text-field label="Tags" required  v-model="tag" min=1 @input="addTag"
								hint="Each post must have at least 1 tag. Use commas to separate tags"
							></v-text-field>
						</v-col>
						<v-col>
							<v-chip close close-icon="close" @click:close="removeTag(index)" :key="index"
								v-for="(tag,index) in form.tags" class="ma-1"
							>{{ tag }}</v-chip>
						</v-col>
					</v-row>
				</v-container>
			</v-card-text>
			<v-card-actions>
				<v-spacer></v-spacer>
				<v-btn @click="dialog=false">Close</v-btn>
				<v-btn @click="createPost" :loading='busy'>Create</v-btn>
			</v-card-actions>
		</v-card>
	</v-dialog>
</template>

<script>
	import { mapGetters } from "vuex";

	export default {
		name: 'FloatingButton',
		data(){
			return {
				dialog: false,
				form: new Form({
					message: "",
					tags: []
				}),
				tag: "",
				busy: false
			}
		},
		computed:{
			...mapGetters(['isLoggedIn','appInfo','postsRoutes'])
		},
		methods: {
			createPost(){
				this.busy = true
				this.$Progress.start();
				this.form.post(this.postsRoutes.create).then(() => {
					this.$Progress.finish();
					this.busy = false;
					this.form.reset();
					this.dialog = false;
					new toast({ type: 'success', title: 'Post created successfully!' });
				}).catch(() => {
					this.$Progress.fail();
					this.busy = false;
					new toast({ type: 'error', title: 'Error creating post!' });
				})
			},
			addTag(e){
				if(e.slice(-1) === ","){
					let tag = this.tag.slice(0,-1).toLowerCase();
					if(!this.form.tags.includes(tag)){
						this.form.tags.push(tag);
					}
					this.tag = "";
				}
			},
			removeTag(index){
				this.form.tags.splice(index,1);
			}
		}
	}
</script>
