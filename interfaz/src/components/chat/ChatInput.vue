<template>
  <!-- Input y botón para enviar mensajes -->
  <div class="chat-input-container flex gap-4  p-4 bg-transparent">

    <div class="input-message flex-1 flex flex-row items-center space-x-2  rounded-xl">
      <!-- Input que ocupa todo el espacio -->
      <input v-model="message" type="text" placeholder="Message Chatbot..."
        class="flex-grow px-4 py-2 border border-gray-300 rounded-full shadow-sm focus:border-indigo-500 focus:ring focus:ring-indigo-200 focus:ring-opacity-50"
        @keyup.enter="sendMessage" />

      <!-- Botón con tamaño fijo -->
      <button @click="sendMessage"
        class="w-12 h-12 flex items-center justify-center bg-indigo-600 text-white font-medium rounded-full shadow hover:bg-indigo-700 focus:outline-none focus:ring focus:ring-indigo-300 focus:ring-opacity-50">
        <PaperAirplaneIcon class="w-6 h-6 text-white" />
      </button>
    </div>


    <!-- Opciones: Creatividad y Longitud -->
    <div class="options flex justify-end space-x-4">
      <!-- Botón de creatividad -->
      <div class="creativeButton relative flex flex-col items-center ">
        <button @click="toggleCreativityMenu" :class="[
          'w-12 h-12 flex items-center justify-center rounded-full shadow-md transition-all relative',
          selectedCreativity ? 'bg-blue-500' : 'bg-gray-300',
          'hover:bg-blue-600 focus:outline-none',
        ]" @mouseover="showTooltipCreativity = true" @mouseleave="showTooltipCreativity = false">
          <PaintBrushIcon class="w-6 h-6 text-white" />
          <div v-if="showTooltipCreativity && !showCreativityMenu"
            class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-md shadow-md">
            Creatividad
          </div>
        </button>

        <div v-show="showCreativityMenu"
          class="absolute bottom-14 w-40 bg-white border border-gray-300 rounded-lg shadow-md p-2 z-50 transition-transform origin-bottom scale-y-0"
          :class="{ 'scale-y-100': showCreativityMenu }">
          <ul>
            <li v-for="option in creativityOptions" :key="option" @click="selectCreativity(option)" :class="[
              'px-4 py-2 rounded-md cursor-pointer transition-colors',
              option === selectedCreativity
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100',
            ]">
              {{ option }}
            </li>
          </ul>
        </div>
      </div>



      <!-- Botón de longitud -->


      <div class="longitudeButton relative flex flex-col items-center ">
        <button @click="toggleLengthMenu" :class="[
          'w-12 h-12 flex items-center justify-center rounded-full shadow-md transition-all relative',
          selectedLength ? 'bg-blue-500' : 'bg-gray-300',
          'hover:bg-blue-600 focus:outline-none',
        ]" @mouseover="showTooltipLongitude = true" @mouseleave="showTooltipLongitude = false">
          <ChatBubbleLeftEllipsisIcon class="w-6 h-6 text-white" />
          <div v-if="showTooltipLongitude && !showLengthMenu"
            class="absolute -top-8 left-1/2 transform -translate-x-1/2 bg-black text-white text-xs px-2 py-1 rounded-md shadow-md">
            Longitud
          </div>
        </button>

        <div v-show="showLengthMenu"
          class="absolute bottom-14 w-40 bg-white border border-gray-300 rounded-lg shadow-md p-2 z-50 transition-transform origin-bottom scale-y-0"
          :class="{ 'scale-y-100': showLengthMenu }">
          <ul>
            <li v-for="length in maxLengths" :key="length" @click="selectLength(length)" :class="[
              'px-4 py-2 rounded-md cursor-pointer transition-colors',
              length === selectedLength
                ? 'bg-blue-500 text-white'
                : 'hover:bg-gray-100',
            ]">
              {{ length }}
            </li>
          </ul>
        </div>
      </div>




    </div>

  </div>
</template>

<script lang="ts">
import { defineComponent, ref } from "vue";
import { useChatStore } from "../../stores/chatStore";
import { PaperAirplaneIcon } from "@heroicons/vue/24/solid";

export default defineComponent({
  name: "ChatInput",
  setup() {
    const chatStore = useChatStore();

    // Variables reactivas
    const message = ref("");
    const showTooltipCreativity = ref(false);
    const showTooltipLongitude = ref(false);
    const selectedCreativity = ref<"baja" | "media" | "alta" | null>(null);
    const selectedLength = ref<number | null>(null);
    const showCreativityMenu = ref(false);
    const showLengthMenu = ref(false);

    // Opciones disponibles
    const creativityOptions: Array<"baja" | "media" | "alta"> = [
      "baja",
      "media",
      "alta",
    ];
    const maxLengths: number[] = [200, 300, 500, 600];

    // Métodos para gestionar los menús desplegables
    const toggleCreativityMenu = () => {
      showCreativityMenu.value = !showCreativityMenu.value;
      showLengthMenu.value = false; // Cerrar el menú de longitud
    };

    const toggleLengthMenu = () => {
      showLengthMenu.value = !showLengthMenu.value;
      showCreativityMenu.value = false; // Cerrar el menú de creatividad
    };

    const selectCreativity = (option: "baja" | "media" | "alta") => {
      selectedCreativity.value = option;
      showCreativityMenu.value = false;
    };

    const selectLength = (length: number) => {
      selectedLength.value = length;
      showLengthMenu.value = false;
    };

    // Método para enviar el mensaje
    const sendMessage = async () => {
      if (
        !message.value.trim() ||
        !selectedCreativity.value ||
        !selectedLength.value
      ) {
        alert(
          "Por favor, completa todos los campos antes de enviar el mensaje."
        );
        return;
      }

      // Añadir el mensaje del usuario a la tienda
      chatStore.addMessage({ role: "user", content: message.value.trim() });

      // Crear el payload y enviar el mensaje
      await chatStore.sendMessage({
        user_id: "user",
        prompt: message.value.trim(),
        max_length: selectedLength.value,
        temperature: selectedCreativity.value,
      });

      // Limpiar el input
      message.value = "";
    };

    return {
      showTooltipCreativity,
      showTooltipLongitude,
      message,
      selectedCreativity,
      selectedLength,
      showCreativityMenu,
      showLengthMenu,
      creativityOptions,
      maxLengths,
      toggleCreativityMenu,
      toggleLengthMenu,
      selectCreativity,
      selectLength,
      sendMessage,
    };
  },
});
</script>
