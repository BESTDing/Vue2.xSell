<template>
  <div class="shopcart">
    <div class="content">
      <div class="content-left">
        <div class="logo-wrapper">
          <div class="logo" :class="{hightlight: totalCount > 0}">
            <span class="icon-shopping_cart" :class="{hightlight: totalCount > 0}"></span>
          </div>
          <div class="number" v-show="totalCount > 0">{{ totalCount }}</div>
        </div>
        <div class="price" :class="{hightlight: totalCount > 0}">￥{{ totalPrice }}元</div>
        <div class="desc">令需配送费{{ deliveryPrice }}元</div>
      </div>
      <div class="content-right">
        <div class="pay" :class="{enough: totalPrice >= minPrice}">
          {{ payDesc }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      selectFoods: {
        type: Array,
        default() {
          return [{price: 10, count: 2}];
        }
      },
      deliveryPrice: {
        type: Number,
        default: 0
      },
      minPrice: {
        type: Number,
        default: 0
      }
    },
    computed: {
      totalPrice() {
        let total = 0;
        this.selectFoods.forEach((food) => {
          total += food.price * food.count;
        });
        return total;
      },
      totalCount() {
        let total = 1;
        this.selectFoods.forEach((food) => {
          total += food.count;
        });
        return total;
      },
      payDesc() {
        if (this.totalPrice === 0) {
          return `￥${this.minPrice}元起送`;
        } else if (this.totalPrice < this.minPrice) {
          let diff = this.minPrice - this.totalPrice;
          return `还差￥${diff}元起送`;
        } else {
          return '去结算';
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  .shopcart
    position fixed
    left 0
    bottom 0
    z-index  50
    width 100%
    height 48px
    .content
      display flex
      background #141d27
      font-size 0
      color rgba(255, 255, 255, 0.4)
      .content-left
        flex 1
        .logo-wrapper
          display inline-block
          position relative
          top -10px
          margin 0 12px
          padding 6px
          width 56px
          height 56px
          box-sizing border-box
          border-radius 50%
          background #141d27
          .logo
            width 100%
            height 100%
            border-radius 50%
            text-align center
            background #2b343c
            &.hightlight
              background rgb(0, 160, 220)
            .icon-shopping_cart
              font-size 24px
              color #80858a
              line-height 44px
              &.hightlight
                color  white
          .number
            position absolute
            top 0
            right 0
            width 24px
            height 24px
            color white
            line-height 24px
            text-align center
            border-radius 16px
            font-size 9px
            font-weight 400
            background rgb(240, 20, 20)
            box-shadow 0 4px 8px 0 rgba(0, 0, 0, 0.4)
        .price
          display inline-block
          vertical-align top
          /*margin-top 12px*/
          line-height 48px
          box-sizing border-box
          padding-right 12px
          border-right 1px solid rgba(255, 255, 255, 0.1)
          font-size 16px
          font-weight 700
          &.hightlight
            color white
        .desc
          display inline-block
          vertical-align top
          margin 12px 0 0 12px
          line-height 24px
          font-size 10px
  // color rgba(255, 255, 255, 0.4)
      .content-right
        flex 0 0 105px
        width 105px
        .pay
          line-height 48px
          text-align center
          font-size 12px
          font-weight 700
          background #2b333b
          &.enough
            background #00b43c
            color white
</style>
