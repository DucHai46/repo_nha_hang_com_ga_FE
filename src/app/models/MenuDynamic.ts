export interface MenuDynamic {
  id: string,
  routeLink: string,
  icon: string,
  label: string,
  isOpen: boolean,
  parent: {
    id: string,
    name: string
  },
  position: string,
  isActive: boolean
}