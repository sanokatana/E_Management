import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale/id';

interface InternetSubscription {
    id: number;
    subscription_no: string;
    customer_name: string;
    unit: string;
    package: string;
    speed: number;
    price: number;
    status: 'active' | 'inactive' | 'suspended';
    start_date: string;
    end_date: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    subscriptions: InternetSubscription[];
}

const breadcrumbs = [
    {
        title: 'Internet Services',
        href: '/estate/internet',
    },
];

const formatDate = (date: string) => {
    try {
        return format(parseISO(date), 'dd MMMM yyyy', { locale: id });
    } catch {
        return date;
    }
};

const formatRupiah = (amount: number) => {
    return new Intl.NumberFormat('id-ID', {
        style: 'currency',
        currency: 'IDR',
        minimumFractionDigits: 0,
        maximumFractionDigits: 0,
    }).format(amount);
};

const getStatusColor = (status: InternetSubscription['status']) => {
    const colors = {
        active: 'bg-green-100 text-green-800',
        inactive: 'bg-gray-100 text-gray-800',
        suspended: 'bg-red-100 text-red-800',
    };
    return colors[status];
};

export default function InternetPage({ subscriptions }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Internet Services" />
            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Internet Subscriptions</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Subscription No</TableHead>
                                    <TableHead className="text-center">Customer</TableHead>
                                    <TableHead className="text-center">Unit</TableHead>
                                    <TableHead className="text-center">Package</TableHead>
                                    <TableHead className="text-center">Speed</TableHead>
                                    <TableHead className="text-center">Price</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-center">Period</TableHead>
                                    <TableHead className="text-center">Created At</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {subscriptions.map((subscription) => (
                                    <TableRow key={subscription.id}>
                                        <TableCell className="text-center">{subscription.subscription_no}</TableCell>
                                        <TableCell className="text-center">{subscription.customer_name}</TableCell>
                                        <TableCell className="text-center">{subscription.unit}</TableCell>
                                        <TableCell className="text-center">{subscription.package}</TableCell>
                                        <TableCell className="text-center">{subscription.speed} Mbps</TableCell>
                                        <TableCell className="text-center">{formatRupiah(subscription.price)}</TableCell>
                                        <TableCell className="text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(subscription.status)}`}>
                                                {subscription.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {formatDate(subscription.start_date)} - {formatDate(subscription.end_date)}
                                        </TableCell>
                                        <TableCell className="text-center">{formatDate(subscription.created_at)}</TableCell>
                                        <TableCell className="text-center">
                                            <button className="text-blue-600 hover:text-blue-800">
                                                View Details
                                            </button>
                                        </TableCell>
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
