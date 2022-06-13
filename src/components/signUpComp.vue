<template>
  <article class="signupForm">
    <div class="signupForm__connect">
      <h1 class="signupForm__connect__title" v-if="mode == 'login'">
        Connexion
      </h1>
      <h1 class="signupForm__connect__title" v-else>Inscription</h1>
      <br />
    </div>
    <br />

    <div class="signupForm__connect__subtitle" v-if="mode == 'login'">
      Tu n'as pas encore de compte ?
      <button class="button btn-orange" @click="switchToCreateAccount()">
        <span> Créer un compte </span>
      </button>
    </div>
    <p class="signupForm__connect__subtitle" v-else>
      Tu as déjà un compte ?
      <button class="button btn-red" @click="switchToLogin()">
        <span> Se connecter</span>
      </button>
    </p>
    <form class="signupForm__input" v-if="mode == 'login'">
      <label for="login-email">Email :</label>
      <input
        v-model="dataLogin.email"
        id="login-email"
        type="text"
        placeholder="Email"
        required
      />

      <label for="login-password">Mot de passe :</label>
      <input
        v-model="dataLogin.password"
        id="login-password"
        type="password"
        placeholder="Mot de passe"
        required
      />
       <div v-if="error" class="error" role="altert" id="msgError">
      {{ error }}
    </div>
      <button @click.prevent="login()" class="button align btn-red">
        <span> Connexion </span>
      </button>
    </form>
    <form v-if="mode == 'create'" class="signupForm__input">
      <label for="signup-nom">Nom :</label>
      <input
        v-model="lastName"
        id="lastName"
        type="text"
        placeholder="Nom"
        required
      />

      <label for="signup-prenom">Prenom :</label>
      <input
        v-model="firstName"
        id="firstName"
        type="text"
        placeholder="Prenom"
        required
      />

      <label for="signup-password">Mot de passe :</label>
      <input
        v-model="password"
        id="password"
        type="password"
        placeholder="Mot de passe"
        required
      />

      <label for="signup-email">Email :</label>
      <input
        v-model="email"
        id="email"
        type="email"
        placeholder="Email"
        required
      />

      <input
            type="file"
            ref="image"
            id="image"
            accept="image/*"
            aria-label="Sélectionner un fichier"
            @change="selectFile()"
          />

       <div v-if="error" class="error" role="altert" id="msgError">
      {{ error }}
    </div>

      <button @click.prevent="signup()" class="button align btn-orange" type="submit">
        <span>S'inscrire</span>
      </button>
    </form>
  </article>
</template>

<script>
/* eslint-disable  */
import axios from "axios";
export default {
  name: "signin",
  data: function () {
    return {
      mode: "login",
      firstName: "",
      lastName: "",
      email: "",
      password: "",
      image:"",
      imageUrl: "",
      error: "",
       dataLogin: {
        email: "",
        password: "",
      },
    };
  },
  methods: {
    switchToCreateAccount: function () {
      this.mode = "create";
    },
    switchToLogin: function () {
      this.mode = "login";
    },
    selectFile() {
      this.image = this.$refs.image.files[0];
      console.log(this.$refs.image);
      this.imageUrl = URL.createObjectURL(this.image);
      console.log(this.imageUrl);
    },
    login() {
      if (this.dataLogin.email == "" || this.dataLogin.password == "") {
        alert(
          "Veuillez entrer votre email et votre mot de passe pour vous connecter"
        );
      } else {
        axios
        .post("/api/auth/login", this.dataLogin)
        .then((response) => {
          localStorage.setItem("token", response.data.token);
          localStorage.setItem("userId", response.data.userId);
          localStorage.setItem("isAdmin", response.data.isAdmin);
          this.$router.push("/postView");
        })
        .catch(() => (this.error = "email/password invalide !"));
      }
    },
signup() {
if (
        this.firstName !== "" ||
        this.lastName !== "" ||
        this.email !== "" ||
        this.password !== ""
      )
      console.log(this.imageUrl),
        axios
          .post("/api/auth/signup", {
            firstName: document.getElementById("firstName").value,
            lastName: document.getElementById("lastName").value,
            email: document.getElementById("email").value,
            password: document.getElementById("password").value,
            image: document.getElementById("image").value,
            imageUrl: this.imageUrl
          })
          .then((response) => {
            localStorage.setItem("token", response.data.token);
            localStorage.setItem("userId", response.data.userId);
            localStorage.setItem("isAdmin", response.data.isAdmin);
            this.$router.push("/postView");
          })
          .catch(
            () => (this.error = "Veuillez remplir correctement les champs !")
          );
    },
  }
}
</script>

<style lang="scss" scoped>
@import "../style/mixins";

@include button;
@include btn-red;
@include btn-orange;

.align {
  margin-bottom: 20px;
}

#msgError {
  margin-top: 20px;
}

.signupForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  width: 600px;
  height: auto;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 40px;
  font-family: 'Montserrat', sans-serif;
  @include phone{
    @include phone-size
  }
  @include tablet{
    @include tablet-size
  }
  &__connect {
      margin-top: 20px;
    &__subtitle {
      margin: 0;
      display: flex;
      flex-direction: column;
      padding-bottom: 40px;
      border-bottom: 1px solid #c2c2c2;
    }
  }
  &__input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    input {
      height: 30px;
      width: 300px;
      margin: 20px auto 0px;
    }
    label {
      display: none;
    }
  }
}
.error {
  color: red;
}
</style>
