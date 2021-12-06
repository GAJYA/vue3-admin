// export default () => {
//   return (
//     <div>
//       <h1>foo函数式组件</h1>
//     </div>
//   )
// }

// 想要有内部状态
import { defineComponent, ref } from '@vue/runtime-core'

// 接口解决ts报错提示，无法判断props类型，手动声明一个
interface PropsType {
  msg: String;
}

export default defineComponent({
  props: {
    msg: {
      type: String,
      required: true
    }
  },
  // render () {
  //     return (
  //         <div>{this.msg}</div>
  //     )
  // },
  setup () {
    const count = ref(0)
    return (props: PropsType) => (
      <div>
        <p>{props.msg}</p>
        <p>{count.value}</p>
      </div>
    )
  }
})
