<template>
  <div class="contrainer d-flex justify-content-center">
    <div id="tv">
        <div>
             <router-view/>
        </div>
        <div id="selector" class="row d-flex justify-content-center "> 
          <button v-on:click="IdMinus" class="btn">PREVIOUS</button>
          <button  v-on:click="subpageIdMinus" class="btn"> &lt; </button>
          <button class="btn btn-danger"> </button>
      <button v-on:click="subpageIdPlus" class="btn"> &gt; </button>
      <button v-on:click="IdPlus" class="btn">NEXT</button>
      </div>
      <nav v-if="$store.state.subpageState.hasSubpages" aria-label="Page navigation example" class="row d-flex justify-content-center">
  <ul class="pagination row d-flex justify-content-center " >
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Previous">
        <span aria-hidden="true">&laquo;</span>
        <span class="sr-only">Previous</span>
      </a>
    </li>
    <li v-for="n in $store.state.subpageState.subpageContent.maxPage" :key="n" class="page-item"><a class="page-link" v-on:click="getToSubpage(n)" >{{n}}</a></li>
    <li class="page-item">
      <a class="page-link" href="#" aria-label="Next">
        <span aria-hidden="true">&raquo;</span>
        <span class="sr-only">Next</span>
      </a>
    </li>
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
    }
  },
  //components: {
   // TVScreen
  //},
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
