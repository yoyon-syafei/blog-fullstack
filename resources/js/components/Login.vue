<template>
  <div class="container h-[calc(100vh_-_62px)] w-full">
    <div class="flex justify-center items-center h-full">
      <div class="md:w-1/2 w-full">
        <div class="font-bold flex justify-center mb-5">Login</div>
        <div class="flex flex-col space-y-4">
          <div v-if="error" class="bg-red-200 rounded-md p-3">
            {{ this.message }}
          </div>
          <div>
            <div class="text-xs mb-1">
              Email
            </div>
            <div>
              <input class="w-full border text-sm p-2 rounded-md" v-model="email" type="text"/>
            </div>
          </div>
          <div>
            <div class="text-xs mb-1">
              Password
            </div>
            <div>
              <input class="w-full border text-sm p-2 rounded-md" v-model="password" type="password"/>
            </div>
          </div>
          <div>
            <button class="bg-gray-300 p-2 rounded-md" @click="login">Login</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import router from "../router/index";

export default {
  name: 'Login',
  data() {
    return {
      email: '',
      password: '',
      error: false,
      message: ''
    };
  },
  methods: {
    login() {
      const formData = new FormData();
      formData.append('email',this.email);
      formData.append('password',this.password);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      const currentObj = this;
      axios.post('http://127.0.0.1:8000/api/user/login', formData, config)
      .then(function (response) {
        currentObj.error = false;
        currentObj.message = '';
        localStorage.setItem('token', response.data.data.token)
        window.location.href = '/';
      })
      .catch(function (error) {
        currentObj.error = true;
        currentObj.message = error.response.data.meta.message;
      });
    },
  }
}
</script>