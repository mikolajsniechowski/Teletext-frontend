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
              <a class="nav-link" href="#"> Ogłoszenia </a>
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
            <li class="nav-item" @click="logUserOut">
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
    Nie wszystkie prawa zastrzeżone
  </div>
      </footer>
 </div>
</template>

<script>
import VueJwtDecode from "vue-jwt-decode";
export default {
  data() {
    return {
      user: {},
      loaded: false,
    };
  },
  methods: {
    getUserDetails() {
      // get token from localstorage
      let token = localStorage.getItem("user");
      try {
      //decode token here and attach to the user object
      let decoded = VueJwtDecode.decode(token);
      this.user = decoded;
      } catch (error) {
        // return error in production env
        console.log(error, 'error from decoding token')
      }
    },
    logUserOut() {
      localStorage.removeItem("user");
      this.$router.push("/login");
    },
  },
    
created() {
    this.getUserDetails(); 
  }
};
</script>

<style src="@/assets/css/bootstrap.css" type="text/css">
</style>
