import { Head } from '@inertiajs/react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Button } from '@/components/ui/button';
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import AppLayout from '@/layouts/app-layout';
import { useForm } from '@inertiajs/react';
import { type BreadcrumbItem } from '@/types';
import { useState } from 'react';
import { formatRupiah } from '@/lib/utils';
import { format, parseISO } from 'date-fns';
import { id } from 'date-fns/locale';

interface Rate {
    id: number;
    speed: string;
    tariff: number;
    periode_start: string;
    periode_end: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Setting',
        href: '/setting',
    },
    {
        title: 'Internet Rate',
        href: '/setting/rate_internet',
    },
];

interface Props {
    rates: Rate[];
}

export default function InternetRatePage({ rates }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, post, processing } = useForm({
        speed: '',
        tariff: '',
        periode_start: '',
        periode_end: '',
    });

    const formatDate = (date: string) => {
            return format(parseISO(date), 'd MMMM yyyy', { locale: id });
        };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/setting/rate-internet', {
            onSuccess: () => {
                setIsOpen(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="BAST Data" />
            <div className="p-4">
                <Head title="Internet Rates" />
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Internet Rates</CardTitle>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button>Add New Rate</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Internet Rate</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="speed">Speed</Label>
                                        <Input
                                            id="speed"
                                            value={data.speed}
                                            onChange={e => setData('speed', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="tariff">Tariff</Label>
                                        <Input
                                            id="tariff"
                                            type="number"
                                            value={data.tariff}
                                            onChange={e => setData('tariff', e.target.value)}
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
                                    <TableHead className="text-center">Speed</TableHead>
                                    <TableHead className="text-center">Tariff</TableHead>
                                    <TableHead className="text-center">Start Date</TableHead>
                                    <TableHead className="text-center">End Date</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {rates.map((rate) => (
                                    <TableRow key={rate.id}>
                                        <TableCell className="text-center">{rate.speed}</TableCell>
                                        <TableCell className="text-center">{formatRupiah(rate.tariff)}</TableCell>
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
