// main.js는 vue 애플리케이션의 시작점
import { createApp } from 'vue'
import App from './App.vue'
// src/router/index.js 파일의 router를 사용하겠다는 선언
import router from '@/router/index.js' // index.js의 router 사용 (@쓰면 root기준)
import vuetify from './plugins/vuetify'; // . 쓰면 현재 폴더 기준 경로
import '@mdi/font/css/materialdesignicons.css'
// createApp(App).mount('#app') // mount : app.vue파일을 빌드해서 mount
import axios from 'axios';
import store from './store/index.js'; // 전역상태관리를 위한 폴더 전부 import


const app = createApp(App);

// axios 요청 인터셉터를 설정하여 모든 요청에 액세스 토큰을 포함한다.
axios.interceptors.request.use(
    config =>{ // config가 있으면
        const token = localStorage.getItem('token'); 
        if(token){
            config.headers['Authorization'] = `Bearer ${token}`;
        }
        return config;
    },
    error => {
        // 에러가 나면 해당 인터셉터 무시되고, 사용자의 본래요청인 화면으로 라우팅된다.
        return Promise.reject(error);
    }
)

// 401응답을 받을 경우에 interceptor를 통해 전역적으로 rt를 통한 at 재발급
// 만약 rt도 401응답(화면 유효X)을 받을 경우에 token제거 후 login 화면으로 리다이렉트 
// main.js가 진입점이므로 화면마다 401에러가 터지면 인터셉터로 가져가서 at 재발급 (인터셉터가 rt가져가서 at 재발급)
axios.interceptors.response.use(
    response => response,
    async error => {
        if(error.response && error.response.status === 401 ){
            const refreshToken = localStorage.getItem('refreshToken');
            try{
                localStorage.removeItem('token');
                const response = await axios.post(`${process.env.VUE_APP_API_BASE_URL}/refresh-token`, {refreshToken}); // {"refreshToken" : refreshToken} 이런식으롭 보내는거임
                localStorage.setItem('token', response.data.result.token);
                window.location.reload(); // 화면 reload해줘야
            }catch(e){
                // 리프레시 토큰도 만료되었을 경우도 있음 : rt가 만료되었을 경우 강제 로그아웃되고 로그인화면으로 리다이렉트
                localStorage.clear();
                window.location.href = '/login'; 
            }  
        }
        return Promise.reject(error);
    }

)
app.use(store);
app.use(router);
app.use(vuetify);
app.mount('#app');
