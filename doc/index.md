# 安装
npm i -g @nestjs/cli
nest new project-name


# 解决eslint Delete `␍` 警告
在 `.eslintrc.js` 文件中的 `rules` 中配置规则
关闭eslint的规则校验
'prettier/prettier': 'off'
或者
"prettier/prettier": ["error", { "endOfLine": "auto" }]


# 创建文件
创建 src/modules 文件夹用于存放模块

使用 nest g resource user --no-spec 命令创建 user 模块，--no-spec 表示不生成测试文件

回车之后出现五个选项
What transport layer do you use? 您使用什么传输层？
REST API
GraphQL (code first)
GraphQL (schema first)
Microservice (non-HTTP)
WebSockets

选择REST API，回车

Would you like to generate CRUD entry points? 您想生成CRUD入口点吗？

y回车生成一个包含crud的模块，n不生成

创建 src/common 文件夹用于存放公共文件



# 启动
npm run start 
或者
npm run start:dev 监听文件变化，自动重启

# 连接数据库
安装
npm install @nestjs/typeorm typeorm mysql2 -S

