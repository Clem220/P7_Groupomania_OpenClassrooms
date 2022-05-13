<template>
  <navComp />
  <div class="profilContent">
    <div class="profilInfo">
      <div class="profilInfo__img">
        <img src="../assets/image-attractive.jpeg" alt="photo de profil" />
      </div>
      <h2 class="profilName">Clément Vermeulen</h2>
      <div class="profilModifier">
        <button class="delButton">Supprimer le compte</button>
      </div>
    </div>
  </div>
  <newPostComp />

  <post-comp />

  <footerComp />
</template>

<script>
import newPostComp from "@/components/newPostComp.vue";
import navComp from "@/components/navComp.vue";
import footerComp from "@/components/footerComp.vue";
import PostComp from "@/components/postComp.vue";

export default {
  name: "postView",
  components: {
    navComp,
    newPostComp,
    footerComp,
    PostComp,
  },
};
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
