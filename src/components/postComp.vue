<template>
    <section>
        <article class="post">
             <router-link to="/">
                <div class="post-header">
                    <span class="post-info">Posté le "date" par "nom" </span>
                </div>  
                <h2 class="post-title">"titre post"</h2>
            </router-link>
        </article>
    </section>
</template>


<style lang="scss">
section{
    display: flex;
    justify-content: center;

}
.post{
    display: flex;
}
</style>