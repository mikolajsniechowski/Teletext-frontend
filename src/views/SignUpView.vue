<template>
    <div id="signup">
        <h1>Rejestracja</h1>
      <br />
      <form @submit.prevent="registerUser">
        <input type="text" name="name" v-model="name" placeholder="Name" />
        <input type="email" name="email" v-model="email" placeholder="E-mail" />
        <input type="password" name="password" v-model="password" placeholder="Password" />
        <input type="password" name="confpassword" v-model="confpassword" placeholder="Confirm Password" />
       <br /> <button type="submit">Zarejestuj się</button> <br />
      </form>
    </div>
</template>
<script>
export default {
  name: "SignUpView",
  data() {
    return {
        email: "",
        name: "",
        password: "",
        confpassword: "",
    };
  },
  methods: {
    async registerUser() {
      if (this.password === this.confpassword) {
        const {email, name, password} = this;
        const res = await fetch(
            "https://teletextbackend.azurewebsites.net/accounts/api/register/",
            {
              method: "POST",
              headers: {
                "Content-Type": "application/json"
              },
              body: JSON.stringify({
                name,
                email,
                password
              })
            }
        );
        const data = await res.json();
        console.log(data);
        this.$router.push("/login");
      } else { console.log("Hasła się nie zgadzają") }
    }
  }
};
</script>

<style>
</style>