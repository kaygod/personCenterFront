<template>
  <div class="login">
    <div class="content">
      <List border size="large">
        <ListItem class="title">
          您总共打卡
          <span class="red">{{ data.total_day }}</span
          >天,连续打卡 <span class="red">{{ data.sequence_day }}</span
          >天
          <div class="clock-btn">
            <Button
              size="large"
              type="warning"
              :disabled="data.can_edit == 0 ? true : false"
              @click="submmit(2)"
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
                    <ListItem>
                      <i-input
                        v-model="task_value"
                        size="large"
                        placeholder="添加任务"
                        @keyup.enter.native="addTask()"
                        :disabled="data.can_edit == 0 ? true : false"
                      />
                    </ListItem>
                  </div>
                </List>
                <List header="正在进行" border>
                  <ListItem v-for="item in doing_task" :key="item.task_id">
                    <div>
                      <Checkbox
                        v-model="item.is_complete"
                        :true-value="1"
                        :false-value="0"
                        :disabled="data.can_edit == 0 ? true : false"
                      ></Checkbox>
                      <Input
                        class="input-text"
                        v-model="item.content"
                        :disabled="data.can_edit == 0 ? true : false"
                      />
                      <Icon
                        type="ios-trash-outline"
                        class="close"
                        @click="delItem(item)"
                      />
                    </div>
                  </ListItem>
                </List>
                <List header="已经完成" border>
                  <ListItem
                    class="task-complete"
                    v-for="item in complete_task"
                    :key="item.task_id"
                  >
                    <div>
                      <Checkbox
                        v-model="item.is_complete"
                        :true-value="1"
                        :false-value="0"
                        :disabled="data.can_edit == 0 ? true : false"
                      ></Checkbox>
                      <Input
                        class="input-text"
                        v-model="item.content"
                        :disabled="data.can_edit == 0 ? true : false"
                      />
                      <Icon
                        type="ios-trash-outline"
                        class="close"
                        @click="delItem(item)"
                      />
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
                  :markDate="data.mark_date"
                  :futureDayHide="futureDayHide"
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
            <a class="submmit-text" @click="submmit(1)">提交</a>
          </p>
          <p>
            <Input
              class="note-daily"
              v-model="data.declaration"
              type="textarea"
              :rows="9"
              :disabled="data.can_edit == 0 ? true : false"
            />
          </p>
        </Card>
      </div>
    </div>
  </div>
</template>
<script>
import Calendar from 'vue-calendar-component';
import _axios from '../util/ajax';
import moment from 'moment';

export default {
  name: 'Displine',
  data() {
    return {
      futureDayHide: moment()
        .valueOf()
        .toString()
        .slice(0, 10),
      task_value: '', //toList中input对应的值
      data: {
        sequence_day: 0,
        total_day: 0,
        tasks: [],
        mark_date: [],
        declaration: '',
        can_edit: 0, //默认不能编辑 1 可以编辑
      },
    };
  },
  computed: {
    userInfo() {
      return this.$store.getters.getUserInfo;
    },
    doing_task() {
      const { tasks } = this.data;
      return tasks.filter((item) => {
        return item.is_complete == 0;
      });
    },
    complete_task() {
      const { tasks } = this.data;
      return tasks.filter((item) => {
        return item.is_complete == 1;
      });
    },
  },
  components: {
    Calendar,
  },
  created() {
    this.init();
  },
  methods: {
    submmit(type = 1) {
      if (this.data.can_edit == 0) {
        return false;
      }

      const { declaration, tasks } = this.data;

      if (tasks.length == 0) {
        this.$Modal.error({
          title: '提示',
          content: '没做任务不允许打卡!',
        });
        return false;
      }

      const flag = tasks.some((v) => {
        return v.is_complete == 0;
      });

      if (flag) {
        this.$Modal.confirm({
          title: '提示',
          content: '<p>你有未完成的任务确定要打卡吗?</p>',
          onOk: () => {
            submmitHandler();
          },
          okText: '确定',
          cancelText: '取消',
        });
      } else {
        submmitHandler();
      }

      function submmitHandler() {
        // 1 提交  2 打卡
        let is_record = 0;
        if (type == 2) {
          is_record = 1;
        }

        const array = tasks.map((item) => {
          return {
            content: item.content,
            is_complete: item.is_complete,
          };
        });
        _axios
          .post('/api/displine/clock', {
            tasks: array,
            declaration,
            is_record,
          })
          .then((response) => {
            location.reload();
          });
      }
    },
    addTask() {
      this.data.tasks.push({
        task_id: new Date().getTime(),
        content: this.task_value,
        is_complete: 0,
      });
      this.task_value = '';
    },
    delItem(item) {
      //删除
      if (this.data.can_edit == 0) {
        return false;
      }
      this.$Modal.confirm({
        title: '提示',
        content: '<p>您确定要删除吗?</p>',
        onOk: () => {
          const index = this.data.tasks.indexOf(item);
          this.data.tasks.splice(index, 1);
        },
        okText: '确定',
        cancelText: '取消',
      });
    },
    clickDay(d) {
      const date = moment(d).format('YYYY-MM-DD');
      this.init(date);
    },
    changeDate(d) {
      const date = moment(d);
      const month = date.month() + 1;
      const year = date.year();
      _axios
        .post('/api/displine/month_records', {
          month,
          year,
        })
        .then((response) => {
          this.data.mark_date = response;
        });
    },
    //初始化
    init(date = null) {
      if (date === null) {
        date = moment().format('YYYY-MM-DD');
      }
      _axios
        .post('/api/displine/get_todo', {
          user_id: this.userInfo.user_id,
          date,
        })
        .then((response) => {
          this.data = { ...this.data, ...response };
        });
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
