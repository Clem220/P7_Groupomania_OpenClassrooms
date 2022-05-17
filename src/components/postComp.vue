<template>
  <section class="postContent">
    <article class="articleContent">
      <div class="articleContent__headers">
        <h6>{{ post.user.firstName }} {{ post.user.lastName }}</h6>
        <span> {{ formatDate(post.createdAt) }} </span>
      </div>
      <div class="articleContent__post">
        <p class="articleContent__title">{{ post.title }}</p>
        <p class="articleContent__content">{{ post.content }}</p>
      </div>
      <button
        class="button btn-red"
        v-if="post.userId === user.id || user.admin === true"
        @click="deletePostEvent"
      >
        <span> Supprimer </span>
      </button>
    </article>

    <article class="commentContent">
      <div
        v-for="comment in comments"
        v-bind:key="comment.id"
        :comment="comment"
      >
        <div v-if="comment !== null" class="commentContent__commentaire">
          <p class="commentaireContent">{{ comment.comment }}</p>
        </div>

        <div class="commentContent__footer">
          <h6>{{ comment.user.firstName }} {{ comment.user.lastName }}</h6>
          <span class="date">{{ formatDate(comment.createdAt) }}</span>
          <button
            class="button btn-red"
            v-if="comment.userId === user.id || user.admin === true"
            @click.prevent="deleteCom(comment)"
          >
            <span> Supprimer </span>
          </button>
        </div>
      </div>
    </article>
    <form class="comment__form">
      <input
        class="comment__form__input"
        v-model="comment"
        placeholder="Ecrire un commentaire..."
      />

      <div class="comment__form__message">{{ message }}</div>

      <button
        class="comment__form__btn button btn-orange"
        @click.prevent="createCom(post)"
      >
        <span> Poster </span>
      </button>
    </form>
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
      content: "",
      posts: [],
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
          .then(() => {
            this.comment = "";
            axios
              .get("http://localhost:3000/api/auth/comments/" + this.post.id, {
                headers: {
                  Authorization: "Bearer " + sessionStorage.token,
                },
              })
              .then((response) => {
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
        .then(() => {
          axios
            .get("http://localhost:3000/api/auth/comments/" + this.post.id, {
              headers: {
                Authorization: "Bearer " + sessionStorage.token,
              },
            })
            .then((response) => {
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

@include button;
@include btn-red;
@include btn-orange;

.postContent {
  display: flex;
  margin-top: 45px;
  flex-direction: column;
  justify-content: center;
  width: 680px;
  height: auto;
  overflow: hidden;
  @include boxShadow;
  @include phone{
    @include phone-size
  }
  @include tablet{
    @include tablet-size
  };
  &__content {
    height: auto;
    max-height: 200px;
    overflow: scroll;
  }
}

.articleContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #c2c2c2;
  &__headers {
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    align-items: center;
    border-bottom: 1px solid #c2c2c2;
    margin: 0px 80px;
    h6 {
      padding-right: 40px;
    }
  }
  &__post {
    width: 70%;
  }
}

.commentContent {
  display: flex;
  flex-direction: column;
  align-items: center;
  height: auto;
  min-width: 0px;
  max-height: 200px;
  overflow: scroll;
  margin-top: 20px;
  padding-bottom: 10px;
  border-bottom: 1px solid #c2c2c2;
  &__commentaire {
    border-bottom: 1px solid #c2c2c2;
    border-radius: 20px;
  }
  &__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    h6 {
      padding-right: 20px;
    }
    span {
      padding-right: 20px;
    }
  }
}

.comment__form {
  margin-top: 20px;
  &__input {
    width: 300px;
    height: 35px;
    border-radius: 10px;
  }
  &__btn {
    margin-bottom: 10px;
  }
}
</style>
