<template>
    <h1 class="danger">{{ $store.state.subpageState.subpageContent.title }}</h1>
    <div v-if="this.$route.params.page == $store.state.channelContents.Announcements.range[0]">
    <div v-for="(item) in $store.getters.SubPagination" class="row" :key="item">
      <div class="col-10">
        {{item[0]}} 
      </div>
      <div class="col-2 ">
        {{item[1]}}
      </div> 
  </div>
  </div>
  <div v-if="this.$route.params.page > $store.state.channelContents.Announcements.range[0] && this.$route.params.page <= $store.state.channelContents.Announcements.range[1]">
    <div v-for="(item) in $store.getters.SubPagination" class="row" :key="item">
      <div class="col">
       <h3> <b>{{item[0]}} </b><br>  {{ item[1]}}</h3> <hr>
      </div>
  </div>
  </div>
</template>
<script>
export default {
  name: 'TvAnnouncements',
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