
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
 * @param 
 */
export const generateBaseMeta = (baseMeta) => {
  const baseUrlArr = [
    { label: '-新增或更新', value: 'save' }
    , {
      label: '-新增',
      value: '_add'
    }
    , {
      label: '-修改',
      value: '_update'
    }
    , {
      label: '-逻辑删除',
      value: '_remove'
    }
    , {
      label: '-物理删除',
      value: '_delete'
    }
    , {
      label: '-批量逻辑删除',
      value: '_remove-batch'
    }
    , {
      label: '-批量物理删除',
      value: '_delete-batch'
    }
    , {
      label: '-查询',
      value: '_list'
    }
  ]
  const baseMetaArr = baseUrlArr.map((item) => {
    return { label: baseMeta.label + item.label, value: baseMeta.value + item.value }
  })

  return baseMetaArr
}