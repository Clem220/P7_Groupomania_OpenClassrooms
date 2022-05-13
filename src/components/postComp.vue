<template>
<section class="articleContent">
  <article class="postContent">
    <div class="postContent__profilInfo">
      <p>Clément Vermeulen le 24/07/2021</p>
    </div>
    <div class="postContent__content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet
        ipsum vel est pellentesque placerat pulvinar eget lorem. Donec et
        ultrices libero. In hac habitasse platea dictumst. Sed nulla neque,
        rutrum vel neque vitae, vulputate scelerisque est. Sed facilisis lectus
        magna, vel aliquam nulla sagittis in. Etiam facilisis pulvinar massa
        quis efficitur. Sed rutrum elit nec enim facilisis, non sagittis dui
        blandit. Praesent semper eros nisi, ac hendrerit leo volutpat sit amet.
        Ut ut dui non massa feugiat interdum. Pellentesque fringilla risus vitae
        est porttitor ultrices. Nulla tincidunt, elit nec condimentum tristique,
        libero eros ullamcorper nunc, eget venenatis elit velit in enim. Aenean
        efficitur dictum risus at gravida. Morbi sit amet posuere dolor. Fusce
        eu fermentum urna. Donec eu eleifend libero. Integer euismod turpis
        urna, sit amet condimentum felis molestie et. Etiam efficitur dolor
        velit. Nulla sollicitudin eros in enim feugiat ullamcorper. Nam pulvinar
        congue eros, efficitur vehicula purus commodo non. Suspendisse aliquam
        augue sit amet urna tincidunt aliquet. Nullam id pulvinar erat. Fusce
        pretium massa at nunc tristique tincidunt. Sed eu sem eu nunc vehicula
        feugiat. Etiam vestibulum leo diam, quis gravida diam venenatis in.
        Fusce condimentum massa orci, sed consequat libero convallis at. Fusce
        mollis velit eu tellus faucibus, id suscipit enim semper.
      </p>
    </div>
  </article>
  <article class="postContent">
    <div class="postContent__profilInfo">
      <p>Clément Vermeulen le 24/07/2021</p>
    </div>
    <div class="postContent__content">
      <p>
        Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi sit amet
        ipsum vel est pellentesque placerat pulvinar eget lorem. Donec et
        ultrices libero. In hac habitasse platea dictumst. Sed nulla neque,
        rutrum vel neque vitae, vulputate scelerisque est. Sed facilisis lectus
        magna, vel aliquam nulla sagittis in. Etiam facilisis pulvinar massa
        quis efficitur. Sed rutrum elit nec enim facilisis, non sagittis dui
        blandit. Praesent semper eros nisi, ac hendrerit leo volutpat sit amet.
        Ut ut dui non massa feugiat interdum. Pellentesque fringilla risus vitae
        est porttitor ultrices. Nulla tincidunt, elit nec condimentum tristique,
        libero eros ullamcorper nunc, eget venenatis elit velit in enim. Aenean
        efficitur dictum risus at gravida. Morbi sit amet posuere dolor. Fusce
        eu fermentum urna. Donec eu eleifend libero. Integer euismod turpis
        urna, sit amet condimentum felis molestie et. Etiam efficitur dolor
        velit. Nulla sollicitudin eros in enim feugiat ullamcorper. Nam pulvinar
        congue eros, efficitur vehicula purus commodo non. Suspendisse aliquam
        augue sit amet urna tincidunt aliquet. Nullam id pulvinar erat. Fusce
        pretium massa at nunc tristique tincidunt. Sed eu sem eu nunc vehicula
        feugiat. Etiam vestibulum leo diam, quis gravida diam venenatis in.
        Fusce condimentum massa orci, sed consequat libero convallis at. Fusce
        mollis velit eu tellus faucibus, id suscipit enim semper.
      </p>
    </div>
  </article>
</section>
</template>


<style lang="scss" scoped>
@import '../style/mixins';
.articleContent{
    display: flex;
    flex-direction: column;
    justify-content: space-around;
   
}
.postContent{
    display: flex;
    flex-direction: column;
    justify-content: center;
    width: 680px;
    height: 300px;
    overflow: hidden;
    @include boxShadow;
    margin:40px 0px 0px 0px;
    &__content{
        height: auto;
        max-height: 200px;
        overflow: scroll;
    }
}
</style>