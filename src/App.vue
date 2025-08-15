<script setup lang="ts">
import { ref } from "vue";

const tooltip = ref(false)
const jslt = 'https://iptv.wangshuos.com/iptv/jslt.m3u'

const copyLink = async (link: string) => {
  try {
    await navigator.clipboard.writeText(link)
    tooltip.value = true
    setTimeout(() => tooltip.value = false, 1500)
  } catch (err) {
    alert('复制失败，请手动复制链接')
  }
}
</script>

<template>
  <div>
    <h1>江苏联通 IPTV</h1>
    <p>{{ jslt }}</p>
    <button class="copy-btn" @click="copyLink(jslt)">复制链接</button>
    <transition name="fade">
      <div class="tooltip" v-if="tooltip">链接已复制！</div>
    </transition>
  </div>
</template>

<style scoped>
/* 标题 */
h1 {
  font-size: 2.5rem;
  font-weight: 700;
  margin-bottom: 0.5em;
  text-shadow: 0 2px 6px rgba(0,0,0,0.3);
}

/* 按钮 */
.copy-btn {
  margin-top: 1em;
  padding: 0.7em 1.5em;
  font-size: 1rem;
  font-weight: 600;
  border: none;
  border-radius: 30px;
  background: linear-gradient(90deg, #42b883, #38a1ff);
  color: #fff;
  cursor: pointer;
  box-shadow: 0 6px 15px rgba(0,0,0,0.2);
  transition: transform 0.2s, box-shadow 0.2s;
}

.copy-btn:hover {
  transform: translateY(-2px);
  box-shadow: 0 8px 20px rgba(0,0,0,0.3);
}

/* 悬浮提示气泡 */
.tooltip {
  position: absolute;
  top: 20%;
  left: 50%;
  transform: translateX(-50%);
  background-color: rgba(0,0,0,0.85);
  color: #fff;
  padding: 0.5em 1em;
  border-radius: 20px;
  font-size: 0.9rem;
  white-space: nowrap; /* 不换行 */
  pointer-events: none;
  box-shadow: 0 4px 12px rgba(0,0,0,0.3);
}

/* 渐入渐出动画 */
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.3s, transform 0.3s;
}
.fade-enter-from,
.fade-leave-to {
  opacity: 0;
  transform: translateY(-10px);
}
</style>