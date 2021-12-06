<!-- 组合式API语法糖： script setup -->

<script setup lang="ts">
import { ref, defineProps } from 'vue'
const props = defineProps({
  msg: {
    type: String,
    default: ''
  }
})

const count = ref(100)

const increment = () => {
  count.value++
}

</script>

<!-- <script lang="ts">
import { ref, defineComponent, PropType, onMounted } from 'vue'

interface User {
  name: string,
  age: number
}

export default defineComponent({
  // type inference enabled
  props: {
    msg: {
      type: String,
      required: true
    },
    sum: {
      type: Number,
      required: true
    },
    obj: {
      type: Object as PropType<User>,
      default: () => {}
    }
  },
  setup (props) {
    // props.obj.name
    // props.message
    const count = ref(0)
    // const foo = ref(null)
    // foo.value = {
    //   a: 1
    // }
    // 通过泛型+联合类型做类型推断
    const foo = ref<{
      a: number,
      b: string
    } | null>(null)
    foo.value = {
      a: 1,
      b: '1'
    }
    const result = props.msg.split('') // correct, 'message' is typed as a string
    // const filtered = props.msg.filter(p => p.value) // an error will be thrown: Property 'filter' does not exist on type 'string'
    const title = ref<HTMLHeadElement | null>(null) // 告诉ts将来可能是什么类型
    onMounted(() => {
      console.log(title.value)
    })
    return {
      count,
      result,
      // filtered,
      title
    }
  }
})
</script> -->

<template>
  <h1 ref="title">
    {{ props.msg }}
  </h1>

  <p>
    Recommended IDE setup:
    <a
      href="https://code.visualstudio.com/"
      target="_blank"
    >VSCode</a>
    +
    <a
      href="https://github.com/johnsoncodehk/volar"
      target="_blank"
    >Volar</a>
  </p>

  <p>See <code>README.md</code> for more information.</p>

  <p>
    <a
      href="https://vitejs.dev/guide/features.html"
      target="_blank"
    >
      Vite Docs
    </a>
    |
    <a
      href="https://v3.vuejs.org/"
      target="_blank"
    >Vue 3 Docs</a>
  </p>

  <button
    type="button"
    @click="increment"
  >
    count is: {{ count }}
  </button>
  <p>
    Edit
    <code>components/HelloWorld.vue</code> to test hot module replacement.
  </p>
</template>

<style scoped>
a {
  color: #42b983;
}

label {
  margin: 0 0.5em;
  font-weight: bold;
}

code {
  background-color: #eee;
  padding: 2px 4px;
  border-radius: 4px;
  color: #304455;
}
</style>
