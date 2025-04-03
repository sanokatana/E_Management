import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale/id';

interface RenovationRequest {
    id: number;
    request_no: string;
    unit: string;
    owner_name: string;
    type: string;
    description: string;
    start_date: string;
    end_date: string;
    status: 'pending' | 'approved' | 'rejected' | 'in_progress' | 'completed';
    created_at: string;
    updated_at: string;
}

interface Props {
    requests: RenovationRequest[];
}

const breadcrumbs = [
    {
        title: 'Renovation',
        href: '/estate/renovation',
    },
];

const formatDate = (date: string) => {
    try {
        return format(parseISO(date), 'dd MMMM yyyy', { locale: id });
    } catch {
        return date;
    }
};

const getStatusColor = (status: RenovationRequest['status']) => {
    const colors = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        in_progress: 'bg-blue-100 text-blue-800',
        completed: 'bg-gray-100 text-gray-800',
    };
    return colors[status];
};

export default function RenovationPage({ requests }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Renovation" />
            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Renovation Requests</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Request No</TableHead>
                                    <TableHead className="text-center">Unit</TableHead>
                                    <TableHead className="text-center">Owner</TableHead>
                                    <TableHead className="text-center">Type</TableHead>
                                    <TableHead className="text-center">Description</TableHead>
                                    <TableHead className="text-center">Period</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-center">Created At</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {requests.map((request) => (
                                    <TableRow key={request.id}>
                                        <TableCell className="text-center">{request.request_no}</TableCell>
                                        <TableCell className="text-center">{request.unit}</TableCell>
                                        <TableCell className="text-center">{request.owner_name}</TableCell>
                                        <TableCell className="text-center">{request.type}</TableCell>
                                        <TableCell className="text-center">{request.description}</TableCell>
                                        <TableCell className="text-center">
                                            {formatDate(request.start_date)} - {formatDate(request.end_date)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(request.status)}`}>
                                                {request.status.replace('_', ' ')}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">{formatDate(request.created_at)}</TableCell>
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
