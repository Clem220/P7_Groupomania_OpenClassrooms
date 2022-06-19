<template>
  <nav>
    <router-link to="/postView" aria-label="accueil">
      <img
        src="../assets/icon-left-font.png"
        alt="logo de Groupomania"
        rel="preload"
      />
    </router-link>
    <div class="navContent">
      <router-link to="/moderationView" v-if="isAdmin === 'true'">
        <span>Members</span>
      </router-link>
      <router-link to="/profilView" aria-label="profil">
        <span>Profil</span>
      </router-link>
      <router-link to="/" @click="logout()">
        <span>Déconnexion</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
/* eslint-disable */
export default {
  name: "navComp",
  data() {
    return {
      user: {
        id: localStorage.getItem("userId"),
        isAdmin: localStorage.getItem("isAdmin"),
      },
      user: [],
      users: [],
      userId: localStorage.getItem("userId"),
      isAdmin: localStorage.getItem("isAdmin"),
    };
  },

  methods: {
    /*** Déconnection ***/
    logout() {
      sessionStorage.clear();
      localStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/mixins";
nav {
  display: flex;
  position: fixed;
  flex-direction: row;
  top: 0px;
  justify-content: space-between;
  background-color: #ffff;
  width: 100%;
  height: 100px;
  z-index: 1;
  @include montserrat;
  @include phone {
    flex-direction: column;
    height: 105px;
    align-items: center;
  }
}
img {
  width: 480px;
  height: 100px;
  @include phone {
    width: 360px;
    height: auto;
  }
}
.navContent {
  display: flex;
  align-items: center;
  padding-right: 40px;
  @include phone {
    padding-right: 0px;
  }
  span {
    padding-right: 15px;
  }
}
</style>
