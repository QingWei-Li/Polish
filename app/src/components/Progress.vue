<template>
  <div>{{item.name}}</div>
  <!-- <div>{{status ? status : '转换中'}}</div> -->
</template>
<style></style>
<script>
  export default {
    name: 'progress',
    props: {
      item: File
    }
  }
</script>