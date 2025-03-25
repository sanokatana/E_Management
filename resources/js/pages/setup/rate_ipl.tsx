import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { useForm } from '@inertiajs/react';
import { useState } from 'react';
import AppLayout from '@/layouts/app-layout';
import { format, parseISO } from 'date-fns';
import { formatRupiah } from '@/lib/utils';
import { id } from 'date-fns/locale';

interface Rate {
    id: number;
    rate: number;
    periode_start: string;
    periode_end: string;
}

interface Props {
    rates: Rate[];
}

const breadcrumbs = [
    {
        title: 'Setting',
        href: '/setting',
    },
    {
        title: 'IPL Rate',
        href: '/setting/rate-ipl',
    },
];

export default function IplRatePage({ rates }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, post, processing } = useForm({
        rate: '',
        periode_start: '',
        periode_end: '',
    });

    const formatDate = (date: string) => {
        return format(parseISO(date), 'd MMMM yyyy', { locale: id });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/setting/rate-ipl', {
            onSuccess: () => {
                setIsOpen(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="IPL Rates" />
            <div className="p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>IPL Rates</CardTitle>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button>Add New Rate</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New IPL Rate</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="rate">Rate Amount</Label>
                                        <Input
                                            id="rate"
                                            type="number"
                                            value={data.rate}
                                            onChange={e => setData('rate', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="periode_start">Start Date</Label>
                                        <Input
                                            id="periode_start"
                                            type="date"
                                            value={data.periode_start}
                                            onChange={e => setData('periode_start', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="periode_end">End Date</Label>
                                        <Input
                                            id="periode_end"
                                            type="date"
                                            value={data.periode_end}
                                            onChange={e => setData('periode_end', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="flex justify-end space-x-2">
                                        <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                                            Cancel
                                        </Button>
                                        <Button type="submit" disabled={processing}>
                                            Save
                                        </Button>
                                    </div>
                                </form>
                            </DialogContent>
                        </Dialog>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Rate</TableHead>
                                    <TableHead className="text-center">Start Date</TableHead>
                                    <TableHead className="text-center">End Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rates.map((rate) => (
                                    <TableRow key={rate.id}>
                                        <TableCell className="text-center">{formatRupiah(rate.rate)}</TableCell>
                                        <TableCell className="text-center">{formatDate(rate.periode_start)}</TableCell>
                                        <TableCell className="text-center">{formatDate(rate.periode_end)}</TableCell>
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
