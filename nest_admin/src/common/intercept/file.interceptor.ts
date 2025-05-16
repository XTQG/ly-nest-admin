import { UseInterceptors } from '@nestjs/common'
import { AnyFilesInterceptor, FileInterceptor } from '@nestjs/platform-express'
import { mkdir } from 'node:fs/promises'
import { diskStorage } from 'multer'
import { extname, join } from 'path'
import * as dayjs from 'dayjs'

/**
 * @params  {object} options
 *  subDir  上传文件的子目录
 *  fieldName 上传文件的字段名
 *  dest 上传文件的路径 默认 upload 位于根目录下
 *  formats 上传文件的格式 默认 ['*']
 *  fileMaxSize 上传文件的最大值 默认 20M
**/
export function MulterFileInterceptor({ subDir = '', fieldName = 'file', dest = 'upload', formats = ['*'], fileMaxSize = Math.pow(1024, 2) * 20 }) {
  return UseInterceptors(
    FileInterceptor(fieldName, {
      // 上传数据的限制
      limits: { fileSize: fileMaxSize },
      // 用于控制接受哪些文件的函数
      fileFilter(req: any, file: Express.Multer.File, callback: (error: Error | null, acceptFile: boolean) => void) {
        // 验证文件格式
        let ext = file.originalname.split('.').at(-1)
        if (formats[0] === '*' || formats.includes(ext)) {
          callback(null, true)
        } else {
          callback(new Error('文件格式不支持'), false)
        }
      },
      // 存储位置配置
      storage: diskStorage({
        // 存储位置
        destination: function (req, file, cb) {
          cb(null, join(dest))
        },
        // 文件名配置
        filename: async function (req, file, cb) {
          let dirGroup = dayjs().format('YYYY-MM-DD')
          // let dirGroup = file.originalname.split('.').at(-1)
          // 文件的路径
          let fileDir = join(subDir || req.body.module || 'default', dirGroup)
          try {
            // await access(
            //   'upload/' + dayjs().format('YYYY-MM-DD'),
            //   constants.R_OK | constants.W_OK,
            // )
            // 文件夹不存在则创建
            await mkdir(join(dest, fileDir), { recursive: true })
          } catch (error) {
            throw error
            // console.error(error.message)
          }
          // 文件后缀
          let ext = extname(file.originalname) || '.' + file.mimetype.split('/')[1]
          // 文件路径 时间戳+随机数+文件后缀
          let filename = `${fileDir}/${Date.now()}-${Math.round(Math.random() * 1e9)}${ext}`
          cb(null, filename)
        },
      }),
    }),
  )
}
