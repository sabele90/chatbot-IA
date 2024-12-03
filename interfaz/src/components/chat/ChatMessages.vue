<script lang="ts">
import { defineComponent, computed } from "vue";
import { useChatStore } from "../../stores/chatStore";
import { useSidebarStore } from '../../stores/sidebarStore';


export default defineComponent({
  name: "ChatMessages",
  setup() {
    const chatStore = useChatStore();
    const sidebarStore = useSidebarStore();
    // Computar los mensajes desde la tienda
    const messages = computed(() => chatStore.messages);

    return { messages, sidebarStore };
  },
});
</script>

<template>
  <div class="chat-messages">
    <!-- Botón para alternar el sidebar -->
    <BookOpenIcon class="w-8 h-8 text-black cursor-pointer" @click="sidebarStore.toggleSidebar" />
    <div v-for="message in messages" :key="message.id" :class="['message', message.role]"
      v-html="$markdownToHtml(message.content)"></div>
  </div>
</template>

<style>
.chat-messages {
  padding: 10px;
  overflow-y: auto;
  flex: 1;
  display: flex;
  flex-direction: column;
  gap: 10px;
}

.message {
  max-width: 80%;
  padding: 10px;
  border-radius: 10px;
  font-size: 14px;
  line-height: 1.4;
}

.message.user {
  align-self: flex-end;
  background-color: #9eadbc;
  color: white;
}

.message.assistant {
  align-self: flex-start;
  background-color: #f1f1f1;
  color: black;
}

/* Estilos encapsulados para tablas */
.chat-messages table {
  width: 100%;
  border-collapse: collapse;
  margin-top: 10px;
}

.chat-messages th,
.chat-messages td {
  border: 1px solid #ddd;
  padding: 8px;
  text-align: left;
}

.chat-messages th {
  background-color: #f4f4f4;
  font-weight: bold;
}

/* Estilos encapsulados para listas */
.chat-messages ul {
  list-style-type: disc;
  margin-left: 20px;
}

.chat-messages ol {
  list-style-type: decimal;
  margin-left: 20px;
}
</style>
