import xlsx from 'xlsx'

export const jsonToExcel = (options: {
    data: any[]
    header: Record<string, string>
    filename: string
    bookType: xlsx.BookType
}) => {
  // 1. 生成工作簿，即Excel文件,workbook
  const workbook = xlsx.utils.book_new()
  // 2. 生成工作表，即文件中的sheet1,sheet2这种,可以把各种数据类型转换成表
  if (options.header) {
    options.data = options.data.map(item => {
      const obj: Record<string, any> = {}
      for (const key in item) {
        //   处理没有一一对应的设置header的情况
        if (options.header[key]) {
          obj[options.header[key]] = item[key]
        } else {
          obj[key] = item[key]
        }
      }
      console.log(obj)
      return obj
    })
  }

  const worksheet = xlsx.utils.json_to_sheet(options.data)

  // 3. 把工作表添加到工作簿中
  xlsx.utils.book_append_sheet(workbook, worksheet)
  // 4. 导出工作簿，设置导出文件的文件名，文件格式
  xlsx.writeFile(workbook, options.filename, {
    bookType: options.bookType || 'xlsx'
  })
}
