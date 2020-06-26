const Classroom = Vue.component('classroom', {
  data() {
    return {
      isEnrolled: false,
      classroomDroplets: [
        { id: 1, name: 'blah' },
        { id: 2, name: 'blah' },
      ],
      myDroplets: [
        { id: 3, name: 'blah' },
        { id: 4, name: 'blah' },
        { id: 5, name: 'blah' },
        { id: 6, name: 'blah' },
      ],
    };
  },
  mounted() {
    // checkIfUserIsEnrolled();
    // getMyDroplets();
    // getClassroomDroplets();
  },
  methods: {
    async checkIfUserIsEnrolled() {
      const res = await fetch(`${apiUrl}/`);
      const data = await res.json();
      // TODO: bind to this.isEnrolled
    },
    async getMyDroplets() {
      const res = await fetch(`${apiUrl}/droplets/view`);
      const data = await res.json();
      // TODO: bind to this.myDroplets
    },
    async getClassroomDroplets() {
      const res = await fetch(`${apiUrl}/droplets/view`);
      const data = await res.json();
      // TODO: bind to this.classroomDroplets
    },
  },
  template: `
    <div>
      <router-link to="/" class="mb-6 text-xs text-blue-300 inline-block bg-blue-700 hover:bg-blue-600 py-1 px-2 rounded"><span class="mr-1">👈</span> Back to all classrooms</router-link>

      <h2 class="super-duper-custom-font text-4xl mb-8 text-white">Welcome to Classroom #{{ $route.params.classroomId }}!</h2>

      <!-- join the classroom -->
      <join-class-form v-if="!isEnrolled" class="mb-8" />

      <!-- show the droplets section -->
      <div class="text-gray-800 bg-white rounded-lg shadow-lg p-10">
        <create-droplet-form v-if="isEnrolled" class="mb-10" />

        <!-- list of my droplets -->
        <div class="mb-12">
          <h3 class="mb-4 text-xl text-gray-900">My Droplets</h3>
          <div v-for="(droplet, index) in myDroplets" :key="index">
            <droplet :droplet="droplet" />
          </div>
        </div>

        <!-- list of classroom droplets -->
        <h3 class="mb-4 text-xl text-gray-900">Classroom Droplets</h3>
          <div v-for="(droplet, index) in classroomDroplets" :key="index">
            <droplet :droplet="droplet" :showActions="false" />
          </div>
      </div>
    </div>
  `,
});

/**
 * Join Class Form
 */
Vue.component('join-class-form', {
  data() {
    return {
      classroomId: null,
      secretKey: 'test',
      username: '',
      password: '',
    };
  },
  mounted() {
    this.classroomId = this.$route.params.classroomId;
  },
  methods: {
    async joinClassroom() {
      const res = await fetch(`${apiUrl}/`);
      const data = await res.json();
      // TODO: update that we have joined the classroom
      // TODO: emit a custom event
      // this.$emit('classroom-joined')
    },
  },
  template: `
    <form @submit.prevent="joinClassroom" class="bg-white rounded shadow p-8 ">
      <h4 class="text-xl mb-8">Join the Classroom!</h4>

      <div class="flex items-center mb-4">
        <label class="mr-8 text-sm text-gray-800 w-32 text-right">Secret Key</label>
        <input type="text" name="secretKey" class="rounded-lg shadow w-full py-3 px-4 outline-none bg-white" v-model="secretKey" />
      </div>

      <div class="flex items-center mb-4">
        <label class="mr-8 text-sm text-gray-800 w-32 text-right">Username</label>
        <input type="text" name="username" class="rounded-lg shadow w-full py-3 px-4 outline-none bg-white" v-model="username" />
      </div>

      <div class="flex items-center mb-6">
        <label class="mr-8 text-sm text-gray-800 w-32 text-right">Password</label>
        <input type="password" name="password" class="rounded-lg shadow w-full py-3 px-4 outline-none bg-white" v-model="password" />
      </div>

      <div class="text-right">
        <button class="bg-purple-400 text-xl text-purple-800 py-3 px-6 rounded shadow">Join 🤩🤩🤩</button>
      </div>
    </form>
  `,
});

/**
 * Creation form to create droplet
 */
Vue.component('create-droplet-form', {
  data() {
    return {};
  },
  mounted() {},
  methods: {
    async createDroplet() {
      const classroomId = this.$route.params.classroomId;
      if (!classroomId) return;

      const res = await fetch(`${apiUrl}`);
      const data = await res.json();
    },
  },
  template: `
  <div class="relative bg-purple-200 rounded p-8 shadow-lg">
    
    <h3 class="super-duper-custom-font text-2xl text-purple-900 mb-2">Create a Droplet</h3>
    
    <p class="mb-4 text-sm text-gray-700">This is where it all starts!</p>

    <button @click="createDroplet" class="rounded text-sm py-3 px-10 bg-blue-500 shadow-xl text-blue-100 hover:bg-blue-400 hover:text-white transition ease-in duration-100">Create a Droplet</button>

    <img src="/space.svg" class="hidden lg:block w-64 absolute right-0 top-0 mr-20" style="margin-top: -30px" />
  </div>
  `,
});

Vue.component('droplet', {
  props: {
    droplet: Object,
    showActions: { type: Boolean, default: true },
  },
  methods: {
    async powerDroplet(id, action) {
      const res = await fetch(
        `${apiUrl}/droplets/power-control/${id}/${action}`
      );
      const data = await res.json();
      // TODO: get all droplets again (emit custom event)
    },
    async deleteDroplet(id) {
      const res = await fetch(`${apiUrl}/`);
      const data = await res.json();
      // TODO: get all droplets again (emit custom event)
    },
  },
  template: `
    <div class="bg-white shadow mb-4 p-4 rounded flex justify-between">
      <h4 class="text-lg text-gray-700">{{ droplet.name }}</h4>
      
      <!-- actions -->
      <div v-if="showActions" class="flex items-center text-sm">
        <button class="bg-green-200 text-green-800 hover:bg-green-300 py-1 px-2 rounded mr-2" @click="restartDroplet(droplet.id)">Restart</button>
        <button class="bg-yellow-200 text-yellow-800 hover:bg-yellow-300 py-1 px-2 rounded mr-2" @click="powerOffDroplet(droplet.id)">Power Off</button>
        <button class="bg-red-200 text-red-800 hover:bg-red-300 py-1 px-2 rounded" @click="deleteDroplet(droplet.id)">Delete</button>
      </div>
    </div>
  `,
});
