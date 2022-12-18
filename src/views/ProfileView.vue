<template>
  <div>
    <h1>Profil (tutaj imię)</h1>
    <button type="button" v-on:click="announcementform()">Dodaj ogłoszenie</button>
    <br />
    <button type="button">Wypełnij ankiety</button>
  </div>
</template>

<script>
export default {
  name: "ProfileView",
  methods: {
    announcementform() {
      this.$router.replace({ name: "AnnouncementFormView" });
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