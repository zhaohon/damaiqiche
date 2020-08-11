<template>
  <div class="about">
    <Loading v-if="show"  />
  </div>
</template>

<script>
import Loading from '@/components/Loading.vue'

export default {
  name: "Home",
  components: {
    Loading
  },
  data() {
    return {
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
