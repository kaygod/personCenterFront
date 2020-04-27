<template>
  <div class="login">
    <div class="content cloud-note">
      <List border>
        <ListItem class="title">凯神专用云笔记</ListItem>
      </List>
      <Collapse simple>
        <Panel name="1">
          笔记目录
          <p slot="content">
            <Button type="dashed" class="marginRight">Dashed</Button>
            <Button type="dashed" class="marginRight">Dashed</Button>
            <Button type="dashed" class="marginRight">Dashed</Button>
          </p>
        </Panel>
      </Collapse>
      <List border>
        <ListItem>
          <Input
            placeholder="请填写标题"
            class="content_title"
            v-model="title"
          />
        </ListItem>
      </List>
      <List border>
        <ListItem>
          <div id="editorElem" class="editor"></div>
        </ListItem>
      </List>
    </div>
  </div>
</template>
<script>
import E from 'wangeditor';
export default {
  data: () => {
    return {
      title: '未命名标题',
      editorContent: '',
    };
  },
  mounted() {
    const editor = new E('#editorElem');
    editor.customConfig.onchange = (html) => {
      this.editorContent = html;
    };
    editor.customConfig.menus = [
      'head',
      'bold',
      'fontSize',
      'fontName',
      'italic', // 斜体
      'underline',
      'strikeThrough', // 删除线
      'foreColor', // 文字颜色
      'backColor', // 背景颜色
      'link', // 插入链接
      'justify', // 对齐方式
      'quote', // 引用
      'emoticon', // 表情
      'undo', // 撤销
      'redo', // 重复
    ];
    editor.create();
  },
  methods: {},
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
}
</style>
