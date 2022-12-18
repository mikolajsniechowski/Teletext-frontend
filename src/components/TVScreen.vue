<template>
  <div class="container d-flex">
<div id="screen">
   <TvWelcomeScreen v-if="showWelcome"></TvWelcomeScreen>
   
   <TvCurrency v-if="showCurrency"></TvCurrency>
   <TvNews v-if="showNews"></TvNews>
   <TvNotFound v-if="showNotFound"></TvNotFound>
   <TvContents v-if="showContents"></TvContents>
   <TvAnnouncements v-if="showAnnouncements"></TvAnnouncements>
   <TvCryptoCurrencies v-if="showCryptoCurrencies"></TvCryptoCurrencies>
   <TvProgram v-if="showProgram"></TvProgram>
   <TvSurveys v-if="showSurveys"></TvSurveys>
   <TvWeather v-if="showWeather"></TvWeather>
  </div>
</div>
</template>

<script>
import TvContents from '@/components/Pages/TvContents.vue'
import TvCurrency from '@/components/Pages/TvCurrency.vue'
import TvNews from '@/components/Pages/TvNews.vue'
import TvWelcomeScreen from '@/components/Pages/TvWelcomeScreen.vue'
import TvNotFound from '@/components/Pages/TvNotFound.vue'
import TvAnnouncements from '@/components/Pages/TvAnnouncements.vue'
import TvCryptoCurrencies from '@/components/Pages/TvCryptoCurrencies.vue'
import TvProgram from '@/components/Pages/TvProgram.vue'
import TvSurveys from '@/components/Pages/TvSurveys.vue'
import TvWeather from '@/components/Pages/TvWeather.vue'

export default {
  props: {
    id: Number,
    id2:Number
  },
  data () {
return{
  channelContents: {},
  selectedChannelSubpage: 1,
  selectedChannel: null,
  showWelcome: true,
  showContents: false,
  showCurrency: false,
  showNews: false,
  showNotFound:false,
  showAnnouncements: false,
  showCryptoCurrencies: false,
  showProgram:false,
  showSurveys:false,
  showWeather:false
}
    
  },
  name: 'TvScreen',
  created() {
    this.$store.commit('getCurrenciesData'); 
  this.$store.dispatch('getCurrenciesRateBuySell');
  this.$store.dispatch('getCurrenciesRate');
  this.$store.dispatch('getGoldPrices');
  //this.$store.dispatch('getNews','top');
  this.$store.commit('getWeatherData');
  this.$store.dispatch('getWeatherParams');
  /*  this.$store.dispatch('getNews','health');
    this.$store.dispatch('getNews','science');
    this.$store.dispatch('getNews','business');
    this.$store.dispatch('getNews','entertainment');
    this.$store.dispatch('getNews','sports');
    this.$store.dispatch('getNews','technology');  */
  //this.$store.dispatch('getMetalPrices');
    this.$store.commit('setChannelsContents'); 
    this.$store.commit('setWeatherArrays');
    this.$watch(
      () => this.$route.params,
      () => {
        this.$store.commit('setPageNumber',this.$route.params.page);
        this.getChannels();
        this.getScreen();
        this.$store.commit('setSPageNumber',this.$route.params.subpage);
       this.$store.dispatch('subpageContentLoader');
       console.log(this.$store.state.subpageState.subpageContent.contentArray)
      }
    )
    this.$store.dispatch('subpageContentLoader');
  },
  components: {
    TvContents, TvNews, TvCurrency, TvWelcomeScreen, TvNotFound,TvAnnouncements,TvCryptoCurrencies, TvProgram,TvSurveys,TvWeather
  },
  computed: {
  },
  methods: {
    getChannels(){
      this.selectedChannel = this.$route.params.page;
      this.selectedChannelSubpage = this.$route.params.subpage;
    },
    getScreen() {
      if(this.selectedChannel >= this.channelContents.WelcomeScreen.range[0] && this.selectedChannel <= this.channelContents.WelcomeScreen.range[1])
      {
      this.showWelcome= true,
      this.showContents= false,
      this.showCurrency= false,
      this.showNews = false,
      this.showNotFound= false,
      this.showAnnouncements= false,
      this.showCryptoCurrencies= false,
      this.showProgram=false,
      this.showSurveys=false,
      this.showWeather=false
      }
      else if (this.selectedChannel >= this.channelContents.Contents.range[0] && this.selectedChannel <= this.channelContents.Contents.range[1])
      {
      this.showWelcome= false,
      this.showContents= true,
      this.showCurrency= false,
      this.showNews = false,
      this.showNotFound= false,
      this.showAnnouncements= false,
      this.showCryptoCurrencies= false,
      this.showProgram=false,
      this.showSurveys=false,
      this.showWeather=false
      }
      else if (this.selectedChannel >= this.channelContents.CurrencyRates.range[0] && this.selectedChannel <= this.channelContents.CurrencyRates.range[1])
      {
      this.showWelcome= false,
      this.showContents= false,
      this.showCurrency= true,
      this.showNews = false,
      this.showNotFound= false
      this.showAnnouncements= false,
      this.showCryptoCurrencies= false,
      this.showProgram=false,
      this.showSurveys=false,
      this.showWeather=false
      }
      else if (this.selectedChannel >= this.channelContents.CryptoRates.range[0] && this.selectedChannel <= this.channelContents.CryptoRates.range[1])
      {
      this.showWelcome= false,
      this.showContents= false,
      this.showCurrency= false,
      this.showNews = false,
      this.showNotFound= false
      this.showAnnouncements= false,
      this.showCryptoCurrencies= true,
      this.showProgram=false,
      this.showSurveys=false,
      this.showWeather=false
      }
      else if (this.selectedChannel >= this.channelContents.News.range[0] && this.selectedChannel <= this.channelContents.News.range[1])
      {
      this.showWelcome= false,
      this.showContents= false,
      this.showCurrency= false,
      this.showNews = true,
      this.showNotFound= false
      this.showAnnouncements= false,
      this.showCryptoCurrencies= false,
      this.showProgram=false,
      this.showSurveys=false,
      this.showWeather=false
      }
      else if (this.selectedChannel >= this.channelContents.Weather.range[0] && this.selectedChannel <= this.channelContents.Weather.range[1])
      {
      this.showWelcome= false,
      this.showContents= false,
      this.showCurrency= false,
      this.showNews = false,
      this.showNotFound= false
      this.showAnnouncements= false,
      this.showCryptoCurrencies= false,
      this.showProgram=false,
      this.showSurveys=false,
      this.showWeather=true
      }
      else if (this.selectedChannel >= this.channelContents.Program.range[0] && this.selectedChannel <= this.channelContents.Program.range[1])
      {
      this.showWelcome= false,
      this.showContents= false,
      this.showCurrency= false,
      this.showNews = false,
      this.showNotFound= false
      this.showAnnouncements= false,
      this.showCryptoCurrencies= false,
      this.showProgram=true,
      this.showSurveys=false,
      this.showWeather=false
      }
      else if (this.selectedChannel >= this.channelContents.Surveys.range[0] && this.selectedChannel <= this.channelContents.Surveys.range[1])
      {
      this.showWelcome= false,
      this.showContents= false,
      this.showCurrency= false,
      this.showNews = false,
      this.showNotFound= false
      this.showAnnouncements= false,
      this.showCryptoCurrencies= false,
      this.showProgram=false,
      this.showSurveys=true,
      this.showWeather=false
      }
      else if (this.selectedChannel >= this.channelContents.Announcements.range[0] && this.selectedChannel <= this.channelContents.Announcements.range[1])
      {
      this.showWelcome= false,
      this.showContents= false,
      this.showCurrency= false,
      this.showNews = false,
      this.showNotFound= false
      this.showAnnouncements= true,
      this.showCryptoCurrencies= false,
      this.showProgram=false,
      this.showSurveys=false,
      this.showWeather=false
      }
      else
      {
      this.showWelcome= false,
      this.showContents= false,
      this.showCurrency= false,
      this.showNews = false,
      this.showNotFound= true,
      this.showAnnouncements= false,
      this.showCryptoCurrencies= false,
      this.showProgram=false,
      this.showSurveys=false,
      this.showWeather=false
      }
    }
  },
  beforeMount()
  {
    
  },
  mounted() {
     
  this.selectedChannel = this.$route.params.page;
  this.channelContents = this.$store.state.channelContents
  this.$store.commit('setPageNumber',this.$route.params.page)
  this.$store.commit('setSPageNumber',this.$route.params.subpage);
  this.$store.dispatch('subpageContentLoader');
  if(this.$route.params.subpage == null)
  {
    this.selectedChannelSubpage = 1
  }
  else
  {
    this.selectedChannelSubpage = this.$route.params.subpage
  }
  this.getScreen();
  }
}
</script>
<style scoped  src="../assets/css/styleHome.css"></style>
