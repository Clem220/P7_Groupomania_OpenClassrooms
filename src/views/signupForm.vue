<template>
<nav>
      <img src="../assets/icon-left-font.png" alt="logo groupomania" />
</nav>
  <div class="signupForm">
    <h1>
      Vous n'avez pas encore de compte ? Ce formulaire est fait pour vous !
    </h1>
    <form class="signupForm__input">
      <label for="login-pseudo">Pseudo</label>
      <input type="text" placeholder="Pseudo" required />
      <label for="login-email">Email :</label>
      <input id="login-email" type="text" placeholder="Email" required />
      <label for="login-password">Mot de passe :</label>
      <input
        id="login-password"
        type="password"
        placeholder="Mot de passe"
        required
      />

      <!-- <div class="error-message">{{ message }}</div> -->

      <button class="button btn-3" type="submit">
        <span>Connexion</span>
      </button>
    </form>
  </div>
  <footerComp />
</template>

<script>
import footerComp from "@/components/footerComp.vue";

export default {
  name: "signupForm",
  components: {
    footerComp,
  },
};
</script>

<style lang="scss" scoped>
nav{
  justify-content: center;
  width: 100%;
  background-color: #fff;
  img{
    width: 40%;
    height: auto;
  }
}
.signupForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  margin-top: 30px;
  width: 600px;
  height: 600px;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 40px;
  &__input {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-bottom: 60px;
    border-bottom: 1px solid #c2c2c2;
    input {
      height: 30px;
      width: 300px;
      margin: 20px auto 0px;
    }
    label{
      display: none;
    }
  }
}
h1 {
  margin: 0;
  padding: 40px 40px 0px;
}

.button {
  width: 300px;
  margin: 20px auto 0px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: "Lato", sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
  box-shadow: inset 2px 2px 2px 0px rgba(255, 255, 255, 0.5),
    7px 7px 20px 0px rgba(0, 0, 0, 0.1), 4px 4px 5px 0px rgba(0, 0, 0, 0.1);
  outline: none;
}

.btn-3 {
  background: rgb(255, 27, 0);
  background: linear-gradient(
    0deg,
    rgba(255, 27, 0, 1) 0%,
    rgba(251, 75, 2, 1) 100%
  );
  width: 130px;
  height: 40px;
  line-height: 42px;
  padding: 0;
  border: none;
}
.btn-3 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-3:before,
.btn-3:after {
  position: absolute;
  content: "";
  right: 0;
  top: 0;
  background: rgb(255, 27, 0);
  transition: all 0.3s ease;
}
.btn-3:before {
  height: 0%;
  width: 2px;
}
.btn-3:after {
  width: 0%;
  height: 2px;
}
.btn-3:hover {
  background: transparent;
  box-shadow: none;
}
.btn-3:hover:before {
  height: 100%;
}
.btn-3:hover:after {
  width: 100%;
}
.btn-3 span:hover {
  color: rgb(255, 27, 0);
}
.btn-3 span:before,
.btn-3 span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
  background: rgb(255, 27, 0);
  transition: all 0.3s ease;
}
.btn-3 span:before {
  width: 2px;
  height: 0%;
}
.btn-3 span:after {
  width: 0%;
  height: 2px;
}
.btn-3 span:hover:before {
  height: 100%;
}
.btn-3 span:hover:after {
  width: 100%;
}

</style>
