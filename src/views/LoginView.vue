<template>
    <div id="login">
        <h1>Logowanie</h1>
      <br />
      <form @submit.prevent="loginUser">
        <input type="text" name="email" v-model="email" placeholder="E-mail" />
        <input type="password" name="password" v-model="password" placeholder="Password" />
       <br /> <button type="submit">Zaloguj się</button> <br />
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
    async loginUser() {
      try {
        const {email, password} = this;
        const res = await fetch(
            "https://teletextbackend.azurewebsites.net/accounts/api/token/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                email,
                password
              })
            }
        );
        const data = await res.json();
        console.log(data);
        let token = data;
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