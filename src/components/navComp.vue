<template>
  <nav>
    <router-link to="/postView" aria-label="accueil">
      <img src="../assets/icon-left-font.png" alt="logo de Groupomania" />
    </router-link>
    <div class="navContent">
      <router-link to="/moderationView" v-if="user.admin === true">
        <span>Members</span>
      </router-link>
      <router-link to="/profilView" aria-label="profil">
        <span>Profil</span>
      </router-link>
      <router-link to="/" @click = logout()>
        <span>Déconnexion</span>
      </router-link>
    </div>
  </nav>
</template>

<script>
/* eslint-disable */
import axios from 'axios';
export default {
        name: 'navComp',
        methods:{
            logout(){
                sessionStorage.clear();
                this.$router.push('/')
            }
        }, 
        data() {
    return {
      user: [],
    }  
},
created() {
    const userId = sessionStorage.getItem("user");
    axios
      .get("http://localhost:3000/api/users/" + userId, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => (this.user = response.data))
      .catch((err) => console.log(err));
  },
}
</script>

<style lang="scss" scoped>
@import '../style/mixins';
nav {
  display: flex;
  position: fixed;
  top: 0px;
  justify-content: space-between;
  flex-direction: row;
  background-color: #ffff;
  width: 100%;
  height: 100px;
  z-index: 1;

}
img {
  width: auto;
  height: 100px;
}
.navContent {
  display: flex;
  align-items: center;
  padding-right: 40px;
  span {
    padding-right: 15px;
  }
}
</style>
