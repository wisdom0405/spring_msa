<template>
    <!-- HTML 요소의 동적 값 표시 -->
     <!-- html요소 안에 중괄호 2번을 사용함으로서 script에 정의된 변수값을 화면에 표시 -->
      <h1>hello world {{language}}</h1>

        <!-- :value문법을 사용하면 단방향 데이터 바인딩 -->
        <input type="text" :value="value1">
        <!-- v-model문법을 사용하면 양방향 데이터 바인딩 -->
         <!-- 양방향 데이터 바인딩은 여기서 자바스크립트 변수값도 바꿔줄 수 있다. -->
        <input type="text" v-model="value2"> 
        <button @click="showValue">변수 변경사항 확인</button><br>

        <h1>{{count}}</h1>
        <button @click="increment">increment</button><br>

        <h1>{{doubleCount}}</h1>

        <input type="number" v-model="count2"> 
        <button @click="increment2">increment2</button><br>

</template>

<script>
export default{
    data() {
        return{
            // 변수정의
            language:"python",
            value1:" python",
            value2:" java",
            count: 0,
            count2: 0
        }
    },
    // computed는 종속된 반응형 데이터가 변경될 때에 다시 실행하여 값을 계산하는 함수
    computed:{
        doubleCount(){
            // count가 변경이 안되면 변화가 없지만 
            // count값이 바뀌면 추적하여 doubleCount값에 변화가 생김
            return this.count * 2; 
        }
    },
    created(){
        alert("CREATED 함수 호출")
    },
    methods:{
        showValue(){
            alert(this.value2); 
        },
        increment(){
            this.count += 1;
        },
        increment2(){
            this.count2 += 1;
        }
    }
}
</script>
