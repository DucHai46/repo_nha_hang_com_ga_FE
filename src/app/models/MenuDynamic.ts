export interface MenuDynamic {
    id: string;
    routeLink: string;
    icon: string;
    label: string;
    isOpen: boolean;
    children: MenuDynamic[];
}
