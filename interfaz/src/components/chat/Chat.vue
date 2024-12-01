<script lang="ts">
import { defineComponent } from "vue";
import ChatInput from "./ChatInput.vue";
import ChatMessages from "./ChatMessages.vue";
import Sidebar from './Sidebar.vue';

export default defineComponent({
  name: "Chat",
  components: { ChatInput, ChatMessages , Sidebar} ,
});
</script>

<template>
 <div class="chat-app">

    <div class="sidebar">
        <Sidebar/>
    </div>

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
.chat-app{
    display: flex;
    height: 650px;
   
}
.chat {
  width: 100%;
 
  background-color: #f5f5f5;
  border-radius: 10px;
  display: flex;
  flex-direction: column;
  box-shadow: 0 5px 15px rgba(0, 0, 0, 0.2);

}
/* Área de mensajes */
.chat-messages {
  flex: 1; 
  padding: 10px;
  overflow-y: auto; 
  display: flex;
  flex-direction: column;
  background-color: #e9ecef;
}

/* Área del input */
.chat-input {
  flex-shrink: 0; /* Evita que el input se reduzca */
}

</style>
