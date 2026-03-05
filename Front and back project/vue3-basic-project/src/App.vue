<script setup>
import Edit from './components/Edit.vue'
import { ref, onMounted } from 'vue';
import axios from 'axios';

// TODO: 列表渲染
// 1. 声明响应式数据
// 2. 调用接口获取数据
// 3. 后端数据赋值给list
// 4. 绑定到table组件
const list = ref([]);
// 包装为异步请求
const getList = async () => {
  // 接口调用
  const response = await axios.get('/list');
  // 交给list
  list.value = response.data;
}

// 方法getList调用在生命周期函数onMounted中
onMounted(() => {
  getList();
})

// TODO: 删除功能
// 1. 点击删除按钮，获取当前行数据的id
// 2. 调用接口删除数据
// 3. 删除成功后，重新调用getList方法获取最新数据
const onDelete = async (id) => {
  // console.log(id);
  await axios.delete(`/del/${id}`);
  await getList();
}

// TODO: 编辑功能
// 1. 打开弹窗，将当前行数据传递给弹窗组件
// 2. 回填数据
// 3. 更新数据

// 1. 打开弹窗（获取子组件实例 调用方法或修改属性）
// 2. 回填数据
const editRef = ref(null);
const onEdit = (row) => {
  editRef.value.openDialog(row);
}


</script>

<template>
  <div class="app">
    <!-- 绑定list数据 -->
    <el-table :data="list">
      <el-table-column label="ID" prop="id"></el-table-column>
      <el-table-column label="姓名" prop="name" width="150"></el-table-column>
      <el-table-column label="籍贯" prop="place"></el-table-column>
      <el-table-column label="操作" width="150">
        <template #default="{row}">
          <el-button type="primary" link @click="onEdit(row)">编辑</el-button>
          <el-button type="danger" link @click="onDelete(row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
  <Edit ref="editRef" @on-update="getList"/>
</template>

<style scoped>
.app {
  width: 980px;
  margin: 100px auto 0;
}
</style>
