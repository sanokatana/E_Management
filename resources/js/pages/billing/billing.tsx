import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import AppLayout from '@/layouts/app-layout';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale/id';
import { useState } from 'react';
import { CreateInvoiceModal } from '@/components/invoice/CreateInvoiceModal';
import { Button } from '@/components/ui/button';
import { PlusIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import { CreateInvoiceForm } from '@/components/invoice/CreateInvoiceModal';

interface Bill {
    id: number;
    NoCustomer: string;
    NoST: string;
    nominal_ipl: number;
    nominal_internet: number;
    ipl_rate_id: number;
    internet_id: number;
    periode_ipl_start: string;
    periode_ipl_end: string;
    periode_internet_start: string;
    periode_internet_end: string;
    status: string;
    created_at: string;
    updated_at: string;
}

interface Props {
    bills: Bill[];
}

const breadcrumbs = [
    {
        title: 'Billing',
        href: '/billing',
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

export default function BillingPage({ bills }: Props) {
    const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
    const [selectedBillId, setSelectedBillId] = useState<number | null>(null);

    const handleCreateInvoice = (billId: number) => {
        setSelectedBillId(billId);
        setIsCreateModalOpen(true);
    };

    const handleSubmitInvoice = async (data: CreateInvoiceForm) => {
        try {
            await axios.post('/api/invoices', {
                ...data,
                id_billing: selectedBillId,
            });
            setIsCreateModalOpen(false);
            // You might want to refresh the page or update the bills list here
        } catch (error) {
            console.error('Error creating invoice:', error);
        }
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Billing" />
            <div className="p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>Billing</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Customer No</TableHead>
                                    <TableHead className="text-center">BAST No</TableHead>
                                    <TableHead className="text-center">IPL Amount</TableHead>
                                    <TableHead className="text-center">Internet Amount</TableHead>
                                    <TableHead className="text-center">IPL Period</TableHead>
                                    <TableHead className="text-center">Internet Period</TableHead>
                                    <TableHead className="text-center">Status</TableHead>
                                    <TableHead className="text-center">Created At</TableHead>
                                    <TableHead className="text-center">Actions</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {bills.map((bill) => (
                                    <TableRow key={bill.id}>
                                        <TableCell className="text-center">{bill.NoCustomer}</TableCell>
                                        <TableCell className="text-center">{bill.NoST}</TableCell>
                                        <TableCell className="text-center">{formatRupiah(bill.nominal_ipl)}</TableCell>
                                        <TableCell className="text-center">{formatRupiah(bill.nominal_internet)}</TableCell>
                                        <TableCell className="text-center">
                                            {formatDate(bill.periode_ipl_start)} - {formatDate(bill.periode_ipl_end)}
                                        </TableCell>
                                        <TableCell className="text-center">
                                            {bill.periode_internet_start ? (
                                                <>
                                                    {formatDate(bill.periode_internet_start)} - {formatDate(bill.periode_internet_end)}
                                                </>
                                            ) : (
                                                '-'
                                            )}
                                        </TableCell>
                                        <TableCell className="text-center">{bill.status}</TableCell>
                                        <TableCell className="text-center">{formatDate(bill.created_at)}</TableCell>
                                        <TableCell className="text-center">
                                            <Button
                                                variant="outline"
                                                size="sm"
                                                onClick={() => handleCreateInvoice(bill.id)}
                                            >
                                                <PlusIcon className="h-4 w-4 mr-2" />
                                                Create Invoice
                                            </Button>
                                        </TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </CardContent>
                </Card>
            </div>

            {selectedBillId && (
                <CreateInvoiceModal
                    isOpen={isCreateModalOpen}
                    onClose={() => setIsCreateModalOpen(false)}
                    onSubmit={handleSubmitInvoice}
                    customerId={selectedBillId}
                />
            )}
        </AppLayout>
    );
}
