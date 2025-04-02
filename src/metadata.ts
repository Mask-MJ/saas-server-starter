/* eslint-disable */
export default async () => {
  const t = {};
  return {
    '@nestjs/swagger': {
      models: [
        [
          import('./common/dto/base.dto'),
          {
            PaginateDto: {
              page: {
                required: true,
                type: () => Number,
                description: '\u9875\u7801',
                example: 1,
                default: 1,
              },
              pageSize: {
                required: true,
                type: () => Number,
                description: '\u6BCF\u9875\u6570\u91CF',
                example: 10,
                default: 10,
              },
            },
            TimeDto: {
              beginTime: {
                required: true,
                type: () => Date,
                description: '\u5F00\u59CB\u65F6\u95F4',
                example: '2024-01-01 00:00:00',
              },
              endTime: {
                required: true,
                type: () => Date,
                description: '\u7ED3\u675F\u65F6\u95F4',
                example: '2025-01-01 00:00:00',
              },
            },
            BaseDto: {},
            uploadDto: {
              fileName: { required: true, type: () => String },
              file: { required: true, type: () => Object },
            },
          },
        ],
        [
          import('./modules/system/user/user.dto'),
          {
            CreateUserDto: {
              username: {
                required: true,
                type: () => String,
                description: '\u8D26\u53F7',
                example: 'admin',
              },
              password: {
                required: true,
                type: () => String,
                description: '\u5BC6\u7801',
                example: '123456',
                minLength: 4,
              },
              nickname: {
                required: false,
                type: () => String,
                description: '\u6635\u79F0',
                example: '\u7BA1\u7406\u5458',
              },
              avatar: {
                required: false,
                type: () => String,
                description: '\u5934\u50CF',
                example: 'http://xxx.com/xxx.jpg',
                format: 'uri',
              },
              email: {
                required: false,
                type: () => String,
                description: '\u90AE\u7BB1',
                example: 'xxx@qq.com',
                format: 'email',
              },
              phoneNumber: {
                required: false,
                type: () => String,
                description: '\u624B\u673A\u53F7',
                example: '18888888888',
              },
              sex: {
                required: false,
                type: () => Number,
                description: '\u6027\u522B 0: \u5973 1: \u7537',
                example: 1,
                default: 1,
              },
              status: {
                required: false,
                type: () => Boolean,
                description:
                  '\u72B6\u6001 false: \u7981\u7528 true: \u542F\u7528',
                example: true,
                default: true,
              },
              remark: {
                required: false,
                type: () => String,
                description: '\u5907\u6CE8',
                example: '\u5907\u6CE8',
              },
              postId: {
                required: false,
                type: () => Number,
                description: '\u5C97\u4F4DID',
                example: 1,
              },
              deptId: {
                required: false,
                type: () => Number,
                description: '\u90E8\u95E8ID',
                example: 1,
              },
              roleIds: {
                required: false,
                type: () => [Number],
                description: '\u89D2\u8272ID',
                example: [1, 2],
              },
              menuIds: {
                required: false,
                type: () => [Number],
                description: '\u83DC\u5355ID',
                example: [1, 2],
              },
            },
            QueryUserDto: {},
            UpdateUserDto: { id: { required: true, type: () => Number } },
            ChangePasswordDto: {
              id: { required: true, type: () => Number },
              oldPassword: { required: true, type: () => String, default: '' },
              password: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./modules/auth/authentication/authentication.dto'),
          {
            SignInDto: {
              username: {
                required: true,
                type: () => String,
                description: '\u8D26\u53F7',
                example: 'admin',
                minLength: 4,
              },
              password: {
                required: true,
                type: () => String,
                description: '\u5BC6\u7801',
                example: '123456',
                minLength: 4,
              },
            },
            SignUpDto: {},
            RefreshTokenDto: {
              refreshToken: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./modules/system/user/user.entity'),
          {
            UserEntity: {
              id: { required: true, type: () => Number },
              isAdmin: { required: true, type: () => Boolean },
              username: { required: true, type: () => String },
              nickname: { required: true, type: () => String },
              avatar: { required: true, type: () => String },
              email: { required: true, type: () => String },
              phoneNumber: { required: true, type: () => String },
              sex: { required: true, type: () => Number },
              status: { required: true, type: () => Boolean },
              createBy: { required: true, type: () => String },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
              remark: { required: true, type: () => String },
            },
          },
        ],
        [
          import('./modules/auth/authentication/authentication.entity'),
          {
            SignInEntity: {
              accessToken: { required: true, type: () => String },
              refreshToken: { required: true, type: () => String },
            },
          },
        ],
      ],
      controllers: [
        [
          import('./app.controller'),
          { AppController: { getHello: {}, getMail: {} } },
        ],
        [
          import('./modules/auth/authentication/authentication.controller'),
          {
            AuthenticationController: {
              signUp: { summary: '\u6CE8\u518C' },
              signIn: { summary: '\u767B\u5F55' },
              refreshTokens: { summary: '\u5237\u65B0\u4EE4\u724C' },
            },
          },
        ],
        [
          import('./modules/system/user/user.controller'),
          {
            UserController: {
              create: { summary: '\u521B\u5EFA\u7528\u6237' },
              findAll: { summary: '\u83B7\u53D6\u7528\u6237\u5217\u8868' },
              findOne: {
                summary: '\u83B7\u53D6\u5355\u4E2A\u7528\u6237\u4FE1\u606F',
              },
              update: {
                summary: '\u66F4\u65B0\u7528\u6237\u4FE1\u606F',
                type: String,
              },
              remove: { summary: '\u5220\u9664\u7528\u6237', type: String },
              findSelf: {
                summary: '\u83B7\u53D6\u7528\u6237\u4FE1\u606F',
                type: Object,
              },
              changePassword: { summary: '\u4FEE\u6539\u5BC6\u7801' },
            },
          },
        ],
      ],
    },
  };
};
