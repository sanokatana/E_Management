import { Head } from '@inertiajs/react';
import {
    Table,
    TableBody,
    TableCell,
    TableHead,
    TableHeader,
    TableRow,
} from '@/components/ui/table';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';

interface Customer {
    NoCustomer: string;
    Nama: string;
    NoHp: string;
    Email: string;
    SumberData: string;
}

interface Props {
    customers: Customer[];
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data',
        href: '/data',
    },
    {
        title: 'Customer',
        href: '/data/customer',
    },
];

export default function CustomerPage({ customers }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customer Data" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Customer Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">No. Customer</TableHead>
                                    <TableHead className="text-center">Nama</TableHead>
                                    <TableHead className="text-center">No. Telp</TableHead>
                                    <TableHead className="text-center">Email</TableHead>
                                    <TableHead className="text-center">Sumber Data</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {customers.map((Customer) => (
                                    <TableRow key={Customer.NoCustomer}>
                                        <TableCell className="text-center">{Customer.NoCustomer}</TableCell>
                                        <TableCell className="text-center">{Customer.Nama}</TableCell>
                                        <TableCell className="text-center">{Customer.NoHp}</TableCell>
                                        <TableCell className="text-center">{Customer.Email}</TableCell>
                                        <TableCell className="text-center">{Customer.SumberData}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>
        </AppLayout>
    );
}
