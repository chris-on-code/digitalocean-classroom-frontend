const Home = Vue.component('home', {
  template: `
    <div>
      <h2 class="text-4xl lg:text-6xl text-white mb-10">
        Join a Classroom
        <span class="ml-4" role="img">
          <span class="sharky">🦈</span>
          <span class="sharky">🦈</span>
          <span class="sharky">🦈</span>
        </span>
      </h2>
      <classrooms-list />
    </div>
`,
});

/**
 * Classroom List
 */
Vue.component('classrooms-list', {
  data() {
    return {
      classrooms: [
        { id: 2, name: 'math' },
        { id: 2, name: 'science' },
        { id: 2, name: 'chemistry' },
        { id: 2, name: 'biology' },
      ],
    };
  },
  mounted() {
    //   getClassrooms();
  },
  methods: {
    async getClassrooms() {
      const res = await fetch(`${apiUrl}/classes`);
      const data = await res.json();
      // TODO: bind classrooms to this.classrooms
    },
  },
  template: `
    <div class="flex flex-wrap text-center">
      <classroom-link v-for="(classroom, index) in classrooms" :key="index" :classroom="classroom" />
    </div>
  `,
});

/**
 * Show a link to a specific classroom
 */
Vue.component('classroom-link', {
  props: ['classroom'],
  data() {
    return {
      colors: [
        'red',
        'orange',
        'yellow',
        'green',
        'teal',
        'blue',
        'indigo',
        'purple',
        'pink',
      ],
    };
  },
  methods: {
    goToClassroom(id) {
      this.$router.push({
        name: 'classroom',
        params: { classroomId: id },
      });
    },
  },
  computed: {
    randomColorClass() {
      const randomColor = this.colors[
        Math.floor(Math.random() * this.colors.length)
      ];
      return `text-${randomColor}-300 hover:text-${randomColor}-600 bg-${randomColor}-400 hover:bg-${randomColor}-300`;
    },
  },
  template: `
    <button class="classroom-link w-32 h-32 mr-8 mb-8 outline-none border-none" @click="goToClassroom(classroom.id)">
      <!-- colored square -->
      <div class="icon w-full h-20 mb-2 rounded-md hover:shadow-lg relative overflow-hidden transition ease-in duration-75" :class="[randomColorClass]">
        <span class="absolute top-0 right-0 mr-2 leading-none uppercase font-bold" style="font-size: 120px; transform: translateY(-20px)">
          {{ classroom.name.substring(0, 1) }}
        </span>
      </div>

      <!-- class name -->
      <p class="text-blue-200 capitalize">{{ classroom.name }}</p>
    </button>
  `,
});
