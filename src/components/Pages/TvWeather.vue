<template>
    <h1 class="danger">{{ $store.state.subpageState.subpageContent.title }}</h1>
    <div v-if="this.$route.params.page == $store.state.channelContents.Weather.range[0]">
    <div v-for="(item) in $store.getters.SubPagination" class="row" :key="item">
      <div class="col-10">
        {{item[0]}} 
      </div>
      <div class="col-2 ">
        {{item[1]}}
      </div> 
  </div>
  </div>
  <div class="table-responsive-md" v-if="this.$route.params.page >= $store.state.channelContents.Weather.range[0]+1 && this.$route.params.page <= $store.state.channelContents.Weather.range[1]">
  <table class="tableweather" >
    <thead>
        <tr class="bg-success">
          <th scope="col" class="align-middle text-center p-1">Miasto</th>
          <th scope="col" class="align-middle text-center p-2">Kiedy</th>
          <th scope="col" class="align-middle text-center p-1">Śr °C</th>
          <th scope="col" class="align-middle text-center p-1">Max Wiatr (km/h)</th>
          <th scope="col" class="align-middle text-center p-1">Deszcz/Śnieg</th>
          <th scope="col" class="align-middle text-center p-1">Warunki</th>
        </tr>
      </thead>
    <tbody v-for="(item) in $store.getters.SubPagination" :key="item.id" >
    <tr v-for="(subitem) in item.params" :key="subitem.id">
      <th scope="row" class="align-middle text-center p-1 ">{{item.city}} </th>
      <th scope="row" class="align-middle text-center p-2 ">{{subitem.dayname}} </th>
      <td class="align-middle text-center p-1">{{subitem.avgtemp}}</td>
      <td class="align-middle text-center p-1">{{subitem.maxwind}}</td>
      <td class="align-middle text-center p-1">{{subitem.chances}}</td>
      <td class="align-middle text-center p-1">{{subitem.conditions}}</td>
    </tr>
    <tr><td colspan="8"> - </td></tr>
  </tbody>
  
  </table>
  </div>
</template>
<script>
export default {
  name: 'TvWeather',
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