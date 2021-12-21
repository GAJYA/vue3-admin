<!-- vue3 wangEditor官方案例 -->
<template>
  <div ref="editor" />
  <button @click="syncHTML">
    同步内容
  </button>
  <div :innerHTML="content.html" />
</template>

<script lang="ts">
import { onMounted, onBeforeUnmount, ref, reactive } from 'vue'
import WangEditor from 'wangeditor'

export default {
  name: 'App',
  setup () {
    const editor = ref()
    const content = reactive({
      html: '',
      text: ''
    })

    const instance = ref<InstanceType<typeof WangEditor>| null>(null)
    onMounted(() => {
      instance.value = new WangEditor(editor.value)
      Object.assign(instance.value.config, {
        onchange () {
          console.log('change')
        }
      })
      instance.value.create()
    })

    onBeforeUnmount(() => {
      instance.value?.destroy()
      instance.value = null
    })

    const syncHTML = () => {
      content.html = instance.value?.txt.html() || ''
    }

    return {
      syncHTML,
      editor,
      content
    }
  }
}
</script>
