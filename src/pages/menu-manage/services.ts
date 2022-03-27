import { box } from "../../utils";
import { request } from "../../utils/request";

/** 获取菜单数据 */
export async function fetchMenusService() {
  return box(
    request<IMenusResp>({
      method: "get",
      url: "/menus",
    })
  );
}

/**
 * 新建菜单
 * @param data
 * @returns
 */
export async function createMenuService(data: IMenuReq) {
  return box(
    request<ICreateMenuResp>({
      method: "post",
      url: "/createMenu",
      data,
    })
  );
}

/**
 * 更新菜单
 * @param data
 * @returns
 */
export async function updateMenuService(data: IMenuReq) {
  return box(
    request<IUpdateMenuResp>({
      method: "post",
      url: "/updateMenu",
      data,
    })
  );
}

/**
 * 删除菜单
 * @param id
 * @returns
 */
export async function deleteMenuService(id: IMenuReq["id"]) {
  return box(
    request<IDeleteMenuResp>({
      method: "get",
      url: "/deleteMenu",
      params: { id },
    })
  );
}
