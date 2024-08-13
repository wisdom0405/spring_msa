import {createRouter, createWebHistory} from 'vue-router';
// @는 src(루트폴더경로)를 의미한다.
// 파일 내부에 export default 있는 경우에는 {}가 필요없고, 그렇지 않으면 {}필요
// import하는 요소가 여러개 있을 때에도 {}를 붙인다.
// import HomeComponent from '@/components/HomeComponent.vue';
// import TestComponent from '@/components/TestComponent.vue';
import { practiceRouter } from './practiceRouter';
import { memberRouter } from './memberRouter';
import { productRouter } from './productRouter';
import {orderRouter} from './orderRouter';

const routes = [
    // {
    //     // path로도 라우팅이 가능하고, name으로도 라우팅이 가능
    //     // name으로 라우팅 하는 경우는 js코드 내에서 라우팅하는 경우
    //     path: '/',
    //     name: 'HomeComponent',
    //     component: HomeComponent // component명은 반드시 2개이상의 camelcase로 이루어져야 함
    // },
    // practiceRouter.js파일을 갖다가 복사붙여넣기 한 것과 똑같은 효과(스프레드 문법)
    ...practiceRouter,
    ...memberRouter,
    ...productRouter,
    ...orderRouter
]

const router = createRouter({
    // vue router는 내부적으로 두가지 방식의 히스토리 관리를 제공
    // 1) createWebHistory : /home, 2) createHashHistory : /#/home
    // 대부분 WebHistory 사용
    history: createWebHistory(),
    routes
});

export default router;