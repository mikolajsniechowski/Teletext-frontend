<template>
  <div class="container">
    <div class="row">
    <div class="col">
      <h1 class="bg-danger">Kursy walut</h1>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <p>Kurs z dnia: {{$store.state.currentDate}}  </p>
    </div>
  </div>
  <div v-if="this.$route.params.page == $store.state.channelContents.CurrencyRates.range[0]">
    <div class="row">
      <div class="col">
        <p>Waluta </p>
      </div>
      <div class="col">
        <p>Średni Kurs</p>
      </div>
    </div>
    <div v-for="(item) in $store.getters.SubPagination" class="row" :key="item.id">
      <div class="col">
        <p>{{item.name}} </p>
      </div>
      <div class="col">
        {{item.rate}}
      </div> 
  </div>
  </div>
  <div v-if="this.$route.params.page == $store.state.channelContents.CurrencyRates.range[0]+1">
    <div class="row">
      <div class="col">
        <p>Waluta </p>
      </div>
      <div class="col">
        <p>Kupno</p>
      </div>
      <div class="col">
        <p>Sprzedaż</p>
      </div>
    </div>
    <div v-for="(item) in $store.getters.SubPagination" class="row" :key="item.id">
      <div class="col">
        <p>{{item.name}} </p>
      </div>
      <div class="col">
        {{item.buy}}
      </div>
      <div class="col">
        {{item.sell}}
      </div>  
  </div>
  </div>
  <div class="align-self-end">
    <p> Na podstawie informacji z API NBP</p>
  </div>
  </div>
</template>
<script>
export default {
name: 'TvCurrency',
data() {
  return {
    spageNumber: 1,
    currency: [''],
    limitAtPage:3
  }
},
created() {
  this.$watch(
    () => this.$route.params,
    () => {
      if(this.$route.params.subpage == null )
      {
        this.spageNumber =1
        this.$store.commit('setHasSubpage',true)
      }
      else
      {
        this.$store.commit('setHasSubpage',true)
        this.spageNumber = this.$route.params.subpage
        this.$store.commit('setSPageNumber',this.spageNumber)
      }
    }
  ),
  this.$store.commit('getCurrenciesData'); //PRZENNIEŚĆ DO TVSCREEN Z INNYMI
  this.$store.dispatch('getCurrenciesRateBuySell')
  this.$store.dispatch('getCurrenciesRate') ;
  const payload = {'key1': this.$store.state.channelContents.CurrencyRates.currencies,'key2':this.limitAtPage} 
  this.$store.commit('setSubpageParameters',payload)
  this.$store.commit('setHasSubpage',true)
  
},
mounted() {
  
  let temp = this.$route.params.subpage
  if(temp == null)
  {
    this.spageNumber = 1
    this.$store.commit('setHasSubpage',true)
  }
  else
  {
    this.spageNumber = this.$route.params.subpage
    this.$store.commit('setSPageNumber',this.spageNumber)
    this.$store.commit('setHasSubpage',true)
  }
},
unmounted() {
  this.$store.commit('setHasSubpage',false)
},
methods: {             
}
}
</script>