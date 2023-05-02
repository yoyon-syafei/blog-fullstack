<template>
  <div class="container h-[calc(100vh_-_62px)] w-full">
    <div class="flex justify-center items-center h-full">
      <div class="md:w-3/4 w-full">
        <div class="font-bold flex justify-center mb-5 mt-5">Create Blog</div>
        <div class="flex flex-col space-y-4">
          <div>
            <div class="text-sm mb-1">
              Title
            </div>
            <div>
              <input class="w-full border text-sm p-2 rounded-md" v-model="title" type="text"/>
            </div>
            <div v-if="error && message.title" class="text-red-500 p-1 text-xs">
              <div v-for="item in message.title" v-bind:key="item" >
                  {{ item }}
              </div>
            </div>
          </div>
          <div>
            <div class="text-sm mb-1">
              Content
            </div>
            <div>
              <input class="w-full border text-sm p-2 rounded-md" v-model="content" type="text"/>
            </div>
            <div v-if="error && message.content" class="text-red-500 p-1 text-xs">
              <div v-for="item in message.content" v-bind:key="item" >
                  {{ item }}
              </div>
            </div>
          </div>
          <div>
            <button class="bg-gray-300 p-2 rounded-md" @click="post">Post</button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>

import router from "../router/index";

export default {
  name: 'Create Blog',
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
    post() {
      const formData = new FormData();
      const token = localStorage.getItem('token');
      if (!this.title || !this.content) {
        return;
      }
      console.log('token', token)
      formData.append('title',this.title);
      formData.append('content',this.content);
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }
      const currentObj = this;
      axios.post('http://127.0.0.1:8000/api/blog', formData, config)
      .then(function (response) {
        currentObj.error = false;
        currentObj.message = '';
        router.push({ path: 'blog' })
      })
      .catch(function (error) {
        currentObj.error = true;
        currentObj.message = error.response.data.meta.message;
      });
    },
  }
}
</script>