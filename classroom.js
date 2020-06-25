const Classroom = Vue.component('classroom', {
  template: `
    <div>
      <h2 class="balsamiq text-4xl mb-12 text-white">You are in classroom #{{ $route.params.classroomId }}</h2>

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
  <div class="relative bg-purple-200 rounded p-8">
    
    <h3 class="balsamiq text-2xl text-purple-900 mb-2">Create a Droplet</h3>
    
    <p class="mb-4 text-sm text-gray-700">This is where it all starts!</p>

    <button @click="createDroplet" class="rounded text-sm py-3 px-10 bg-blue-500 shadow-lg text-blue-100 hover:bg-blue-400 hover:text-white hover:shadow-xl transition ease-in duration-100">Create a Droplet</button>

    <img src="/space.svg" class="w-64 absolute right-0 top-0 mr-20" style="margin-top: -30px" />
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
    deleteDroplet: function (id) {},
  },
  template: `<div>list of droplets</div>`,
});
