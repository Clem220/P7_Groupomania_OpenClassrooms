<template>
  <section class="contentForNewpost">
    <article class="newPost">
      <form class="newPost__content">
        <label for="title">Titre</label>
        <label for="content">Votre publication</label>
        <textarea
          v-model="content"
          id="content"
          class="newPost__content__text"
          name="message"
          placeholder="Quoi de neuf ?"
          aria-label="Rédiger un nouveau message"
        />
        <div class="newPost__button">
        <input
            type="file"
            ref="image"
            id="image"
            accept="image/*"
            aria-label="Sélectionner un fichier"
            @change="selectFile()"
          />
          <span class="btn__width">
          <button
          type="submit"
          class="button btn-orange width"
          aria-label="Publier le message"
          @click.prevent="addPost()"
        >
          <span> Publier </span>
        </button>
        </span>
        </div>
        <div id="preview" class="newPost__preview">
          <img
            v-if="image"
            :src="imageUrl"
            id="preview"
            class="newPost__preview__image"
            alt="Prévisualisation de l'image ajoutée au message"
          />
        </div>
      </form>
    </article>
  </section>
</template>

<script>
import axios from "axios";

export default {
  name: "newPostComp",

   data() {
    return {
      token: localStorage.getItem("token"),
      userId: localStorage.getItem("userId"),
      image: "",
      content: "",
      imageUrl: "",
      error: "",
    };
  },
  methods: {
    selectFile() {
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
    },
    /*** Créer une nouvelle publication ***/
    async addPost() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("userId", parseInt(localStorage.getItem("userId")));
      formData.append("content", document.getElementById("content").value);
      console.log("test", formData.get("image"));
      console.log("test", formData.get("content"));
      if (formData.get("content") == "") {
        this.error = "Message vide";
      } else {
        await axios
          .post("http://localhost:3000/api/posts", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + this.token,
            },
          })
          .then(() => {
            this.$emit("postResponse");
          })
          .catch((error) => (this.msgError = error));
        this.image = "";
        this.content = "";
      }
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/mixins";

@include button;
@include btn-orange;

  .width {
    width: 200px;
    margin: 15px;
    @include phone {
    width: 150px;
    justify-content: center;
    display: flex;
  }
}

section {
  display: flex;
  justify-content: center;
}
textarea {
  resize: none;
  @include phone {
    max-width: 300px;
    max-height: 90px;
  }
  @include tablet {

    max-width: 440px;
    max-height: 100px;
  }
}
.newPost {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 680px;
  height: auto;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 40px;
  @include phone {
    @include phone-size;
  }
  @include tablet {
    @include tablet-size;
  }
  label {
    display: none;
  }
  &-title {
    margin: 20px;
    @include montserrat;
  }
  &__content {
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 25px;
    label{
      display: none;
    }
    &__text {
      width: 620px;
      height: 100px;
      @include courier-prime;
    }
    
  }
  &__button{
    display: flex;
    flex-direction: column;
    align-items: center;
    margin-top: 10px;
    input{
      @include phone{
      margin: 10px 17px 10px;
    }
    }
  }
  &__preview{
    display: flex;
    flex-direction: column;
    align-items: center;
    &__image {
      margin: 10px 0px 30px;
      width: 90%;
      height: auto;
    }
  }
  &__option {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }
}
</style>
