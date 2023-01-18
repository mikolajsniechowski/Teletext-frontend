<template>
    <h1 class="danger">{{ $store.state.subpageState.subpageContent.title }}</h1>
    <div v-if="this.$route.params.page == $store.state.channelContents.Surveys.range[0]">
    <div v-for="(item) in $store.getters.SubPagination" class="row" :key="item">
      <div class="col-10">
        {{item[0]}} 
      </div>
      <div class="col-2 ">
        {{item[1]}}
      </div> 
  </div>
  </div>
  <div v-if="this.$route.params.page > $store.state.channelContents.Surveys.range[0] && this.$route.params.page <= $store.state.channelContents.Surveys.range[1]">
    <div class="row">
      <div class="col">
       <p> Odpowiedź</p>
      </div>
      <div class="col">
       <p>Liczba oddanych głosów  </p> 
      </div>
    </div>
    <div v-for="(item) in $store.getters.SubPagination[0][1]" class="row" :key="item">
       <div class="col"><p>{{item[0]}} </p> </div><div class="col"> <p>{{ item[1]}} </p></div> 
  </div>
  </div>
</template>
<script>
export default {
  name: 'TvSurveys',
  data() {
    return {
      spageNumber: 1
    }
  },
  created() {
    this.$watch(
      () => this.$route.params,
      () => {

        if(this.$route.params.subpage == null )
        {
          this.spageNumber =1
        }
        else
        {
          this.spageNumber = this.$route.params.subpage
        }
      }
    )
  },
  mounted() {
    let temp = this.$route.params.subpage
    if(temp == null)
    {
      this.spageNumber = 1
    }
    else
    {
      this.spageNumber = this.$route.params.subpage;
    }
  }
}
</script>