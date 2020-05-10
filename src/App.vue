<template>
    <div id="app">
      <div v-if="!signedIn">
         <amplify-authenticator></amplify-authenticator>
      </div>
      <div v-if="signedIn">
        <div v-if="user">Hi {{ user.attributes.email }}</div>
        <amplify-sign-out class="signout"></amplify-sign-out>
        <div class="container">
          <photo-picker
            v-bind:photoPickerConfig="photoPickerConfig"
          ></photo-picker>
          <s3-album path="files/"></s3-album>
        </div>
      </div>
    </div>
</template>
<script>
import { AmplifyEventBus } from 'aws-amplify-vue'
import { Auth } from 'aws-amplify'
import PhotoPicker from "./components/storage/PhotoPicker";
import S3Album from "./components/storage/S3Album";

const photoPickerConfig = {
  path: 'files/',
}
export default {
  name: 'app',
  components: {
    PhotoPicker, S3Album
  },
  async beforeCreate() {
    try {
      await Auth.currentAuthenticatedUser()
            
      this.signedIn = true
    } catch (err) {
      this.signedIn = false
    }
    AmplifyEventBus.$on('authState', info => {
      if (info === 'signedIn') {
        this.signedIn = true
        Auth.currentAuthenticatedUser().then(userLoaded => {
          this.$store.dispatch('setLoggedInUser', {
            user: userLoaded
          });
        });
        
      } else {
        this.signedIn = false
      }
    });
  },
  data () {
    return {
      photoPickerConfig,
      signedIn: false
    }
  },
  computed: {
    user: function () {
        let loggedInUser = this.$store.getters.loggedInUser
        return (loggedInUser) ? loggedInUser : null
    }
  }
}
</script>

<style>
body {
  margin: 0
}
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
.container {
  padding: 40px;
}
.signout {
  background-color: #ededed;
  margin: 0;
  padding: 11px 0px 1px;
}
</style>