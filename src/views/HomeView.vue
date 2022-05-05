<template>
<div class="home">

  <loginForm/>
</div>

</template>

<script>
// @ is an alias to /src
import loginForm from '../components/loginForm.vue'

export default {
  name: 'HomeView',
  components: {
   loginForm
  }
}
</script>
