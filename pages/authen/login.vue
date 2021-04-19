<template>
  <div>
    <div class="card card-container">
      <img
        id="profile-img"
        class="profile-img-card"
        src="//ssl.gstatic.com/accounts/ui/avatar_2x.png"
      />
      <p id="profile-name" class="profile-name-card"></p>
      <h5 class="mx-auto">Sign in</h5>

      <form class="form-authen">
        <input
          type="email"
          v-model="emailInput"
          class="form-control"
          placeholder="Email address"
          autofocus
        />
        <p class="font-italic font-sm">(use this email: eve.holt@reqres.in)</p>
        <input
          type="password"
          v-model="passwordInput"
          class="form-control"
          placeholder="Password"
        />
        <p class="font-italic font-sm">(any password will work)</p>
      </form>
      <!-- /form -->

      <button
        class="btn btn-lg btn-primary btn-block btn-authen"
        @click="login()"
      >
        Sign in
      </button>

      <NuxtLink to="/authen/register">Sign up for new account?</NuxtLink>
    </div>
    <!-- /card-container -->
  </div>
  <!-- /container -->
</template>

<script>
export default {
  layout: "authen",

  middleware: ["enterLogin"],

  data() {
    return {
      emailInput: "",
      passwordInput: ""
    };
  },

  methods: {
    async login() {
      if (this.emailInput && this.passwordInput) {
        const requestBody = {
          email: this.emailInput,
          password: this.passwordInput
        };

        try {
          let res = await this.$axios.$post(
            process.env.ACCOUNT_URL + "/login",
            requestBody
            );
          this.$cookies.set("token", res.token, {
            path: "/",
            maxAge: 60 * 2,     //2 mins
            // httpOnly : true  //not used in this demo
          });

          this.$router.push('/todos');
        } catch (err) {
          alert("User not found");
        }
      } else {
        alert("Fill in form please!");
      }
    },
  }
};
</script>

<style scoped></style>
