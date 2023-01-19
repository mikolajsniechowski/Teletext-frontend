<template>
  <div v-if="$store.state.user.isLogged">
    <h1>Witaj {{ $store.state.user.name }}</h1>
    <button type="button" v-on:click="announcementForm()">Dodaj ogłoszenie</button>
    <br />
    <button type="button" v-on:click="pollsView">Wypełnij ankiety</button>
    <br>
    <button type="button" v-on:click="userannouncementsView">Zobacz swoje ogłoszenia</button>
  </div>
  <div v-else>
    <h1>Jesteś niezalogowany</h1>
    <p> Zaloguj się aby móc zobaczyć zawartość strony</p>
  </div>
</template>

<script>

export default {
  name: "ProfileView",
  methods: {
    
    announcementForm() {
      this.$router.replace({ name: "AnnouncementForm" });
    },
    pollsView() {
      this.$router.replace({ name: "Polls" });
    },
    userannouncementsView(){
      this.$router.replace({name:"UserAnnouncement"});
    }
  },
  mounted()
  {
    if(localStorage.getItem("userTokenAccess"))
    {
      this.$store.commit('getUserInfo')
    }
  }
  
}
</script>

<style scoped>
button {
  margin: 5px;
  padding: 2px;
}
</style>