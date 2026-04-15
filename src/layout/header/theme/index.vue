<template>
  <div class="theme_container">
    <el-button size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
    <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-button size="small" icon="Setting" circle></el-button>
    <img :src="userStore.avatar" alt="" />
    <el-dropdown>
      <span class="el-dropdown-link">
        {{ userStore.username }}
        <el-icon class="el-icon--right">
          <arrow-down />
        </el-icon>
      </span>
      <template #dropdown>
        <el-dropdown-menu>
          <el-dropdown-item @click="logout">退出登录</el-dropdown-item>
        </el-dropdown-menu>
      </template>
    </el-dropdown>
  </div>
</template>

<script setup lang="ts">
defineOptions({
  name: 'Theme',
})
import { useRouter, useRoute } from 'vue-router'
import { useUserStore } from '@/store/modules/user'
import { useLayoutSettingStore } from '@/store/modules/setting'
let layoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()

const updateRefsh = () => {
  layoutSettingStore.refsh = !layoutSettingStore.refsh
}

// 全屏按钮点击
const fullScreen = () => {
  // DOM对象的一个属性：可以用来判断当前是不是全屏模式
  let full = document.fullscreenElement
  if (!full) {
    document.documentElement.requestFullscreen()
  } else {
    // 退出全屏模式
    document.exitFullscreen()
  }
}

const logout = async () => {
  // 1.向服务器发请求：退出登录接口
  // 2.清除本地的token
  // 3.跳转到登录页
  await userStore.userLogout()
  $router.push({ path: '/login', query: { redirect: $route.path } })
}
</script>

<style scoped lang="scss">
.theme_container {
  display: flex;
  align-items: center;
  gap: 10px;
  padding-right: 20px;

  img {
    width: 32px;
    height: 32px;
    border-radius: 50%;
  }

  .el-dropdown-link {
    display: flex;
    align-items: center;
    font-size: 18px;
    cursor: pointer;
  }
}

/* 调整按钮图标大小 */
:deep(.el-button) {
  font-size: 18px;
  border: 1px solid #e0e0e0;
  padding: 15px; /* 增加内边距让按钮更大 */
}
</style>
