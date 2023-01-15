<template>
    <div id="login">
        <h1>Logowanie</h1>
      <br />
      <form @submit.prevent="loginUser">
        <input type="text" name="email" v-model="input.email" placeholder="E-mail" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
       <br /> <button type="submit">Zaloguj się</button> <br />
        </form>
    </div>
</template>

<script>
export default {
  data() {
    return {
      input: {
        email: "",
        password: ""
      }
    };
  },
  methods: {
    async loginUser() {
      try {
        let response = await this.http.post("https://teletextbackend.azurewebsites.net/accounts/api/token/", this.input);
        let token = response.data.data.token;
        localStorage.setItem("user", token);
        // navigate to a protected resource
        this.$router.push("/profile");
      } catch (err) {
        console.log(err.response);
      }
    }
  }
};
</script>

<style>
</style>