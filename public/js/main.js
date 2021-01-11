const Foo = {
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
const Bar = { template: '<div>bar</div>' };

const routes = [
    {
        name: 'home',
        path: '/',
        component: Foo
    },
    {
        name: 'child',
        path: '/bar',
        component: Bar
    }
];


const router = new VueRouter({
    routes // short for `routes: routes`
});

const app = new Vue({
    router
}).$mount('#app');
