<template>
    <div>watch 예제</div>
    <div>count: {{count}} </div>
    <button @click="incrementCount">increment count</button>
    <h1>update 예제</h1>
    <div>message : {{message}}</div>
    <button @click="updateMessage">update message</button>
</template>
<script>
export default{
    data(){
        return{
           count: 0,
           message: "hello java"
        }
    },
    watch:{
        // 특정 변수 값의 변경사항을 인지하는 hook함수
        count(){
            // 인지하고자 하는 변수값과 일치되는 함수명 (특정한 변수값 추적)
            alert("count값 변경")
        }
    },
    updated(){
        // dom객체(화면)의 변경사항을 인지하는 hook 함수 (watch보다 더 포괄적 개념)
        alert("dom 요소 변경")
    },  
    methods:{
        incrementCount(){
            this.count ++;
        },
        updateMessage(){
            this.message = "hello python";
        }
    }
}
</script>