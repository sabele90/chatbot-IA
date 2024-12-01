
<script setup lang="ts">
import { RouterView } from "vue-router";
</script>
 
<template>
<RouterView />
</template>

<!-- App.vue llama a RouterView.
RouterView carga HomeView.vue.
HomeView.vue renderiza Layout.vue con el componente Chat como slot. -->

