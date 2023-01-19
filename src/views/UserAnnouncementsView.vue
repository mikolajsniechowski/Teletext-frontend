<template>
    <div v-if="$store.state.user.isLogged" class="content text-dark">
      <h1>Twoje ogłoszenia</h1>
      <table class="table table-dark">
        <tr>
          <td>Tytuł</td>
          <td> Opis </td>
          <td>Status</td>
        </tr>
      <tr class="bg-success" v-for="(item) in $store.state.user.userAnnouncements" :key="item.id">
       <td> {{ item.title}} </td>
       <td> {{ item.description}} </td>
       <td>{{ item.status }}</td>
      </tr>
    </table>
    </div>
    <div v-else>
    <h1>Jesteś niezalogowany</h1>
    <p> Zaloguj się aby móc zobaczyć zawartość strony</p>
  </div>
  </template>

<script>

export default {
  name: "UserAnnouncementsView",
  methods: {
    
  },
  mounted()
  {
    if(localStorage.getItem("userTokenAccess"))
    {
      this.$store.commit('getUserInfo');
      this.$store.dispatch('getUserAnnouncements');
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