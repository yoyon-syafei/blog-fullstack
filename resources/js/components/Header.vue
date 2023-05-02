<template>
  <div class="bg-gray-200 flex justify-between p-3 px-6 items-center">
    <div class="font-bold">
      Blog
    </div>
    <div v-if="!token">
      <button class="bg-gray-300 p-2 rounded-md mr-2" @click="toLogin">Login</button>
      <button class="bg-gray-300 p-2 rounded-md" @click="toRegister">Register</button>
    </div>
    <div v-else>
      <button class="bg-gray-300 p-2 rounded-md mr-2" @click="toBlogList">Blog List</button>
      <button class="bg-gray-300 p-2 rounded-md mr-2" @click="toLogout">Logout</button>
    </div>
  </div>
</template>

<script>
import router from "../router/index";

export default {
  name: 'Header',
  data() {
    return {
      token: null
    }
  },
  methods: {
    getToken(){
      const token = localStorage.getItem('token');
      console.log('token', token)
      this.token = token;
    },
    toLogin() {
      router.push({ path: 'login' })
    },
    toRegister() {
      router.push({ path: 'register' })
    },
    toBlogList() {
      router.push({ path: 'blog' })
    },
    toLogout() {
      this.token = null;
      localStorage.clear();
      router.push({ path: 'login' })
    },
  },
  created() {
      this.getToken()
      console.log('token', this.token)
  },
}
</script>