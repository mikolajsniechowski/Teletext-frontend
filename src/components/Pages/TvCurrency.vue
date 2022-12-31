<template>
  <div class="container">
    <div class="row">
    <div class="col">
      <h1 class="bg-danger">{{ $store.state.subpageState.subpageContent.title }}</h1>
    </div>
  </div>
  <div class="row">
    <div class="col">
      <p>Kurs z dnia: {{$store.state.currentDate}}  </p>
    </div>
  </div>
  <div v-if="this.$route.params.page == $store.state.channelContents.CurrencyRates.range[0]">
    <div v-for="(item) in $store.getters.SubPagination" class="row" :key="item">
      <div class="col">
        <p>{{item[0]}} </p>
      </div>
      <div class="col">
        {{item[1]}}
      </div> 
  </div>
  </div>
  <div v-if="this.$route.params.page == $store.state.channelContents.CurrencyRates.range[0]+1">
    <div class="row">
      <div class="col">
        <p>Waluta </p>
      </div>
      <div class="col">
        <p>Kurs</p>
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
  <div v-if="this.$route.params.page == $store.state.channelContents.CurrencyRates.range[0]+2">
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
        <p>{{item.currency}} </p>
      </div>
      <div class="col">
        {{item.ask}}
      </div> 
      <div class="col">
        {{item.bid}}
      </div> 
    </div>
  </div>
  <div v-if="this.$route.params.page == $store.state.channelContents.CurrencyRates.range[0]+3">
    <div class="row">
      <div class="col">
        <p>Data </p>
      </div>
      <div class="col">
        <p>Cena</p>
      </div>
    </div>
    <div v-for="(item) in $store.getters.SubPagination" class="row" :key="item.id">
      <div class="col">
        <p>{{item.data}} </p>
      </div>
      <div class="col">
        {{item.cena}}
      </div> 
    </div>
  </div>
  <div v-if="this.$route.params.page == $store.state.channelContents.CurrencyRates.range[0]+4">
    <div class="row">
      <div class="col">
        <p>Brak podłączenia do API</p>
      </div>
      <div class="col">
        <p>Cena ($)</p>
      </div>
    </div>
    <div v-for="(item) in $store.getters.SubPagination" class="row" :key="item.id">
      <div class="col">
        <p>{{item[0]}} 
        </p>
      </div>
      <div class="col">
        {{item[1]}}
      </div> 
    </div>
  </div>
  <div class="align-self-end">
    <p> Na podstawie informacji z API NBP oraz Metals-API</p>
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
      }
      else
      {
        this.spageNumber = this.$route.params.subpage
        this.$store.commit('setSPageNumber',this.spageNumber)
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
    this.spageNumber = this.$route.params.subpage
    this.$store.commit('setSPageNumber',this.spageNumber)
  }
},
unmounted() {
  this.$store.commit('setHasSubpage',false)
},
methods: {             
}
}
</script>