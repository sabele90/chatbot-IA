<script lang="ts">
import { defineComponent } from "vue";
import ChatInput from "./ChatInput.vue";
import ChatMessages from "./ChatMessages.vue";
import Sidebar from './Sidebar.vue';
import { useSidebarStore } from "../../stores/sidebarStore";

export default defineComponent({
  name: "Chat",
  components: { ChatInput, ChatMessages, Sidebar },
  setup() {
    const sidebarStore = useSidebarStore();
    return {
      sidebarStore,
    };
  },
});
</script>


<template>
  <div class="chat-app" :class="{ 'sidebar-open': sidebarStore.isOpen }">
    <!-- Sidebar -->
    <Sidebar />


    <div class="chat">
      <!-- Área de mensajes -->

      <div class="chat-messages">
        <ChatMessages />
      </div>
      <!-- Input del chat -->
      <div class="chat-input">
        <ChatInput />
      </div>
    </div>

  </div>
</template>

<style scoped>
/* Contenedor principal del chat */
.chat-app {
  flex: 1;
  display: flex;
  height: 650px;
  border: 2px solid blue;


}

.chat {
  flex: 1;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);
  border: 2px solid red;

}

/* Área de mensajes */
.chat-messages {
  flex: 1;
  padding: 10px;
  overflow-y: auto;
  display: flex;
  flex-direction: column;
  border: 2px solid green;

}

/* Área del input */
.chat-input {
  flex-shrink: 0;
  /* Evita que el input se reduzca */
}
</style>
