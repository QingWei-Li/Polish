<template>
  <app-dndzone></app-dndzone>
</template>
<style>
html, body, #app {
  width: 100%;
  height: 100%;
  margin: 0;
  padding: 0;
}

#app {
  display: flex;
  justify-content: center;
  align-items: cewnter;
  font-family: "Hiragino Sans GB", Helvetica,Arial, "Microsoft Yahei";
  background-color: #f5f5f5;
}

a {
  text-decoration: none;
}
</style>
<script>
import DnDZone from './components/DnDZone.vue'
export default {
  replace: false,

  name: 'App',

  components: {
    'app-dndzone': DnDZone
  }
}
</script>
