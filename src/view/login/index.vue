<template>
  <div class="login_container">
    <el-row>
      <el-col :span="12" :xs="0"></el-col>
      <el-col :span="12" :xs="24">
        <el-form class="login_form" :model="loginForm">
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
import { useRouter } from 'vue-router'
import { ElNotification } from 'element-plus'
import { getGreeting } from '@/utils/time'

let userStore = useUserStore()
let $router = useRouter()
let loading = ref(false)

let loginForm = reactive({
  username: 'admin',
  password: '1234567u8ii9o',
})

const login = async () => {
  // 登录加载效果
  loading.value = true
  // 通知仓库发登录请求
  // 请求成功，跳转到首页，并提示登录成功
  // 请求失败，提示登录失败
  let result = userStore.userLogin(loginForm)
  console.log(result)
  try {
    await userStore.userLogin(loginForm)
    //  编程式导航到首页
    $router.push('/')
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
