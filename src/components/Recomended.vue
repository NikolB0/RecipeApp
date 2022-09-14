<template>
  <div class="card">
    <div class="card-body">
        <img class="card-img-top rounded-circle" :src="info2.profile_pic" alt="Card image cap"/>
        {{ info2.username}}
        <a href="#" class="card-link">Follow</a>
    </div>
  </div>
</template>

<script>
export default {
  props: ['info2'],
  name: 'Recomended',
};
</script>
