<template>
    <div class="card text-left align-middle">
      <div class="card-header text-left pl-3 pb-2"> 
        <b class="card-title"> {{ info.username }} </b>
      </div>
      <div class="card-body p-0">
        <img class="card-img-top" :src="info.url" />
      </div>
      <div class="card-body pl-3 pt-3 pb-2">
        <!-- icons -->
        <i class="far fa-heart fa-lg pr-3"></i>
        <i class="far fa-comment fa-lg pr-3"></i>
        <i class="far fa-paper-plane fa-lg"></i>
        <!-- <i class="far fa-bookmark fa-lg"></i> -->
      </div>
      <div class="card-body pl-3 pt-0 pb-2">
        <b> {{ info.username }} 
         {{ info.title }} </b>
        {{ info.description }}
      </div>
      <div id="time" class="card-body pl-3 pt-0 pb-2" >
        {{ info.time }}
      </div>
      <div id="comm" class="card-footer text-muted text-left pl-3"> 
        Comment...
      </div>
    </div>
  </template>
  
  <script>
  export default {
    props: ['info'],
    name: "Card"
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
  </style>
  