<template>
  <div class="profilContent">
    <div v-if="mode === 'profil'">
      <div class="profilInfo" v-bind="user">
        <div class="profilInfo">
          <img class="profilInfo__img" :src= "user.imageUrl" alt="photo de profil">
        <h2 class="profilName">{{ user.firstName }} {{ user.lastName }}</h2>
        </div>
        <div class="profilModifier" @click="switchToProfilModif()">
          Modifier le profil
        </div>
      </div>
    </div>
    <div class="profilModif" v-if="mode === 'profilModif'">
        <form class="profilModif__content">
       <div class="profilModif__email">
        <label for="user-email"><strong>Modifier mon email: </strong></label>
        <input id="user-email" v-model="user.email" />
        <button
          class="button btn-orange width"
          @click.prevent="modifyProfilEmail(user)"
          @click="switchToProfil()"
        >
          <span> Enregistrer l'email</span>
        </button>
        </div>
        <div class="profilModif__img">
        <label class="text-center label" for="image"
          ><strong>Choisir ma photo de profil</strong></label
        >
        <input
          type="file"
          class="form-control"
          name="image"
          id="image"
          accept="image/*"
          ref="image"
          @change="filePictureToUpload()"
        />
        <button
          class="button btn-orange width"
          @click.prevent="updatePicture()"
          @click="switchToProfil()"
        >
          <span> Enregistrer la photo de profil</span>
        </button>
        </div>
       </form>
        <button class="button btn-red width" @click.prevent="deleteUser()">
          <span> Supprimer compte </span>
        </button>
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
      user: {
        id: localStorage.getItem("userId"),
        isAdmin: localStorage.getItem("isAdmin"),
        firtName: "",
        lastName: "",
        email: "",
        imageUrl: "",
      },
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      image: "",
      mode: "profil"
    };
  },
  async created() {
    await axios
      .get(`http://localhost:3000/api/users/${this.userId}`, {
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.user = response.data.user;
        console.log(this.user);
        this.image = response.data.image;
      });
  },
  methods: {
    switchToProfil: function () {
      this.mode = "profil";
    },
    switchToProfilModif: function () {
      this.mode = "profilModif";
    },
    filePictureToUpload() {
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },
    async updatePicture() {
      const formData = new FormData();
      formData.append("userId", parseInt(localStorage.getItem("userId")));
      formData.append("image", this.image);
      formData.append("imageUrl", this.imageUrl);
      console.log(this.image);
      console.log(this.imageUrl);
      console.log("test-récup", formData.get("imageUrl"));
      await axios
        .put(`http://localhost:3000/api/users/${this.userId}`, formData, {
          headers: {
            Authorization: "Bearer " + this.token,
            "Content-Type": "multipart/form-data",
          },
        })
        .then((response) => {
          this.user = response.data.user;
          this.image = response.data.image;
        });
    },
    async deleteMyAccount(id) {
      let confirmDeleteUser = confirm(
        " la suppresion du compte est irréversible, voulez-vous vraiment supprimer le compte ?"
      );
      if (confirmDeleteUser == true) {
        await axios
          .delete(`/api/users/${id}`, {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          })
          .then(() => {
            localStorage.clear();
            this.$router.push("/");
          });
      } else {
        return;
      }
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
  width: 265px;
  @include phone {
    margin-top: 0px;
    margin-bottom: 20px;
  }
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
  width: 90%;
  height: 185px;
  margin-top: 140px;
}
.profilInfo {
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  align-items: center;
  @include phone{
    flex-direction: column;
  }
  &__img {
    display: flex;
    flex-direction: row;
    align-items: center;
    padding: 15px;
    width: 150px;
      height: 150px;
      border-radius: 75px;
      object-fit: cover;
  }
}
.profilName {
  padding-left: 20px;
  font-size: 30px;
}
.profilModifier {
  padding: 130px 25px 20px 0px;
  @include phone {
   padding: 0px;
   padding-bottom: 20px;
  }
  @include tablet {
    padding: 135px 0px 20px 20%;
  }
}

.profilModif {
  display: flex;
  flex-direction: row;
  margin-top: 40px;
  @include phone{
   flex-direction: column;
  }
  &__content{
    display: flex;
    flex-direction: row;
    @include phone{
   flex-direction: column;
  }
  }
  &__email{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
    @include phone {
      margin-left: 0px;
      
    }
  }
  &__img{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-left: 20px;
    @include phone {
      margin-left: 0px;
      
    }
  }
}

article {
  overflow: hidden;
  margin-top: 20px;
}
</style>
