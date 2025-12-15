<script setup lang="ts">
import { vInfiniteScroll } from '@vueuse/components'
import { ref } from 'vue'

const data = ref([1, 2, 3, 4, 5, 6])
const hasAsked = ref(false)
const stopLoading = ref(false)

function onLoadMore() {
  if (stopLoading.value) return

  const prevLength = data.value.length
  const nextStart = prevLength + 1
  const added = Array.from({ length: 5 }, (_, i) => nextStart + i)
  data.value.push(...added)

  if (!hasAsked.value && data.value.length >= 1000) {
    hasAsked.value = true
    const confirmed = confirm('Dosiahli ste 1000 položiek. Chcete pokračovať a nemat zivot?')
    if (!confirmed) {
      // rollback posledný batch a zablokuj ďalšie načítavanie
      data.value = data.value.slice(0, prevLength)
      stopLoading.value = true
    }
  }
}

function canLoadMore() {
  return !stopLoading.value
}

function resetList() {
  data.value = [1, 2, 3, 4, 5, 6, 7, 8]
  hasAsked.value = false
  stopLoading.value = false
}
</script>

<template>
  <div class="scrollWindow" v-infinite-scroll="onLoadMore">
    <div v-for="item in data" :key="item">
      {{ item }}
    </div>
    
  </div>
  <div class="button">
    <button @click="resetList()">
    Reset
  </button>
  </div>
 
  
</template>

<style>

.scrollWindow {
  height: 200px;
  overflow: auto;
  border: 2px solid #4f4c4c;
  border-radius: 10px;
  padding: 8px;
}
.button {
  margin-top: 12px;
  text-align: center;

}

</style>