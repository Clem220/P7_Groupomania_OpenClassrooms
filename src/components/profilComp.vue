<template>
  <div class="profilContent">
    <div v-if="mode === 'profil'">
      <div class="profilInfo">
        <div class="profilInfo__img">
          <img :src= "user.imageUrl" :alt="post.title">
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
          @click.prevent="modifyProfilImg(user)"
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
      mode: "profil",
      user: [],
      content: "",
      post: [],
      comment: [],
      createdAt: "",
      title: "",
      message: "",
      image:"",
      imageUrl: "",
      email: ""
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

    filePictureToUpload() {
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
      console.log(this.imageUrl)
    },

    modifyProfilEmail(user) {
       const formData = new FormData();
      formData.append("email", user.email);
      axios
        .put(
          "/api/users/" + user.id + '/email', formData
          ,console.log(formData),
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
      //  window.location.reload()
        .catch((err) => console.log(err));
    },

 modifyProfilImg(user) {
       const formData = new FormData();
      formData.append("image", this.image);
      formData.append("imageUrl", this.imageUrl);
      axios
        .put(
          "/api/users/" + user.id + '/photo', formData
          ,console.log(formData),
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
        }, window.alert("modification effectué"))
        window.location.reload()
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
    img {
      width: 150px;
      height: 150px;
      border-radius: 75px;
      object-fit: cover;
    }
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
