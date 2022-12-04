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
            Lorem ipsum dolor sit amet, consectetur adipiscing elit. Quisque placerat blandit lorem, sed sagittis ante dictum vel. 
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
  }
},
created() {
  this.getNamedayData();
},
computed: {
    ReturnNameday(){
        const date = new Date()
        const day = date.getDate()
        const month = date.getMonth()+1
       const selectedmonth = this.nameday.find(element => element.month = month)
       return selectedmonth.names[day]
    }
},
methods: {
   getNamedayData() {
    this.nameday = sourceData.nameday
   }                
}
}
</script>
<style scoped  src="@/assets/css/styleHome.css"></style>
