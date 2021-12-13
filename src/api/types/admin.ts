// 获取管理员列表入参
export interface IListParams {
    page: number
    limit: number
    name: string
    roles: string
    status: 0 | 1 | ''
}

// 获取管理员列表返参
export interface IListData {
    id: number
    account: string
    head_pic: string
    pwd: number
    real_name: string
    roles:string
    last_ip: string
    last_time: number
    add_time: number
    login_count: number
    level: number
    status: 0 | 1
    is_del: 0 | 1
    _add_time:string
    _last_time: string
    statusLoading?: boolean
}

// 管理员添加
export interface ICreateAdmin {
    account: string
    conf_pwd: string
    pwd: string
    real_name: string
    roles: number[]
    status: 0 | 1
}
