<template>
  <div class="main">
    <input placeholder="请输入计划事项......" :value="newTask" ref="todo"> 
    <p><a class="add" v-on:click="add">添加</a></p>
    <fieldset>
      <legend>计划进行的事项</legend>
    </fieldset>
    <h2 class="empty" v-if="plan">当前计划为空输入事项后点击添加按钮加入事项</h2>
    <ul>
      <li v-for="(task,index) in tasks"  v-if="task.statu==false">
        <h3 class="date" v-if="check(task.date,false)">{{task.date}}</h3>
        <div class="box">
          <a class="state box ing" v-on:click="statu(task)"></a>
          <p>{{task.content}}</p>
          <a class="del box" v-on:click="del(index)">×</a>
        </div>
      </li>
    </ul>
    <fieldset>
      <legend>已经完成的事项</legend>
    </fieldset>
    <h2 class="empty" v-if="finished">点击计划事项左边的状态区来标记为完成的事项</h2>
    <ul>
      <li v-for="(task,index) in tasks"  v-if="task.statu==true">
        <h3 class="date" v-if="check(task.date,true)">{{task.date}}</h3>
        <div class="box">
          <a class="state box done" v-on:click="statu(task)"></a>
          <p>{{task.content}}</p>
          <a class="del box" v-on:click="del(index)">×</a>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
import Store from '../store'
export default {
  name: 'Main',
  data () {
    return {
      tasks:Store.fetch(),
      newTask:"",
      plan:"",
      finished:""
    }
  },
  methods:{
    add:function(){
      let d = new Date();
      let year = d.getFullYear();
      let month = d.getMonth()+1;
      if(month<10){month='0'+month}
      let now = d.getDate();
      if(now<10){now='0'+now}
      let today = year + "-" + month + "-" + now;
      this.tasks.unshift({
        date:today,
        content:this.$refs.todo.value,
        statu: false
      })
      this.newTask="";
      localStorage.setItem('todolist_wrap','');
      localStorage.setItem('todolist_inner','');
    },
    del:function(index){
      this.tasks.splice(index,1);
      localStorage.setItem('todolist_wrap','');
      localStorage.setItem('todolist_inner','');
    },
    statu:function(task){
      task.statu=!task.statu;
      localStorage.setItem('todolist_wrap','');
      localStorage.setItem('todolist_inner','');
    },
    check:function(strA,strB){
      var stemp=false;
      if(strB){
        if(localStorage.getItem('todolist_wrap')!=strA){
          localStorage.setItem('todolist_wrap',strA);
          stemp=true;
        }else{
          stemp=false;
        }
      }else{
        if(localStorage.getItem('todolist_inner')!=strA){
          localStorage.setItem('todolist_inner',strA);
          stemp=true;
        }else{
          stemp=false;
        }
      }
      return stemp;      
    },
    doing:function(){
      var flag=true;
      this.tasks.forEach((e)=> {
        if(e.statu==false){
          flag=false
        }
      });
      this.plan=flag;
    },
    done:function(){
      var flag=true;
      this.tasks.forEach((e)=> {
        if(e.statu==true){
          flag=false
        }
      });
      this.finished=flag;
    }
  },
  watch:{
    tasks:{
      handler:function(tasks){
        Store.save(tasks);
        this.doing();
        this.done();
      },
      deep:true
    }
  },
  mounted:function(){
    this.doing();
    this.done();
    localStorage.setItem('todolist_wrap','');
    localStorage.setItem('todolist_inner','');
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
.box{box-sizing: border-box !important;}
input::input-placeholder {color: #999;font-size:14px; }
fieldset{width:60%;border: none; border-top: 1px solid #3784cb;padding:0;margin:8px auto;}
legend{padding:0 4px;text-align:center;}
p{margin:0;}
input{border:1px solid #ddd;padding:8px 2%;display:block;margin:0 auto;height:22px;width:86%;line-height: 22px;border-radius: 4px;outline:none;font-size:16px;color:#333;appearance: none;box-sizing: content-box;}
.add{display:block;width:60px;height:60px;line-height:60px;border: 3px solid #fff;text-align:center;color:#fff;border-radius:50%;background-color:#3784cb;font-size:16px;letter-spacing:2px;margin:15px auto;cursor: pointer;}
ul{margin:0;padding:10px 0 10px;}
li{font-size:0;width:90%;margin:0 auto;}
li div{margin:10px auto;list-style: none;background-color:#fff;border:1px solid #ddd;position: relative;}
li p{width:80%;line-height:38px;font-size:14px;text-align:left;display:inline-block;vertical-align:top;text-overflow: ellipsis;white-space:nowrap;overflow:hidden;text-indent:2px;}
.date{line-height:18px;font-size:12px;color:#000;margin:0 auto;font-weight: normal;}
.del{float:right;width:10%;line-height: 38px;text-align: center;color:red;font-size:22px;right:0;border-left: 1px solid #ddd;cursor: pointer;}
.done:after,.ing:after{position:absolute;top:50%;left:50%;;margin:-5px 0 0 -5px;content:'';width:10px;height:10px;border-radius: 50%;}
.state{position:relative;display:inline-block;width:10%;height:38px;border-right:1px solid #ddd;cursor: pointer;}
.done:after{background-color:#FF7F50;}
.ing:after{background-color:#21a557;}
.empty{width:90%;height:130px;line-height:130px;text-align:center;font-size:12px;background-color:#fff;color:#999;margin:20px auto;font-weight: normal;}
</style>
