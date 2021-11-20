<template>
  <div id="app">
    <div class="main">
      <h1>窗口跟随演示</h1>
      <p>请先打开PC微信登陆窗口</p>
    </div>
  </div>
</template>
<script lang='ts'>
const { ipcRenderer } = require("electron");
import { ElMessage } from "element-plus";
import { onMounted } from "vue";
export default {
  name: "app",
  setup() {
    const loaded = () => {
      const appLoading = document.getElementById("appLoading");
      if (appLoading) appLoading.style.display = "none";
    };
    onMounted(() => {
      ipcRenderer.on("PUBLIC", (e: any, { event, data }) => {
        if (event === "success-message") {
          ElMessage.success(data);
        }
      });
      loaded();
    });
  },
};
</script>

<style lang="scss">
.main {
  width: 90vw;
  margin: 5vh auto;
}
</style>