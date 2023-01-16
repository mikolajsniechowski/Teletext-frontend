<template>
  <div>
    <h1>Profil</h1>
    <button type="button" v-on:click="announcementForm()">Dodaj ogłoszenie</button>
    <br />
    <button type="button" v-on:click="pollsView">Wypełnij ankiety</button>
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