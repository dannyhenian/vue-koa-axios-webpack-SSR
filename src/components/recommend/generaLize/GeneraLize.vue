<template>
    <div class="generalize">
      <div class="generalize1" v-if="AdPositionId1.length!=0">
        <div v-if="AdPositionId1.length>1" class="lunbo">
          <Carousel autoplay v-model="value2" loop :radius-dot='isYuan' :autoplay-speed='speed' arrow='never'
          trigger='hover'>
              <CarouselItem v-for="(item,index) in AdPositionId1" :key="index">
                  <router-link class="demo-carousel" tag="div"
                  :to="'/detailsInfo/'+item.novelId" style="cursor: pointer;">
                    <img :src="item.path" alt="">
                  </router-link>
              </CarouselItem>
          </Carousel>
        </div>
        <div v-if="AdPositionId1.length==1" class="dange">
          <!-- <img :src="AdPositionId1[0].path" alt=""> -->
          <router-link
          :to="'/detailsInfo/'+AdPositionId1[0].novelId" style="cursor: pointer;">
            <img :src="AdPositionId1[0].path" alt="">
          </router-link>
        </div>
      </div>

    </div>
</template>

<script>
export default {
  name: 'generalize',
  props: {
    AdPositionId1: [Array, Object]
  },
  data () {
    return {
      /* eslint-disable global-require */
      pic1Src: require('../../../assets/images/banner.jpg'),
      /* eslint-disable global-require */
      value2: 0,
      speed: 5000,
      isYuan: true
    };
  },

  methods: {

  },
  components: {
  }
};
</script>

<style type="text/scss" lang="scss" scoped>
.generalize{
  width: 884px;
  .generalize1{
    width: 100%;
    height: 106px;
    margin-bottom: 25px;
    .lunbo{
      width: 100%;
      height: 100%;
      img{
        width: 884px;
        height: 106px;
        vertical-align: top;
      }
    }
    .dange{
      width: 100%;
      height: 100%;
      img{
        width: 100%;
        height: 100%;
        vertical-align: top;
      }
    }
  }
}


</style>
