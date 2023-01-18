<template>
    <h1 class="danger">{{ $store.state.subpageState.subpageContent.title }}</h1>
<div v-if="this.$route.params.page == this.$store.state.channelContents.CryptoRates.range[0]" >
    <div class="row">
      <div class="col">
        <p> Parametry Bitcoin'a na dzień {{ this.$store.state.currentDate}}</p>
      </div>
   </div>
   <div class="row">
    <div class="col">
      Najwyższa wartość 
    </div>
    <div class="col">
      {{  this.$store.state.channelContents.CryptoRates.bitcoinInfo.high.toFixed(2)}}$
    </div> 
   </div>
   <div class="row">
    <div class="col">
      Najniższa wartość 
    </div>
    <div class="col">
      {{  this.$store.state.channelContents.CryptoRates.bitcoinInfo.low.toFixed(2)}}$
    </div> 
   </div>
   <div class="row">
    <div class="col">
      Wartość zamknięcia
    </div>
    <div class="col">
      {{  this.$store.state.channelContents.CryptoRates.bitcoinInfo.close.toFixed(2)}}$
    </div> 
   </div> 
   <div class="row">
    <div class="col">
      Wartość otwarcia
    </div>
    <div class="col">
      {{  this.$store.state.channelContents.CryptoRates.bitcoinInfo.open.toFixed(2)}}$
    </div> 
   </div> 
   <div class="row">
    <div class="col">
      Wartość zamknięcia
    </div>
    <div class="col">
      {{  this.$store.state.channelContents.CryptoRates.bitcoinInfo.close.toFixed(2)}}$
    </div> 
   </div>
   <div class="row">
    <div class="col">
      Kapitalizacja
    </div>
    <div class="col">
      {{  this.$store.state.channelContents.CryptoRates.bitcoinInfo.market_cap.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}$
    </div> 
   </div>       
</div>
<div v-if="this.$route.params.page == this.$store.state.channelContents.CryptoRates.range[1]">
  <div class="row">
      <div class="col">
        <p> Rynek kryptowalut na dzień {{ this.$store.state.currentDate}}</p>
      </div>
   </div>
   <div class="row">
    <div class="col">
      Kapitalizacja rynku
    </div>
    <div class="col">
      {{  this.$store.state.channelContents.CryptoRates.globalInfo.market_cap_usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}}$
    </div> 
   </div>
   <div class="row">
    <div class="col">
      Wolumen rynku (24H)
    </div>
    <div class="col">
      {{  this.$store.state.channelContents.CryptoRates.globalInfo.volume_24h_usd.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}}$
    </div> 
   </div>
   <div class="row">
    <div class="col">
      Procentowy udział Bitcoina w rynku
    </div>
    <div class="col">
      {{  this.$store.state.channelContents.CryptoRates.globalInfo.bitcoin_dominance_percentage}}%
    </div> 
   </div> 
   <div class="row">
    <div class="col">
      Ilość kryptowalut w obiegu
    </div>
    <div class="col">
      {{  this.$store.state.channelContents.CryptoRates.globalInfo.cryptocurrencies_number}}
    </div> 
   </div> 
   <div class="row">
    <div class="col">
      Najwyższa wartość w historii kapitalizacji rynku (ATH) 
    </div>
    <div class="col">
      {{  this.$store.state.channelContents.CryptoRates.globalInfo.market_cap_ath_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ")}}$
    </div> 
   </div>
   <div class="row">
    <div class="col">
      Najwyższa wartość wolumenu 24H w historii (ATH)
    </div>
    <div class="col">
      {{  this.$store.state.channelContents.CryptoRates.globalInfo.volume_24h_ath_value.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ") }}$
    </div> 
   </div>       
</div>
</template>
<script>
export default {
  name: 'TvCryptoCurrencies',
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