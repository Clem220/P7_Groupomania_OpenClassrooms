<template>
    <nav>
        <router-link to='/' aria-label="accueil" >
        <img src="../assets/icon-left-font.png" alt="logo de Groupomania">
        </router-link>
        <div class="navContent">
        <router-link to="/profilView" aria-label="profil">
         <span>Profil</span> 
        </router-link>
        <span>Déconnexion</span>
        </div>
    </nav>
</template>


<style lang="scss">
    nav{
        display: flex;
        justify-content: space-between;
        flex-direction: row;
        background-color: #ffff ;
        width: 100%;
        height: 100px;
    }
    img{
        width: auto;
        height: 100px;
    }
    .navContent{
        display: flex;
        align-items: center;
        padding-right: 40px;
        span{
            padding-right: 15px;
        }
    }
</style>