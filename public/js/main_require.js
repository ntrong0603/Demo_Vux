require.config({
    baseUrl: "/libs/",
    paths: {
        "Vue": "vue",
        "vue": "require-vuejs",
        "VueRouter": "vue-router",
        "VueX": 'vuex',
    },
    shim: { "Vue": { "exports": "Vue" } },
});

var arguments = [
    'Vue', 'VueRouter', 'VueX'
];

function view(name) {
    return function (resolve) {
        return require([name], resolve);
    };
}
require([...arguments], function (Vue, VueRouter, Vuex) {
    const FooComponent = {
        template: `
            <div class="checkbox-wrapper" @click="check">
            <div :class="{ checkbox: true, checked: checked }"></div>
            <div class="title">{{ title }}</div>
            </div>
            `,
        data() {
            return { checked: false, title: 'Check me' }
        },
        methods: {
            check() { this.checked = !this.checked; }
        }
    };
    const BarComponent = { template: '<div>bar</div>' };

    const routes = [
        {
            path: '/',
            component: FooComponent
        },
        {
            path: '/bar',
            component: BarComponent
        },
        {
            path: '/thePathForURI',
            name: "folder1",
            component: view("components/test")
        }
    ];


    Vue.use(VueRouter);
    const router = new VueRouter({
        mode: 'history',
        "routes": routes
    });

    Vue.use(Vuex);
    // Khai báo vuex
    let vuex = new Vuex.Store({
        state: {
            tasks: [],
            newTask: ''
        },
        getters: {
            newTask: state => state.newTask,
            tasks: state => state.tasks.filter((task) => { return !task.completed }),
            completedTask: state => state.tasks.filter((task) => { return task.completed })
        },
        mutations: {
            getTask(state, task) {
                state.newTask = task
            },
            addTask(state) {
                state.tasks.push({
                    body: state.newTask,
                    completed: false
                })
            },
            editTask(state, task) {
                var tasks = state.tasks
                tasks.splice(tasks.indexOf(task), 1)
                state.tasks = tasks
                state.newTask = task.body
            },
            removeTask(state, task) {
                var tasks = state.tasks
                tasks.splice(tasks.indexOf(task), 1)
            },
            completeTask(state, task) {
                task.completed = !task.completed
            },
            clearTask(state) {
                state.newTask = ''
            }
        },
        actions: {
            getTask({ commit }, task) {
                commit('getTask', task)
            },
            addTask({ commit }) {
                commit('addTask')
            },
            editTask({ commit }, task) {
                commit('editTask', task)
            },
            removeTask({ commit }, task) {
                commit('removeTask', task)
            },
            completeTask({ commit }, task) {
                commit('completeTask', task)
            },
            clearTask({ commit }) {
                commit('clearTask')
            }
        }
    });
    const app = new Vue(Vue.util.extend({ router, vuex })).$mount('#app');
})
