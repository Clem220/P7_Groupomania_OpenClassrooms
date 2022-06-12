<template>
    <div>
        <form action="" class="conment__form">
          
            <input v-bind="$attrs" aria-label="créer un commentaire" class="conment__Form__input" name="content" ref="content" placeholder="votre commentaire">
        <button
          type="submit"
          title="créer"
          aria-label="créer un commentaire"
          class="comment__form__btn button btn-orange btn-com-width"
          v-bind="$attrs"
          @click.prevent="postComment()"
          ref="comment"
        > <span> envoyer com </span>
        </button>
        </form>
    </div>
</template>



<script>
import axios from "axios";
export default {
  name: "createComment",
  data() {
    return {
      userId: localStorage.getItem("userId"),
      token: localStorage.getItem("token"),
      postId: "",
      content: "",
      comment: {},
      comments: [],
    };
  },
  methods: {
    postComment() {
      axios
        .post("http://localhost:3000/api/comments", {
          userId: localStorage.getItem("userId"),
          postId: this.$refs.comment.id,
          content: this.$refs.content.value,
          
          headers: {
            "Content-Type": "application/json",
            Authorization: "Bearer " + this.token,
          },
        })
        .then(() => {
          this.$emit("postCommentResponse");
        })
        .catch((error) => {
          console.log(error);
        });
      this.$refs.content.value = "";
    },
  },
};
</script>

<style lang="scss" scoped>
@import "../style/mixins";

@include button;
@include btn-red;
@include btn-orange;
#commentLabel{
  display: none;
}
.comment__form {
  margin: 10px 0px 10px 15px;
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
    width: 70px;
    margin: 0px 0px 5px 20px;
  }
}
</style>