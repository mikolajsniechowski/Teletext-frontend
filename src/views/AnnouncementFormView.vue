<template>
 <div v-if="$store.state.user.isLogged" id="announcement">
        <h1>Dodaj ogłoszenie</h1>
      <br />
        <form @submit.prevent="addAnnouncement">
        <input type="text" name="title" v-model="title" placeholder="Tytuł" />
        <select name="category" v-model="categoryId">
          <option v-for="(item) in $store.state.user.allCategories" :key="item.id" :value="item.categoryId ">{{ item.category_name }}</option>
        </select>
        <textarea type="text" v-model="description" placeholder="Opis ogłoszenia" />
       <br /> <button type="submit">Dodaj Ogłoszenie</button> <br />
        </form>
    </div>
    <div v-else>
    <h1>Jesteś niezalogowany</h1>
    <p> Zaloguj się aby móc zobaczyć zawartość strony</p>
  </div>
</template>

<script>
    export default {
        name: "AnnouncementFormView",
        data() {
           return {
                title: "",
                categoryId: "",
                description: "",
           }
        },
        methods: {
          async addAnnouncement() {
      let title = this.title;
      let description = this.description;
      let categoryId = this.categoryId
      let payload= {title:title,description:description,categoryId:categoryId};
      this.$store.dispatch('addAnn',payload);
      this.title = null;
      this.categoryId= null;
      this.description= null;
    }
          },
          created(){
            this.$store.dispatch('getOnlyCategories')
          }
    }
</script>

<style scoped>
</style>