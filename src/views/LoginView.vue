<template>
    <div id="login">
        <h1>Logowanie</h1>
      <br />
      <form>
        <input type="text" name="email" v-model="input.email" placeholder="E-mail" />
        <input type="password" name="password" v-model="input.password" placeholder="Password" />
       <br /> <button type="submit" >Zaloguj się</button> <br />
        </form>
    </div>
</template>

<script>
import {mapActions, mapGetters} from 'vuex';
export default {
    data(){
        return {
            input: {
              email: "",
              password: ""
            }
          };
    },
    computed:{
      ...mapGetters('auth',{
        getterLoginStatus:'getLoginStatus'
      })
    },
    methods:{
        ...mapActions('auth',{
          actionLogin:'login'
        }),
        async login(){
           await this.actionLogin({email:this.email, password:this.password});
           if(this.getterLoginStatus === 'success'){
             alert('login sucess');
           }else{
             alert('failed to login')
           }
        }
    }
};
</script>

<style>
</style>