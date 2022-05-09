<template>
    <navApp /> 
    <postComp /> 
  <footerComp /> 
</template>

<script>
import navApp from '../components/navComp.vue'
import postComp from '../components/postComp.vue'
import footerComp from '../components/footerComp.vue'

export default {
  name: 'postView',
  components: {
   navApp,
   postComp,
   footerComp,
  }
}
</script>

<style lang="scss">
body{
  margin: 0;
}
div{
  display: flex;
  justify-content: center;
}
</style>