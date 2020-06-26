const Classroom = Vue.component('classroom', {
  data() {
    return {
      classroomId: this.$route.params.classroomId,
      classroomName: this.$route.params.classroomName,
      isEnrolled: false,
      classroomDroplets: [],
      myDroplets: [],
    };
  },
  mounted() {
    this.checkIfUserIsEnrolled();
    this.getMyDroplets();
    this.getClassroomDroplets();
  },
  methods: {
    refreshDroplets() {
      console.log('refreshing droplets');
      this.getMyDroplets();
      this.getClassroomDroplets();
    },
    handleClassroomJoined() {
      this.isEnrolled = true;
      this.refreshDroplets();
    },
    handleDropletCreated: () => this.refreshDroplets(),
    handleDropletUpdated: () => this.refreshDroplets(),
    handleDropletDeleted: () => this.refreshDroplets(),
    async checkIfUserIsEnrolled() {
      const token = localStorage.do_token;
      const res = await fetch(
        `${apiUrl}/classes/enrolled/${this.classroomId}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      const data = await res.json();
      if (data.status === 200) this.isEnrolled = true;
    },
    async getMyDroplets() {
      const token = localStorage.do_token;
      const res = await fetch(
        `${apiUrl}/droplets/view/class/${this.classroomId}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      const data = await res.json();
      this.myDroplets = data.droplets;
    },
    async getClassroomDroplets() {
      const token = localStorage.do_token;
      const res = await fetch(
        `${apiUrl}/droplets/class-droplet-count/${this.classroomId}`,
        {
          headers: { Authorization: `Token ${token}` },
        }
      );
      const data = await res.json();
      if (data.status !== 200) return;

      this.classroomDroplets = [...Array(data.droplet_count)].map((_, i) => {
        return { id: i, name: `Droplet ${i + 1}` };
      });
    },
  },
  template: `
    <div>
      <router-link to="/" class="mb-8 text-xs text-blue-300 inline-block bg-blue-700 hover:bg-blue-600 py-1 px-2 rounded"><span class="mr-1">👈</span> Back to all classrooms</router-link>

      <h2 class="super-duper-custom-font mb-8 text-white">
        <span class="mb-2 opacity-50">Welcome to the Class!</span>
        <br />
       <span class="text-6xl">{{ classroomName }}</span>
      </h2>

      <!-- join the classroom -->
      <join-class-form v-if="!isEnrolled" @classroom-joined="handleClassroomJoined" class="mb-8" />

      <!-- show the droplets section -->
      <div v-if="isEnrolled" class="text-gray-800 bg-white rounded-lg shadow-lg p-10">
        <create-droplet-form class="mb-10" @droplet-created="refreshDroplets" />

        <!-- list of my droplets -->
        <div class="mb-12">
          <h3 class="mb-4 text-xl text-gray-900">My Droplets</h3>
          <div v-if="myDroplets.length === 0" class="text-xl text-gray-600 text-center bg-gray-200 rounded p-8">
            <span role="img" class="mr-3">👀</span> Time to create your first classroom droplet!
          </div>

          <div v-for="(droplet, index) in myDroplets" :key="index">
            <droplet 
              :droplet="droplet" 
              @droplet-updated="refreshDroplets"
              @droplet-deleted="refreshDroplets"
            />
          </div>
        </div>

        <!-- list of classroom droplets -->
        <h3 class="mb-4 text-xl text-gray-900">Classroom Droplets</h3>

        <div v-if="myDroplets.length === 0" class="text-xl text-gray-600 text-center bg-gray-200 rounded p-8">
          <span role="img" class="mr-3">😎</span> Be the trendsetter in your classroom!
        </div>

        <div v-for="(droplet, index) in classroomDroplets" :key="index">
          <droplet 
            :droplet="droplet" 
            :showActions="false" 
            @droplet-updated="refreshDroplets"
            @droplet-deleted="refreshDroplets"
          />
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
      secretKey: '',
      email: 'csevilleja@digitalocean.com',
      firstName: 'Chris',
      lastName: 'Sevilleja',
      password: 'password',
    };
  },
  methods: {
    async joinClassroom() {
      const res = await fetch(`${apiUrl}/users/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          class: this.$route.params.classroomName,
          email: this.email,
          first_name: this.firstName,
          last_name: this.lastName,
          password: this.password,
          passcode: this.secretKey,
        }),
      });
      const data = await res.json();

      if ([404, 403].includes(data.status)) return alert(data.message);

      const token = data.api_token;
      localStorage.setItem('do_token', token);

      alert('Welcome to the class!');
      this.$emit('classroom-joined');
    },
  },
  template: `
    <form @submit.prevent="joinClassroom" class="bg-white rounded shadow p-8 ">
      <h4 class="text-xl mb-8">Join the Classroom!</h4>

      <div class="flex items-center mb-4">
        <label class="mr-8 text-sm text-gray-800 w-48 text-right">Classroom Secret</label>
        <input type="text" name="secretKey" class="rounded-lg shadow w-full py-3 px-4 outline-none bg-white" v-model="secretKey" />
      </div>

      <div class="flex items-center mb-4">
        <label class="mr-8 text-sm text-gray-800 w-48 text-right">Email</label>
        <input type="text" name="email" class="rounded-lg shadow w-full py-3 px-4 outline-none bg-white" v-model="email" />
      </div>

      <div class="flex items-center mb-4">
        <label class="mr-8 text-sm text-gray-800 w-48 text-right">First Name</label>
        <input type="text" name="firstName" class="rounded-lg shadow w-full py-3 px-4 outline-none bg-white" v-model="firstName" />
      </div>

      <div class="flex items-center mb-4">
        <label class="mr-8 text-sm text-gray-800 w-48 text-right">Last Name</label>
        <input type="text" name="lastName" class="rounded-lg shadow w-full py-3 px-4 outline-none bg-white" v-model="lastName" />
      </div>

      <div class="flex items-center mb-6">
        <label class="mr-8 text-sm text-gray-800 w-48 text-right">Password</label>
        <input type="password" name="password" class="rounded-lg shadow w-full py-3 px-4 outline-none bg-white" v-model="password" />
      </div>

      <div class="text-right">
        <button class="bg-purple-400 text-xl text-purple-800 py-3 px-6 rounded shadow">Join 🤩🤩🤩</button>
      </div>
    </form>
  `,
});
