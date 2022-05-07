<template>

    <div class="logForm">
      <form class="logForm__input">
          <label for="login-pseudo">Pseudo</label>
          <input type="text" placeholder="Pseudo" required />
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

        <button class="button btn-3"  type="submit">
          <span>Connexion</span>
        </button>
      </form>
    </div>

</template>