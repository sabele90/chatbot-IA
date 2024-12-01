<!-- Cuando usas <script setup>, no necesitas usar export default ni declarar components en el objeto exportado. Todo lo que declares en 
<script setup> está automáticamente disponible en el componente -->

<script setup lang="ts">
import Chat from '@/components/chat/Chat.vue';
import Layout from "@/components/layout/Layout.vue";

</script>

<template>
  <main>
    <Layout>
    <Chat/>
  </Layout>
  </main>
</template>
