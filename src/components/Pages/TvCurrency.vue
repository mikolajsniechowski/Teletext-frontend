<template>
    <div class="row">
      <div class="col">
        <h1 class="bg-danger">Kursy walut</h1>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>Dzisiejsza data: {{currentDate}} </p>
      </div>
    </div>
    <div class="row">
      <div class="col">
        <p>Waluta </p>
      </div>
      <div class="col">
        <p>Średni Kurs</p>
      </div>
    </div>
    <div v-for="(item,key) in Pagination" class="row" :key="item.id">
       <div class="col">
        <p>{{item.name}} {{key}} </p>
       </div>
       <div class="col">
        {{item.rate}}
      </div> 
    </div>
   
</template>
<script>
import axios from 'axios';
import sourceData from '@/datacurrency.json'
export default {
  name: 'TvContents',
  data() {
    return {
      spageNumber: 1,
      currentDate: "",
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
        }
      }
    ),
    setInterval(this.getNow,1000)
    this.getCurrenciesData();
    this.currency.forEach((element) => {
      const a = this.getData(element.code)
      a.then((value) => {
        element.rate = value
      })
    })
  },
  computed: {
    Pagination()
    {
      if(this.spageNumber == 1)
      {
        return this.currency.slice(0,this.limitAtPage)
      }
      else
      {
        return this.currency.slice(((this.spageNumber-1)*this.limitAtPage)-1,(this.limitAtPage*this.spageNumber)-1)
        /*
         2 4
         3 9
         4 14
        */
      }
      
    }
    
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
  },
  methods: {
    getNow () {
      const today = new Date();
      const date = today.getFullYear()+'-'+(today.getMonth()+1)+'-'+today.getDate();
      const dateTime = date 
      this.currentDate = dateTime;      
    },
    async getData(code) {
          try {
            const response = await axios.get('https://api.nbp.pl/api/exchangerates/rates/a/'+code+'/?format=json');
            const rate=response.data.rates;
            return rate[0].mid;
          } catch (error) {
            console.log(error);
          }
        },
     getCurrenciesData() {
      this.currency = sourceData.currencies
     }                
  }
}
</script>