<template>
    <h1 class="danger">{{ $store.state.subpageState.subpageContent.title }}</h1>
    <div v-if="this.$route.params.page == $store.state.channelContents.Program.range[0]">
    <div v-for="(item) in $store.getters.SubPagination" class="row" :key="item">
      <div class="col-10">
        {{item[0]}} 
      </div>
      <div class="col-2 ">
        {{item[1]}}
      </div> 
  </div>
  </div>
  <div v-if="this.$route.params.page > $store.state.channelContents.Program.range[0] && this.$route.params.page <= $store.state.channelContents.Program.range[1]">
    <div class="programrow">
      <div v-for="(item) in $store.getters.SubPagination[0]" class="programstyle" :key="item">
        <i class="timecolor">{{ item.slice(0,5) }} </i> {{ item.slice(5) }} <br>
      </div>
    </div>
    
  </div>
</template>
<script>
export default {
  name: 'TvProgram',
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
<style scoped  src="@/assets/css/styleHome.css"></style>