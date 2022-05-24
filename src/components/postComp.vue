<template>
  <section class="postContent">
    <article class="articleContent">
      <div class="articleContent__headers">
        <img class="articleContent__headers__img" :src= "post.user.imageUrl" alt="">
        <h3>{{ post.user.firstName }} {{ post.user.lastName }}</h3>
      </div>
      <div class="articleContent__post">
      <!--  <p class="articleContent__title">{{ post.title }}</p> -->
        <p class="articleContent__content">{{ post.content }}</p>
        <img v-if="post.imageUrl!=null" :src= "post.imageUrl" :alt="post.title">
      </div>
      <div class="btn-content">
        <span> {{ formatDate(post.createdAt) }} </span>
      <button
        class="button btn-red"
        v-if="post.userId === user.id || user.admin === true"
        @click="deletePostEvent"
      >
        <span> Supprimer </span>
      </button>
      </div>
    </article>

    <article class="commentContent">
      <div
        v-for="comment in comments"
        v-bind:key="comment.id"
        :comment="comment"
        class="commentContent-align"
      >
        <div v-if="comment !== null" class="commentContent__commentaire">
          <h4>{{ comment.user.firstName }} {{ comment.user.lastName }}</h4>
          <p class="commentaireContent">{{ comment.comment }}</p>
        </div>

        <div class="commentContent__footer">
          <span class="date">{{ formatDate(comment.createdAt) }}</span>
          <button
            class="button btn-red btn-com"
            v-if="comment.userId === user.id || user.admin === true"
            @click.prevent="deleteCom(comment)"
          >
            <span> Supprimer </span>
          </button>
        </div>
      </div>
    </article>
    <form class="comment__form">
      <label for="comment">Commentaire</label>
      <input
        id="comment"
        class="comment__form__input"
        v-model="comment"
        placeholder="Ecrire un commentaire..."
      />

      <div class="comment__form__message">{{ message }}</div>

      <button
        class="comment__form__btn button btn-orange btn-com-width"
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
      .get("/api/users/" + userId, {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => (this.user = response.data))
      .catch((err) => console.log(err));
    axios
      .get("/api/auth/comments/" + this.post.id, {
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
            "/api/auth/comments/",
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
              .get("/api/auth/comments/" + this.post.id, {
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
        .delete("/api/auth/comments/" + comment.id, {
          headers: {
            Authorization: "Bearer " + sessionStorage.token,
          },
        })
        .then(() => {
          axios
            .get("/api/auth/comments/" + this.post.id, {
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

.btn-content{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    font-family: "Montserrat", sans-serif;
    button{
      width: 90px;
    height: 30px;
    line-height: 30px;
    margin: 0px;
    }
}

.articleContent {
  display: flex;
  flex-direction: column;
  justify-content: center;
  padding-bottom: 20px;
  border-bottom: 1px solid #c2c2c2;
  margin: 0px 30px;
  &__headers {
    display: flex;
    flex-direction: row;
    align-items: center;
    border-bottom: 1px solid #c2c2c2;
    @include montserrat;
    &__img{
      width: 75px;
      height: 75px;
      border-radius: 35px;
      object-fit: cover;
      margin: 20px 20px 10px 0px;
    }
    h6 {
      padding-right: 40px;
    }
  }
  &__content{
    @include courier-prime;
  }
  &__post {
    width: 100%;
    img{
      width: 100%;
      height: auto;
    }
  }
}

.commentContent {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  height: auto;
  min-width: 0px;
  max-height: 200px;
  overflow: scroll;
  margin: 20px 30px 0px;
  padding-bottom: 10px;
  border-bottom: 1px solid #c2c2c2;
  &-align{
    display: flex;
    flex-direction: column;
    align-items: flex-start;
  }
  &__commentaire {
    background-color: #f0f0f0;
    border-radius: 20px;
    padding: 0px 15px;
    @include courier-prime;
    h6{
      padding: 10px 10px;
      margin: 5px 0px;
 } 
    p{
      margin: 0;
    }
    label{
      display: none;
    }
 }
  &__footer {
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    margin-top: 5px;
    @include montserrat;
    h6 {
      padding-right: 20px;
    }
    span {
      padding-right: 10px;
      font-size: 12px;
    }
    .date{
      padding: 10px 0px;
      margin-right: 15px;
    }
  }
}
.commentaireContent{
  width: auto;
  padding: 5px 10px;
  max-width: 400px;
  word-wrap:break-word;
}
.comment__form {
  margin: 10px 0px 10px 30px;
  display: flex;
  flex-direction: row;
  &__input {
    width: 300px;
    height: 35px;
    border-radius: 10px;
    @include phone {
      width: 200px;
    }
  }
  &__btn {
    margin-bottom: 10px;
    @include phone {
      width: 150px;
    }
  }
}
.btn-com {
  margin-top: 0px;
  width: 90px;
    height: 30px;
    line-height: 30px;
  &-width{
    width: 50px;
    margin: 0px 0px 5px 20px;
  }
}
</style>
