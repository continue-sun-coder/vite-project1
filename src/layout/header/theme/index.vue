<template>
  <div class="theme_container">
    <el-button size="small" icon="Refresh" circle @click="updateRefsh"></el-button>
    <el-button size="small" icon="FullScreen" circle @click="fullScreen"></el-button>
    <el-popover placement="bottom" title="主题设置" :width="300" trigger="hover">
      <!-- 表单元素 -->
      <el-form>
        <el-form-item label="主题颜色">
          <!-- teleported: 是否将 popover 的下拉列表渲染至 body 下，false的目的是将其渲染只 el-popover 下，防止 el-popover 自动关闭 -->
          <el-color-picker
            v-model="color"
            show-alpha
            :predefine="predefineColors"
            size="small"
            :teleported="false"
            @change="setColor"
          />
        </el-form-item>
        <el-form-item label="暗黑模式">
          <el-switch
            @change="changeDark"
            v-model="dark"
            size="small"
            inline-prompt
            active-icon="MoonNight"
            inactive-icon="Sunny"
          />
        </el-form-item>
      </el-form>
      <template #reference>
        <el-button size="small" icon="Setting" circle></el-button>
      </template>
    </el-popover>
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
import useLayoutSettingStore from '@/store/modules/setting'
import { ref } from 'vue'
let layoutSettingStore = useLayoutSettingStore()
let userStore = useUserStore()
let $router = useRouter()
let $route = useRoute()
// 收集暗黑模式开关的数据
let dark = ref<boolean>(false)

const updateRefsh = () => {
  layoutSettingStore.refresh = !layoutSettingStore.refresh
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

// 暗黑模式开关
const changeDark = () => {
  // 获取html根节点
  const html = document.documentElement
  if (dark.value) {
    html.classList.add('dark')
  } else {
    html.classList.remove('dark')
  }
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
