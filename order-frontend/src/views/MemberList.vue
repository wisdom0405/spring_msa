<template>
    <v-container>
        <v-row justify="center">
            <v-col>
                <v-card>
                    <v-card-title class="text-center text-h5">
                        회원목록
                    </v-card-title>
                    <v-card-text>
                        <v-data-table
                        :headers="tableHeaders"
                        :items="memberList"
                        >
                        </v-data-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>
<script>
import axios from 'axios';
export default{
    data(){
        return{
            // key-value 형식 (title : key, key: value(DB로 들어오는 값 그대로))
            tableHeaders: [{title: 'ID', key : 'id', align: 'start'}, 
                            {title:'이름', key:'name', align:'start'}, 
                            {title:'EMAIL', key:'email', align:'start'},
                            {title:'주문수량', key:'orderCount', align:'start'}],
            memberList: []
        }
    },
    async created(){
        // const token = localStorage.getItem('token');
        // const headers = {Authorization : `Bearer ${token}`}
        // 이런형식의 토큰이 들어간다
        // "headers" : {Authorization: 'Bearer 토큰값'}, key와 value 값이 똑같을 때 {"headers": headers}랑 {headers}랑 같음
        try{
            const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/member-service/member/list`); // {headers: headers}가 들어간 것과 같음 -> {headers}빼줬음
            this.memberList = response.data.result.content;
        }catch(e){
            console.log(e);
        }
    }
}
</script>
