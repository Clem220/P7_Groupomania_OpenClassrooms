<template>
  <navComp />
  <profilComp />
  <userPostComp
    @deletePostEvent="deletePost"
  />
  <footerComp />
</template>

<script>
import navComp from "@/components/navComp.vue";
import profilComp from "@/components/profilComp.vue";
import userPostComp from "@/components/userPostComp";
import footerComp from "@/components/footerComp.vue";

import axios from "axios";

export default {
  name: "postView",
  components: {
    navComp,
    profilComp,
    userPostComp,
    footerComp,
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
    
 await   axios
      .get(`/api/users/${this.userId}` , {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => (this.user = response.data))
      .catch((err) => console.log(err));
   
  await  axios
      .get(`/api/posts/${this.userId}`  , {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => {
        this.posts = response.data.posts;
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
