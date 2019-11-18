<template>
  <div class='container'>
    <nav-bar/>
    <router-view/>
  </div>
</template>

<script>
import NavBar from "./components/Navbar";

export default {
  name: "App",
  components: {
    "nav-bar": NavBar
  }
};
</script>
