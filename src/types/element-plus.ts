import { ElForm, ElDialog, ElTree } from 'element-plus'
import type { FormItemRule } from 'element-plus/es/components/form/src/form.type'

export type IElForm = InstanceType<typeof ElForm>
export type IElDialog = InstanceType<typeof ElDialog>
export type IElTree = InstanceType<typeof ElTree>
export type IFormRule = Record<string, FormItemRule[]>
