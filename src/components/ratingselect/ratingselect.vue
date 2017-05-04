<template>
  <div class="ratingselect">
    <div class="rating-type border-1px">
      <span class="block positive" :class="{'active':selectType===2}">{{ desc.all }} <span class="count">47</span> </span>
      <span class="block positive" :class="{'active':selectType===1}">{{ desc.positive }} <span class="count">47</span> </span>
      <span class="block negative" :class="{'active':selectType===0}">{{ desc.negative }} <span class="count">47</span> </span>
    </div>
    <div class="switch border-1px" :class="{'on':onlyContent}">
      <span class="icon-check_circle"></span>
      <span class="text">只看内容评价</span>
    </div>
  </div>
</template>

<script type="text/ecmascript-6">
  const POSITIVE = 1;
  const NEGATIVE = 0;
  const ALL = 2;

  export default {
    data() {
      return {
      };
    },
    props: {
      ratings: {
        type: Array,
        default() {
          return [];
        }
      },
      selectType: {
        type: Number,
        default: ALL
      },
      onlyContent: {
        type: Boolean,
        default: true
      },
      desc: {
        type: Object,
        default() {
          return {
            all: '全部',
            positive: '满意',
            negative: '不满意'
          };
        }
      }
    }
  };
</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratingselect
    .rating-type
      padding  18px
      border-1px(rgba(7, 17, 27, 0.1))
      font-size 0
      .block
        display inline-block
        border-radius 1px
        padding 8px 12px
        margin-right 8px
        font-size 12px
        line-height 32px
        color rgb(77, 85, 93)
        .count
          font-size 8px
          margin-left 2px
        &.positive
          background rgba(0, 160, 220, 0.2)
          &.active
            background rgb(0, 160, 220)
        &.negative
          background rgba(77, 85, 83, 0.2)
          &.active
            background rgb(77, 85, 83)
    .switch
      padding 12px 18px
      line-height 24px
      border-1px(rgba(7, 17, 27, 0.1))
      color rgb(147, 153, 159)
      font-size 0
      .icon-check_circle
        display inline-block
        vertical-align top
        font-size 24px
      &.on
        .icon-check_circle
          color #00c850
      .text
        display inline-block
        vertical-align top
        font-size 12px
</style>
