<template>
  <div class="profilContent">
    <div v-if="mode === 'profil'">
      <div class="profilInfo">
        <div class="profilInfo__img">
          <img src="@/assets/image-attractive.jpeg" alt="photo de profil" />
        </div>
        <h2 class="profilName">{{ user.firstName }} {{ user.lastName }}</h2>
        <div class="profilModifier" @click="switchToProfilModif()">
          Modifier le profil
        </div>
      </div>
    </div>
    <div class="profilModif" v-if="mode === 'profilModif'">
      <form>
        <label  for="user-email">Email:</label><br />
        <input id="user-email" v-model="user.email" />
      </form>
      <div class="btnContent">
        <button
          class="button btn-orange width"
          @click.prevent="modifyProfil(user) "
          @click="switchToProfil()"
        >
          <span> Enregistrer les modifications </span>
        </button>
        <button class="button btn-red width" @click.prevent="deleteUser()">
          <span> Supprimer compte </span>
        </button>
      </div>
    </div>
  </div>
</template>

<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "Perso",

  data() {
    return {
      email: "",
      mode: "profil",
      user: [],
      posts: [],
      users: [],
      content: "",
      post: [],
      comment: [],
      createdAt: "",
      title: "",
      message: "",
    };
  },
  created() {
    const userId = sessionStorage.getItem("user");
    axios
      .get("/api/users/" + userId, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => (this.user = response.data))
      .catch((err) => console.log(err));
  },
  methods: {
    switchToProfil: function () {
      this.mode = "profil";
    },
    switchToProfilModif: function () {
      this.mode = "profilModif";
    },
    modifyProfil(user) {
      axios
        .put(
          "/api/users/" + user.id,
          {
            email: user.email,
          },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.email = response.email;
        }, window.alert("modification effectué"))
         .catch((err) => console.log(err));
    },

    deleteUser() {
      const userId = sessionStorage.getItem("user");
      axios
        .delete("/api/users/" + userId, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
      sessionStorage.clear();
      this.$router.push("/");
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/mixins";

@include button;
@include btn-red;
@include btn-orange;
.width {
  width: 200px;
}
.btnContent {
  display: flex;
}
.contentForNewpost {
  padding: 40px 0px 0px 0px;
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

.profilModif {
  margin-top: 40px;
}

article {
  overflow: hidden;
  margin-top: 20px;
}
</style>
