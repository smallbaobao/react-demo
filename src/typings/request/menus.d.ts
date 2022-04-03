interface IMenusResp extends IBaseResp {
  menus: IMenu[];
}

interface IMenuReq {
  /** 当前菜单id */
  id?: number;
  /** 当前菜单id，新增子菜单传 */
  parentId?: number;
  /** 菜单名称 */
  name?: string;
  /** 菜单路径 */
  path?: string;
}

interface ICreateMenuResp extends IBaseResp {
  menu: IMenu;
}

interface IUpdateMenuResp extends IBaseResp {
  id: number;
}

interface IDeleteMenuResp extends IBaseResp {
  menu: number;
  id: string;
}

interface IMenu {
  /** 菜单id */
  id?: number;
  /** 父级id */
  parentId?: number;
  /** 菜单名称 */
  name?: string;
  /** 菜单路径 */
  path?: string;
}

interface ITree extends IMenu {
  /** 菜单唯一的key，赋值path */
  key?: string;
  /** 传入tree组件 */
  title?: JSX.Element;
  /** 子菜单的数据 */
  children?: ITree[];
}
