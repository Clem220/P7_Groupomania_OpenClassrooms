<template>
  <section class="contentForNewpost">
    <article class="newPost">
      <form aria-label="Nouveau message">
        <form class="newPost__content">
          <label for="newPost-title">Titre</label>
          <input
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
            class="newPost__option__button"
            aria-label="Publier le message"
            @click="postMessage()"
          >
            Publier
          </button>
        </form>

        <div class="newPost__option">
          <div class="newPost__option__file">
            <input
              type="file"
              ref="fileUpload"
              accept="image/*"
              aria-label="Sélectionner un fichier"
            />
          </div>
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
      user: [],
      posts: [],
      users: [],
      content: "",
      post: [],
      title: "",
      message: "",
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
    postMessage() {
      if (this.content == "" || this.title == "") {
        this.message = "Veuillez inscrire un sujet et un message";
      } else {
        axios
          .post(
            "http://localhost:3000/api/auth/posts/post",
            { content: this.content, title: this.title },
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
};
</script>

<style lang="scss" scoped>
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
  height: 185px;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 40px;
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
