<template>
  <navBar />
  <Post />
  <footerComp />
</template>

<script>
/*** Imports des composants */
import navBar from "@/components/navComp.vue";
import Post from "@/components/postComp.vue";
import footerComp from "@/components/footerComp.vue";
import axios from "axios";

export default {
  name: "postView",
  components: {
    navBar,
    Post,
    footerComp,
  },
  data() {
    return {
      showComments: false,
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      users: [],
      user: {
        id: localStorage.getItem("userId"),
        isAdmin: localStorage.getItem("isAdmin"),
      },
      post: {},
      posts: [],
      comment: {},
      comments: [],
    };
  },
  /*** Récupération des utilisateurs */
  async created() {
    await axios
      .get("http://localhost:3000/api/users", {
        headers: {
          Authorization: "Bearer " + this.token,
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        this.users = response.data.users;
        console.log(this.users);
      })
      .catch(function (error) {
        alert(error);
        console.log(error);
      });
  },
};
</script>

<style lang="scss" scoped>
@import "../style/mixins";

.contentForNewpost {
  margin-top: 130px;
}

div {
  display: flex;
  justify-content: center;
}
</style>
