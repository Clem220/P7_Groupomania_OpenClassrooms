<template>
<newPostComp class="newPost" @postResponse="getPosts()"/>
  <section class="postContent" :key="post.id" v-for="post in posts.slice().reverse()">
    <article class="articleContent" >
      <div class="articleContent__headers" v-for="user in users.filter((user) => {
          return user.id == post.userId;
        })"
        :key="user.id">
        <img
          v-if="user.imageUrl == null"
          src="../assets/image-attractive.jpeg"
          alt="photo de profil provisoire"
          title="photo de profil"
          class="articleContent__headers__img"
        />
        <img
          v-else
          :src="user.imageUrl"
          class="articleContent__headers__img"
          alt="profile picture"
          title="picture profile"
          rel="preload"
        />
        <h3>{{ user.firstName }} {{ user.lastName }}</h3>
      </div>
      <div class="articleContent__post">
        <p class="articleContent__content">{{ post.content }}</p>
        <img v-if="post.imageUrl!=null" alt="photo du post" :src= "post.imageUrl" >
      </div>
     <div class="btn-content">
        <span> {{ formatDate(post.createdAt) }} </span> 
      <button
        class="button btn-red"
        v-if="user.id == post.userId"
        @click="deletePublication(post.id)"
      >
        <span> Supprimer </span>
      </button>
      </div>
    </article>

    <article class="commentContent"  v-if="comment !== null">
      <div
        v-for="comment in comments.filter((comment) => {
              return comment.postId == post.id;
            })"
            :key="comment.id"
        class="commentContent-align"
      >

        <div v-for="user in users.filter((user) => {
          return user.id == comment.userId;
        })"
        :key="user.id" class="commentContent__commentaire">
          <h4>{{ user.firstName }} {{ user.lastName }}</h4>
        </div>
          <p class="commentaireContent">{{ comment.content }}</p>

        <div class="commentContent__footer">
          <span class="date">{{ formatDate(comment.createdAt) }}</span> 
          <button
            class="button btn-red btn-com"
            v-if="comment.userId == user.id || user.admin === true"
            @click.prevent="deleteComment(comment.id)"
          >
            <span> Supprimer </span>
          </button>
        </div>
      </div>
    </article>
    <createComment class="comment__form" v-bind="post"  @postCommentResponse="getComments()"/>
  </section>
</template>

<script>
/* eslint-disable */
import axios from "axios";
import createComment from "@/components/createComment.vue";
import newPostComp from "@/components/newPostComp.vue";
export default {
    name: "userpostComp",
    components: {
        createComment,
        newPostComp,
    },
data() {
    return {
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      users: [],
      user: {
        id: localStorage.getItem("userId"),
        isAdmin: localStorage.getItem("isAdmin"),
      },
      postId: "",
      content: "",
      post: {},
      posts: [],
      comment: {},
      comments: [],
    };
  },
  
  async created() {
 await axios
      .get("/api/users", {
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.users = response.data.users;
        console.log(this.users);
      })
      .catch(function(error) {
        alert(error);
        console.log(error);
      });

    const userId = sessionStorage.getItem("user");
   
  await  axios
      .get(`/api/posts/${this.userId}`  , {
        headers: {
          Authorization: "Bearer " + this.token,
        },
      })
      .then((response) => {
        this.posts = response.data.posts;
        console.log("hola",response);
      })
      .catch((err) => console.log(err)); 

   await  axios
      .get("/api/comments", {
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.comments = response.data;
      })
      .catch(function(error) {
        console.log(error);
      });
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
    //
    async getPosts() {
      await axios
        .get("http://localhost:3000/api/posts", {
          headers: {
            Authorization: "Bearer " + this.token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.posts = response.data.posts;
          console.log(this.posts);
        })
        .catch(function(error) {
          alert(error);
          console.log(error);
        });
    },
    //
     async getComments() {
      await axios
        .get("/api/comments", {
          headers: {
            Authorization: "Bearer " + this.token,
            "Content-Type": "application/json",
          },
        })
        .then((response) => {
          this.comments = response.data;
        })
        .catch(function(error) {
          alert(error);
          console.log(error);
        });
    },
     async deletePublication(id) {
      let confirmDeletePost = confirm(
        "voulez-vous vraiment supprimer votre publication ?"
      );
      if (confirmDeletePost == true) {
        await axios
          .delete(`/api/posts/${id}`, {
            headers: {
              Authorization: "Bearer " + this.token,
            },
          })
          .then(() => {
            let i = this.posts.map((data) => data.id).indexOf(id);
            this.posts.splice(i, 1);
          });
      } else {
        return;
      }
    },
    async deleteComment(id) {
      let confirmDeleteComment = confirm(
        "voulez-vous vraiment supprimer votre commentaire ?"
      );
      if (confirmDeleteComment == true) {
        await axios
          .delete(`/api/comments/${id}`, {
            headers: {
              "Content-Type": "application/json",
              Authorization: "Bearer " + this.token,
            },
          })
          .then(() => {
            let i = this.comments.map((data) => data.id).indexOf(id);
            this.comments.splice(i, 1);
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

.newPost {
  margin-top: 50px;
}

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
      width: 620px;
      height: 450px;
      object-fit: content;
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