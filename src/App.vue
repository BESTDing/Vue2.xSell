<template>
  <div>
    <v-header class="header" :seller="seller">
    </v-header>
    <div class="tab border-1px">
      <div class="tab-item" @click="selectItem(0)">
        <router-link to="/goods" :class="{'select-active': $route.fullPath==='/goods'}">商品</router-link>
      </div>
      <div class="tab-item" @click="selectItem(1)">
        <router-link to="/ratings" :class="{'select-active': $route.fullPath==='/ratings'}">评价</router-link>
      </div>
      <div class="tab-item" @click="selectItem(2)">
        <router-link to="/seller" :class="{'select-active': $route.fullPath==='/seller'}">商家</router-link>
      </div>
    </div>
    <!-- 路由出口 -->
    <!-- 路由匹配到的组件将渲染在这里 -->
    <keep-alive>
      <router-view :seller="seller"></router-view>
    </keep-alive>

  </div>
</template>

<script type="text/ecmascript-6">
  const GOODS = 0;
  const RATINGS = 1;
  const SELLER = 2;

  import header from './components/header/header.vue';
//  import goods from 'components/goods/goods.vue';
  import {urlParse} from 'common/js/url.js';

  const ERR_OK = 0;
  export default {
    data() {
      return {
        seller: {
          id: (() => {
            let queryParam = urlParse();
            console.log(1);
            console.log(queryParam);
            return queryParam.id;
          })()
        },
        itemType: 0
      };
    },
    created() {
      this.$http.get(`/api/seller?id={seller.id}`).then((response) => {
//        console.log(response);
        if (response.data.errno === ERR_OK) {
          this.seller = Object.assign({}, this.seller, response.data.data);
//          console.log(this.seller);
        }
      });
    },
    methods: {
      selectItem(itemType) {
        switch (itemType) {
          case GOODS:
            this.itemType = GOODS;
            break;
          case RATINGS:
            this.itemType = RATINGS;
            break;
          case SELLER:
            this.itemType = SELLER;
            break;
        }
      }
    },
    components: {
      'v-header': header
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
    @import "./common/stylus/mixin.styl"
    .tab
      display flex
      width 100%
      height 40px
      line-height 40px
      //border-bottom 1px solid rgba(7, 17, 27, 0.5)
      border-1px(rgba(7, 17, 27, 0.5))
      .select-active
        color red
      .tab-item
        flex 1
        text-align center

</style>
