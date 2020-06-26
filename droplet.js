Vue.component('create-droplet-form', {
  methods: {
    async createDroplet() {
      const classroomId = this.$route.params.classroomId;
      if (!classroomId) return;

      const token = localStorage.getItem('do_token');
      const res = await fetch(`${apiUrl}/droplets/create/${classroomId}`, {
        headers: { Authorization: `Token ${token}` },
      });
      const data = await res.json();
      if (data.status !== 200) return alert(data.message);

      if (data.status === 200) alert(data.message);
      this.$emit('droplet-created');
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

/**
 * A single droplet in the list
 */
Vue.component('droplet', {
  props: {
    droplet: Object,
    showActions: { type: Boolean, default: true },
  },
  methods: {
    async powerDroplet(id, action) {
      const token = localStorage.getItem('do_token');
      const res = await fetch(
        `${apiUrl}/droplets/power-control/${id}/${action}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      const data = await res.json();
      if (data.status !== 200) return alert(data.message);
      if (data.status === 200) alert(data.message);
      this.$emit('droplet-updated');
    },
    async deleteDroplet(id) {
      const token = localStorage.getItem('do_token');
      const res = await fetch(`${apiUrl}/droplets/delete/${id}`, {
        headers: { Authorization: `Token ${token}` },
      });
      const data = await res.json();
      if (data.status !== 200) return alert(data.message);
      if (data.status === 200) alert(data.message);
      this.$emit('droplet-deleted');
    },
    formatUrl: (ip) => `http://${ip}`,
  },
  template: `
    <div class="bg-white shadow mb-4 p-4 rounded flex justify-between">
      <!-- info -->
      <div>
        <h4 class="text-lg text-gray-700 mb-2">{{ droplet.name }}</h4>
        <div class="text-sm text-gray-600">
          <a :href="formatUrl(droplet.ip_addr)" target="_blank" rel="noopener noreferer" class="text-blue-400 hover:text-blue-600">{{ droplet.ip_addr }}</a>
        </div>
      </div>
      
      <!-- actions -->
      <div v-if="showActions" class="flex items-center text-sm">
        <!-- <button class="bg-green-200 text-green-800 hover:bg-green-300 py-1 px-2 rounded mr-2" @click="restartDroplet(droplet.id, 'restart')">Restart</button> -->
        <button class="bg-yellow-200 text-yellow-800 hover:bg-yellow-300 py-1 px-2 rounded mr-2" @click="powerOffDroplet(droplet.droplet_id, 'power-off')">Power Off</button>
        <button class="bg-green-200 text-green-800 hover:bg-green-300 py-1 px-2 rounded mr-2" @click="powerOffDroplet(droplet.droplet_id, 'power-on')">Power On</button>
        <button class="bg-red-200 text-red-800 hover:bg-red-300 py-1 px-2 rounded" @click="deleteDroplet(droplet.droplet_id)">Delete</button>
      </div>
    </div>
  `,
});
