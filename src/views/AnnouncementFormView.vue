<template>
 <div id="announcement">
        <h1>Dodaj ogłoszenie</h1>
      <br />
        <input type="text" name="title" v-model="input.title" placeholder="Tytuł" />
        <select name="category" v-model="input.category">
          <option value="sale">Sprzedaż</option>
          <option value="job">Praca</option>
          <option value="love">Ogłoszenie matrymonialne</option>
          <option value="other">Inne</option>
        </select>
        <textarea type="text" v-model="input.content" placeholder="Opis ogłoszenia" />
       <br /> <button type="button" v-on:click="addannouncement()">Dodaj Ogłoszenie</button> <br />
    </div>
</template>

<script>
    export default {
        name: "AnnouncementFormView",
        data() {
           return {
              input: {
               title: "",
                category: "",
                content: "",
              }
           }
        },
        methods: {
            addannouncement() {
              if(this.input.title !== "" && this.input.category !== "" && this.input.content !== "") {
                  console.log("Announcement added");
              }
              else {
                console.log("All fields must be present");
              }
           }
        }
    }
</script>

<style scoped>
</style>