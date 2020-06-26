const Home = Vue.component('home', {
  template: `
    <div>
      <h2 class="text-6xl text-white mb-6">Join a Classroom</h2>
    
      <join-class-form class="mb-10" />
      <classrooms-list />
    </div>
`,
});

Vue.component('join-class-form', {
  data: function () {
    return {
      apiKey: 'test',
    };
  },
  methods: {
    joinClassroom: function () {
      this.$router.push({ name: 'classroom', params: { classroomId: '123' } });
      // fetch('join-the-classroom.com')
      //   .then((res) => res.json())
      //   .then((data) => {
      //     // we should have the classroom_id
      //     // route to the classroom route
      //   });
    },
  },
  template: `
    <form @submit.prevent="joinClassroom">
      <input type="text" class="rounded-lg shadow-md focus:shadow-lg w-full py-3 px-4 outline-none bg-white" placeholder="Your API Key Here" v-model="apiKey" />
    </form>
  `,
});

Vue.component('classrooms-list', {
  data: function () {
    return {
      classrooms: [
        { id: 2, name: 'math' },
        { id: 2, name: 'science' },
        { id: 2, name: 'chemistry' },
        { id: 2, name: 'biology' },
      ],
    };
  },
  // mounted: function () {
  //   getClassrooms();
  // },
  methods: {
    //   getClassrooms: function () {
    //     fetch('go-get-classrooms-for-a-user');
    //   },
    goToClassroom: function (id) {
      this.$router.push({ name: 'classroom', params: { classroomId: id } });
    },
  },
  template: `
    <div>
      <h2 class="super-duper-custom-font text-xl text-blue-200 mb-4">Classrooms <span class="text-sm opacity-75 ml-2">({{ classrooms.length }})</span></h2>

      <div class="flex flex-wrap text-center">
        <button class="w-24 h-24 mr-8 mb-8" v-for="(classroom, index) in classrooms" :key="index" @click="goToClassroom(classroom.id)">
          <div class="icon w-full h-20 bg-yellow-400 mb-2 rounded-md hover:shadow-lg"></div>
          <p class="text-xs text-blue-300">Random Text</p>
        </button>
      </div>
    </div>
  `,
});
