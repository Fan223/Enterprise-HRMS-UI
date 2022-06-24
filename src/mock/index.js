const Mock = require('mockjs')
const Random = Mock.Random

let Result = {
  code: 200,
  msg: '成功',
  data: {}
}

Mock.mock('/getCaptcha', 'get', () => {
  Result.data = {
    token: '4A7BF7',//token: Random.string(32),
    captchaImg: Random.dataImage('120x40', '4A7BF7')
  }
  return Result;
})

Mock.mock('/login', 'post', (loginForm) => {
  let { username, password, token } = JSON.parse(loginForm.body);
  if (username === 'admin' && password === 'admin' && token === '4A7BF7') {
    Result.data = {
      token: '4A7BF7',
    }
  } else {
    Result.code = 401;
    Result.msg = '用户名或密码错误';
  }
  return Result;
})

Mock.mock('/logout', 'post', () => {
  return Result;
})

Mock.mock('/getNavMenu', 'get', () => {
  let menuList = [
    {
      path: '/home',
      name: 'Home',
      icon: 'edit',
      title: '首页',
      component: 'Home',
    },
    {
      path: '/recruitment',
      name: 'Recruitment',
      icon: 'user-solid',
      title: '招聘管理',
      component: 'recruitment/Recruitment',
    },
    {
      path: '/system',
      name: 'System',
      icon: 'share',
      title: '系统管理',
      component: '',
      children: [
        {
          path: '/system/menu',
          name: 'SystemMenu',
          icon: 'user',
          title: '菜单管理',
          component: 'sys/menu/Menu',
        },
        {
          path: '/system/role',
          name: 'SystemRole',
          icon: 'more',
          title: '角色管理',
          component: 'sys/role/Role',
        },
      ]
    },
    {
      path: '/user',
      name: 'User',
      icon: 'delete',
      title: '用户管理',
      component: 'User',
    },
  ];
  let permissionList = [];

  Result.data.menuList = menuList;
  Result.data.permissionList = permissionList;
  return Result;
})

Mock.mock('/sys/menu/list', 'get', () => {
  console.log(11);
  let menuList = [
    {
      id: 1,
      status: 1,
      parentId: 0,
      name: '系统管理',
      path: '',
      icon: 'el-icon-share',
      orderNum: 1,
      type: 0,
      permission: 'sys: manage',
      component: '',
      children: [
        {
          id: 2,
          status: 1,
          parentId: 1,
          name: '菜单管理',
          path: '/sys/menu',
          icon: 'el-icon-user',
          orderNum: 1,
          type: 1,
          component: '',
          permission: 'sys: menu: manage',
        },
        {
          id: 3,
          status: 1,
          parentId: 1,
          name: '角色管理',
          path: '/sys/role',
          icon: 'el-icon-more',
          component: '',
          orderNum: 2,
          type: 1,
          permission: 'sys: role: manage',
        },
      ]
    },
    {
      id: 4,
      status: 1,
      parentId: 0,
      name: '用户管理',
      path: '/sys/user',
      icon: 'el-icon-user',
      orderNum: 1,
      type: 1,
      component: '',
      permission: 'sys: menu: manage',
    },
  ];
  Result.data = menuList;
  return Result;
})