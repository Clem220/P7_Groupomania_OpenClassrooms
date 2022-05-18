<template>
  <navBar />
  <newPostComp />
  <Post
    v-for="post in posts"
    v-bind:key="post.id"
    :post="post"
    @deletePostEvent="deletePost"
  />
  <footerComp />
</template>

<script>
import navBar from "@/components/navComp.vue";
import newPostComp from "@/components/newPostComp.vue";
import Post from "@/components/postComp.vue";
import footerComp from "@/components/footerComp.vue";
import axios from "axios";

export default {
  name: "postView",
  components: {
    navBar,
    newPostComp,
    Post,
    footerComp,
  },
  data() {
    return {
      users: [],
      posts: [],
      comments: [],
    };
  },
  created() {
    axios
      .get("/api/users", {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => (this.users = response.data))
      .catch((err) => console.log(err));
    axios
      .get("/api/auth/posts", {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => {
        console.log(response), (this.posts = response.data);
      })
      .catch((err) => console.log(err));
  },
  methods: {
    deletePost(item) {
      axios
        .delete("/api/auth/posts/" + item.id, {
          headers: {
            Authorization: "Bearer " + sessionStorage.getItem("token"),
          },
        })
        .then((response) => {
          console.log(response);
          this.posts = this.posts.filter((post) => post.id != item.id);
        })
        .catch((err) => console.log(err));
    },
  },
};
</script>

<style lang="scss" scoped>

.contentForNewpost {
  margin-top: 130px;
}

div {
  display: flex;
  justify-content: center;
}
</style>
