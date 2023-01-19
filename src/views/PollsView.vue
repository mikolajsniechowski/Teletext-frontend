<template>
     <div v-if="$store.state.user.isLogged" class="content text-dark">
      <h1>Dostępne ankiety</h1>
      <div class="table-responsive">
        <table class="table table-dark">
        <tr class="bg-warning">
          <td>Pytanie</td>
          <td> Odpowiedzi </td>
        </tr>
      <tr  v-for="(item) in $store.state.user.allSurveys" :key="item.id">
        <td class="bg-danger"> {{ item.survey_question}} </td>
        <td class="bg-success" v-for="(subitem,subindex) in item.choicesArray" :key="subitem.id">  
          <input type="checkbox" :id="subindex" :value="{id:subitem.id,poll:subitem.poll,choice_name:subitem.choice_name}" v-model="checkedAnswers" ><label :for="subindex">{{ subitem.choice_name }}</label>
        </td>
      </tr>
    </table>
      </div>
      
    <button class="btn btn-light" v-on:click="submitAnswers">Wyślij odpowiedzi</button>
    </div>
    <div v-else>
    <h1>Jesteś niezalogowany</h1>
    <p> Zaloguj się aby móc zobaczyć zawartość strony</p>
  </div>
</template>

<script>
export default {
  name: "PollsView",
  data() {
    return {
      checkedAnswers: []
    }
  },
  mounted()
  {
    if(localStorage.getItem("userTokenAccess"))
    {
      this.$store.commit('getUserInfo');
      this.$store.dispatch('getOnlyAllSurveys');
    }
  },
  methods:{
    submitAnswers(){
      this.$store.dispatch('voteSurvey',this.checkedAnswers);
    }
  }
}

</script>

<style scoped>

</style>