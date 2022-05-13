<template>
  <section class="contentForNewpost">
    <article class="newPost">
      <form aria-label="Nouveau message">
        <div class="newPost__content">
          <textarea
            class="newPost__content__text"
            name="message"
            placeholder="Quoi de neuf ?"
            aria-label="Rédiger un nouveau message"
          />

          <div id="preview">
            <!-- <img
                v-if="imagePreview"
                :src="imagePreview"
                id="preview"
                class="newPost__content__image"
                alt="Prévisualisation de l'image ajoutée au message"
              /> -->
          </div>
        </div>

        <div class="newPost__option">
          <div class="newPost__option__file">
            <input
              type="file"
              ref="fileUpload"
              accept="image/*"
              aria-label="Sélectionner un fichier"
            />
          </div>

          <button
            type="submit"
            class="newPost__option__button"
            aria-label="Publier le message"
          >
            Publier
          </button>
        </div>
      </form>
    </article>
  </section>
</template>

<style lang="scss" scoped>
section {
  display: flex;
  justify-content: center;
  
}
.newPost {
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  width: 680px;
  height: 185px;
  background-color: #fff;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.19), 0 6px 6px rgba(0, 0, 0, 0.23);
  border-radius: 40px;
  &__content{
    &__text{
      width: 620px;
      height: 100px;
    }
  }
  &__option{
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    margin-top: 10px;
  }
}
</style>
