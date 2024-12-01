<template>
  <div class="sidebar">
  
    <ul>
      <li 
        v-for="item in history" 
        :key="item.id" 
        class="history-item"
        @click="loadChat(item.content)"
      >
        {{ item.title }}
      </li>
    </ul>
  </div>
</template>

<script lang="ts">
import { defineComponent, computed } from "vue";
import { useChatStore } from "../../stores/chatStore";

export default defineComponent({
  name: "Sidebar",
  setup() {
    const chatStore = useChatStore();

    const history = computed(() => chatStore.history);

    const loadChat = (content: any) => {
      chatStore.messages = content; // Cargar el historial seleccionado en el chat actual
    };

    return { history, loadChat };
  },
});
</script>



<style scoped>
.sidebar {
  width: 300px;
 height: 100%;
  flex:1;
  overflow-y: auto;
  border-right: 1px solid #e5e7eb;
  overflow-y: auto;
}

ul {
  list-style: none;
  padding: 0;
  margin: 0;
}

.history-item {
  padding: 10px;
  cursor: pointer;
  border-bottom: 1px solid #ddd;
}

.history-item:hover {
  background-color: #f3f4f6;
}
</style>
