export interface IRoleParams {
  page: number
  limit: number
  status: 0 | 1 | ''
  role_name: string
}

export interface IRoleData {
  id: number
  role_name: string
  rules: string
  level: number
  status: 1 | 0
  statusLoading?: boolean
}

export interface IRoleMenu {
  pid: number
  id: number
  title: string
  children: IRoleMenu[]
  expand: boolean
}
