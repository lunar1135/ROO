<script setup lang="ts">
    import {
        ref
    } from 'vue'
    import {
        useScrollLock
    } from '@vueuse/core'

    const el = ref < HTMLElement | null > (null)
    const isLocked = useScrollLock(el)

    function toggleLock() {
        isLocked.value = !isLocked.value
    }
</script>

<template>
    <div class="wrap">
        <div class="controls">
            <button @click="toggleLock">{{ isLocked ? 'Odomknúť' : 'Uzamknúť' }}</button>
            <span class="badge">{{ isLocked ? 'Uzamknuté' : 'Odomknuté' }}</span>
        </div>

        <div ref="el" class="scrollbox" aria-label="Scrollable box">
            <div v-for="i in 30" :key="i" class="item">Položka {{ i }}</div>
        </div>

        <small class="hint">Keď je uzamknuté, nemožno scrollovať v boxe.</small>
    </div>
</template>

<style scoped>
    .wrap {
        font-family: system-ui, sans-serif;
        max-width: 420px;
        margin: 8px;
    }

    .controls {
        display: flex;
        gap: 8px;
        align-items: center;
        margin-bottom: 6px;
    }

    button {
        padding: 6px 10px;
        border-radius: 6px;
        border: 1px solid #ddd;
        background: #fff;
        cursor: pointer;
    }

    .badge {
        font-size: 13px;
        color: #555;
        font-weight: 600;
    }

    .scrollbox {
        height: 200px;
        overflow: auto;
        border: 1px solid #e5e7eb;
        border-radius: 6px;
        padding: 6px;
        background: #fff;
        
    }

    .item {
        padding: 6px 8px;
        border-bottom: 1px solid #f3f4f6;
        color: #111827;
    }

    .hint {
        display: block;
        margin-top: 8px;
        color: #6b7280;
        font-size: 12px;
    }
</style>
