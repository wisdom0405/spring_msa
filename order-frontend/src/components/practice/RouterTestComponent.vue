<template>
    <h1>화면 라우팅 테스트</h1>
    <div>
        <button @click="spaMove1">modeling 페이지로 이동(url)</button>
    </div>
    <div>
        <button @click="spaMove2">modeling 페이지로 이동(name)</button>
    </div>
    <div>
        <button @click="hrefMove">modeling 페이지로 이동(href)</button>
    </div>
    <div>
        <button @click="reloadPage">현재화면 reload</button>
    </div>
</template>
<script>
export default{
    data(){
        return{
           
        }
    },
    methods:{
        spaMove1(){
            this.$router.push("/practice/modeling");
        },
        spaMove2(){
            // paracticeRouter에 있는 name
            this.$router.push({name:"ModelingComponent"});
        },
        hrefMove(){
            // window 객체 안에 있음
            window.location.href='/practice/modeling';
        },
        reloadPage(){
            // f5 누르는거랑 똑같음
            window.location.reload();
        }
    }
}
</script>