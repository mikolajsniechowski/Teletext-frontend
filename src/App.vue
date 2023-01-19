<template>
  <nav>
  </nav>
  <div class="container">
    <div class="jumbotron display-flex bg-info text-center">
        <img src="@/assets/testlogo.png" class="img-fluid mx-auto"/>
    </div>
    <nav class="navbar navbar-expand-lg navbar-light bg-success">
        <div class="collapse navbar-collapse" id="navbarNav">
          <ul class="navbar-nav">
            <li class="nav-item">
              <router-link to="/"> Telegazeta Online </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/aboutus"> O nas </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/signup"> Rejestracja </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/login"> Logowanie </router-link>
            </li>
            <li class="nav-item">
              <router-link to="/profile"> Profil </router-link>
            </li>
            <li v-if="$store.state.user.isLogged" class="nav-item" @click="logUserOut">
               Wyloguj
            </li>
          </ul>
        </div>
      </nav>

    <div class="scroll-container">
      <div class="scroll-text">Message of the day</div>
    </div>
      <div class="row-fluid bg-primary text-center">
      <router-view/> 
      </div>
      <footer>
        <div class="text-center p-3" style="background-color: rgba(0, 0, 0, 0.2);">
    Teletext - projekt zaliczeniowy PIPSI II
  </div>
      </footer>
 </div>
</template>

<script>
export default {
  data() {
    return {
      user: {},
      loaded: false,
    };
  },
  methods: {
    logUserOut() {
      localStorage.clear();
      this.$store.state.user.isLogged =false
      this.$router.push("/login");
    },
  },
    
created() {
    
  }
};
</script>

<style src="@/assets/css/bootstrap.css" type="text/css">
</style>
