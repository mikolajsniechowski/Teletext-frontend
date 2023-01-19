<template>
    <div id="login">
        <h1>Logowanie</h1>
      <br />
      <form @submit.prevent="loginUser">
        <input type="text" name="email" v-model="email" placeholder="E-mail" />
        <input type="password" name="password" v-model="password" placeholder="Password" />
       <br /> <button type="submit" v-on:click="login">Zaloguj się</button> <br />
        </form>
    </div>
</template>

<script>
export default {
  name: "LoginView",
  data() {
    return {
        email: "",
        password: ""
    };
  },
  methods: {
    async login() {
      let email = this.email;
      let password = this.password;
      let payload= {email:email,password:password};
      this.$store.dispatch('loginUser',payload);
      this.email = null;
      this.password = null;
    }
  }
};
</script>

<style>
</style>