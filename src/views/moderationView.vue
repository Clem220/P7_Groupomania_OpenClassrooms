<template>
  <navBar />
  <h1>Les membres de Groupomania</h1>
  <section class="content">
  <article class="content__memberCard" v-for="user in users" v-bind:key="user.id">
    <div class="content__memberCard__name">
      <h3> Prénom: {{ user.firstName }} <br/> Nom: {{ user.lastName }} <br/> UserId: {{ user.id }}</h3>
    </div>
    <div class="content__memberCard__email">
      <span>
       Email: {{ user.email }}
      </span>
    </div>
    <button class="content__memberCard__button button btn-red">
      <span>
      Supprimer compte
      </span>
    </button>
  </article>
  </section>
</template>

<script>
import navBar from "@/components/navComp.vue";
import axios from "axios";
export default {
  name: "moderationView",
  components: {
    navBar,
  },
  data() {
    return {
      users: [],
      email: "",
    };
  },
  created() {
    axios
      .get("/api/users", {
        headers: {
          Authorization: "Bearer " + sessionStorage.token,
        },
      })
      .then((response) => {
        console.log(response);
        this.users = response.data;
      })

      .catch((err) => console.log(err));
  },
  deleteUser() {
      const userId = sessionStorage.getItem("user");
      axios
        .delete("api/posts/" + userId)
        .delete("/api/users/" + userId, {
          headers: { Authorization: "Bearer " + localStorage.token },
        })
        .then((response) => console.log(response))
        .catch((err) => console.log(err));
      sessionStorage.clear();
      this.$router.push("/");
    },
};
</script>

<style lang="scss" scoped>
@import '../style/mixins';

@include button;
@include btn-red;

h1{
  margin-top: 150px;
}
.content{
  display: flex;
 flex-direction: row;
 flex-wrap: wrap;
 justify-content: center;
&__memberCard{
  display: flex;
flex-direction: column;
  align-items: center;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 40px;
  width: 250px;
  height: 200px;
  margin: 20px;
    &__button{
      margin-top: 10px;
    }
  }
  }
</style>
