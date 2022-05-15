<template>
    <section class=" postContent">
    <article class="content">
          <h6 class="mb-0">
            {{ post.user.lastName }} {{ post.user.firstName }}
          </h6>
          <span class="date"> {{ formatDate(post.createdAt) }} </span>
        
      <p class="title">{{ post.title }}</p>
      <p class="content">{{ post.content }}</p>
    
      <button
        class="btn btn-primary btn-sm ms-1"
        v-if="post.userId === user.id || user.admin === true"
        @click="deletePostEvent"
      >
        Supprimer
      </button>
    </article>

    <article class="card p-3 mt-3">
      <h2>Commentaires</h2>
      <div
        class="d-flex flex-column mt-2"
        v-for="comment in comments"
        v-bind:key="comment.id"
        :comment="comment"
      >
        <div class="d-flex flex-column">
            <h6 class="mb-0">
              {{ comment.user.firstName }} {{ comment.user.lastName }}
            </h6>
            <span class="date">{{ formatDate(comment.createdAt) }}</span>
        </div>
        <div class="com d-flex justify-content-between">
          <p class="content">{{ comment.comment }}</p>
          <button
            class="btn btn-outline-secondary btn-sm"
            v-if="comment.userId === user.id || user.admin === true"
            @click.prevent="deleteCom(comment)"
          >
          </button>
        </div>
      </div>
      <form class="comment__form">
        <input
          class="comment__form__input"
          v-model="comment"
          placeholder="Ecrire un commentaire..."
        />
        <div class="comment__form__message">{{ message }}</div>

        
          <button
            class="btn btn-outline-secondary btn-sm"
            @click.prevent="createCom(post)"
          >
            Poster
          </button>
      </form>
    </article>
    </section>
 
</template>
<script>
/* eslint-disable */
import axios from "axios";
export default {
  name: "post",
  data() {
    return {
      user: [],
      comments: [],
      createdAt: "",
      comment: [],
      firstName: "",
      lastName: "",
      title: "",
      message: "",
      content:'',
      posts:[],
      
    };
  },
  props: {
    post: {
      type: Object,
      required: true,
    },
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
      .get("http://localhost:3000/api/auth/comments/" + this.post.id, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => {
        console.log(response);
        this.comments = response.data;
      })
      .catch((err) => console.log(err));
  },
  methods: {
    formatDate(date) {
      return new Date(date).toLocaleDateString("fr-FR", {
        weekday: "long",
        year: "numeric",
        month: "long",
        day: "numeric",
        hour: "numeric",
        minute: "numeric",
      });
    },
    deletePostEvent() {
      this.$emit("deletePostEvent", this.post);
    },
    createCom(post) {
      if (this.comment == "") {
        this.message = "Ne pas poster avec un champs vide";
      } else {
        axios
          .post(
            "http://localhost:3000/api/auth/comments/",
            { comment: this.comment, postId: post.id },
            {
              headers: {
                Authorization: "Bearer " + sessionStorage.token,
              },
            }
          )
          .then((response) => {
            console.log(response);
            this.comment = "";
            axios
              .get("http://localhost:3000/api/auth/comments/" + this.post.id, {
                headers: {
                  Authorization: "Bearer " + sessionStorage.token,
                },
              })
              .then((response) => {
                console.log(response);
                this.comments = response.data;
                this.message = "";
              })
              .catch((err) => console.log(err));
          })
          .catch((err) => console.log(err));
      }
    },
    deleteCom(comment) {
      axios
        .delete("http://localhost:3000/api/auth/comments/" + comment.id, {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        })
        .then((response) => {
          console.log(response);
          axios
            .get("http://localhost:3000/api/auth/comments/" + this.post.id, {
              headers: {
                Authorization: "Bearer " + sessionStorage.token,
              },
            })
            .then((response) => {
              console.log(response);
              this.comments = response.data;
            })
            .catch((err) => console.log(err));
        })
        .catch((err) => console.log(err));
    },
    
  },
};
</script>

<style lang="scss" scoped>

@import "../style/mixins";
.articleContent {
  display: flex;
  flex-direction: column;
  justify-content: space-around;
}
.postContent {
  display: flex;
  margin-top: 200px;
  flex-direction: column;
  justify-content: center;
  width: 680px;
  height: auto;
  overflow: hidden;
  @include boxShadow;
 // margin: 40px 0px 0px 0px;
  &__content {
    height: auto;
    max-height: 200px;
    overflow: scroll;
  }
}
</style>
