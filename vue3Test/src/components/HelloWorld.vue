<template>
  <div v-sloading="download">
    <el-upload
      class="upload-demo"
      action="https://jsonplaceholder.typicode.com/posts/"
      :on-preview="handlePreview"
      :on-remove="handleRemove"
      :before-upload="handleBeforeUpload"
      :before-remove="beforeRemove"
      multiple
      :limit="3"
      :on-exceed="handleExceed"
      :file-list="fileList"
    >
      <el-button type="primary">Click to upload</el-button>
      <template #tip>
        <div class="el-upload__tip">
          jpg/png files with a size less than 500kb
        </div>
      </template>
    </el-upload>
    <button @click="handleDownload">下载</button>
  </div>
</template>
<script lang="ts" setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import type { UploadFile } from 'element-plus/es/components/upload/src/upload.type'

interface RawFile {
  name: string
  url: string
}

const fileList = ref<RawFile[]>([
  {
    name: 'food.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
  {
    name: 'food2.jpeg',
    url: 'https://fuss10.elemecdn.com/3/63/4e7f3a15429bfda99bce42a18cdd1jpeg.jpeg?imageMogr2/thumbnail/360x360/format/webp/quality/100',
  },
])

const handleBeforeUpload = async (file) => {
  const _URL = window.URL || window.webkitURL
  const isSize = new Promise((resolve, reject) => {
    const img = new Image()
    img.onload = () => {
      // console.log('img.width', img.width, img.height)
      // img.width === 1125
      //   ? resolve(true)
      //   : reject()

      /* 有时我们不能完全满足宽高比是相同的，
      等比例缩放后的图片会有细微的比例差距
      这时就要用到等比例缩放的方式来计算判断是否满足上传的要求*/
      // 固定宽与上传图片的宽比
      let widthRito = 1125 / img.width
      // 固定高与上传图片的高比
      let heightRito = 843.75 / img.height
      // 缩放比列的计算，如果宽比小于高比取宽比，否则取高比
      let rito = widthRito < heightRito ? widthRito : heightRito
      // 得到缩放后图片的宽
      let currentWidth = img.width * rito
      // 得到缩放后图片的高
      let currentHeight = img.height * rito
      // 判断缩放后的宽高比是否会和固定的宽高比一样，
      //因为缩放后等到的宽高会有细微小数的差距，
      // 所以用四舍五入可以得到和固定的宽高相同
      let valid =
        Number(Number.parseFloat(currentWidth.toString()).toFixed()) /
          Number(Number.parseFloat(currentHeight.toString()).toFixed()) ==
        1125 / 843.75

      /*or直接根据上传图片宽高比是否满足固定宽高比*/
      // 判断图片比列是否满足1125px*843.75px
      // let valid = img.width / img.height == 1125 / 843.75
      // 满足条件调用promis的resolve，否则reject
      valid ? resolve(true) : reject()
    }
    img.src = _URL.createObjectURL(file)
    _URL.revokeObjectURL(file)
  }).then(
    () => true,
    () => {
      ElMessage.error('图片的大小为 1125px 且图片的比例需为 4:3')
      return false
    }
  )
  console.log('adsad', await isSize)
  return await isSize
  // return isSize

  // console.log('file', file)
  // var myimg = URL.createObjectURL(file)
  // var img = new Image()

  // img.src = myimg

  // img.onload = function () {
  //   console.log('img', img)
  //   if (img.width > 425 || img.height > 295) {
  //     alert('只能上传小于418x282的图片！')
  //   }
  // }
}

const handleRemove = (file: UploadFile, fileList: UploadFile[]) => {
  console.log(file, fileList)
}
const handlePreview = (file: UploadFile) => {
  console.log(file)
}
const handleExceed = (files: FileList, fileList: UploadFile[]) => {
  ElMessage.warning(
    `The limit is 3, you selected ${files.length} files this time, add up to ${
      files.length + fileList.length
    } totally`
  )
}
const beforeRemove = (file: UploadFile, fileList: UploadFile[]) => {
  return ElMessageBox.confirm(`Cancel the transfert of ${file.name} ?`)
}
const download = ref(false)
const handleDownload = () => {
  download.value = true
  setTimeout(() => {
    download.value = false
  }, 2000)
}
</script>
