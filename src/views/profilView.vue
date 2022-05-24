<template>
  <navComp />
  <profilComp />
  <newPostComp />
  <post-comp
    v-for="post in posts"
    v-bind:key="post.id"
    :post="post"
    @deletePostEvent="deletePost"
  />
  <footerComp />
</template>

<script>
import navComp from "@/components/navComp.vue";
import profilComp from "@/components/profilComp.vue";
import newPostComp from "@/components/newPostComp.vue";
import PostComp from "@/components/postComp.vue";
import footerComp from "@/components/footerComp.vue";

import axios from "axios";

export default {
  name: "postView",
  components: {
    navComp,
    profilComp,
    newPostComp,
    PostComp,
    footerComp,
  },
  data() {
    return {
      user: [],
      posts: [],
      users: [],
      content: "",
      post: [],
      comment: [],
      createdAt: "",
      title: "",
      message: "",
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

    axios
      .get("/api/auth/posts/" + userId, {
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
@import "../style/mixins";
.contentForNewpost {
  padding: 40px 0px 0px 0px;
}
.profilContent {
  flex-direction: column;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 40px;
  width: 910px;
  height: 185px;
  margin-top: 140px;
  @include phone{
    @include phone-size;
    height: auto;
  }
  @include tablet{
    @include tablet-size;
  }
}
.profilInfo {
  display: flex;
  flex-direction: row;
  justify-content: flex-start;
  align-items: center;
  &__img {
    padding: 15px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 75px;
    }
  }
}
.profilName {
  padding-left: 20px;
  font-size: 30px;
}
.profilModifier {
  padding: 145px 0px 20px 270px;
}

article {
  overflow: hidden;
  margin-top: 20px;
}
</style>
