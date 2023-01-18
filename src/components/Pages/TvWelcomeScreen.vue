<template>
    <div class="container">
    <div class="row">
        <h1 class="headerstyle">Witamy w telegazecie</h1>
    </div>
    <div class="row ">
        <div class="col">
            <p class="text-center">
          <strong>Dziś jest: {{$store.state.currentDate}}</strong> 
        </p>
        <p>
            Obchodzimy dzisiaj imieniny: {{ReturnNameday}}
        </p>
        </div>
        <div class="col">
            <div class="col text-danger"><b> Z ostatniej chwili</b></div>
            <div class="w-100"></div>
            <div class="col"> {{ getRandomNews }}</div>  
        </div>
        <div class="w-100"></div>
        <div class="col"><b class="text-info">Średni kurs:</b> <br>Średnia stawka waluty <i>{{randomcurrency.name}}</i> wynosi na dzisiaj: {{ randomcurrency.rate }} </div>  
        <div v-if="randomcity.params[0] !== null" class="col ">
          <div class="col text-success"><b> Pogoda w {{randomcity.city}}</b></div>
            <div class="w-100"></div>
            <div class="col">Średnia temperatura: {{randomcity.params[0].avgtemp}}°C </div>
            <div class="w-100"></div>
            <div class="col">Warunki: {{randomcity.params[0].conditions}}</div>    
        </div>
        
    </div>
         
    </div> 
</template>
<script>
import sourceData from '@/datanameday.json'
export default {
name: 'TvCurrency',
data() {
  return {
    spageNumber: 1,
    nameday: null,
    randomcity: null,
    randomcurrency: null,
  }
},
created() {
  this.getNamedayData();
  this.getRandomWeather();
  this.getRandomPrice();
},
mounted(){
  this.getRandomWeather();
},
computed: {
    ReturnNameday(){
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth()+1
       const selectedmonth = this.nameday.find(element => element.month = month)
       return selectedmonth.names[day]
    },
    getRandomNews(){
    const news = this.$store.state.channelContents.News.topNews[0];
    if(news)
    {
      let lng = news.length;
    let rand = Math.floor(Math.random() * lng);
    let randnews = news[rand][1]
    return randnews
    }
    else
    {
      return "Error Nie znaleziono"
    }
    },
    
   
},
methods: {
   getNamedayData() {
    this.nameday = sourceData.nameday
   },
   getRandomWeather(){
      const leng = this.$store.state.channelContents.Weather.content.length;
      const list = this.$store.state.channelContents.Weather.content.slice(1,leng);
      let randnum = Math.floor(Math.random() * list.length);
      let randvoivo = list[randnum][3];
      let num = this.$store.state.channelContents.Weather[randvoivo].length
      let randcity = Math.floor(Math.random() * num);
      let result = this.$store.state.channelContents.Weather[randvoivo][randcity];  
      if(result)
      {
        this.randomcity = result
      }
    },
    getRandomPrice(){
      const prices = this.$store.state.channelContents.CurrencyRates.currencies;
      let lng = prices.length;
      let rand = Math.floor(Math.random() * lng);
      this.randomcurrency = prices[rand]
    }                
}
}
</script>
<style scoped  src="@/assets/css/styleHome.css"></style>
