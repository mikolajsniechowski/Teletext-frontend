<template>
 <div id="announcement">
        <h1>Dodaj ogłoszenie</h1>
      <br />
        <form @submit.prevent="addAnn">
        <input type="text" name="title" v-model="title" placeholder="Tytuł" />
        <select name="category" v-model="category_name">
          <option value="1">Motoryzacja</option>
          <option value="2">Praca</option>
        </select>
        <textarea type="text" v-model="description" placeholder="Opis ogłoszenia" />
       <br /> <button type="submit">Dodaj Ogłoszenie</button> <br />
        </form>
    </div>
</template>

<script>
    export default {
        name: "AnnouncementFormView",
        data() {
           return {
                title: "",
                category_name: "",
                description: "",
           }
        },
        methods: {
          async addAnn() {
              const {title, category_name, description} = this;
              const res = await fetch(
                  "https://teletextbackend.azurewebsites.net/ad/api/annoucements",
                  {
                    method: "POST",
                    headers: {
                      "Content-Type": "application/json",
                      Authorization: 'Bearer ' + localStorage.getItem("user"),
                    },
                    body: JSON.stringify({
                      title,
                      description,
                      category_name
                    })
                  }
              );
              const data = await res.json();
              console.log(data);
              this.$router.push("/profile");
            }
          }
    }
</script>

<style scoped>
</style>