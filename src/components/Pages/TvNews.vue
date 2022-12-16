<template>
    <h1 class="danger">Bieżące aktualności</h1>
  <p>Podstrona nr: {{spageNumber}} </p>
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
    
   
    setTimeout(function(){},1000);
    console.log(this.$store.state.channelContents.News.topNews);
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
    this.$store.dispatch('getNews','top');
    this.$store.dispatch('getNews','health');
    this.$store.dispatch('getNews','science');
    this.$store.dispatch('getNews','business');
    this.$store.dispatch('getNews','entertainment');
    this.$store.dispatch('getNews','sports');
    this.$store.dispatch('getNews','technology');  
  }
}
</script>