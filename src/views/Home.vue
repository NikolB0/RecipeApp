<template>
  <div class="row">
    <div class="col-8">
      <!-- nova forma za post -->

      <form @submit.prevent="postNewImage" class="form-inline mb-5">
        <div class="form-group">
          <label for="imageUrl">Image URL</label>
          <input
            v-model="newImageUrl"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the image URL"
            id="imageUrl"
          />
        </div>
        <!-- <form @submit.prevent="postNewRecipe" class="mb-5">
        <croppa
          :width="400"
          :height="250"
          placeholder="Upload photo"
          v-model="imageReference"
        ></croppa> -->

        <div class="form-group">
          <label for="imageTitle">Title</label>
          <input
            v-model="newImageTitle"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the title"
            id="imageTitle"
          />
        </div>

        <div class="form-group">
          <label for="imageDescription">Description</label>
          <input
            v-model="newImageDescription"
            type="text"
            class="form-control ml-2"
            placeholder="Enter the description"
            id="imageDescription"
          />
        </div>
        <button type="submit" class="btn btn-primary ml-2">Post image</button>
      </form>
      <card v-for="card in filteredCards" :key="card.id" :info="card" />
    </div>
    <div class="col-4">Sidebar</div>
  </div>
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import Recipe from "@/components/Recipe.vue";
import Recomended from "@/components/Recomended.vue";
import store from "@/store";
import { db } from "@/firebase";

let cards = [];

//API/firebase/neki drugi udaljeni server, tj. baza -> sve kartice -> cards

cards = [
  {
    url: "https://unsplash.com/photos/KRGFXJWIo2Y",
    email: "mario.marich@gmail.com",
    title: "Salad",
    description: "Delicious Salad...",
    time: "5 minutes ago...",
  },
];


export default {
  name: "Home",
  data: function () {
    return {
      cards,
      store,
      users,
      newImageUrl: "", // <-- url nove slike
      newImageTitle: "",
      newImageDescription: "", // <-- opis nove slike
      imageReference: null,
    };
  },

  mounted() {
    this.getPosts();
  },

  methods: {
    postNewRecipe() {
      // this.imageReference.generateBlob(data => {
      //   console.log(data); // ovo daje bajtove u konzolu...

      //   let imageName = Date.now() + ".png" ;
      // });

      const imageDescription = this.newImageDescription;
      const imageTitle = this.newImageTitle;

      db.collection("posts")
        .add({
          url: this.newImageUrl,
          email: store.currentUser, //u sotru smo spremili podatak o trenutnom useru
          posted_at: Date.now(),
          desc: imageDescription,
          title: imageTitle,
        })
        .then(() => {
          console.log("Successfully saved", doc);
        })
        .catch(() => {
          console.error(e);
        });
    },

    getPosts() {
      let cards = [];
      //... API/Firebase -> sve kartice -> cards
      console.log("Loading posts");

      db.collection("posts").orderBy("posted_at", "desc").limit(10).get();

      then((results) => {
        results.forEach((doc) => {
          let id = doc.id;
          let data = doc.data();
          let card = {
            id: doc.id,
            url: data.url,
            time: data.posted_at,
            title: data.imageTitle,
            desc: data.imageDescription,
          };
          this.cards.push(card);
        });
      });
    },
  },
  computed: {
    filterCards() {
      //logika koja filtrira cards
      let termin = this.store.searchTerm;

      return this.cards.filter(
        (card) =>
          card.description.includes(termin) ||
          card.title.includes(termin) ||
          card.username.includes(termin)
      );
    },
  },
  components: {
    Card, // isto kao Card: Card
    Recipe,
    Recomended,
  },
};
</script>

<style scoped>
.form-control {
  width: 390px;
}

.mb-5 {
  display: inline-block;
  align-items: center;
  margin-top: 3rem !important;
}

.btn {
  text-align: right;
}
</style>
