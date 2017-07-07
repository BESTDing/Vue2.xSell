<template>
  <div class="ratings" ref="ratings">
    <div class="ratings-content">
      <div class="overview">
        <div class="overview-left">
          <h1 class="score">{{ seller.score }}</h1>
          <div class="title">综合评分</div>
          <div class="rank">高于周边商家{{ seller.rankRate }}</div>
        </div>
        <div class="overview-right">
          <div class="score-wrapper">
            <span class="title">服务态度</span>
            <star class="star" :size="36" :score="seller.serviceScore"></star>
            <span class="score">{{ seller.serviceScore }}</span>
          </div>
          <div class="score-wrapper">
            <span class="title">商品评分</span>
            <star class="star" :size="36" :score="seller.foodScore"></star>
            <span class="score">{{ seller.foodScore }}</span>
          </div>
          <div class="delivery-wrapper">
            <span class="title">送达时间</span>
            <span class="time">{{ seller.deliveryTime }}</span>
          </div>
        </div>
      </div>
      <split></split>
      <ratingselect
        :select-type="selectType"
        :only-content="onlyContent"
        :ratings="ratings"
        v-on:ratingtypeselect="ratingtype_select"
        v-on:contenttoggle="content_toggle"></ratingselect>
      <div class="rating-wrapper">
        <ul>
          <li v-for="rating in ratings" class="rating-item border-1px" v-show="needShow(rating.rateType, rating.text)">
            <div class="avatar">
              <img :src="rating.avatar" width="12" height="12">
            </div>
            <div class="content">
              <h1 class="name">{{ rating.username }}</h1>
              <div class="star-wrapper">
                <star class="star" :size="24" :score="ratings.score"></star>
                <span class="delivery" v-show="rating.deliveryTime">{{ rating.deliveryTime+'分钟' }}</span>
              </div>
              <p class="text">{{ rating.text }}</p>
              <div class="recommend" v-show="rating.recommend.length">
                <span class="icon-thumb_up" v-show="rating.rateType === 0"></span>
                <!--<span class="icon-thumb_down" v-show="rating.rateType === 1"></span>-->
                <span v-for="item in rating.recommend" class="item">{{item }}</span>
              </div>
              <div class="time">{{ rating.rateTime | formateDate }}</div>
            </div>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
  import star from '../start/start.vue';
  import split from '../split/split.vue';
  import ratingselect from '../ratingselect/ratingselect.vue';
  import { formatDate } from '../../common/js/date.js';
  import BScroll from 'better-scroll';

  const POSITIVE = 0;
  const NEGATIVE = 1;
  const ALL = 2;
  const ERR_OK = 0;

  export default {
    data() {
      return {
        ratings: [],
        selectType: ALL,
        onlyContent: true
      };
    },
    created() {
      this.$http.get('/api/ratings')
        .then((response) => {
          if (response.data.errno === ERR_OK) {
            this.ratings = response.data.data;
            this.$nextTick(() => {
              this.scroll = new BScroll(this.$refs.ratings, {
                click: true
              });
            });
          }
        });
    },
    props: {
      seller: {
        type: Object
      }
    },
    methods: {
      ratingtype_select(type) {
        this.selectType = type;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      content_toggle(content) {
        this.onlyContent = content;
        this.$nextTick(() => {
          this.scroll.refresh();
        });
      },
      needShow(type, text) {
        if (this.onlyContent && !text) {
          return false;
        }
        if (this.selectType === ALL) {
          return true;
        } else {
          return type === this.selectType;
        }
      }
    },
    filters: {
      formateDate(time) {
        let date = new Date(time);
        return formatDate(date, 'yyyy-MM-dd hh:mm');
      }
    },
    components: {
      star,
      split,
      ratingselect
    }
  };
</script>
<style lang="stylus" rel="stylesheet/stylus">
  @import "../../common/stylus/mixin.styl"

  .ratings
    position absolute
    top 174px
    bottom 0
    left 0
    width 100%
    overflow hidden
    .overview
      display flex
      padding 18px 0
      .overview-left
        flex 0 0 137px
        padding 6px 0
        width 137px
        border-right 1px solid rgba(7, 17, 27, 0.1)
        text-align center
        @media only Screen and (max-width: 320px)
          flex 0 0 120px
        .score
          margin-bottom 6px
          font-size 24px
          color rgb(255, 153, 0)
          line-height 28px
        .title
          margin-bottom 8px
          line-height 12px
          font-size 12px
          color rgb(7, 17, 27)
        .rank
          line-height 10px
          font-size 10px
          color rgb(147, 153, 159)
      .overview-right
        flex 1
        padding 6px 0 6px 24px
        @media only Screen and (max-width: 320px)
          padding-left 6px
        .score-wrapper
          margin-bottom 8px
          font-size 0
          .title
            font-size 12px
            color rgb(7, 17, 27)
            line-height 18px
          .star
            display inline-block
            margin 0 12px
            vertical-align top
          .score
            font-size 12px
            line-height 18px
            color rgb(255, 153, 0)
        .delivery-wrapper
          font-size 12px
          line-height 18px
          .title
            color rgb(7, 17, 27)
            margin-right 12px
          .time
            color rgb(147, 153, 159)

    .rating-wrapper
      padding 0 18px
      .rating-item
        display flex
        padding 18px 0
        border-1px(rgb(7, 17, 27, 0.1))
        .avatar
          flex 0 0 28px
          margin-right 12px
          img
            border-radius 50%
        .content
          flex 1
          position relative
          .name
            margin-bottom 4px
            font-size 10px
            line-height 12px
            color rgb(7, 17, 27)
          .star-wrapper
            margin-bottom 6px
            font-size 0
            .star
              display inline-block
              margin-right 10px
              vertical-align top
            .delivery
              display inline-block
              font-size 10px
              line-height 12px
              font-weight 200
              color rgb(147, 153, 159)


          .text
            margin-bottom 8px
            font-size  12px
            line-height 18px
            color rgb(7, 17, 27)
          .recommend
            line-height 16px
            font-size 0
            .icon-thumb_up, .item
              display inline-block
              margin 0 8px 4px 0
              font-size 9px
            .icon-thumb_up
              color rgb(0, 160, 220)
            .item
              padding 0 6px
              border 1px solid rgba(7, 17, 27, 0.1)


          .time
            position absolute
            line-height 12px
            font-size 10px
            top 0
            right 18px
            color rgba(7, 17, 27, 0.5)

</style>
