<template>
  <div class="container">
    <div class="row">
        <h1  style="background-color: green;" class="headerstyle">Spis treści</h1>
    </div>
    <div v-for="(item) in $store.getters.Pagination" class="row" :key="item.indexOf()">
      <div class="col">
        <p>{{item[0]}} </p>
      </div>
      <div class="col">
        <p>{{item[2]}} </p>
      </div>
  </div>
         
    </div> 
</template>
<script>
export default {
  name: 'TvContents',
  data() {
    return {
      spageNumber: 1,
      contents:[''],
      limitAtPage:2,
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
    this.contents = this.$store.getters.getContents
    const payload = {'key1': this.contents,'key2':this.limitAtPage,'key3':this.$store.state.channelContents.Contents.range[0]} 
    this.$store.commit('setPageParameters',payload)
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
<style scoped  src="@/assets/css/styleHome.css"></style>