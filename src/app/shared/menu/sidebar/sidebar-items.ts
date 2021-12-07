// Menu
export interface Menu {
  path?: string;
  title?: string;
  icon?: string;
  type?: string;
  headTitle?: string,
  badgeType?: string;
  badgeValue?: string;
  children?: Menu[];
}

export const MenuItemsAdmin: Menu[] = [
  {
    path: '/dashboard/admin', title: 'Dashboard', icon: 'icon-announcement', type: 'link'
  },
  {
    headTitle: 'Management'
  },
  {
    path: '/category/list', title: 'Category', icon: 'icon-menu-alt', type: 'link'
  },
  {
    path: '/variation/list', title: 'Variations', icon: 'icon-menu-alt', type: 'link'
  },
  {
    path: '/products/list', title: 'Products', icon: 'icon-menu-alt', type: 'link'
  },
  // {
  //   path: '/sub_category/list', title: 'Sub Category', icon: 'icon-layout-list-thumb', type: 'link'
  // },
  // {
  //   path: '/item/list', title: 'Item', icon: 'icon-bag', type: 'link'
  // },

  

]


export const MenuItemsCustomer: Menu[] = [

];
