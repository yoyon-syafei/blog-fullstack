<template>
  <div class="container h-[calc(100vh_-_62px)] w-full">
    <div class="font-bold flex justify-center mb-5 mt-5">Blog Page</div>
    <div class="flex justify-end w-3/4 m-auto mb-4 pt-3 pb-3">
      <button class="bg-gray-300 p-2 rounded-md" @click="createBlog">
        + Create Blog
      </button>
    </div>
    <table class="w-3/4 m-auto border-collapse border border-slate-500">
      <tr>
        <th>
          No
        </th>
        <th>
          Title
        </th>
        <th>
          Content
        </th>
        <th>
          Author
        </th>
        <th>
          Action
        </th>
      </tr>
      <tr v-for="(item, index) in blog" v-bind:key="item">
        <td class="p-2 border border-slate-500">{{ index+1 }}</td>
        <td class="p-2 border border-slate-500">{{ item.title }}</td>
        <td class="p-2 border border-slate-500"><div v-html="item.content"></div></td>
        <td class="p-2 border border-slate-500">{{ item.author_detail?.name }}</td>
        <td class="p-2 border border-slate-500">
          <span class="hover:text-blue-500 cursor-pointer">
            open
          </span>
          <span class="text-red-500 hover:text-red-400 cursor-pointer" @click="openRemoveModal(item.id)">
            delete
          </span>
          <span class="text-yellow-500 hover:text-yellow-400 cursor-pointer">
            edit
          </span>
        </td>
      </tr>
    </table>
  </div>
  
  <div v-if="modalOpen" id="popup-modal" class="flex justify-center items-center fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow-md dark:bg-gray-200">
        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" @click="hideModal">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-6 text-center">
          <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14 dark:text-gray-200" fill="#000000" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500">Are you sure you want to delete this post?</h3>
          <button @click="removeBlog" type="button" class="text-white bg-red-600 hover:bg-red-800 focus:ring-4 focus:outline-none focus:ring-red-300 dark:focus:ring-red-800 font-medium rounded-lg text-sm inline-flex items-center px-5 py-2.5 text-center mr-2">
              Yes, I'm sure
          </button>
          <button @click="hideModal" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">No, cancel</button>
        </div>
      </div>
    </div>
  </div>
  <div v-if="modalSuccess" id="popup-modal" class="flex justify-center items-center fixed top-0 left-0 right-0 z-50 p-4 overflow-x-hidden overflow-y-auto md:inset-0 h-[calc(100%-1rem)] max-h-full">
    <div class="relative w-full max-w-md max-h-full">
      <div class="relative bg-white rounded-lg shadow dark:bg-gray-200">
        <button type="button" class="absolute top-3 right-2.5 text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-800 dark:hover:text-white" @click="hideModal">
          <svg aria-hidden="true" class="w-5 h-5" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path></svg>
          <span class="sr-only">Close modal</span>
        </button>
        <div class="p-6 text-center">
          <svg aria-hidden="true" class="mx-auto mb-4 text-gray-400 w-14 h-14" fill="#000000" stroke="currentColor" xmlns="http://www.w3.org/2000/svg" height="48" viewBox="0 96 960 960" width="48"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m421 758 283-283-46-45-237 237-120-120-45 45 165 166Zm59 218q-82 0-155-31.5t-127.5-86Q143 804 111.5 731T80 576q0-83 31.5-156t86-127Q252 239 325 207.5T480 176q83 0 156 31.5T763 293q54 54 85.5 127T880 576q0 82-31.5 155T763 858.5q-54 54.5-127 86T480 976Zm0-60q142 0 241-99.5T820 576q0-142-99-241t-241-99q-141 0-240.5 99T140 576q0 141 99.5 240.5T480 916Zm0-340Z"/></svg>
          <h3 class="mb-5 text-lg font-normal text-gray-500 dark:text-gray-400">Post deleted success</h3>
          <button @click="hideModalSuccess" type="button" class="text-gray-500 bg-white hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 rounded-lg border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-gray-900 focus:z-10 dark:bg-gray-700 dark:text-gray-300 dark:border-gray-500 dark:hover:text-white dark:hover:bg-gray-600 dark:focus:ring-gray-600">Ok</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import router from "../router/index";

export default {
  name: 'Blog',
  data() {
    return {
      blog: {},
      modalOpen: false,
      deleteId: null,
      modalSuccess: false,
    }
  },
  methods: {
    getBlog(){
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }
      const currentObj = this;
      axios.get('http://127.0.0.1:8000/api/blog', config)
        .then((response)=>{
          currentObj.blog = response.data.data;
        })
    },
    openRemoveModal(id) {
      const currentObj = this;
      this.modalOpen = true;
      currentObj.deleteId = id;
    },
    hideModal() {
      this.modalOpen = false;
    },
    removeBlog() {
      const token = localStorage.getItem('token');
      const config = {
        headers: {
          'content-type': 'multipart/form-data',
          'Authorization': `Bearer ${token}`
        }
      }
      const currentObj = this;
      axios.delete(`http://127.0.0.1:8000/api/blog/${this.deleteId}`, config)
        .then((response)=>{
          currentObj.deleteId = null;
          currentObj.modalSuccess = true;
          this.hideModal();
          this.getBlog();
        })
        .catch((error) => {
          currentObj.deleteId = null;
          this.hideModal();
        })  
    },
    hideModalSuccess() {
      this.modalSuccess = false;
    },
    createBlog() {
      router.push({ path: 'create-blog' })
    }
  },
  created() {
      this.getBlog()
  }
}
</script>