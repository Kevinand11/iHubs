import Vue from "vue";

Vue.filter("example",(text)=>{
	return text + 'Filtered'
});