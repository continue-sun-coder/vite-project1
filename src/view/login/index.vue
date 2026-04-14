<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm" :rules="rules" ref="loginForms">
          <h1>Hello</h1>
          <h2>欢迎来到后台管理系统</h2>
          <el-form-item prop="username">
            <el-input :prefix-icon="User" v-model="loginForm.username"></el-input>
          </el-form-item>
          <el-form-item prop="password">
            <el-input :prefix-icon="Lock" v-model="loginForm.password" show-password></el-input>
          </el-form-item>
          <el-form-item>
            <el-button
              :loading="loading"
              class="login_btn"
              type="primary"
              size="default"
              @click="login"
            >
              登录
            </el-button>
          </el-form-item>
        </el-form>
      </el-col>
    </el-row>
  </div>
</template>

<script setup lang="ts">
import { useUserStore } from '@/store/modules/user'
import { User, Lock } from '@element-plus/icons-vue'
import { reactive, ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getGreeting } from '@/utils/time'

let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
let loading = ref(false)
let loginForms = ref()

let loginForm = reactive({
  username: 'admin',
  password: '1234567u8ii9o',
})

const login = async () => {
  // 表单验证：保证全部表单项都合法才能发登录请求
  await loginForms.value.validate()
  // 登录加载效果
  loading.value = true
  // 通知仓库发登录请求
  // 请求成功，跳转到首页，并提示登录成功
  // 请求失败，提示登录失败
  try {
    await userStore.userLogin(loginForm)
    // 如果登录的时候，路由路径当中有query参数 redirect，说明用户是从某个需要登录的页面跳转过来的，登录成功后应该编程式导航回那个页面；如果没有，就导航到首页
    let redirect = $route.query.redirect
    //  编程式导航到首页
    $router.push({path: (redirect as string) || '/'})
    ElNotification({
      title: `Hi, ${getGreeting()}`,
      message: `${loginForm.username}，欢迎回来！`,
      type: 'success',
    })
    loading.value = false
  } catch (error) {
    loading.value = false
    ElNotification({
      title: '登录失败',
      message: (error as Error).message,
      type: 'error',
    })
  }
}

// 自定义校验规则：用户名必须以字母开头，长度在 3 - 20 之间
const validatorUserName = (rule: any, value: any, callback: any) => {
  // rule: 校验规则对象
  // value: 当前校验的表单项的值
  // callback: 校验完成后的回调函数，传入一个 Error 对象表示校验失败，传入 nothing 或 undefined 表示校验成功
  if (!value) {
    callback(new Error('请输入用户名'))
  } else if (!/^[a-zA-Z]/.test(value)) {
    callback(new Error('用户名必须以字母开头'))
  } else if (value.length < 3 || value.length > 20) {
    callback(new Error('用户名长度在 3 - 20 之间'))
  } else {
    callback()
  }
}

const validatorPassword = (rule: any, value: any, callback: any) => {
  if (!value) {
    callback(new Error('请输入密码'))
  } else if (value.length < 6 || value.length > 20) {
    callback(new Error('密码长度在 6 - 20 之间'))
  } else {
    callback()
  }
}

const rules = {
  username: [
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { trigger: 'change', validator: validatorUserName },
  ],
  password: [
    { required: true, message: '请输入密码', trigger: 'blur' },
    { trigger: 'change', validator: validatorPassword },
  ],
}
</script>

<style scoped lang="scss">
.login_container {
  width: 100%;
  height: 100vh;
  background: url('@/assets/images/background.jpg') no-repeat;
  background-size: cover;

  .login_form {
    position: relative;
    width: 80%;
    top: 30vh;
    background: url('@/assets/images/login_form.png') no-repeat;
    background-size: cover;
    padding: 40px;

    h1 {
      color: white;
      font-size: 40px;
    }

    h2 {
      font-size: 20px;
      color: white;
      margin: 20px 0px;
    }

    .login_btn {
      width: 100%;
      background-color: #409eff;
      font-size: 16px;
    }
  }
}
</style>
