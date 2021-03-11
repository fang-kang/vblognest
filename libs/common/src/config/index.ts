/* eslint-disable prettier/prettier */
// process.env.NODE_ENV = 'development'
process.env.NODE_ENV = 'production'
const devMode = process.env.NODE_ENV === 'development';

const config = {
  PORT: 3001, // 启动端口
  APP_URL : 'http://localhost:3001/',//路径
  TOKEN: {
    secret: 'secret', // secret is very important!
    expiresIn: '86400s', // token有效期24小时
  },
  DATABASE: {
    database: 'vblognest',
    user: 'root',
    password: '',
  },
};

// 部署的环境变量设置
if (!devMode) {
  console.log('env production....');

  // ==== 配置数据库
  config.DATABASE = {
    ...config.DATABASE,
    database: 'vblognest', // 数据库名
    user: 'vblognest', // 账号
    password: 'vblognest', // 密码
  };

  // ==== 配置 token 密钥
  config.TOKEN.secret = 'secret';
  // ==== 配置 路径
  config.APP_URL = 'http://8.130.31.13:3001/';

}

export default config;
