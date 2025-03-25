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
import { Button } from '@/components/ui/button';
import { ReceiptText } from 'lucide-react';
import AppLayout from '@/layouts/app-layout';
import { type BreadcrumbItem } from '@/types';
import {
    Dialog,
    DialogContent,
    DialogDescription,
    DialogHeader,
    DialogTitle,
    DialogTrigger,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useState } from "react";
import { formatRupiah } from '@/lib/utils';
import { useForm } from "@inertiajs/react";

interface Bast {
    NoST: string;
    NoKontrak: string;
    NoSL: string;
    NamaCustomer: string;
    NoCustomer: string;
    LuasTanah: number;
}

interface IplRate {
    id: number;
    rate: number;
    periode_start: string;
    periode_end: string;
}

interface InternetRate {
    id: number;
    speed: string;
    tariff: number;
    periode_start: string;
    periode_end: string;
}

interface Props {
    basts: Bast[];
    iplRates: IplRate[];
    internetRates: InternetRate[]; // Add this
}

// Define form data type with index signature
interface BillForm {
    [key: string]: string | File | null;
    NoCustomer: string;
    NoST: string;
    nominal_ipl: string;
    nominal_internet: string;
    ipl_rate_id: string;
    internet_id: string;
    periode_ipl_start: string;
    periode_ipl_end: string;
    periode_internet_start: string;
    periode_internet_end: string;
    status: string;
}

const breadcrumbs: BreadcrumbItem[] = [
    {
        title: 'Data',
        href: '/data',
    },
    {
        title: 'BAST',
        href: '/data/bast',
    },
];

export default function BastPage({ basts, iplRates, internetRates }: Props) {
    const [openDialogs, setOpenDialogs] = useState<{ [key: string]: boolean }>({});
    const { data, setData, post, processing } = useForm<BillForm>({
        NoCustomer: '',
        NoST: '',
        nominal_ipl: '',
        nominal_internet: '',
        ipl_rate_id: '',
        internet_id: '',
        periode_ipl_start: '',
        periode_ipl_end: '',
        periode_internet_start: '',
        periode_internet_end: '',
        status: 'Unpaid',
    });

    const calculateIplAmount = (luasTanah: number, rateId: string) => {
        const selectedRate = iplRates.find(rate => rate.id === parseInt(rateId));
        if (selectedRate) {
            return Number(luasTanah) * Number(selectedRate.rate);
        }
        return 0;
    };

    const handleRateChange = (e: React.ChangeEvent<HTMLSelectElement>, luasTanah: number) => {
        const rateId = e.target.value;
        const amount = calculateIplAmount(luasTanah, rateId);
        setData({
            ...data,
            ipl_rate_id: rateId,
            nominal_ipl: amount.toString()
        });
    };

    const handleInternetRateChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        const rateId = e.target.value;
        const selectedRate = internetRates.find(rate => rate.id === parseInt(rateId));

        setData({
            ...data,
            internet_id: rateId,
            nominal_internet: selectedRate ? selectedRate.tariff.toString() : ''
        });
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        post('/create/bill', {
            onSuccess: () => {
                setOpenDialogs({});
            },
        });
    };

    return (
        <AppLayout breadcrumbs={breadcrumbs}>
            <Head title="BAST Data" />

            <div className="flex h-full flex-1 flex-col gap-4 p-4">
                <Card>
                    <CardHeader>
                        <CardTitle>BAST Data</CardTitle>
                    </CardHeader>
                    <CardContent>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead className="text-center">Nama Customer</TableHead>
                                    <TableHead className="text-center">No. BAST</TableHead>
                                    <TableHead className="text-center">No. Kontrak</TableHead>
                                    <TableHead className="text-center">No. SL</TableHead>
                                    <TableHead className="text-center">Luas Tanah</TableHead>
                                    <TableHead className="text-center">Action</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {basts.map((bast) => (
                                    <TableRow key={bast.NoST}>
                                        <TableCell className="text-center">{bast.NamaCustomer}</TableCell>
                                        <TableCell className="text-center">{bast.NoST}</TableCell>
                                        <TableCell className="text-center">{bast.NoKontrak}</TableCell>
                                        <TableCell className="text-center">{bast.NoSL}</TableCell>
                                        <TableCell className="text-center">{bast.LuasTanah}</TableCell>
                                        <TableCell className="text-center">
                                            <Dialog
                                                open={openDialogs[bast.NoST]}
                                                onOpenChange={(open) => {
                                                    setOpenDialogs(prev => ({ ...prev, [bast.NoST]: open }));
                                                    if (open) {
                                                        setData({
                                                            ...data,
                                                            NoST: bast.NoST,
                                                            NoCustomer: bast.NoCustomer,
                                                            ipl_rate_id: '',
                                                            nominal_ipl: ''
                                                        });
                                                    }
                                                }}
                                            >
                                                <DialogTrigger asChild>
                                                    <Button
                                                        variant="ghost"
                                                        size="icon"
                                                        className="h-9 w-9 hover:bg-primary/10"
                                                    >
                                                        <ReceiptText className="h-5 w-5" />
                                                        <span className="sr-only">Create Bill</span>
                                                    </Button>
                                                </DialogTrigger>
                                                <DialogContent className="sm:max-w-[600px]">
                                                    <DialogHeader>
                                                        <DialogTitle>Create New Bill</DialogTitle>
                                                        <DialogDescription>
                                                            Create a new bill for BAST number {bast.NoST}
                                                        </DialogDescription>
                                                    </DialogHeader>
                                                    <form onSubmit={handleSubmit} className="space-y-4">
                                                        <div className="grid grid-cols-2 gap-4">
                                                            <div className="space-y-2">
                                                                <Label htmlFor="NoST">BAST Number</Label>
                                                                <Input
                                                                    id="NoST"
                                                                    value={data.NoST}
                                                                    onChange={e => setData('NoST', e.target.value)}
                                                                    disabled
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="NoCustomer">Customer Number</Label>
                                                                <Input
                                                                    id="NoCustomer"
                                                                    value={data.NoCustomer}
                                                                    onChange={e => setData('NoCustomer', e.target.value)}
                                                                    disabled
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="ipl_rate_id">IPL Rate</Label>
                                                                <select
                                                                    id="ipl_rate_id"
                                                                    value={data.ipl_rate_id}
                                                                    onChange={(e) => handleRateChange(e, bast.LuasTanah)}
                                                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1"
                                                                    required
                                                                >
                                                                    <option value="">Select rate</option>
                                                                    {iplRates.map((rate) => (
                                                                        <option key={rate.id} value={rate.id}>
                                                                            {formatRupiah(rate.rate)} per m²
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="nominal_ipl">IPL Amount</Label>
                                                                <Input
                                                                    id="nominal_ipl"
                                                                    type="number"
                                                                    value={data.nominal_ipl}
                                                                    onChange={e => setData('nominal_ipl', e.target.value)}
                                                                    disabled
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="nominal_internet">Internet Amount</Label>
                                                                <Input
                                                                    id="nominal_internet"
                                                                    type="number"
                                                                    value={data.nominal_internet}
                                                                    onChange={e => setData('nominal_internet', e.target.value)}
                                                                    disabled
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="internet_id">Internet Package</Label>
                                                                <select
                                                                    id="internet_id"
                                                                    value={data.internet_id}
                                                                    onChange={handleInternetRateChange}
                                                                    className="flex h-9 w-full rounded-md border border-input bg-background px-3 py-1"
                                                                >
                                                                    <option value="">Select package</option>
                                                                    {internetRates.map((rate) => (
                                                                        <option key={rate.id} value={rate.id}>
                                                                            {rate.speed} - {formatRupiah(rate.tariff)}
                                                                        </option>
                                                                    ))}
                                                                </select>
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="periode_ipl_start">IPL Period Start</Label>
                                                                <Input
                                                                    id="periode_ipl_start"
                                                                    type="date"
                                                                    value={data.periode_ipl_start}
                                                                    onChange={e => setData('periode_ipl_start', e.target.value)}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="periode_ipl_end">IPL Period End</Label>
                                                                <Input
                                                                    id="periode_ipl_end"
                                                                    type="date"
                                                                    value={data.periode_ipl_end}
                                                                    onChange={e => setData('periode_ipl_end', e.target.value)}
                                                                    required
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="periode_internet_start">Internet Period Start</Label>
                                                                <Input
                                                                    id="periode_internet_start"
                                                                    type="date"
                                                                    value={data.periode_internet_start}
                                                                    onChange={e => setData('periode_internet_start', e.target.value)}
                                                                />
                                                            </div>
                                                            <div className="space-y-2">
                                                                <Label htmlFor="periode_internet_end">Internet Period End</Label>
                                                                <Input
                                                                    id="periode_internet_end"
                                                                    type="date"
                                                                    value={data.periode_internet_end}
                                                                    onChange={e => setData('periode_internet_end', e.target.value)}
                                                                />
                                                            </div>
                                                        </div>
                                                        <div className="flex justify-end space-x-2">
                                                            <Button
                                                                type="button"
                                                                variant="outline"
                                                                onClick={() => setOpenDialogs(prev => ({ ...prev, [bast.NoST]: false }))}
                                                            >
                                                                Cancel
                                                            </Button>
                                                            <Button
                                                                type="submit"
                                                                disabled={processing}
                                                            >
                                                                Create Bill
                                                            </Button>
                                                        </div>
                                                    </form>
                                                </DialogContent>
                                            </Dialog>
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
