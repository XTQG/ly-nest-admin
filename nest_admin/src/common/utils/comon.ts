import { map } from 'rxjs';

// 大驼峰转中划线连接的小写
export const humpToUnderline = (str: string): string => {
  return str.replace(/([A-Z])/g, '-$1').toLowerCase()
}


/**
* 构建树
* @param {Array} menuList
* @param {null|string} parentId
*/
export const builderTree = (menuList, parentId = null) => {
  const menuTreeList = []
  menuList.forEach((menu) => {
    if (menu.parentId === parentId) {
      const menuItem = {
        ...menu,
        children: builderTree(menuList, menu.id)
      }
      menuTreeList.push(menuItem)
    }
  })
  return menuTreeList
}



/**
 * @param {Object} baseMeta 模块元数据 { label: '模块名', value: 'url' }
 * @param {Array} customBaseUrlArr 自定义元数据数组
 */
export const generateBaseMeta = (baseMeta, customBaseUrlArr = null) => {
  const baseUrlArr = customBaseUrlArr || [
    {
      label: '新增或更新',
      value: 'save'
    }
    , {
      label: '新增',
      value: 'add'
    }
    , {
      label: '修改',
      value: 'update'
    }
    , {
      label: '逻辑删除',
      value: 'remove'
    }
    , {
      label: '物理删除',
      value: 'delete'
    }
    , {
      label: '批量逻辑删除',
      value: 'removeBatch'
    }
    , {
      label: '批量物理删除',
      value: 'deleteBatch'
    }
    , {
      label: '查询',
      value: 'list'
    },
    {
      label: '获取所有',
      value: 'all'
    }
  ]

  const baseMetaArr = baseUrlArr.map((item) => {
    return { label: baseMeta.label + "-" + item.label, value: baseMeta.value + "_" + item.value }
  })

  return baseMetaArr
}

/**
 * @param {Array} metaArr
 */
export const mergeMeta = (metaArr) => {
  const map = new Map()
  metaArr.forEach((item) => {
    map.set(item.value, item)
  })
  return Object.values(Object.fromEntries(map))
}


/**
 * @returns {String} 当前浏览器名称
 */
export const getBrowser = (userAgent) => {
  const isExplorer = (exp) => {
    return userAgent.indexOf(exp) > -1
  }
  if (isExplorer('MSIE')) return 'IE'
  else if (isExplorer('Firefox')) return 'Firefox'
  else if (isExplorer('Chrome')) return 'Chrome'
  else if (isExplorer('Opera')) return 'Opera'
  else if (isExplorer('Safari')) return 'Safari'
  else return '其他'
}

/**
 * 判断当前系统类型
 */
export function getSystem(userAgent) {
  if (/MicroMessenger/i.test(userAgent)) {
    return 'weChat'
  } else if (/win/i.test(userAgent)) {
    return 'Windows'
  } else if (/linux/i.test(userAgent)) {
    return 'Linux'
  } else if (/macintosh|mac os x/i.test(userAgent)) {
    return 'Mac OS'
  } else if (/android/i.test(userAgent)) {
    return 'Android'
  } else if (/iphone/gi.test(userAgent)) {
    return 'IOS iPhone'
  } else if (/ipad|iPod/gi.test(userAgent)) {
    return 'IOS ipad'
  } else {
    return '其他'
  }
}

