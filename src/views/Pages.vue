<template>
  <div class="about">
    <Loading v-if="show"  />
    <!-- 下拉框 -->
     <Select v-model="model1" style="width:200px">
        <Option v-for="item in cityList" :value="item.value" :key="item.value">{{ item.label }}</Option>
    </Select>
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'

export default {
  name: "Pages",
  components: {
    Loading
  },
  data() {
    return {
      cityList: [
                    {
                        value: 'New York',
                        label: 'New York'
                    },
                    {
                        value: 'London',
                        label: 'London'
                    },
                    {
                        value: 'Sydney',
                        label: 'Sydney'
                    },
                    {
                        value: 'Ottawa',
                        label: 'Ottawa'
                    },
                    {
                        value: 'Paris',
                        label: 'Paris'
                    },
                    {
                        value: 'Canberra',
                        label: 'Canberra'
                    }
                ],
                model1: '',
      show:true
      
    };
  },
  methods: {},
  mounted() {
    console.log("ok")

    console.log(this.$route.query);
    setTimeout(()=>{
    this.show = false

    },2000)

  },
  created(){
  }
};
</script>
<style scoped>

</style>
