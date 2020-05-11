<template>
  <div class="login">
    <div class="content cloud-note">
      <List border>
        <ListItem class="title">{{nick}}专用云笔记</ListItem>
      </List>
      <Collapse simple>
        <Panel name="1">
          笔记目录
          <a class="gt submmit-btn" @click.stop="submmit()">提交</a>
          <p slot="content" @contextmenu.prevent="delItem" ref="container">
            <Button
              v-for="item in note_list"
              :key="item.note_id"
              type="dashed"
              class="marginRight"
              @click="editNote(item)"
            >{{item.title}}</Button>
          </p>
        </Panel>
      </Collapse>
      <List border>
        <ListItem>
          <Input
            :disabled="edit_id === null?false:true"
            placeholder="请填写标题"
            @keydown.s.native="save($event)"
            class="content_title"
            v-model="title"
          />
        </ListItem>
      </List>
      <List border>
        <ListItem>
          <div id="editorElem" class="editor" @keydown.s="save($event)"></div>
        </ListItem>
      </List>
    </div>
  </div>
</template>
<script>
import E from "wangeditor";
import _axios from "../util/ajax";

export default {
  data: () => {
    return {
      title: "未命名标题",
      editorContent: "",
      editor: null,
      note_list: [],
      edit_id: null,
      nick: ""
    };
  },
  mounted() {
    const editor = new E("#editorElem");
    editor.customConfig.onchange = html => {
      this.editorContent = html;
    };
    editor.customConfig.menus = [
      "head",
      "bold",
      "fontSize",
      "fontName",
      "italic", // 斜体
      "underline",
      "strikeThrough", // 删除线
      "foreColor", // 文字颜色
      "backColor", // 背景颜色
      "link", // 插入链接
      "justify", // 对齐方式
      "quote", // 引用
      "emoticon", // 表情
      "undo", // 撤销
      "redo" // 重复
    ];
    editor.create();
    this.editor = editor;
    this.init();
  },
  methods: {
    delItem(e) {
      let node_name = e.target.nodeName;
      let target = e.target;
      if (node_name !== "BUTTON" && node_name !== "SPAN") {
        return false;
      }
      const _this = this;
      this.$Modal.confirm({
        title: "提示",
        content: "<p>您确定要删除吗?</p>",
        onOk: () => {
          if (node_name === "SPAN") {
            target = target.parentElement;
          }
          const index = [].indexOf.call(_this.$refs.container.children, target);
          const { note_id } = _this.note_list[index];
          _axios.post("/api/cloud_note/del_note", { note_id });
          _this.note_list.splice(index, 1);
        },
        okText: "确定",
        cancelText: "取消"
      });
    },
    init() {
      //请求笔记数据
      _axios.post("/api/cloud_note/get_nodes", {}).then(response => {
        const { nick, msg_list } = response;
        this.note_list = msg_list;
        this.nick = nick;
      });
    },
    submmit(flag = false) {
      //flag为true时它是按键盘提交的,flag为false时它是点击按钮提交
      if (this.title.trim() === "") {
        this.$Modal.error({
          title: "提示",
          content: "题目不能为空!"
        });
        return false;
      }
      let params = {
        content: this.editorContent
      };
      let url = "/api/cloud_note/submmit_note";
      let content = "创建成功!";
      if (this.edit_id == null) {
        //提交操作
        params.title = this.title;
      } else {
        params.note_id = this.edit_id;
        url = "/api/cloud_note/update_note";
        content = "更新成功!";
      }
      _axios.post(url, params).then(response => {
        if (flag === false) {
          //按按钮提交的
          this.title = "";
          this.editorContent = "";
          this.editor.txt.clear();
          this.edit_id = null;
        } else {
          //按ctrl+s保存的就要把id赋值一下
          if (response && response.note_id !== undefined) {
            this.edit_id = response.note_id;
          }
        }
        this.$Message.info(content);
        this.init();
      });
    },
    editNote(item) {
      const { note_id } = item;
      _axios
        .post("/api/cloud_note/note_detail", {
          note_id
        })
        .then(response => {
          const { content, title, note_id, update_date, nick } = response;
          this.title = title;
          this.editor.txt.html(content);
          this.editorContent = content;
          this.edit_id = note_id;
        });
    },
    save(e) {
      if (e.ctrlKey == true) {
        e.preventDefault();
        this.submmit(true);
      }
    }
  }
};
</script>
<style lang="scss">
.cloud-note {
  margin-top: 20px;
  .title {
    display: flex;
    justify-content: center;
    font-size: 40px;
    color: #999;
  }
  .marginRight {
    margin-right: 10px;
  }
  .content_title {
    border: none;
    input {
      color: #016e11;
      width: 100%;
      height: 45px;
      text-align: center;
      font-size: 30px;
      border: none;
    }
  }
  .editor {
    width: 100%;
    .w-e-text-container {
      min-height: 620px;
      color: rgb(81, 90, 110);
      font-size: 36px;
    }
  }
  .submmit-btn {
    margin-right: 20px;
  }
}
</style>
