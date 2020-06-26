const Classroom = Vue.component('classroom', {
  template: `
    <div>
      <router-link to="/" class="mb-6 text-xs text-blue-300 inline-block bg-blue-700 hover:bg-blue-600 py-1 px-2 rounded"><span class="mr-1">👈</span> Back to all classrooms</router-link>

      <h2 class="super-duper-custom-font text-4xl mb-12 text-white">You are in classroom #{{ $route.params.classroomId }}</h2>

      <div class="text-gray-800 bg-white rounded-lg shadow-lg p-10">
        <create-droplet-form class="mb-10" />
        <droplets-list />
      </div>
    </div>
  `,
});

/**
 * Creation form to create droplet
 */
Vue.component('create-droplet-form', {
  data: function () {
    return {};
  },
  mounted: function () {},
  methods: {
    createDroplet: function () {},
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

/**
 * List all droplets
 */
Vue.component('droplets-list', {
  data: function () {
    return {
      droplets: [
        { id: 1, name: 'blah' },
        { id: 1, name: 'blah' },
        { id: 1, name: 'blah' },
        { id: 1, name: 'blah' },
      ],
    };
  },
  // mounted: function () {
  //   getDroplets();
  // },
  methods: {
    getDroplets: function () {},
    restartDroplet: function (id) {},
    powerOffDroplet: function (id) {},
    deleteDroplet: function (id) {},
  },
  template: `
    <div>
      <div v-for="(droplet, index) in droplets" :key="index" class="bg-white shadow mb-4 p-4 rounded flex justify-between">
        <h4 class="text-xl">{{ droplet.name }}</h4>
        <div class="flex items-center text-sm">
          <button class="bg-green-200 text-green-800 hover:bg-green-300 py-1 px-2 rounded mr-2" @click="restartDroplet(droplet.id)">Restart</button>
          <button class="bg-yellow-200 text-yellow-800 hover:bg-yellow-300 py-1 px-2 rounded mr-2" @click="powerOffDroplet(droplet.id)">Power Off</button>
          <button class="bg-red-200 text-red-800 hover:bg-red-300 py-1 px-2 rounded" @click="deleteDroplet(droplet.id)">Delete</button>
        </div>
      </div>
    </div>
  `,
});
