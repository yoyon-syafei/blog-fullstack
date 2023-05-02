<template>
  <div class="container h-[calc(100vh_-_62px)] w-full">
    <div class="flex justify-center items-center h-full">
      <div class="md:w-1/2 w-full">
        <div class="font-bold flex justify-center mb-5">Register</div>
        <div class="flex flex-col space-y-4">
          <div>
            <div class="text-sm mb-1">
              Name
            </div>
            <div>
              <input class="w-full border text-sm p-2 rounded-md" v-model="name" type="text"/>
            </div>
            <div v-if="error && message.name" class="text-red-500 p-1 text-xs">
              <div v-for="item in message.name" v-bind:key="item" >
                  {{ item }}
              </div>
            </div>
          </div>
          <div>
            <div class="text-sm mb-1">
              Email
            </div>
            <div>
              <input class="w-full border text-sm p-2 rounded-md" v-model="email" type="text"/>
            </div>
            <div v-if="error && message.email" class="text-red-500 p-1 text-xs">
              <div v-for="item in message.email" v-bind:key="item" >
                  {{ item }}
              </div>
            </div>
          </div>
          <div>
            <div class="text-sm mb-1">
              Password
            </div>
            <div>
              <input class="w-full border text-sm p-2 rounded-md" v-model="password" type="password"/>
            </div>
            <div v-if="error && message.password" class="text-red-500 p-1 text-xs">
              <div v-for="item in message.password" v-bind:key="item" >
                  {{ item }}
              </div>
            </div>
          </div>
          <div>
            <div class="text-sm mb-1">
              Password Confirmation
            </div>
            <div>
              <input class="w-full border text-sm p-2 rounded-md" v-model="password_confirmation" type="password"/>
            </div>
            <div v-if="error && message.password" class="text-red-500 p-1 text-xs">
              <div v-for="item in message.password" v-bind:key="item" >
                  {{ item }}
              </div>
            </div>
          </div>
          <div>
            <button class="bg-gray-300 p-2 rounded-md" @click="register">Register</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import router from "../router/index";

export default {
  name: 'Register',
  data() {
    return {
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
      error: false,
      message: {}
    };
  },
  methods: {
    register() {
      const formData = new FormData();
      formData.append('name',this.name);
      formData.append('email',this.email);
      formData.append('password',this.password);
      formData.append('password_confirmation',this.password_confirmation);
      const config = {
        headers: {
          'content-type': 'multipart/form-data'
        }
      }
      const currentObj = this;
      axios.post('http://127.0.0.1:8000/api/user/register', formData, config)
      .then(function (response) {
        currentObj.error = false;
        currentObj.message = '';
        router.push({ path: 'login' })
      })
      .catch(function (error) {
        currentObj.error = true;
        currentObj.message = error.response.data.meta.message;
      });
    },
  }
}
</script>