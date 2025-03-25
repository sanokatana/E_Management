import { NavFooter } from '@/components/nav-footer';
import { NavMain } from '@/components/nav-main';
import { NavUser } from '@/components/nav-user';
import { Sidebar, SidebarContent, SidebarFooter, SidebarHeader, SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '@/components/ui/sidebar';
import { type NavItem } from '@/types';
import { Link, usePage } from '@inertiajs/react';
import { BookOpen, Folder, LayoutGrid, ScrollText, DollarSign, HandCoins, House, FileChartColumn, Settings, Info, UserPen } from 'lucide-react';
import AppLogo from './app-logo';

const mainNavItems: NavItem[] = [
    {
        title: 'Dashboard',
        url: '/dashboard',
        icon: LayoutGrid,
    },
    {
        title: "Data",
        url: "#",
        icon: Info,
        items: [
          {
            title: "BAST",
            url: "/data/bast",
          },
          {
            title: "Customers",
            url: "/data/customer",
          },
          {
            title: "Units",
            url: "/data/units",
          },
        ],
    },
    {
        title: 'Billing',
        url: '/billing',
        icon: DollarSign,
    },
    {
        title: 'Invoices',
        url: '/invoices',
        icon: ScrollText,
    },
    {
        title: 'Payments',
        url: '/ipl',
        icon: HandCoins,
    },
    {
        title: 'Estate Management',
        url: '/ipl',
        icon: House,
    },
    {
        title: 'Reports',
        url: '/ipl',
        icon: FileChartColumn,
    },
    {
        title: "Settings",
        url: "#",
        icon: Settings,
        items: [
          {
            title: "Rate IPL",
            url: "/setting/rate-ipl",
          },
          {
            title: "Promo IPL",
            url: "/setting/promo-ipl",
          },
          {
            title: "Rate Internet",
            url: "/setting/rate-internet",
          },
          {
            title: "Promo Internet",
            url: "/setting/promo-internet",
          },
        ],
    },
    {
        title: 'Profile',
        url: '/ipl',
        icon: UserPen,
    },
];

const footerNavItems: NavItem[] = [
    {
        title: 'CHL Property',
        url: 'https://github.com/laravel/react-starter-kit',
        icon: Folder,
    },
    {
        title: 'Documentation',
        url: 'https://laravel.com/docs/starter-kits',
        icon: BookOpen,
    },
];

export function AppSidebar({ ...props }: React.ComponentProps<typeof Sidebar>) {
    const { url } = usePage();
    const isDataActive = url.startsWith('/data');
    const isSettingActive = url.startsWith('/setting');

    const navItems = mainNavItems.map(item => {
        if (item.title === 'Data') {
            return {
                ...item,
                isActive: isDataActive
            };
        }
        if (item.title === 'Settings') {
            return {
                ...item,
                isActive: isSettingActive
            };
        }
        return item;
    });

    return (
        <Sidebar collapsible="icon" {...props}>
            <SidebarHeader>
                <SidebarMenu>
                    <SidebarMenuItem>
                        <SidebarMenuButton size="lg" asChild>
                            <Link href="/dashboard" prefetch>
                                <AppLogo />
                            </Link>
                        </SidebarMenuButton>
                    </SidebarMenuItem>
                </SidebarMenu>
            </SidebarHeader>

            <SidebarContent className="scrollbar-none">
                <NavMain items={navItems} />
            </SidebarContent>

            <SidebarFooter>
                <NavFooter items={footerNavItems} className="mt-auto" />
                <NavUser />
            </SidebarFooter>
        </Sidebar>
    );
}
