<template>
  <navComp  />
  <profilComp  />
  <newPostComp  />
 <!-- <post-comp /> -->
  <footerComp  />
</template>

<script>
import navComp from "@/components/navComp.vue";
import profilComp from "@/components/profilComp.vue";
import newPostComp from "@/components/newPostComp.vue";
//import PostComp from "@/components/postComp.vue";
import footerComp from "@/components/footerComp.vue";



export default {
  name: "postView",
  components: {
    navComp,
    profilComp,
    newPostComp,
   // PostComp,
    footerComp,
  },
}
</script>

<style lang="scss" scoped>
.contentForNewpost{
  padding:40px 0px 0px 0px;
}
.profilContent {
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 40px;
  width: 910px;
  height: 185px;
  margin-top: 140px;
}
.profilInfo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  &__img {
    padding: 15px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 75px;
    }
  }
}
.profilName {
  padding-left: 20px;
  font-size: 30px;
}
.profilModifier {
  padding: 145px 0px 20px 270px;
}

article {
  overflow: hidden;
  margin-top: 20px;
}
</style>
