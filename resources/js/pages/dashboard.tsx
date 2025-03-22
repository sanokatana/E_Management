import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Users, File, ClipboardCheck } from 'lucide-react';

interface Props {
    stats: {
        customerCount: number;
        kontrakCount: number;
        bastCount: number;
        unitCount: number;
    };
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Dashboard',
        href: '/dashboard',
    },
];

export default function Dashboard({ stats }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Dashboard" />
            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <div className="grid gap-4 md:grid-cols-4">
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Customers
                            </CardTitle>
                            <Users className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <Badge variant="default" className="text-lg">
                                {stats.customerCount}
                            </Badge>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Contracts
                            </CardTitle>
                            <File className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <Badge variant="default" className="text-lg">
                                {stats.kontrakCount}
                            </Badge>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total BAST
                            </CardTitle>
                            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <Badge variant="default" className="text-lg">
                                {stats.bastCount}
                            </Badge>
                        </CardContent>
                    </Card>
                    <Card>
                        <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
                            <CardTitle className="text-sm font-medium">
                                Total Unit
                            </CardTitle>
                            <ClipboardCheck className="h-4 w-4 text-muted-foreground" />
                        </CardHeader>
                        <CardContent>
                            <Badge variant="default" className="text-lg">
                                {stats.unitCount}
                            </Badge>
                        </CardContent>
                    </Card>
                </div>
            </div>
        </AppLayout>
    );
}
