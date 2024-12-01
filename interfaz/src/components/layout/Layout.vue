<template>
  <div class="app">
    <!-- Header -->
    <Header class="header" />

    <!-- Contenido dinámico -->

    <main class="main-content">
      <slot />
    </main>


    <!-- Footer -->
    <Footer class="footer" />

  </div>
</template>

<style>
/* El contenedor principal ocupa toda la pantalla */
.app {
  display: flex;
  flex-direction: column;

}

/* Header fijo en la parte superior */
.header {
  padding: 15px;
  text-align: center;
}

/* Main content ocupa el espacio restante */
.main-content {
  flex-grow: 1;

}

/* Footer fijo en la parte inferior */
.footer {
  padding: 20px;
  text-align: center;
}
</style>
  
<script>
import Header from "./Header.vue";
import Footer from "./Footer.vue";
export default {
  components: {
    Header,
    Footer,
  },
};
</script>
  


  