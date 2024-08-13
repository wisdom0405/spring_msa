<template>
    <v-container>
        <v-row class="d-flex justify-content-between mt-5">
            <v-col>
                <v-form @submit.prevent="searchProducts">
                    <v-row>
                        <v-col cols="auto">
                            <v-select
                             v-model="searchType"
                             :items="searchOptions"
                             item-title="text"
                             item-value="value"
                            >
                            </v-select>
                        </v-col>

                        <v-col>
                            <v-text-field
                            v-model="searchValue" label="Search"
                            >
                            </v-text-field>
                        </v-col>

                        <v-col cols="auto">
                            <v-btn type="submit">검색</v-btn>    
                        </v-col>

                    </v-row>
                </v-form>
            </v-col>

            <v-col cols="auto" v-if="!isAdmin">
                <v-btn @click="addCart" color="secondary" class="mr-2">장바구니</v-btn>
                <v-btn @click="createOrder" color="success">주문하기</v-btn>
            </v-col>

            <v-col cols="auto" v-if="isAdmin">
                <v-btn href="/product/create" color="success">상품등록</v-btn>
            </v-col>
        </v-row>
        <v-row>
            <v-col>
                <v-card>
                    <v-card-title class="text-h6 text-center">{{pageTitle}}</v-card-title>
                    <v-card-text>
                        <v-table>
                            <thead>
                                <tr>
                                    <th>제품사진</th>
                                    <th>제품명</th>
                                    <th>가격</th>
                                    <th>재고수량</th>
                                    <th v-if="!isAdmin">주문수량</th>
                                    <th v-if="!isAdmin" class="text-center">주문선택</th>
                                    <th v-if="isAdmin">Action</th>
                                </tr>
                            </thead>
                            <tbody>
                                <tr v-for="p in productList" :key="p.id">
                                    <td>
                                        <v-img :src="p.imagePath" style="height:100px; width:auto;"></v-img>
                                    </td>
                                    <td>{{p.name}}</td>
                                    <td>{{p.price}}</td>
                                    <td>{{p.stockQuantity}}</td>
                                    <td>
                                        <v-text-field
                                            v-model.number="p.quantity"
                                            type="number"
                                            style="width:70px"
                                        >
                                        </v-text-field>
                                    </td>

                                    <td class="text-center" v-if="!isAdmin">
                                        <input type="checkbox" v-model="selected[p.id]">
                                    </td>
                                    <td v-if="isAdmin">
                                        <v-btn color="secondary" @click="deleteProduct(p.id)">삭제</v-btn>    
                                    </td>
                                </tr>
                               
                            </tbody>

                        </v-table>
                    </v-card-text>
                </v-card>
            </v-col>
        </v-row>
    </v-container>
</template>

<script>
import axios from 'axios';
import { mapGetters } from 'vuex';
export default{
    props: ['isAdmin', 'pageTitle'],
    computed: {
        ...mapGetters(['getProductsInCart']),
    },
    data(){
        return{
            searchType: 'optional',
            searchOptions: [
                {text:"선택", value:'optional'},
                {text:"상품명", value: "name"},
                {text:"카테고리", value: "category"}
            ],
            searchValue: "",
            productList:[],
            pageSize:5,
            currentPage:0,
            isLastPage: false,
            isLoading: false,
            // selected(객체) 예시
            // {1: true, 2:false, 3:false, 4:true} 이런식으로 담기게 된다.
            selected:{}

        }
    },
    created(){
        this.loadProduct();
        window.addEventListener('scroll', this.scrollPagination); // 화면상에서 스크롤이 감지될 때 scrollPagination 호출
    },

    beforeUnmount(){
        window.removeEventListener('scroll', this.scrollPagination);
    },
    methods:{
        deleteProduct(productId){
            console.log(productId);
        },

        searchProducts(){
            // 검색버튼 누르면 그동안 load했던 데이터들 빈배열로 초기화
            this.productList = [];
            this.currentPage = 0;
            this.isLastPage = false;
            this.isLoading = false;
            this.loadProduct();
        },

        async loadProduct(){
            try{
                // Pageable 객체에 맞게 파라미터 형식으로 데이터를 전송해줘야 함
                // url에 product/list?size=3&page=0 이런식으로 요청
                // 방법1. 파라미터 방식 : {params:{page:10, size:2}} 와 같은 형식으로 전송 시 parameter 형식으로 변환되어 서버로 전송
                // 방법2. body로 formData 객체 생성하여 서버로 데이터 전송 
                if(this.isLoading || this.isLastPage) return;
                
                this.isLoading = true;

                let params = {
                    size: this.pageSize,
                    page: this.currentPage
                }

                // params = {size:5. page:0, category : "fruits"} 또는 {size:5. page:0, name : "apple"}
                if(this.searchType === 'name'){
                    // params는 .name 하면 name값 추가
                    params.searchName=this.searchValue;
                }else if(this.searchType === 'category'){
                    params.category = this.searchValue;
                }
                
                // localhost:8080/product-service/product/list?category=fruits&size=5&page=0 또는 name=apple&size=5&page=0
                const response = await axios.get(`${process.env.VUE_APP_API_BASE_URL}/product-service/product/list`,{params});
                const additionalData = response.data.result.content.map(p => ({...p, quantity:0}));
                
                if(additionalData.length == 0){
                    this.isLastPage = true;
                    return; // 함수 종료시킴
                }
                this.productList = [...this.productList, ...additionalData]; // 두배열을 합치므로써 이전데이터 + 새로 로드된 데이터 불러옴
                this.currentPage++; // load가 끝나면 currentPage 증가시켜줘야함
                this.isLoading = false;

            }catch(e){
                console.log("heeer")
                console.log(e);
            }
        },
        scrollPagination(){
            // 화면상에서 스크롤이 동작할때 실행되도록 하는 함수
            // "현재화면 + 스크롤로 이동한 화면 >  전체화면 - n" 의 조건이 성립되면 추가 데이터 로드 
            const isBottom = window.innerHeight + window.scrollY >= document.body.offsetHeight - 200;
            if(isBottom && !this.isLastPage && !this.isLoading){ // !this.Loading : 로딩되고 있지 않을 때
                this.loadProduct();
            }
        },
        addCart(){
            const orderProducts = Object.keys(this.selected).filter(key => this.selected[key]) // 체크된 key(id)값을 거름
                                .map(key => {
                                    const product = this.productList.find(p => p.id == key)
                                    return {id:product.id, name:product.name, quantity:product.quantity};
                                });
            orderProducts.forEach(p => this.$store.dispatch('addCart', p));
            console.log(this.getProductsInCart);
            // window.location.reload();
        },
        async createOrder(){
            const orderProducts = Object.keys(this.selected).filter(key => this.selected[key]) // 체크된 key(id)값을 거름
                                .map(key => {
                                    const product = this.productList.find(p => p.id == key)
                                    return {productId:product.id, productCount:product.quantity};
                                });
                                
            if(orderProducts.length < 1){
                alert("주문대상 물건이 없습니다.");
                return;
            }

            const yesOrNo = confirm(`${orderProducts.length}개의 상품을 주문하시겠습니까?`);
            
            if(!yesOrNo){
                console.log("주문이 취소되었습니다.");
                return;
            }

            try{
                await axios.post(`${process.env.VUE_APP_API_BASE_URL}/order-service/order/create`, orderProducts);
                alert("주문완료되었습니다.");
                window.location.reload();
            }catch(e){
                alert("주문실패되었습니다.");
            }
            
        }
    }
}
</script>
