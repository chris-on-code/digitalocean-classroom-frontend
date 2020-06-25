const Home = Vue.component('home', {
  template: `
    <div>
      <h2 class="text-4xl text-blue-100 mb-6">Join a Classroom</h2>
    
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
      this.$router.push({ path: 'classroom', params: { classroomId: '123 ' } });
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
      <input type="text" class="rounded-lg shadow-md focus:shadow-lg w-full py-3 px-4 outline-none bg-blue-800 text-blue-100 border-2 border-blue-600 focus:border-blue-200" placeholder="Your API Key Here" v-model="apiKey" />
    </form>
  `,
});

Vue.component('classrooms-list', {
  template: `<div>blah</div>`,
});
