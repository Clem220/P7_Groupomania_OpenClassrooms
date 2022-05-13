<template>
  <navApp />
  <newPostComp />
  <postComp />
  <footerComp />
</template>

<script>
import navApp from "@/components/navComp.vue";
import newPostComp from "@/components/newPostComp.vue";
import postComp from "@/components/postComp"
import footerComp from "@/components/footerComp.vue";

export default {
  name: "postView",
  components: {
    navApp,
    newPostComp,
    postComp,
    footerComp,
  },
};
</script>

<style lang="scss" scoped>
.contentForNewpost {
  margin-top: 130px;
}

div {
  display: flex;
  justify-content: center;
}
</style>
