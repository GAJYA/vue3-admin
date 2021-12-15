export interface IProductParams {
    cate_id: number
    store_name: string
    store_info: string
    keyword: string
    unit_name: string
    bar_code: number
    image: string
    slider_image: string
    postage: number
    ot_price: number
    price: number
    sort: number
    stock: number
    sales: number
    ficti: number
    give_integral: number
    is_show: boolean
    cost: number
    is_hot: boolean
    is_benefit: boolean
    is_best: boolean
    is_new: boolean
    mer_use: boolean
    is_postage: boolean
    is_good: boolean
    spec_type: string
    items: string
    attrs: string
    coupon_ids: string
    label_id: string
    command_word: string
    recommend_image: string
    video_link: string
    temp_id: number
    activity: string
    description: string
}

export interface IProductQuery {
    page: number
    limit: number
    cate_id: string
    type: number
    store_name: string
    sales: number
}

export interface IProductData {
    activity: string
    add_time: number
    bar_code: string
    browse: number
    cate_id: string
    cate_name: string
    code_path: string
    collect: number
    command_word: string
    cost: string
    ficti: number
    give_integral: string
    id: number
    image: string
    is_bargain: number | null
    is_benefit: 0 | 1
    is_best: 0 | 1
    is_del: 0 | 1
    is_good: 0 | 1
    is_hot: 0 | 1
    is_new: 0 | 1
    is_postage: 0 | 1
    is_seckill: 0 | 1
    is_show: 0 | 1
    is_sub: 0 | 1
    is_vip: 0 | 1
    keyword: string
    label_id: string
    likes: number
    mer_id: number
    mer_use: number
    ot_price: string
    postage: string
    price: string
    recommend_image: string
    sales: number
    slider_image: string[]
    sort: number
    soure_link: string
    spec_type: number
    spu: string
    stock: string
    stock_attr: boolean
    store_info: string
    store_name: string
    temp_id: number
    unit_name: string
    video_link: string
    vip_price: string
    visitor: number
    statusLoading: boolean
}

export interface IProductClassify {
    value: number
    label: string
    pid: number
    children: IProductClassify[]
}

export interface IAttrClass {
    value: string
    detail: string[]
}

export interface IGenerateAttr {
    info: {
        attr: IAttrClass
        value: {
            bar_code: string
            brokerage: number
            brokerage_two: number
            cost: number
        }
        detail:{
            ot_price: number
            pic: string
            price: number
            stock: number
            vip_price: number
            volume: number
            weight: number
        }[]
        header: {
            title: string
            align: string
            key: string
            minWidth: number
        }[]
    }

}

export interface IRuleClass {
    rule_name: string
    rule_value: IAttrClass[]
}

export interface IAttrList {
    id: number
    rule_name: string
    rule_value: string
    attr_name: string
    attr_value: string []
}

export interface IRuleDetail {
    id: number
    rule_name: string
    rule_value: string
    spec: IAttrClass
}
