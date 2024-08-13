<template>
    <v-container>
        <v-row>
            <v-col>
                <v-simple-table>
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>이름</th>
                            <th>이메일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr v-for="member in memberList" :key="member.id">
                            <td>{{member.id}}</td>
                            <td>{{member.name}}</td>
                            <td>{{member.email}}</td>
                        </tr>
                    </tbody>
                </v-simple-table>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
    import axios from 'axios'
    export default {
        data() {
            return {
                memberList: []
            }
        },
        async created() {
            // 화면이 열리기전에 데이터 받아옴
            // axios : async - await
            const response = await axios.get('http://localhost:8080/rest/member/list')
            this.memberList = response.data
            console.log(response.data);

        }
    }
</script>