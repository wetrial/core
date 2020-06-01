/**
 * 过滤菜单项(对象中必须有 group、routes等)
 * @param arr 路由数组
 * @param groups 要过滤的group组名列表
 */
export function filterRoutesByGroups(arr: any[], groups: string[] = []) {
  const result: any[] = [];
  arr.forEach(item => {
    if (!item.group || groups.indexOf(item.group) !== -1) {
      const newItem = item;
      if (item.routes && item.routes.length > 0) {
        newItem.routes = filterRoutesByGroups(item.routes, groups);
        if (newItem.routes.length > 0) {
          result.push(newItem);
        }
      } else {
        result.push(newItem);
      }
    }
  });
  return result;
}

/**
 * 从路由中查找指定gourp的路由(对象中必须有 group、routes等)
 * @param arr 路由数组
 * @param group 指定的组名
 */
export function findRouteMenuByGroup(arr: any[], group: string): any {
  let result: any;
  arr.forEach(item => {
    if (item.group && item.group === group) {
      result = item;
      return;
    }
    if (item.routes && item.routes.length > 0) {
      result = findRouteMenuByGroup(item.routes, group);
      if (result) {
        return;
      }
    }
  });
  return result;
}
