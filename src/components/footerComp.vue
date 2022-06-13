<template>
  <footer>
    <div>
      <a href="#">Confidentialité</a>
      <a href="#">Conditions générales</a>
      <a href="#">Contact</a>
    </div>
    <a href="https://fr.freepik.com/vecteurs/fond"
      >Fond vecteur créé par freepik - fr.freepik.com</a
    >
  </footer>
</template>

<style lang="scss" scoped>
@import '@/style/mixins';

footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 40px;
  background-color: #fff;
  @include courier-prime;
  div {
    width: 100%;
    display: flex;
    justify-content: space-around;
    padding-top: 10px;
  }
  a {
    font-size: 12px;
    color: black;
  }
}
</style>
