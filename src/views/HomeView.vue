<template>
<nav>
      <img src="../assets/icon-left-font.png" alt="logo groupomania" />
</nav>
  <section >
    <signupComp />
   <!-- <loginForm /> -->
  </section>
    <footerComp />
</template>

<script>
//import loginForm from "@/components/loginComp.vue";
import FooterComp from "@/components/footerComp.vue";
import signupComp from "@/components/signUpComp.vue";

export default {
  name: "HomeView",
  components: {
    signupComp,
    //loginForm,
    FooterComp,
  },

}
</script>

<style lang="scss" scoped>

nav{
  justify-content: center;
  width: 100%;
  background-color: #fff;
  img{
    width: 40%;
    height: auto;
  }
}
section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 75px;
}
</style>
