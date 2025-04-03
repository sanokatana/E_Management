import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale/id';

interface Ticket {
    id: number;
    ticket_no: string;
    title: string;
    description: string;
    category: string;
    priority: 'low' | 'medium' | 'high' | 'urgent';
    status: 'open' | 'in_progress' | 'resolved' | 'closed';
    reported_by: string;
    unit: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    tickets: Ticket[];
}

const breadcrumbs = [
    {
        title: 'Customer Service',
        href: '/estate/customer-service',
    },
];

const formatDate = (date: string) => {
    try {
        return format(parseISO(date), 'dd MMMM yyyy', { locale: id });
    } catch {
        return date;
    }
};

const getPriorityColor = (priority: Ticket['priority']) => {
    const colors = {
        low: 'bg-gray-100 text-gray-800',
        medium: 'bg-yellow-100 text-yellow-800',
        high: 'bg-orange-100 text-orange-800',
        urgent: 'bg-red-100 text-red-800',
    };
    return colors[priority];
};

const getStatusColor = (status: Ticket['status']) => {
    const colors = {
        open: 'bg-blue-100 text-blue-800',
        in_progress: 'bg-yellow-100 text-yellow-800',
        resolved: 'bg-green-100 text-green-800',
        closed: 'bg-gray-100 text-gray-800',
    };
    return colors[status];
};

export default function CustomerServicePage({ tickets }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Customer Service" />
            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Support Tickets</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Ticket No</TableHead>
                                    <TableHead className="text-center">Title</TableHead>
                                    <TableHead className="text-center">Category</TableHead>
                                    <TableHead className="text-center">Priority</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-center">Reported By</TableHead>
                                    <TableHead className="text-center">Unit</TableHead>
                                    <TableHead className="text-center">Created At</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {tickets.map((ticket) => (
                                    <TableRow key={ticket.id}>
                                        <TableCell className="text-center">{ticket.ticket_no}</TableCell>
                                        <TableCell className="text-center">{ticket.title}</TableCell>
                                        <TableCell className="text-center">{ticket.category}</TableCell>
                                        <TableCell className="text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getPriorityColor(ticket.priority)}`}>
                                                {ticket.priority}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(ticket.status)}`}>
                                                {ticket.status.replace('_', ' ')}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">{ticket.reported_by}</TableCell>
                                        <TableCell className="text-center">{ticket.unit}</TableCell>
                                        <TableCell className="text-center">{formatDate(ticket.created_at)}</TableCell>
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