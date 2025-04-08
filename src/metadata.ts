/* eslint-disable */
export default async () => {
  const t = {
    ['./modules/system/role/role.entity']: await import(
      './modules/system/role/role.entity'
    ),
    ['./modules/system/dept/dept.entity']: await import(
      './modules/system/dept/dept.entity'
    ),
    ['./modules/system/menu/menu.entity']: await import(
      './modules/system/menu/menu.entity'
    ),
  };
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
          import('./modules/system/role/role.entity'),
          {
            RoleEntity: {
              id: { required: true, type: () => Number },
              name: { required: true, type: () => String },
              value: { required: true, type: () => String },
              sort: { required: true, type: () => Number },
              remark: { required: true, type: () => String },
              createBy: { required: true, type: () => String },
              updateBy: { required: true, type: () => String },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
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
              role: {
                required: true,
                type: () => [t['./modules/system/role/role.entity'].RoleEntity],
              },
            },
          },
        ],
        [
          import('./modules/system/dept/dept.dto'),
          {
            CreateDeptDto: {
              name: {
                required: true,
                type: () => String,
                description: '\u90E8\u95E8\u540D\u79F0',
                example: '\u6280\u672F\u90E8',
              },
              sort: {
                required: false,
                type: () => Number,
                description: '\u6392\u5E8F',
                example: 1,
              },
              leader: {
                required: false,
                type: () => String,
                description: '\u8D1F\u8D23\u4EBA',
                example: '\u5F20\u4E09',
              },
              phone: {
                required: false,
                type: () => String,
                description: '\u8D1F\u8D23\u4EBA\u7535\u8BDD',
                example: '13000000000',
              },
              email: {
                required: false,
                type: () => String,
                description: '\u90AE\u7BB1',
                example: 'xxx@qq.com',
              },
              parentId: {
                required: false,
                type: () => Number,
                description: '\u4E0A\u7EA7\u90E8\u95E8ID',
              },
            },
            QueryDeptDto: {},
            UpdateDeptDto: { id: { required: true, type: () => Number } },
          },
        ],
        [
          import('./modules/system/dept/dept.entity'),
          {
            DeptEntity: {
              id: { required: true, type: () => Number },
              name: { required: true, type: () => String },
              sort: { required: true, type: () => Number },
              leader: { required: true, type: () => String },
              phone: { required: true, type: () => String },
              email: { required: true, type: () => String },
              parentId: { required: true, type: () => Number, nullable: true },
              children: {
                required: false,
                type: () => [t['./modules/system/dept/dept.entity'].DeptEntity],
                nullable: true,
              },
              createBy: { required: true, type: () => String },
              updateBy: { required: true, type: () => String, nullable: true },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
            },
          },
        ],
        [
          import('./modules/system/dict-data/dict-data.dto'),
          {
            CreateDictDataDto: {
              name: {
                required: true,
                type: () => String,
                description: '\u5B57\u5178\u6570\u636E\u540D\u79F0',
                example: '\u6027\u522B',
              },
              value: {
                required: true,
                type: () => String,
                description: '\u5B57\u5178\u6570\u636E\u503C',
                example: '1',
              },
              sort: {
                required: false,
                type: () => Number,
                description: '\u6392\u5E8F',
                example: 1,
              },
              type: {
                required: false,
                type: () => String,
                description:
                  '\u7C7B\u578B 0: \u914D\u7F6E 1: \u53C2\u6570 2: \u8BCA\u65AD',
                example: '0',
              },
              status: {
                required: false,
                type: () => Boolean,
                description:
                  '\u72B6\u6001 false: \u7981\u7528 true: \u542F\u7528',
                example: true,
                default: true,
              },
              dictTypeId: {
                required: true,
                type: () => Number,
                description: '\u5B57\u5178\u7C7B\u578BID',
                example: 1,
              },
              remark: {
                required: false,
                type: () => String,
                description: '\u5907\u6CE8',
                example: '\u5907\u6CE8',
              },
              parentId: {
                required: false,
                type: () => Number,
                description: '\u7236\u7EA7\u83DC\u5355id',
                example: 0,
              },
            },
            QueryDictDataDto: {
              dictTypeValue: {
                required: false,
                type: () => String,
                description: '\u5B57\u5178\u7C7B\u578B\u503C',
                example: 'chart',
              },
            },
            UpdateDictDataDto: { id: { required: true, type: () => Number } },
          },
        ],
        [
          import('./modules/system/dict-data/dict-data.entity'),
          {
            DictDataEntity: {
              id: { required: true, type: () => Number },
              name: { required: true, type: () => String },
              value: { required: true, type: () => String },
              sort: { required: true, type: () => Number },
              status: { required: true, type: () => Boolean },
              type: { required: true, type: () => String },
              cnTitle: { required: true, type: () => String, nullable: true },
              enTitle: { required: true, type: () => String, nullable: true },
              isChart: { required: true, type: () => Boolean },
              chartType: { required: true, type: () => String },
              upperLimit: {
                required: true,
                type: () => String,
                nullable: true,
              },
              lowerLimit: {
                required: true,
                type: () => String,
                nullable: true,
              },
              dictTypeId: { required: true, type: () => Number },
              treeId: { required: true, type: () => Number, nullable: true },
              createBy: { required: true, type: () => String },
              updateBy: { required: true, type: () => String, nullable: true },
              remark: { required: true, type: () => String, nullable: true },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
            },
          },
        ],
        [
          import('./modules/system/dict-type/dict-type.dto'),
          {
            CreateDictTypeDto: {
              name: {
                required: true,
                type: () => String,
                description: '\u5B57\u5178\u540D\u79F0',
                example: '\u6027\u522B',
              },
              value: {
                required: true,
                type: () => String,
                description: '\u5B57\u5178\u503C',
                example: '1',
              },
              status: {
                required: false,
                type: () => Boolean,
                description: '\u72B6\u6001',
                example: true,
              },
              remark: {
                required: false,
                type: () => String,
                description: '\u5907\u6CE8',
                example: '\u5907\u6CE8',
              },
            },
            QueryDictTypeDto: {},
            UpdateDictTypeDto: { id: { required: true, type: () => Number } },
          },
        ],
        [
          import('./modules/system/dict-type/dict-type.entity'),
          {
            DictTypeEntity: {
              id: { required: true, type: () => Number },
              name: { required: true, type: () => String },
              value: { required: true, type: () => String },
              status: { required: true, type: () => Boolean },
              createBy: { required: true, type: () => String },
              updateBy: { required: true, type: () => String, nullable: true },
              remark: { required: true, type: () => String },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
            },
          },
        ],
        [
          import('./modules/system/menu/menu.dto'),
          {
            CreateMenuDto: {
              name: {
                required: true,
                type: () => String,
                description: '\u83DC\u5355\u540D\u79F0',
                example: '\u7CFB\u7EDF\u7BA1\u7406',
              },
              path: {
                required: true,
                type: () => String,
                description: '\u83DC\u5355\u8DEF\u5F84',
                example: '/system',
              },
              icon: {
                required: true,
                type: () => String,
                description: '\u83DC\u5355\u56FE\u6807',
                example: 'i-line-md:external-link',
              },
              hidden: {
                required: false,
                type: () => Boolean,
                description: '\u662F\u5426\u9690\u85CF',
                example: false,
                default: false,
              },
              status: {
                required: false,
                type: () => Boolean,
                description:
                  '\u72B6\u6001 false: \u7981\u7528 true: \u542F\u7528',
                example: true,
                default: true,
              },
              sort: {
                required: false,
                type: () => Number,
                description: '\u6392\u5E8F',
                example: 0,
                default: 0,
              },
              parentId: {
                required: false,
                type: () => Number,
                description: '\u7236\u7EA7\u83DC\u5355id',
                example: 0,
              },
            },
            QueryMenuDto: {},
            UpdateMenuDto: { id: { required: true, type: () => Number } },
          },
        ],
        [
          import('./modules/system/menu/menu.entity'),
          {
            MenuEntity: {
              id: { required: true, type: () => Number },
              name: { required: true, type: () => String },
              path: { required: true, type: () => String },
              icon: { required: true, type: () => String },
              hidden: { required: true, type: () => Boolean },
              status: { required: true, type: () => Boolean },
              sort: { required: true, type: () => Number },
              parentId: { required: true, type: () => Number, nullable: true },
              children: {
                required: false,
                type: () => [t['./modules/system/menu/menu.entity'].MenuEntity],
                nullable: true,
              },
              remark: { required: true, type: () => String },
              createBy: { required: true, type: () => String },
              updateBy: { required: true, type: () => String },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
            },
          },
        ],
        [
          import('./modules/system/post/post.dto'),
          {
            CreatePostDto: {
              code: {
                required: true,
                type: () => String,
                description: '\u5C97\u4F4D\u7F16\u7801',
                example: 'tech',
              },
              name: {
                required: true,
                type: () => String,
                description: '\u5C97\u4F4D\u540D\u79F0',
                example: '\u6280\u672F\u90E8',
              },
              sort: {
                required: false,
                type: () => Number,
                description: '\u6392\u5E8F',
                example: 1,
              },
              remark: {
                required: false,
                type: () => String,
                description: '\u5907\u6CE8',
                example: '\u8FD9\u662F\u4E00\u4E2A\u6280\u672F\u90E8',
              },
            },
            QueryPostDto: {},
            UpdatePostDto: { id: { required: true, type: () => Number } },
          },
        ],
        [
          import('./modules/system/post/post.entity'),
          {
            PostEntity: {
              id: { required: true, type: () => Number },
              code: { required: true, type: () => String },
              name: { required: true, type: () => String },
              sort: { required: true, type: () => Number },
              remark: { required: true, type: () => String },
              createBy: { required: true, type: () => String },
              updateBy: { required: true, type: () => String },
              createdAt: { required: true, type: () => Date },
              updatedAt: { required: true, type: () => Date },
            },
          },
        ],
        [
          import('./modules/system/role/role.dto'),
          {
            CreateRoleDto: {
              name: {
                required: true,
                type: () => String,
                description: '\u6743\u9650\u540D\u79F0',
                example: '\u7BA1\u7406\u5458',
              },
              value: {
                required: true,
                type: () => String,
                description: '\u6743\u9650\u503C',
                example: 'admin',
              },
              sort: {
                required: false,
                type: () => Number,
                description: '\u6392\u5E8F',
                example: 0,
                default: 0,
              },
              remark: {
                required: false,
                type: () => String,
                description: '\u5907\u6CE8',
                example: '\u5907\u6CE8',
              },
              menuIds: {
                required: true,
                type: () => [Number],
                description: '\u83DC\u5355ID',
                example: [1, 2],
              },
            },
            QueryRoleDto: {},
            UpdateRoleDto: { id: { required: true, type: () => Number } },
          },
        ],
        [
          import('./modules/monitor/login/login.dto'),
          {
            CreateLoginDto: {
              userId: { required: true, type: () => Number },
              sessionId: { required: true, type: () => String },
              username: { required: true, type: () => String },
              ip: { required: true, type: () => String },
            },
            QueryLoginDto: {},
          },
        ],
        [
          import('./modules/monitor/login/login.entity'),
          {
            LoginEntity: {
              id: { required: true, type: () => Number },
              userId: { required: true, type: () => Number },
              sessionId: { required: true, type: () => String },
              username: { required: true, type: () => String },
              ip: { required: true, type: () => String },
              address: { required: true, type: () => String },
              createdAt: { required: true, type: () => Date },
            },
          },
        ],
        [
          import('./modules/monitor/operation/operation.dto'),
          {
            CreateOperationDto: {
              title: { required: true, type: () => String },
              username: { required: true, type: () => String },
              businessType: { required: true, type: () => Number },
              module: { required: true, type: () => String },
              ip: { required: true, type: () => String },
            },
            QueryOperationDto: {},
          },
        ],
        [
          import('./modules/monitor/operation/operation.entity'),
          {
            OperationEntity: {
              id: { required: true, type: () => Number },
              title: { required: true, type: () => String },
              businessType: { required: true, type: () => Number },
              module: { required: true, type: () => String },
              username: { required: true, type: () => String },
              ip: { required: true, type: () => String },
              address: { required: true, type: () => String },
              createdAt: { required: true, type: () => Date },
            },
          },
        ],
        [
          import('./modules/monitor/info/info.entity'),
          {
            InfoEntity: {
              cpu: {
                required: true,
                type: () => ({
                  cores: { required: true, type: () => Number },
                  brand: { required: true, type: () => String },
                  manufacturer: { required: true, type: () => String },
                  speed: { required: true, type: () => String },
                }),
              },
              memory: {
                required: true,
                type: () => ({
                  total: { required: true, type: () => String },
                  free: { required: true, type: () => String },
                  used: { required: true, type: () => String },
                  usage: { required: true, type: () => String },
                }),
              },
              osInfo: {
                required: true,
                type: () => ({
                  platform: { required: true, type: () => String },
                  release: { required: true, type: () => String },
                  arch: { required: true, type: () => String },
                  hostname: { required: true, type: () => String },
                }),
              },
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
        [
          import('./modules/project/valve/dto/create-valve.dto'),
          { CreateValveDto: {} },
        ],
        [
          import('./modules/project/valve/dto/update-valve.dto'),
          { UpdateValveDto: {} },
        ],
        [
          import('./modules/project/valve/entities/valve.entity'),
          { Valve: {} },
        ],
        [
          import('./modules/project/factory/dto/create-factory.dto'),
          { CreateFactoryDto: {} },
        ],
        [
          import('./modules/project/factory/dto/update-factory.dto'),
          { UpdateFactoryDto: {} },
        ],
        [
          import('./modules/project/factory/entities/factory.entity'),
          { Factory: {} },
        ],
        [
          import('./modules/project/device/dto/create-device.dto'),
          { CreateDeviceDto: {} },
        ],
        [
          import('./modules/project/device/dto/update-device.dto'),
          { UpdateDeviceDto: {} },
        ],
        [
          import('./modules/project/device/entities/device.entity'),
          { Device: {} },
        ],
        [
          import(
            './modules/project/analysis-task/dto/create-analysis-task.dto'
          ),
          { CreateAnalysisTaskDto: {} },
        ],
        [
          import(
            './modules/project/analysis-task/dto/update-analysis-task.dto'
          ),
          { UpdateAnalysisTaskDto: {} },
        ],
        [
          import('./modules/project/analysis-task/analysis-task.entity'),
          { AnalysisTask: {} },
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
              findSelf: {
                summary:
                  '\u83B7\u53D6\u5F53\u524D\u767B\u5F55\u7528\u6237\u4FE1\u606F',
                type: Object,
              },
              changePassword: { summary: '\u4FEE\u6539\u5BC6\u7801' },
              findOne: {
                summary: '\u83B7\u53D6\u5355\u4E2A\u7528\u6237\u4FE1\u606F',
                type: Object,
              },
              update: { summary: '\u66F4\u65B0\u7528\u6237' },
              remove: { summary: '\u5220\u9664\u7528\u6237', type: String },
            },
          },
        ],
        [
          import('./modules/system/dept/dept.controller'),
          {
            DeptController: {
              create: { summary: '\u521B\u5EFA\u90E8\u95E8' },
              findAll: {
                summary: '\u83B7\u53D6\u90E8\u95E8\u5217\u8868',
                type: [Object],
              },
              findOne: { summary: '\u83B7\u53D6\u90E8\u95E8\u8BE6\u60C5' },
              update: { summary: '\u66F4\u65B0\u90E8\u95E8' },
              remove: { summary: '\u5220\u9664\u90E8\u95E8' },
            },
          },
        ],
        [
          import('./modules/system/dict-data/dict-data.controller'),
          {
            DictDataController: {
              create: { summary: '\u521B\u5EFA\u5B57\u5178\u6570\u636E' },
              findAll: {},
              findOne: {
                summary: '\u83B7\u53D6\u5B57\u5178\u6570\u636E\u8BE6\u60C5',
                type: Object,
              },
              update: {},
              remove: {},
            },
          },
        ],
        [
          import('./modules/system/dict-type/dict-type.controller'),
          {
            DictTypeController: {
              create: { summary: '\u521B\u5EFA\u5B57\u5178' },
              findAll: { summary: '\u83B7\u53D6\u5B57\u5178\u5217\u8868' },
              findOne: {
                summary: '\u83B7\u53D6\u5B57\u5178\u8BE6\u60C5',
                type: Object,
              },
              update: { summary: '\u66F4\u65B0\u5B57\u5178' },
              remove: { summary: '\u5220\u9664\u5B57\u5178' },
            },
          },
        ],
        [
          import('./modules/system/menu/menu.controller'),
          {
            MenuController: {
              create: { summary: '\u521B\u5EFA\u83DC\u5355' },
              findAll: {
                summary: '\u83B7\u53D6\u83DC\u5355\u5217\u8868',
                type: [Object],
              },
              findOne: {
                summary: '\u83B7\u53D6\u83DC\u5355\u8BE6\u60C5',
                type: Object,
              },
              update: { summary: '\u66F4\u65B0\u83DC\u5355' },
              remove: { summary: '\u5220\u9664\u83DC\u5355' },
            },
          },
        ],
        [
          import('./modules/system/post/post.controller'),
          {
            PostController: {
              create: { summary: '\u521B\u5EFA\u5C97\u4F4D' },
              findAll: { summary: '\u83B7\u53D6\u5C97\u4F4D\u5217\u8868' },
              findOne: {
                summary: '\u83B7\u53D6\u5C97\u4F4D\u8BE6\u60C5',
                type: Object,
              },
              update: { summary: '\u66F4\u65B0\u5C97\u4F4D' },
              remove: { summary: '\u5220\u9664\u5C97\u4F4D' },
            },
          },
        ],
        [
          import('./modules/system/role/role.controller'),
          {
            RoleController: {
              create: { summary: '\u521B\u5EFA\u6743\u9650' },
              findAll: { summary: '\u83B7\u53D6\u6743\u9650\u5217\u8868' },
              findOne: { summary: '\u83B7\u53D6\u6743\u9650\u8BE6\u60C5' },
              update: { summary: '\u66F4\u65B0\u6743\u9650' },
              remove: { summary: '\u5220\u9664\u6743\u9650' },
            },
          },
        ],
        [
          import('./modules/monitor/login/login.controller'),
          {
            LoginController: {
              findAll: {
                summary: '\u83B7\u53D6\u767B\u5F55\u65E5\u5FD7\u5217\u8868',
              },
              findOne: {
                summary: '\u83B7\u53D6\u767B\u5F55\u65E5\u5FD7\u8BE6\u60C5',
                type: Object,
              },
            },
          },
        ],
        [
          import('./modules/monitor/operation/operation.controller'),
          {
            OperationController: {
              findAll: { summary: '\u83B7\u53D6\u65E5\u5FD7\u5217\u8868' },
              findOne: { summary: '\u83B7\u53D6\u65E5\u5FD7\u8BE6\u60C5' },
            },
          },
        ],
        [
          import('./modules/monitor/info/info.controller'),
          { InfoController: { systemInfo: {} } },
        ],
        [
          import('./modules/project/valve/valve.controller'),
          {
            ValveController: {
              create: { type: String },
              findAll: { type: String },
              findOne: { type: String },
              update: { type: String },
              remove: { type: String },
            },
          },
        ],
        [
          import('./modules/project/factory/factory.controller'),
          {
            FactoryController: {
              create: { type: String },
              findAll: { type: String },
              findOne: { type: String },
              update: { type: String },
              remove: { type: String },
            },
          },
        ],
        [
          import('./modules/project/device/device.controller'),
          {
            DeviceController: {
              create: { type: String },
              findAll: { type: String },
              findOne: { type: String },
              update: { type: String },
              remove: { type: String },
            },
          },
        ],
        [
          import('./modules/project/analysis-task/analysis-task.controller'),
          {
            AnalysisTaskController: {
              create: { type: String },
              findAll: { type: String },
              findOne: { type: String },
              update: { type: String },
              remove: { type: String },
            },
          },
        ],
      ],
    },
  };
};
