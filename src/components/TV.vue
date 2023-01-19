<template>
  <div class="contrainer d-flex justify-content-center">
    <div id="tv">
      <div v-if="loaded" >
      <router-view/> 
      </div>
      <div v-if="!loaded" >
      <p><img class="tvnoise" src="@/assets/gifnoise2.gif"></p>
      </div>
        <div id="selector" class="row d-flex justify-content-center "> 
          <button v-on:click="IdMinus" class="btn">PREVIOUS</button>
          <button  v-on:click="subpageIdMinus" class="btn"> &lt; </button>
          <div class="form-group">
            <input class="inputnum" type="number" v-model="gotopage" name="quantity" min="0" max="99">
    </div>
    <button class="btn btn-danger" v-on:click="goToPage">GO</button>
      <button v-on:click="subpageIdPlus" class="btn"> &gt; </button>
      <button v-on:click="IdPlus" class="btn">NEXT</button>
      </div>
      <nav v-if="$store.state.subpageState.hasSubpages" aria-label="Page navigation example" class="row d-flex justify-content-center">
  <ul class="pagination row d-flex justify-content-center " >
    <li v-for="n in $store.state.subpageState.subpageContent.maxPage" :key="n" class="page-item "><a class="page-link text-dark" v-on:click="getToSubpage(n)" ><b  v-if="n == this.$store.state.subpageState.subpageContent.sPageNumber"> {{n}} </b> <i  v-if="n != this.$store.state.subpageState.subpageContent.sPageNumber"> {{n}}</i></a></li>
  </ul>
</nav>
      </div>
  </div>
      
  </template>
<script>
//import TVScreen from './TVScreen.vue'
export default {
  name: 'TV',
  data () {
    return {
      idscreen: this.$route.params.page,
      isAvaible: true,
      idsubpagescreen:this.$route.params.subpage,
      loaded: false,
      gotopage: null,
    }
  },
  //components: {
   // TVScreen
  //},
  async created(){
    this.$watch(
      () => this.$route.params,
      () => {
        this.idscreen = this.$route.params.page
      }
    )
    if(!this.$store.state.channelContents.Weather.lodz.length)
    {
      try{
        await this.$store.dispatch('getProgram');  
      }catch{
        console.log("Program is not loaded. Please reload the page")
        this.$store.dispatch('MockProgram');
      }
  this.$store.dispatch('getBitcoinInfo');
    this.$store.dispatch('getGlobalInfo');
    this.$store.commit('getCurrenciesData'); 
  this.$store.dispatch('getCurrenciesRateBuySell');
  this.$store.dispatch('getCurrenciesRate');
  this.$store.dispatch('getGoldPrices');
  this.$store.commit('getWeatherData');
  this.$store.dispatch('getWeatherParams');
   await this.$store.dispatch('getAnnouncementsCategories');
    this.$store.dispatch('getAllSurveys');
  this.$store.dispatch('getMetalPrices');
 this.$store.commit('setWeatherArrays');
    this.$store.dispatch('getNews','top');
  this.$store.dispatch('getNews','health');
  this.$store.dispatch('getNews','science');
    this.$store.dispatch('getNews','business');
    this.$store.dispatch('getNews','entertainment');
    this.$store.dispatch('getNews','sports');
    this.$store.dispatch('getNews','technology');
    this.loaded = true;
    }
    else
    {
      this.loaded = true;
    }
  },
  methods: {
    IdPlus () {
      ++this.idscreen
      this.idsubpagescreen=1
      this.$store.commit('setHasSubpage',false)
      this.$store.commit('resetSubpage')
      this.$router.push({ name: 'tvscreen', params: { page: this.idscreen } })
    },
    IdMinus () {
      --this.idscreen
      this.idsubpagescreen=1
      this.$store.commit('setHasSubpage',false)
      this.$store.commit('resetSubpage')
      this.$router.push({ name: 'tvscreen', params: { page: this.idscreen } })
    },
    subpageIdPlus () {
      if(this.idsubpagescreen != null)
      {
        ++this.idsubpagescreen
        this.$router.push({ name:'tvscreen.subpage', params: {subpage: this.idsubpagescreen}})
      }
      else
      {
        this.idsubpagescreen=1
        this.$router.push({ name:'tvscreen.subpage', params: {subpage: this.idsubpagescreen}})
      }

    },
    subpageIdMinus ()
    {
      if(this.idsubpagescreen != null)
      {
        --this.idsubpagescreen
        this.$router.push({ name:'tvscreen.subpage', params: {subpage: this.idsubpagescreen}})
      }
      else
      {
        this.idsubpagescreen=1
        this.$router.push({ name:'tvscreen.subpage', params: {subpage: this.idsubpagescreen}})
      }
    },
    getToSubpage(subpageNumber)
    {
      this.$router.push({ name:'tvscreen.subpage', params: {subpage: subpageNumber}})
    },
    goToPage()
    {
      this.$router.push({name: 'tvscreen', params: { page: this.gotopage }})
      this.gotopage = null 
    }
    },
  computed: {
    getParseId () {
      return parseInt(this.idscreen)
    },
    getParsesubpageId () {
      return parseInt(this.idsubpagescreen)
    }
  },
  mounted() {
  this.$store.commit('getNow')
}
}
</script>
  <!-- Add "scoped" attribute to limit CSS to this component only -->
  <style scoped  src="../assets/css/styleHome.css"></style>
