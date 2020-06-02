<template>
  <b-container>
    <div class="sidenav">
      <div class="login-main-text text-center">
        <h1>Collaborate</h1>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipisicing elit. Numquam
          sint, incidunt porro, doloremque nisi obcaecati, quibusdam quasi
          voluptas debitis sunt magnam eius iure excepturi optio fuga. Esse
          ipsam possimus, perferendis.
        </p>
      </div>
    </div>
    <div class="main">
      <h3 class="text-center sign-txt">Login</h3>
      <b-col cols="12" class="form-login">
        <b-form method="POST" @submit.prevent="login">
          <b-form-group label="Email">
            <b-form-input
              type="email"
              v-model="form.email"
              autocomplete="off"
            ></b-form-input>
          </b-form-group>
          <b-form-group label="Password">
            <b-form-input
              type="password"
              v-model="form.password"
            ></b-form-input>
          </b-form-group>
          <b-button type="submit" block variant="primary">Sign In</b-button>
        </b-form>
      </b-col>
    </div>
  </b-container>
</template>

<script>
import { mapActions } from "vuex";

export default {
  name: "Login",
  data: () => {
    return {
      form: {
        email: null,
        password: null
      },
      title: null,
      message: null,
      alert: false
    };
  },
  methods: {
    ...mapActions({
      signIn: "signIn"
    }),

    async login() {
      await this.signIn(this.form)
        .then(response => {
          if (response == 200) {
            this.$bvToast.toast("Success Login", {
              solid: true,
              title: "Login Success"
            });
            setTimeout(function() {
              document.location.href = "/project";
            }, 2000);
          }
        })
        .catch(error => {
          this.title = error.response.statusText;
          this.message = error.response.data.message;
          this.$bvToast.toast(this.message, {
            solid: true,
            title: this.title
          });
          console.log(error.response);
        });
    }
  }
};
</script>

<style lang="scss" scoped>
.sidenav {
  height: 100%;
  background-color: #222831;
  overflow-x: hidden;
  padding-top: 20px;
}

.main {
  padding: 0px 50px;
  margin-top: 180px;
  .sign-txt {
    margin-left: 100px;
  }

  .form-login {
    margin-left: 50px;
  }
}

@media screen and (min-width: 768px) {
  .main {
    margin-left: 50%;
  }

  .sidenav {
    width: 50%;
    position: fixed;
    z-index: 1;
    top: 0;
    left: 0;
  }

  .login-form {
    margin-top: 80%;
  }

  .register-form {
    margin-top: 20%;
  }
}

.login-main-text {
  margin-top: 20%;
  padding: 60px;
  color: #fff;
}

.login-main-text h2 {
  font-weight: 300;
}
.btn-black {
  background-color: #000 !important;
  color: #fff;
}
</style>
