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
footer {
  display: flex;
  flex-direction: column;
  position: fixed;
  bottom: 0px;
  width: 100%;
  height: 40px;
  background-color: #fff;
  div {
    width: 100%;
    justify-content: space-around;
  }
  a {
    font-size: 10px;
    color: grey;
  }
}
</style>
