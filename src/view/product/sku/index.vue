<template>
  <el-card>
    <el-table style="margin: 10px 0" :data="skuArr">
      <el-table-column label="序号" type="index" align="center" width="80px"></el-table-column>
      <el-table-column
        label="名称"
        show-overflow-tooltip
        width="150px"
        prop="skuName"
      ></el-table-column>
      <el-table-column label="描述" show-overflow-tooltip prop="skuDesc"></el-table-column>
      <el-table-column label="默认图片" width="150px">
        <template v-slot="{ row }">
          <img :src="row.skuDefaultImg" alt="" style="height: 100px; width: 100px" />
        </template>
      </el-table-column>
      <el-table-column label="重量" width="150px" prop="weight"></el-table-column>
      <el-table-column label="价格" width="150px" prop="price"></el-table-column>
      <el-table-column label="操作" width="250px" fixed="right">
        <template v-slot="{ row }">
          <el-button
            :type="row.isSale ? 'warning' : 'success'"
            size="small"
            :icon="row.isSale == 1 ? 'Bottom' : 'Top'"
            @click="updateSale(row)"
          ></el-button>
          <el-button type="primary" size="small" icon="Edit" @click="updateSku"></el-button>
          <el-button type="info" size="small" icon="InfoFilled" @click="findSku(row)"></el-button>
          <el-popconfirm
            :title="`确定删除 ${row.skuName} ?`"
            width="200px"
            @confirm="deleteSku(row)"
          >
            <template #reference>
              <el-button type="danger" size="small" icon="Delete"></el-button>
            </template>
          </el-popconfirm>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      v-model:current-page="pageNo"
      v-model:page-size="pageSize"
      :page-sizes="[10, 20, 30, 40]"
      :background="true"
      layout="prev, pager, next, jumper, ->, sizes, total "
      :total="total"
      @size-change="handleSizeChange"
      @current-change="getHasSku"
    />
    <!-- 抽屉组件 -->
    <el-drawer 
      v-model="drawer" 
      title="I am the title" 
      direction="rtl" 
      :before-close="handleClose">
      <template #header>
        <h4>商品详情</h4>
      </template>
      <template #default>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">名称</el-col>
          <el-col :span="18">{{ skuInfo?.skuName }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">描述</el-col>
          <el-col :span="18">{{ skuInfo?.skuDesc }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">价格</el-col>
          <el-col :span="18">{{ skuInfo?.price }}</el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">平台属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo?.skuAttrValueList"
              :key="item.id"
              style="margin: 5px 5px"
            >
              {{ item.valueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">销售属性</el-col>
          <el-col :span="18">
            <el-tag
              v-for="item in skuInfo?.skuSaleAttrValueList"
              :key="item.id"
              style="margin: 5px 5px"
            >
              {{ item.saleAttrValueName }}
            </el-tag>
          </el-col>
        </el-row>
        <el-row style="margin: 10px 0px">
          <el-col :span="6">商品图片</el-col>
          <el-col :span="18">
            <el-carousel :interval="4000" type="card" height="200px">
              <el-carousel-item v-for="item in skuInfo?.skuImageList" :key="item">
                <img :src="item.imgUrl" alt="" style="width: 100%; height: 100%" />
              </el-carousel-item>
            </el-carousel>
          </el-col>
        </el-row>
      </template>
    </el-drawer>
  </el-card>
</template>

<script setup lang="ts">
import { reqCancelSale, reqSkuInfo, reqSkuList } from '@/api/product/sku'
import type { SkuResponseData, SkuData, SkuInfoData } from '@/api/product/sku/type'
import { ElMessage } from 'element-plus'
import { ref, onMounted } from 'vue'
// 当前页码
let pageNo = ref<number>(1)
// 每页展示几条数据
let pageSize = ref<number>(10)
// 数据总条数
let total = ref<number>(0)
// 需展示的已有sku数据
let skuArr = ref<SkuData[]>()
// 控制抽屉组件的显示与隐藏
let drawer = ref<boolean>(false)
let skuInfo = ref<SkuData>()
onMounted(() => {
  getHasSku()
})
// 获取已有的sku数据
const getHasSku = async (pager = 1) => {
  pageNo.value = pager
  const result: SkuResponseData = await reqSkuList(pageNo.value, pageSize.value)
  if (result.code == 200) {
    total.value = result.data.total
    skuArr.value = result.data.records
  }
}
// 分页器下拉菜单（选择展示条数）的回调函数
const handleSizeChange = (pageSize: number) => {
  getHasSku()
}

// 商品上下架
const updateSale = async (row: SkuData) => {
  // 如果商品的isSale=1,说明商品上架状态
  if (row.isSale == 1) {
    await reqCancelSale(row.id)
    ElMessage({
      type: 'success',
      message: '下架成功',
    })
    // 发请求获取更新后的列表
    getHasSku(pageNo.value)
  } else {
    await reqCancelSale(row.id)
    ElMessage({
      type: 'success',
      message: '上架成功',
    })
    // 发请求获取更新后的列表
    getHasSku(pageNo.value)
  }
}
const updateSku = () => {
  ElMessage({
    type: 'success',
    message: '正在开发中...',
  })
}
// 抽屉显示数据
const findSku = async (row: SkuData) => {
  // 展示抽屉
  drawer.value = true
  // 获取数据
  let result: SkuInfoData = await reqSkuInfo(row.id)
  if(result.code == 200){
    skuInfo.value = result.data
  }
}
const deleteSku = (row: any) => {}
</script>

<style scoped>
.el-carousel__item h3 {
  color: #475669;
  opacity: 0.75;
  line-height: 200px;
  margin: 0;
  text-align: center;
}

.el-carousel__item:nth-child(2n) {
  background-color: #99a9bf;
}

.el-carousel__item:nth-child(2n + 1) {
  background-color: #d3dce6;
}

/* 调整指示条位置到图片底部外面 */
:deep(.el-carousel__indicators) {
  bottom: -50px;
  top: auto !important;
}

/* 调整指示条颜色 - 使用更深的背景色 */
:deep(.el-carousel__indicator.is-active button) {
  background-color: #333333 !important;
  opacity: 1;
}

:deep(.el-carousel__indicator button) {
  background-color: #999999 !important;
  opacity: 0.7;
}

/* 移除carousel-item的默认背景，让图片正常显示 */
:deep(.el-carousel__item) {
  background-color: transparent !important;
}
</style>
