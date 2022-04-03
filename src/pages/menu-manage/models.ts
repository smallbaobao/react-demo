import { log } from "../../utils/log";
import { fetchMenusService } from "./services";

/** 菜单数据格式修改成tree组件的treeData */
export async function fetchMenus() {
  const [error, resp] = await fetchMenusService();

  if (error) {
    log({
      type: "error",
      api: "fetchMenus",
      message: "fetchMenusService failed",
      error,
    });

    return;
  }

  const { menus = [] } = resp || {};
  const treeData: ITree[] = [
    {
      id: 0,
      name: "全部菜单",
      path: "全部菜单",
      key: "all",
      children: [],
    },
  ];
  const parentMenus: ITree[] = [];
  const childMenus: ITree[] = [];

  menus.forEach((menu: ITree) => {
    menu.children = [];
    menu.key = menu.path;

    if (!menu.parentId) {
      parentMenus.push(menu);
    } else {
      const index = parentMenus.findIndex(
        (parentMenu: ITree) => parentMenu.id === menu.parentId
      );
      if (index >= 0) {
        parentMenus[index].children?.push(menu);
      } else {
        childMenus.push(menu);
      }
    }
  });

  childMenus.forEach((childMenu: ITree) => {
    menus.forEach((menu: ITree) => {
      if (childMenu.parentId === menu.id) {
        menu.children?.push(childMenu);
      }
    });
  });

  treeData[0].children = parentMenus;

  return treeData;
}
