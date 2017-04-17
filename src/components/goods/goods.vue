<template>
  <div class="goods">
    <div class="menu-wrapper" ref="menuWrapper">
      <ul>
        <li class="menu-item" v-for="(good, index) in goods" :class="{'current': currentIndex === index}"
            @click="selectMenu(index, $event)">
          <span class="text border-1px">
            <span v-show="good.type > 0" class="icon" :class="classMap[good.type]"></span>
            {{ good.name }}
          </span>
        </li>
      </ul>
    </div>
    <div class="foods-wrapper" ref="foodsWrapper">
      <ul>
        <li v-for="good in goods" class="food-list" ref="foodList">
          <h1 class="title">{{ good.name }}</h1>
          <ul>
            <li v-for="food in good.foods" class="food-item border-1px">
              <div class="icon">
                <img :src="food.icon">
              </div>
              <div class="content">
                <h2 class="name">{{ food.name }}</h2>
                <p class="desc">{{ food.description }}</p>
                <div class="extra">
                  <span class="count">月售{{ food.sellCount }}份</span><span>好评率{{food.rating}}%</span>
                </div>
                <div class="price">
                  <span class="now">￥{{ food.price }}</span><span class="old"
                                                                  v-show="food.oldPrice">￥{{food.oldPrice}}</span>
                </div>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>
    <div>
      <shopcart></shopcart>
    </div>
  </div>
</template>

<script>
  import BScroll from 'better-scroll';
  import shopcart from '../shopcart/shopcart.vue';
  const ERR_OK = 0;
  export default {
    data() {
      return {
        goods: [],
        listHeight: [],
        scrollY: 0
      };
    },
    props: {
      seller: {
        type: Object
      }
    },
    created() {
      this.classMap = ['decrease', 'discount', 'special', 'invoice', 'guarantee'];
      this.$http.get('/api/goods')
        .then((response) => {
          if (response.data.errno === ERR_OK) {
            this.goods = response.data.data;
            this.$nextTick(() => {
              this._initScroll();
              this._calculateHeight();
            });
          }
        });
    },
    mounted() {
    },
    methods: {
      selectMenu(index, event) {
        if (!event._constructed) {
          return;
        }
        let foodList = this.$refs.foodList;
        let el = foodList[index];
        this.foodsScroll.scrollToElement(el, 300);
        console.log(index);
        console.log(event);
      },
      _initScroll() {
        console.log(this.$refs.menuWrapper);
        this.menuScroll = new BScroll(this.$refs.menuWrapper, {
          click: true
        });
        this.foodsScroll = new BScroll(this.$refs.foodsWrapper, {
          probeType: 3
        });
        this.foodsScroll.on('scroll', (pos) => {
          this.scrollY = Math.abs(Math.round(pos.y)) + 100;
        });
      },
      _calculateHeight() {
        let foodList = this.$refs.foodList;
        let height = 0;
        this.listHeight.push(height);
        for (let i = 0; i < foodList.length; i++) {
          let item = foodList[i];
          height += item.clientHeight;
          this.listHeight.push(height);
        }
      }
    },
    computed: {
      currentIndex() {
        for (let i = 0; i < this.listHeight.length; i++) {
          let height1 = this.listHeight[i];
          let height2 = this.listHeight[i + 1];
          if (!height2 || this.scrollY >= height1 && this.scrollY < height2) {
            console.log(i);
            return i;
          }
        }
        return 0;
      }
    },
    components: {
      shopcart
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .goods
    display flex
    position absolute
    top 174px
    width 100%
    bottom 44px
    overflow hidden
    .menu-wrapper
      font-size 12px
      flex 0 0 80px
      width 80px
      background #f3f5f7
      .menu-item
        display table
        width 56px
        height 54px
        line-height 14px
        padding 0 12px
        &.current
          position relative
          z-index 10
          margin-tp 1px
          font-weight 700
          background-color white
          .text
            border-none()
        .icon
          display inline-block
          width 16px
          height 16px
          vertical-align top
          margin-right 2px
          background-repeat no-repeat
          background-size 16px 16px
          &.decrease
            bg-image('decrease_3')
          &.discount
            bg-image('discount_3')
          &.guarantee
            bg-image('guarantee_3')
          &.invoice
            bg-image('invoice_3')
          &.special
            bg-image('special_3')
        .text
          display table-cell
          width 56px
          vertical-align middle
          font-size 12px
          border-1px(rgba(7, 17, 27, 0.1))
    .foods-wrapper
      flex 1
      .title
        padding-left 14px
        height 26px
        border-left 2px solid #d9dde1
        background-color #f3f5f7
        color rgb(147, 153, 149)
        font-size 12px
        line-height 26px
      .food-item
        display flex
        margin 18px
        padding-bottom 18px
        border-1px(rgba(7, 17, 27, 0.1))
        &:last-child
          border-none()
          margin-bottom 0
        .icon
          float: 0 0 57px
          margin-right 10px
        .content
          flex 1
          .name
            margin 2px 0 8px 0
            height 14px
            line-height 14px
            font-size 14px
            color rgb(7, 17, 27)
          .desc, .extra
            line-height 10px
            font-size 10px
            color: rgb(147, 153, 159)
          .desc
            margin-bottom 8px
            line-height 12px
          .extra
            .count
              margin-right 12px
          .price
            font-weight 700
            line-height 24px
            .now
              margin-right 8px
              font-size 14px
              color rgb(240, 20, 20)
            .old
              text-decoration line-through
              font-size 10px
              color rgb(147, 153, 159)

</style>
