<template>
  <section class="content">
        <div class="logo">
      <img src="../assets/icon-above-font.png" alt="logo groupomania" />
      <p>Avec Groupomania, partagez et restez en contact avec vos collègues.</p>
    </div>
    <loginForm/>
    <footerComp/>
  </section>
  

</template>

<script>
import FooterComp from '@/components/footerComp.vue'
import loginForm from '@/components/loginComp.vue'

export default {
  name: 'HomeView',
  components: {
   loginForm,
   FooterComp,
  }
}

</script>

<style lang="scss">
body{
    background-image: url(../assets/background.jpg);
  background-clip: cover;
}
.content {
  margin-top: 150px;
  display: flex;
  flex-direction: row;
  width: 100%;
}
</style>