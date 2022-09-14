<template>
  <div class="card text-left align-middle">
        <div class="card-header text-left pl-3 pb-2">
        <b class="card-title"> {{ info.email }} </b>
        </div>
    <div class="card-body p-0">
        <img class="card-img-top" :src="info.url" />
    </div>    
    <div id=title class="card-body pl-3 pt-0 pb-2">
      <b>  {{ info.title }} </b>      
    </div>
    <div class="card-body pl-3 pt-0 pb-2">     
      
      {{ info.description }}
    </div>
    <div id="comm" class="card-footer text-muted text-left pl-3">
      {{postedFromNow}}
    </div>
  </div>
</template>

<script>
import moment from "moment";

export default {
  props: ["info"],
  name: "Card",
  computed: {
    postedFromNow() {
      return moment(this.info.time).fromNow();
    },
  },
};
</script>

<style lang="scss">
.card {
  margin-bottom: 70px;
}
#time {
  font-size: xx-small;
}
#comm {
  font-size: small;
}
#title {
  margin-top: 12px;
  font-size: x-large;
  font-family: 'Lucida Bright';
}
</style>
