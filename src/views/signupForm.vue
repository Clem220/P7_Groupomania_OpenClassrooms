<template>
  <div class="signupForm">
    <h1>Vous n'avez pas encore de compte ? Ce formulaire est fait pour vous !</h1>
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

      <div class="error-message">{{ message }}</div>

      <button class="button btn-3" type="submit">
        <span>Connexion</span>
      </button>
    </form>
  </div>
  <footerComp/>
</template>

<script>
import footerComp from '@/components/footerComp.vue'

export default {
  name: 'signupForm',
  components: {
    footerComp
  }
}

</script>



<style lang="scss">
#app{
  display: flex;
  justify-content: center;
}
.signupForm{
display: flex;
  flex-direction: column;
  align-items: center;
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
    margin-top: 50px;
    padding-bottom: 30px;
    border-bottom: 1px solid #c2c2c2;
    input {
      height: 30px;
      width: 300px;
      margin: 20px auto 0px;
    }
  }
}
h1{
  padding: 40px;
}
</style>