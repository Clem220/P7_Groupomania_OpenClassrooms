<template>
    <nav>
        <router-link to=/>
        <img  src="../assets/icon-above-font.png" alt="logo groupomania">
        </router-link>
        <router-link to=/> login</router-link>
        <router-link to=/> Mon compte</router-link>
    </nav>
</template>

<script>
export default {
    name: 'NavBar',
    props: ['url', 'text']
}
</script>
