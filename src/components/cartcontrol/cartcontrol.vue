<template>
  <div class="cartcontrol">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" v-show="food.count > 0" @click="decreaseCart($event)"></div>
    </transition>
    <div class="cart-count" v-show="food.count > 0">{{ food.count }}</div>
    <div class="cart-add icon-add_circle" @click="addCart($event)"></div>
  </div>
</template>

<script>
  import Vue from 'vue';

  export default {
    props: {
      food: {
        type: Object
      }
    },
    methods: {
      addCart(event) {
        if (!event._constructed) {
          return;
        }
        console.log('clicked');
        if (!this.food.count) {
          Vue.set(this.food, 'count', 1);
        } else {
          this.food.count++;
        }
        this.$emit('add', event.target);
      },
      decreaseCart(event) {
        if (!event._constructed) {
          return;
        }
        this.food.count--;
      }
    },
    created() {
      console.log(this.food);
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  /*@keyframes move-in*/
//    from
//      opacity 0
      //transform translate3D(0, 0, 0)
    //to
      //opacity 1
      //transform translate3(24px, 0, 0)
  //.move-enter-active
    //animation: move-in .5s;

  .cartcontrol
    font-size 0
    .cart-decrease, .cart-add
      display inline-block
      padding 6px
      line-height 24px
      font-size 24px
      color rgb(0, 160, 220)
    .cart-decrease
      opacity 1
      transform rotate(180deg)
    .move-enter, .move-leave-active
      transform: translateX(24px);
      opacity: 0;

    .move-enter-active
      transition all .4s ease
    .move-leave-active
      transition all .4s ease
    .cart-count
      display inline-block
      vertical-align top
      width 12px
      padding-top 6px
      line-height 24px
      text-align center
      font-size  10px
      color rgb(147, 153, 159)


</style>
