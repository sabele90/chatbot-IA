<template>
  <div :class="[
    'sidebar top-0 left-0 h-full bg-white shadow-lg transition-transform',
    sidebarStore.isOpen ? 'translate-x-0' : '-translate-x-full',
  ]">


    <ul>
      <li v-for="item in history" :key="item.id" class="history-item" @click="loadChat(item.content)">
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, ref, computed } from "vue";
import { useChatStore } from "../../stores/chatStore";
import { useSidebarStore } from "../../stores/sidebarStore";

export default defineComponent({
  name: "Sidebar",
  setup() {
    const chatStore = useChatStore();
    const sidebarStore = useSidebarStore();

    const history = computed(() => chatStore.history);

    // Cargar historial y cerrar cajón opcionalmente
    const loadChat = (content: any) => {
      chatStore.messages = content;
      sidebarStore.closeSidebar();
    };

    return { history, loadChat, sidebarStore };
  },
});
</script>

<style scoped>
.history-item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.history-item:hover {
  background-color: #f3f4f6;
}

.header {
  display: flex;
  align-items: center;
  justify-content: center;
}
</style>
