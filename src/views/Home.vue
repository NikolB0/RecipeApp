<template>
  <!-- <div class="row"> -->
    <div class="col-8">
      <!-- nova forma za post -->
      <img
        v-if="loading"
        class="loading"
        :src="require('@/assets/loading.gif')"
      />
      <form v-if="!loading" @submit.prevent="postNewRecipe" class="mb-5">
        <croppa
          :width="400"
          :height="250"
          placeholder="Upload photo"
          v-model="imageReference"
        ></croppa>

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
          <b-form-textarea
            id="imageDescription"
            name="imageDescription"
            v-model="newImageDescription"
            class="text-area ml-2"
            placeholder="Describe the steps of preparation"
            rows="3"
            max-rows="6"
          ></b-form-textarea>
        </div>

        <button type="submit" class="btn btn-primary ml-2">Publish</button>
      </form>
      <card v-for="card in filteredCards" :key="card.id" :info="card" />
    </div>
    <!-- <div class="col-4">Sidebar</div> -->
  <!-- </div> -->
</template>

<script>
// @ is an alias to /src
import Card from "@/components/Card.vue";
import store from "@/store";
import { db, storage } from "@/firebase";


export default {
  name: "home",
  data: function () {
    return {
      loading: false,
      cards: [],
      store,
      newImageTitle: "",
      newImageDescription: "",
      newImageUrl: "",
      imageReference: null,
    };
  },
  mounted() {
    this.getPosts();
    //
    //
  },
  methods: {
    getPosts() {
      console.log("firebase dohvat...");
      db.collection("posts")
        .orderBy("posted_at", "desc")
        .limit(10)
        .get()
        .then((query) => {
          this.cards = [];
          query.forEach((doc) => {
            const data = doc.data();
            console.log(data);
            this.cards.push({
              id: doc.id,
              time: data.posted_at,
              description: data.desc,
              title: data.title,
              url: data.url,
            });
          });
        });
    },
    getImage() {
      // Promise based, omotač oko callbacka
      return new Promise((resolveFn, errorFn) => {
        this.imageReference.generateBlob((data) => {
          resolveFn(data);
        });
      });
    },
    async postNewRecipe() {
      try {
        this.loading = true;
        let blobData = await this.getImage();
        let imageName =
          "posts/" + store.currentUser + "/" + Date.now() + ".png";
        let result = await storage.ref(imageName).put(blobData);
        let url = await result.ref.getDownloadURL(); // Promise
        // čuva
        console.log("Link", url);
        const imageTitle = this.newImageTitle;
        const imageDescription = this.newImageDescription;
        let doc = await db.collection("posts").add({
          url: url,
          desc: imageDescription,
          title: imageTitle,
          email: store.currentUser,
          posted_at: Date.now(),
        });
        console.log("Saved", doc);
        this.imageDescription="";
        this.imageTitle="";

        this.getPosts();
      } catch (e) {
        console.error("Error", e);
      }
      this.loading = false;
    },
  },
  computed: {
    filteredCards() {
      // logika koja filtrira cards
      let termin = this.store.searchTerm;
      return this.cards.filter((card) => card.description.includes(termin));
    },
  },
  components: {
    Card,
  },
};
</script>

<style scoped>
.row {
  display: flex;
  align-items: center !important;
  
}
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
  background-color: rgb(159, 159, 159);
  border-color: grey;
}

.btn:hover {  
  background-color:#dd6824 !important;
  border-color: grey !important;
}

.loading {
  width: 50px;
}
</style>