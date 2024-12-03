// stores/sidebarStore.ts
import { defineStore } from "pinia";

export const useSidebarStore = defineStore("sidebar", {
  state: () => ({
    isOpen: false, // Estado del sidebar (abierto o cerrado)
  }),
  actions: {
    toggleSidebar() {
      this.isOpen = !this.isOpen; // Alternar el estado
    },
    openSidebar() {
      this.isOpen = true; // Abrir el sidebar
    },
    closeSidebar() {
      this.isOpen = false; // Cerrar el sidebar
    },
  },
});
