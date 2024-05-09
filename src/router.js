import { createRouter, createWebHistory } from 'vue-router';
import VotePage from './components/VotePage.vue';
import ResultPage from './components/ResultPage.vue';

const routes = [
  //  当设置了 props: true，Vue Router 会自动把 type 参数作为一个 prop 传递给 VotePage 组件。
  //  在 VotePage 组件中，可以直接通过 props 接收和使用这个值
  //  selectedVoteType
  { path: '/vote/:type', name: 'vote', component: VotePage, props: true },
  { path: '/result', component: ResultPage }
];

const router = createRouter({
  history: createWebHistory(),
  routes
});

export default router;