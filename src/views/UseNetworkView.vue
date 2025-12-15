<script setup lang="ts">
import { useDraggable } from '@vueuse/core'
import { useTemplateRef } from 'vue'

const el = useTemplateRef('el')

// `style` will be a helper computed for `left: ?px; top: ?px;`
const { x, y, style } = useDraggable(el, {
  initialValue: { x: 40, y: 40 },
})

// reset pozície
function resetPosition() {
  x.value = 40
  y.value = 40
}
</script>

<template>
  <div
    ref="el"
    :style="style"
    class="draggable"
    role="button"
    aria-label="Draggable item"
    tabindex="0"
  >
    <svg class="icon" viewBox="0 0 24 24" aria-hidden="true">
      <path fill="currentColor" d="M10 3H7a1 1 0 0 0-1 1v3h4V3zm7 0h-3v4h4V4a1 1 0 0 0-1-1zM6 14H2v3a1 1 0 0 0 1 1h3v-4zm16 0h-4v4h3a1 1 0 0 0 1-1v-3z"/>
    </svg>

    <div class="meta">
      <div class="title">Drag me!</div>
      <div class="coords">{{ Math.round(x) }}, {{ Math.round(y) }}</div>
    </div>

    <button class="reset" @click.stop="resetPosition" title="Reset position" aria-label="Reset position">
      ⤧
    </button>
  </div>
</template>

<style scoped>
.draggable {
  position: fixed;
  left: 40px;
  top: 40px;
  padding: 6px 10px;
  background: #111827;
  color: #fff;
  border-radius: 8px;
  display: flex;
  gap: 8px;
  align-items: center;
  cursor: grab;
  z-index: 1000;
  font-size: 14px;
}

.draggable:active {
  cursor: grabbing;
}

.icon {
  width: 16px;
  height: 16px;
}

.reset {
  background: transparent;
  border: none;
  color: inherit;
  padding: 4px;
  cursor: pointer;
}
</style>