<template>
  <div
    class="dndzone"
    v-on:dragover.stop.prevent="handleDragOver"
    v-on:dragend.stop.prevent="handleDragEnd"
    v-on:drop.stop.prevent="handleDrop($event)"
  >
    <div class="empty" v-bind:class="{dnd: dndState}" v-if="!list.length">
      <ul>
        <li>*.sketch -> iconfont</li>
        <li>*.svg -> optimizing *.svg</li>
        <li>*.svg -> webfont</li>
      </ul>
    </div>
    <app-progress v-if="list.length" :item="item"></app-progress>
  </div>
</template>
<style>
  .dndzone {
    height: 100%;
    width: 100%;
    display: flex;
    justify-content: center;
    align-items: center;
    color: #8c8c8c;
  }

  .empty.dnd {
    border-color: #aaa;
    color: #ddd;
  }

  .empty {
    font-size: 20px;
    border-radius: 4px;
    border: 2px dashed #ddd;
    padding: 50px;
  }

  .empty ul {
    list-style-type: none;
    margin: 0;
    padding: 0;
  }
</style>
<script>
  const shell = global.require('electron').shell
  import Progress from './Progress.vue';
  import Sketch2iconfont from './../libs/sketch2iconfont';

  export default {
  name: 'dndzone',

  data() {
    return {
      list: [],
      dndState: false,
      item: {},
      status: ''
    }
  },

  components: {
    appProgress: Progress
  },

  methods: {
    loopGetIconfont(entries) {
      let iterator = entries.next()
      if (iterator.done) {
        this.list = []
        return;
      }

      let file = this.list[iterator.value[0]]

      this.item = file
      Sketch2iconfont.initialize(file).then((path) => {
        console.log(path)
        this.loopGetIconfont(entries)
      }).catch(err => {
        console.log(err)
      });
    },

    handleDrop(event) {
      this.list = event.dataTransfer.files;
      let length = this.list.length;
      let entries = new Array(length).entries();

      this.loopGetIconfont(entries);
    },

    handleDragOver() {
      this.dndState = true;
    },

    handleDragEnd() {
      this.dndState = false;
    }

  }
}
</script>