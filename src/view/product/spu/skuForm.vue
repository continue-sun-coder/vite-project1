<template>
  <el-form label-width="auto"> 
      <el-form-item label="sku名称" prop="name">
        <el-input placeholder="请输入名称" />
      </el-form-item>
      <el-form-item label="价格(元)" prop="zone">
        <el-input placeholder="请输入价格" type="number" />
      </el-form-item>
      <el-form-item label="重量(克)" prop="time">
        <el-input placeholder="请输入重量" type="number"/>
      </el-form-item>
      <el-form-item label="sku描述" prop="time">
        <el-input type="textarea" placeholder="请输入描述" />
      </el-form-item>
      <el-form-item label="平台属性" prop="name">
        <el-form label-width="auto" :inline="true"> 
            <el-form-item label="手机一级" prop="name">
              <el-select style="width: 180px;">
                <el-option>1</el-option>
                <el-option>1</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="电脑容量" prop="name">
              <el-select style="width: 180px;">
                <el-option>1</el-option>
                <el-option>1</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="运行内存" prop="name">
              <el-select style="width: 180px;">
                <el-option>1</el-option>
                <el-option>1</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="机身内存" prop="name">
              <el-select style="width: 180px;">
                <el-option>1</el-option>
                <el-option>1</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="CPU型号" prop="name">
              <el-select style="width: 180px;">
                <el-option>1</el-option>
                <el-option>1</el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="屏幕尺寸" prop="name">
              <el-select style="width: 180px;">
                <el-option>1</el-option>
                <el-option>1</el-option>
              </el-select>
            </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="销售属性" prop="name">
        <el-form>
          <el-form-item label="颜色" prop="name">
              <el-select style="width: 210px;">
                <el-option>1</el-option>
                <el-option>1</el-option>
              </el-select>
            </el-form-item>
        </el-form>
      </el-form-item>
      <el-form-item label="图片名称" prop="name">
        <el-table style="width: 100%" border>
            <el-table-column prop="date" type="selection" width="80px" align="center"></el-table-column>
            <el-table-column prop="name" label="图片" align="center"></el-table-column>
            <el-table-column prop="address" label="名称" align="center"></el-table-column>
            <el-table-column prop="address" label="操作" align="center" >
            </el-table-column>
        </el-table>
      </el-form-item>
      <el-form-item>
        <el-button type="primary">保存</el-button>
        <el-button @click="cancel">取消</el-button>
      </el-form-item>
  </el-form>

</template>

<script setup lang="ts">
let $emit = defineEmits(['changeScene'])
// 取消按钮的回调
const cancel = () => {
  $emit('changeScene', {flag:0, params:''})
}
</script>

<style scoped lang="scss"></style>
