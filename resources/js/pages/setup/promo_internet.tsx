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
import { id } from 'date-fns/locale';

interface Promo {
    id: number;
    name: string;
    free_months: number;
    created_at: string;
    updated_at: string;
}

interface Props {
    promos: Promo[];
}

const breadcrumbs = [
    {
        title: 'Setting',
        href: '/setting',
    },
    {
        title: 'Internet Promo',
        href: '/setting/promo-internet',
    },
];

export default function PromoInternetPage({ promos }: Props) {
    const [isOpen, setIsOpen] = useState(false);
    const { data, setData, post, processing } = useForm({
        name: '',
        free_months: '',
    });

    const formatDate = (date: string) => {
        return format(parseISO(date), 'd MMMM yyyy', { locale: id });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/setting/promo-internet', {
            onSuccess: () => {
                setIsOpen(false);
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="Internet Promos" />
            <div className="p-4">
                <Card>
                    <CardHeader className="flex flex-row items-center justify-between">
                        <CardTitle>Internet Promos</CardTitle>
                        <Dialog open={isOpen} onOpenChange={setIsOpen}>
                            <DialogTrigger asChild>
                                <Button>Add New Promo</Button>
                            </DialogTrigger>
                            <DialogContent>
                                <DialogHeader>
                                    <DialogTitle>Add New Internet Promo</DialogTitle>
                                </DialogHeader>
                                <form onSubmit={handleSubmit} className="space-y-4">
                                    <div className="space-y-2">
                                        <Label htmlFor="name">Promo Name</Label>
                                        <Input
                                            id="name"
                                            value={data.name}
                                            onChange={e => setData('name', e.target.value)}
                                            required
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <Label htmlFor="free_months">Free Months</Label>
                                        <Input
                                            id="free_months"
                                            type="number"
                                            min="1"
                                            value={data.free_months}
                                            onChange={e => setData('free_months', e.target.value)}
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
                                    <TableHead className="text-center">Name</TableHead>
                                    <TableHead className="text-center">Free Months</TableHead>
                                    <TableHead className="text-center">Created At</TableHead>
                                    <TableHead className="text-center">Updated At</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {promos.map((promo) => (
                                    <TableRow key={promo.id}>
                                        <TableCell className="text-center">{promo.name}</TableCell>
                                        <TableCell className="text-center">{promo.free_months}</TableCell>
                                        <TableCell className="text-center">{formatDate(promo.created_at)}</TableCell>
                                        <TableCell className="text-center">{formatDate(promo.updated_at)}</TableCell>
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
