import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale/id';

interface Booking {
    id: number;
    booking_no: string;
    facility: string;
    user_name: string;
    unit: string;
    date: string;
    start_time: string;
    end_time: string;
    status: 'pending' | 'approved' | 'rejected' | 'completed' | 'cancelled';
    created_at: string;
    updated_at: string;
}

interface Props {
    bookings: Booking[];
}

const breadcrumbs = [
    {
        title: 'Facilities',
        href: '/estate/facilities',
    },
];

const formatDate = (date: string) => {
    try {
        return format(parseISO(date), 'dd MMMM yyyy', { locale: id });
    } catch {
        return date;
    }
};

const getStatusColor = (status: Booking['status']) => {
    const colors = {
        pending: 'bg-yellow-100 text-yellow-800',
        approved: 'bg-green-100 text-green-800',
        rejected: 'bg-red-100 text-red-800',
        completed: 'bg-blue-100 text-blue-800',
        cancelled: 'bg-gray-100 text-gray-800',
    };
    return colors[status];
};

export default function FacilitiesPage({ bookings }: Props) {
    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Facilities" />
            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Facility Bookings</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Booking No</TableHead>
                                    <TableHead className="text-center">Facility</TableHead>
                                    <TableHead className="text-center">User</TableHead>
                                    <TableHead className="text-center">Unit</TableHead>
                                    <TableHead className="text-center">Date</TableHead>
                                    <TableHead className="text-center">Time</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-center">Created At</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bookings.map((booking) => (
                                    <TableRow key={booking.id}>
                                        <TableCell className="text-center">{booking.booking_no}</TableCell>
                                        <TableCell className="text-center">{booking.facility}</TableCell>
                                        <TableCell className="text-center">{booking.user_name}</TableCell>
                                        <TableCell className="text-center">{booking.unit}</TableCell>
                                        <TableCell className="text-center">{formatDate(booking.date)}</TableCell>
                                        <TableCell className="text-center">
                                            {booking.start_time} - {booking.end_time}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            <span className={`px-2 py-1 rounded-full text-xs font-medium ${getStatusColor(booking.status)}`}>
                                                {booking.status}
                                            </span>
                                        </TableCell>
                                        <TableCell className="text-center">{formatDate(booking.created_at)}</TableCell>
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
