<template>
    <h1 class="danger">{{ $store.state.subpageState.subpageContent.title }}</h1>
    <div v-if="this.$route.params.page == $store.state.channelContents.News.range[0]">
    <div v-for="(item) in $store.getters.SubPagination" class="row" :key="item">
      <div class="col">
        <p>{{item[0]}} </p>
      </div>
      <div class="col">
        {{item[1]}}
      </div> 
  </div>
  </div>
  <div v-if="this.$route.params.page > $store.state.channelContents.News.range[0] && this.$route.params.page <= $store.state.channelContents.News.range[1]">
    <div class="row" >
      <div style="white-space: pre-wrap;" class="col">
       {{$store.getters.SubPaginationText}} 
      </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'TvNews',
  data() {
    return {
      spageNumber: 1
    }
  },
  created() {
    this.$store.dispatch('getNews','top');
   this.$store.dispatch('getNews','health');
  this.$store.dispatch('getNews','science');
    this.$store.dispatch('getNews','business');
    this.$store.dispatch('getNews','entertainment');
    this.$store.dispatch('getNews','sports');
    this.$store.dispatch('getNews','technology');
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
    this.$store.getters
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