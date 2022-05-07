<template>
  <section class="content">
        <div class="logo">
      <img src="../assets/icon-above-font.svg" alt="logo groupomania" />
      <p>Avec Groupomania, partagez et restez en contact avec vos collègues.</p>
    </div>
    <loginForm/>
    <signupForm/>
  </section>
  <a href="https://fr.freepik.com/vecteurs/fond">Fond vecteur créé par freepik - fr.freepik.com</a>

</template>

<script>
// @ is an alias to /src
import loginForm from '../components/loginForm.vue'

import signupForm from '../components/signupForm.vue'

export default {
  name: 'HomeView',
  components: {
   loginForm,
   signupForm
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