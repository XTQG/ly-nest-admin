
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

