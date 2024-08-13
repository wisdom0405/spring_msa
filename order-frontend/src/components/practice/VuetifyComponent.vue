<template>
    <v-app-bar app>
        네비게이션 바
    </v-app-bar>

    <!-- v-container, v-row, v-col -->
        <v-container>
            <v-row>
                <v-col cols="8">
                    <!-- col의 총합 12 -->
                    hello world1
                </v-col>
                <v-col cols="4">
                    hello world2
                </v-col>
            </v-row>     
            <v-row>
                <!-- v-card -->
                 <v-card>
                    <!-- card-title, card-text(내용) -->
                    <v-card-title>
                        안내문구
                    </v-card-title>
                    <v-card-text> 
                        안녕하세요
                    </v-card-text>
                 </v-card>
            </v-row>
            <v-row>
                <v-simple-table>
                    <thead>
                        <tr>
                            <th>이름</th>
                            <th>이메일</th>
                        </tr>
                    </thead>
                    <tbody>
                        <tr><td>hong1</td><td>hong1@naver.com</td></tr>
                        <tr><td>hong2</td><td>hong2@naver.com</td></tr>
                    </tbody>
                </v-simple-table>
            </v-row>
            <v-row>
            </v-row>
        </v-container>
        <v-card>
            <v-card-title>회원가입</v-card-title>
            <v-card-text>
                <v-form>
                    <v-text-field
                        label="email"
                        type="email"
                    >
                    </v-text-field>
                    <v-text-field
                        label="name"
                        type="text"
                    >
                    </v-text-field>
                    <v-text-field
                        label="password"
                        type="password"
                    >
                    </v-text-field>
                    <v-btn color="primary">
                        제출하기
                    </v-btn>
                </v-form>
            </v-card-text>
        </v-card>
        <br><br>
        <v-btn @click.stop="cancel()">취소버튼</v-btn>
        <!-- 모달창을 위한 v-dialog -->
        <v-dialog v-model="dialog" max-width="400px">
            <!-- dialog 상태가 true가 되어야 보이는 요소 -->
            <v-card>
                <v-card-title>정말 취소 하시겠습니까?</v-card-title>
            
                <v-card-actions>
                    <v-btn color="primary">확인</v-btn>
                    <v-btn color="secondary" @click="dialog=false">취소</v-btn>
                </v-card-actions>
            </v-card>
        </v-dialog>

        <!-- html 상에서 이동 : template 상으로 이동 -->
        <v-btn href="/practice/modeling">라우팅1</v-btn> 
        <v-btn :to="{path: '/practive/modeling'}">SPA라우팅2(router기능 활용)</v-btn>
        <v-btn :to="{name: 'ModelingComponent'}">SPA라우팅3(name호출 활용)</v-btn>
        <!-- href 방식, spa방식, name방식으로 호출할 수 있다. -->
        <!-- 데이터변경없을때는 spa 방식 사용(제일많이 쓺)  -->
</template>
<script>
    export default {
        data() {
            // 변수설정 : data()함수를 통해 변수 세팅
            return {
                dialog: false,
            }
        },
        methods: {
            // methos안에서 함수정의 가능 
            // this : data에서 정의하는 변수 지정
            cancel(){
                this.dialog = true;
            }
        }
    }
</script>