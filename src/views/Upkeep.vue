<template>
  <div class="upkeep">
    <div class="byType UnSelect" >
      <div v-for="(item,byindex) in bytitle" :key="byindex">
        <dl class="clearfix ">
          <dt class="byTitle">
            <span>{{item.title}}</span>
          </dt>
          <div v-for="(childrenItem,index) in item.childrenList" :key="index" class="fl dib" @click="listTap({childrenItem,index,byindex})" >
            <dd class="tc mt" :class="childrenItem.checked?'checked':''" :data-id="childrenItem.id">
              <div class="inner">{{childrenItem.name}}</div>
            </dd>
          </div>
        </dl>
      </div>
    </div>
  </div>
</template>
<script>
// @ is an alias to /src

export default {
  name:'Upkeep',
  data() {
    return {
      bytitle:[
        {
          title:'常规保养',
          childrenList:[
            {name:'小保养',id:'1',checked:true},
            {name:'前雨刷',id:'2',checked:false},
            {name:'前雨刷1',id:'3',checked:false},
            {name:'前雨刷2',id:'4',checked:false}
          ]
        },
        {
          title:'深度保养',
          childrenList:[
            {name:'刹车油',id:'5',checked:false},
            {name:'变速箱油',id:'6',checked:false}
          ]
        }
      ]
    };
  },
  watch:{
    bytitle(e){
      console.log(e)
    }
  },
  methods:{
    listTap(obj){
      console.log(obj)
      this.bytitle[obj.byindex].childrenList[obj.index].checked = !this.bytitle[obj.byindex].childrenList[obj.index].checked
      
    }
  },
  mounted(){
    let arr = new Array;
    this.bytitle.forEach(i=>{
      i.childrenList.forEach(k=>{
        console.log(k)
        if(k.checked) arr.push(k.name)
      })
    })
    console.log(arr)
  }
};
</script>
<style scoped>
.byTitle{
 background-color: #F8F8F8; 
 padding: 10px;
 width: 84px;
}
.clearfix dd{
   border:2px solid #999;
   cursor: pointer;
   padding: 10px;
   max-width: 164px;
}
.checked{
  color:#f89776;
  border-color: #f89776 !important;
}
</style>