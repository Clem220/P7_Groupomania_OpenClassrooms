<template>
<nav>
      <img src="../assets/icon-left-font.png" alt="logo groupomania" />
</nav>
  <section >
    <signupComp />
  </section>
    <footerComp />
</template>

<script>
import FooterComp from "@/components/footerComp.vue";
import signupComp from "@/components/signUpComp.vue";

export default {
  name: "HomeView",
  components: {
    signupComp,
    FooterComp,
  },

}
</script>

<style lang="scss" scoped>
@import '@/style/mixins';
nav{
  display: flex;
  justify-content: center;
  width: 100%;
  background-color: #fff;
  img{
    width: 60%;
    height: auto;
  }
}
section {
  display: flex;
  flex-direction: row;
  justify-content: center;
  width: 100%;
  margin-top: 75px;
  @include phone {
    margin-top: 0px;
  }
}
</style>
