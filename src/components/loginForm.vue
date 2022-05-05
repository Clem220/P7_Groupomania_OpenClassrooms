<template>
  <section class="content">
    <div class="logo">
      <img src="../assets/icon-above-font.png" alt="logo groupomania" />
      <p>Avec Groupomania, partagez et restez en contact avec vos collègues.</p>
    </div>
    <div class="logForm">
      <form class="logForm__input">
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

        <button class="button btn-3" id="login-btn" type="submit">
         <span>Connexion</span>
        </button>
      </form>
      <button class="button signup btn-7">
          <span>Inscription</span>
      </button>
    </div>
  </section>
</template>

<script></script>

<style lang="scss">
.content {
  margin-top: 150px;
  display: flex;
  flex-direction: row;
  width: 100%;
}
.logo {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  img {
    height: auto;
    width: 50%;
  }
}
.logForm {
  display: flex;
  flex-direction: column;
  align-items: center;
  width: 400px;
  height: 400px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 40px;
  &__input {
      display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
      margin-top: 50px;
    input {
        height: 30px;
      width: 300px;
      margin: 20px auto 0px;
    }
  }
}

label {
  display: none;
}

.button {
  width: 300px;
  margin: 20px auto 0px;
  height: 40px;
  color: #fff;
  border-radius: 5px;
  padding: 10px 25px;
  font-family: 'Lato', sans-serif;
  font-weight: 500;
  background: transparent;
  cursor: pointer;
  transition: all 0.3s ease;
  position: relative;
  display: inline-block;
   box-shadow:inset 2px 2px 2px 0px rgba(255,255,255,.5),
   7px 7px 20px 0px rgba(0,0,0,.1),
   4px 4px 5px 0px rgba(0,0,0,.1);
  outline: none;
}

.btn-3 {
  background: rgb(253,45,0,);
background: linear-gradient(0deg, rgb(253,45,0,) 0%, rgb(253,45,0,) 100%);
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
   background: rgb(253,45,0,);
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
.btn-3:hover{
   background: transparent;
  box-shadow: none;
}
.btn-3:hover:before {
  height: 100%;
}
.btn-3:hover:after {
  width: 100%;
}
.btn-3 span:hover{
   color: rgb(253,45,0,);
}
.btn-3 span:before,
.btn-3 span:after {
  position: absolute;
  content: "";
  left: 0;
  bottom: 0;
   background: rgb(253,45,0,);
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

.btn-7 {
background: linear-gradient(0deg, rgba(255,151,0,1) 0%, rgba(251,75,2,1) 100%);
  line-height: 42px;
  padding: 0;
  border: none;
}
.btn-7 span {
  position: relative;
  display: block;
  width: 100%;
  height: 100%;
}
.btn-7:before,
.btn-7:after {
  position: absolute;
  content: "";
  right: 0;
  bottom: 0;
  background: rgba(251,75,2,1);
  box-shadow:
   -7px -7px 20px 0px rgba(255,255,255,.9),
   -4px -4px 5px 0px rgba(255,255,255,.9),
   7px 7px 20px 0px rgba(0,0,0,.2),
   4px 4px 5px 0px rgba(0,0,0,.3);
  transition: all 0.3s ease;
}
.btn-7:before{
   height: 0%;
   width: 2px;
}
.btn-7:after {
  width: 0%;
  height: 2px;
}
.btn-7:hover{
  color: rgba(251,75,2,1);
  background: transparent;
}
.btn-7:hover:before {
  height: 100%;
}
.btn-7:hover:after {
  width: 100%;
}
.btn-7 span:before,
.btn-7 span:after {
  position: absolute;
  content: "";
  left: 0;
  top: 0;
  background: rgba(251,75,2,1);
  box-shadow:
   -7px -7px 20px 0px rgba(255,255,255,.9),
   -4px -4px 5px 0px rgba(255,255,255,.9),
   7px 7px 20px 0px rgba(0,0,0,.2),
   4px 4px 5px 0px rgba(0,0,0,.3);
  transition: all 0.3s ease;
}
.btn-7 span:before {
  width: 2px;
  height: 0%;
}
.btn-7 span:after {
  height: 2px;
  width: 0%;
}
.btn-7 span:hover:before {
  height: 100%;
}
.btn-7 span:hover:after {
  width: 100%;
}

.signup{
    margin-top: 70px;
}
</style>
