<template>
  <div class="login">
    <div class="content">
      <List border size="large">
        <ListItem class="title">
          您总共打卡
          <span class="red">50</span>天,连续打卡 <span class="red">100</span>天
          <div class="clock-btn">
            <Button
              size="large"
              type="warning"
              :disabled="type == 2 ? true : false"
              >打卡</Button
            >
          </div>
        </ListItem>
      </List>
      <Row class="second-part">
        <i-col span="12">
          <div class="divide">
            <Card :bordered="false">
              <p slot="title">TodoList</p>
              <p>
                <List border class="box">
                  <p class="lt add-task-left">添加任务:</p>
                  <div class="lt addTask">
                    <ListItem
                      ><i-input
                        v-model="task_value"
                        size="large"
                        placeholder="添加任务"
                      />
                    </ListItem>
                  </div>
                </List>
                <List header="正在进行" border>
                  <ListItem>
                    <div>
                      <Checkbox></Checkbox>
                      <Input class="input-text" />
                      <Icon type="ios-trash-outline" class="close" />
                    </div>
                  </ListItem>
                </List>
                <List header="已经完成" border>
                  <ListItem class="task-complete">
                    <div>
                      <Checkbox></Checkbox>
                      <Input class="input-text" />
                      <Icon type="ios-trash-outline" class="close" />
                    </div>
                  </ListItem>
                </List>
              </p>
            </Card>
          </div>
        </i-col>
        <i-col span="12">
          <div class="divide">
            <Card>
              <p slot="title"><Icon type="ios-film-outline"></Icon>日期</p>
              <a href="#" slot="extra" @click.prevent="changeLimit">
                <Icon type="ios-loop-strong"></Icon>
              </a>
              <div class="sel_date">
                <Calendar
                  v-on:choseDay="clickDay"
                  v-on:changeMonth="changeDate"
                  :markDate="['2020/04/23']"
                ></Calendar>
              </div>
            </Card>
          </div>
        </i-col>
      </Row>
      <div style="background:#eee;padding: 20px;margin-top:20px">
        <Card :bordered="false">
          <p slot="title">
            每日宣言
            <a class="submmit-text">提交</a>
          </p>
          <p>
            <textarea class="note-daily"></textarea>
          </p>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import Calendar from 'vue-calendar-component';
export default {
  name: 'Displine',
  data() {
    return {
      type: 1, //1 可编辑 2 不可编辑
      task_value: '', //toList中input对应的值
    };
  },
  components: {
    Calendar,
  },
  methods: {
    clickDay(e) {
      console.log(e);
    },
    changeDate(d) {
      console.log(d);
    },
  },
};
</script>
<style lang="scss">
.content {
  width: 1200px;
  margin: 0 auto;
  background-color: #fff;
  margin-top: 50px;
  padding-top: 5px;
  padding-bottom: 20px;
  .ivu-list-bordered {
    margin: 10px;
  }
  .title {
    text-align: center;
    font-size: 20px;
    .red {
      color: rgb(227, 29, 26);
    }
  }
  .second-part {
    margin-top: 20px;
    .divide {
      margin: 0 10px;
    }
    .sel_date {
      min-height: 300px;
      text-align: center;
      box-sizing: border-box;
      padding-top: 20px;
    }
    .add-task-left {
      margin-top: 20px;
      margin-left: 18px;
    }
    .addTask {
      width: 80%;
    }
    .close {
      position: absolute;
      right: 5px;
      font-size: 20px;
      cursor: pointer;
    }
    .task-complete {
      opacity: 0.5;
    }
    .input-text {
      width: 400px;
      input {
        border: none;
      }
    }
  }
  .note-daily {
    width: 100%;
    height: 200px;
    outline: none;
    font-size: 30px;
    padding: 5px;
    color: #999;
  }
  .clock-btn {
    position: absolute;
    right: 10px;
  }
  .submmit-text {
    position: absolute;
    right: 20px;
  }
}
</style>
