<template>
  <section class="contentForNewpost">
    <article class="newPost">
      <form class="newPost__content">
          <label for="newPost-title">Titre</label>
          <input
          class="newPost-title"
            v-model="title"
            id="newPost-title"
            type="text"
            placeholder="Titre de votre post..."
            required
          />
          <textarea
            v-model="content"
            class="newPost__content__text"
            name="message"
            placeholder="Quoi de neuf ?"
            aria-label="Rédiger un nouveau message"
          />
          <div class="message">{{ message }}</div>
          <div id="preview">
            <!-- <img
                v-if="imagePreview"
                :src="imagePreview"
                id="preview"
                class="newPost__content__image"
                alt="Prévisualisation de l'image ajoutée au message"
              /> -->
          </div>

          <button
            type="submit"
            class="button btn-orange"
            aria-label="Publier le message"
            @click="postMessage()"
          >
          <span>
            Publier
            </span>
          </button>
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
      user: [],
      posts: [],
      users: [],
      content: "",
      post: [],
      title: "",
      message: "",
      image: "",
      imageUrl: "",
    };
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

    axios
      .get("http://localhost:3000/api/auth/posts/" + userId, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => {
        console.log(response);
        this.posts = response.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
   selectFile() {
      this.image = this.$refs.image.files[0];
      this.imageUrl = URL.createObjectURL(this.image);
      console.log( this.imageUrl)
    }, 

   /*  async addPost() {
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
          .post("http://localhost:3000/auth/posts/post", formData, {
            headers: {
              "Content-Type": "multipart/form-data",
              Authorization: "Bearer " + this.token,
            },
          })
          .then(() => {
            this.$emit("postResponse");
            console.log(this.$emit("postResponse"));
          })
          .catch((error) => (this.msgError = error));
        this.image = "";
        this.content = "";
      }
    }, */
  
     postMessage() {
    if (this.content==''|| this.title=='') {
        (this.message="Veuillez inscrire un sujet et un message")
    }else{
      axios
        .post(
          "http://localhost:3000/api/auth/posts/post",
          { content: this.content, title: this.title, imageUrl: this.imageUrl  },
          {
            headers: {
              Authorization: "Bearer " + sessionStorage.token,
            },
          }
        )
        .then((response) => {
          console.log(response);
          this.content = "";
          this.title = "";
          this.image = this.$refs.image.files[0];
          this.imageUrl = URL.createObjectURL(this.image);
          const userId = sessionStorage.getItem("user");
          axios
            .get("http://localhost:3000/api/auth/posts/" + userId, {
              headers: {
                Authorization: "Bearer " + sessionStorage.token,
              },
            })
            .then((response) => {
              console.log(response);
              this.posts = response.data;
              this.message = "";
            })
            .catch((err) => console.log(err));
        });
    }
  }, 
    },
}

</script>

<style lang="scss" scoped>
@import '../style/mixins';

@include button;
@include btn-orange;
section {
  display: flex;
  justify-content: center;
}
.newPost {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 680px;
  height: 260px;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 40px;
  &-title{
    margin: 20px;
  }
  &__content {
    &__text {
      width: 620px;
      height: 100px;
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
