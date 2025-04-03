import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel } from "@/components/ui/form";
import { Input } from "@/components/ui/input";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import * as z from "zod";
import * as React from "react";

const createInvoiceSchema = z.object({
    customerId: z.number(),
    // Invoice Numbers
    ipl_invoice: z.string(),
    int_invoice: z.string(),

    // IPL Fields
    kuantitas_ipl: z.number().min(0),
    potongan_ipl: z.number().min(0),
    total_ipl: z.number().min(0),
    denda_ipl: z.number().min(0),
    ppn_ipl: z.number().min(0),
    ppn_iplnominal: z.number().min(0),
    diskonipl_persen: z.number().min(0),
    diskonipl_nominal: z.number().min(0),
    diskonipl_nominaltopersen: z.number().min(0),
    diskonipl_persentonominal: z.number().min(0),
    promo_ipl: z.number().min(0),
    promo_iplpersen: z.number().min(0),
    promo_iplnominal: z.number().min(0),
    start_ipl_invoice: z.date(),
    end_ipl_invoice: z.date(),
    bulanpromoipl_invoice: z.number().min(0),
    namapromoipl_invoice: z.string().optional(),

    // Internet Fields
    speed_internet: z.string().optional(),
    internet_invoice: z.number().min(0),
    kuantitas_internet: z.number().min(0),
    potongan_internet: z.number().min(0),
    total_internet: z.number().min(0),
    denda_internet: z.number().min(0),
    ppn_internet: z.number().min(0),
    ppn_internetnominal: z.number().min(0),
    diskoninternet_persen: z.number().min(0),
    diskoninternet_nominal: z.number().min(0),
    diskoninternet_nominaltopersen: z.number().min(0),
    diskoninternet_persentonominal: z.number().min(0),
    promo_internet: z.number().min(0),
    promo_internetpersen: z.number().min(0),
    promo_internetnominal: z.number().min(0),
    startinternet_invoice: z.date(),
    endinternet_invoice: z.date(),
    bulanpromointernet_invoice: z.number().min(0),
    namapromointernet_invoice: z.string().optional(),

    // General Fields
    potongan_tambahan: z.number().min(0),
    grandtotal_invoice: z.number().min(0),
    status_invoice: z.string(),
    penalty_invoice: z.number().min(0),
    ppn_invoice: z.number().min(0),
    subtotal: z.number().min(0),
    send_date: z.date().optional(),
    tgl_bayar: z.date().optional(),
    tgl_jatuhtempo: z.date(),
});

export type CreateInvoiceForm = z.infer<typeof createInvoiceSchema>;

interface CreateInvoiceModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSubmit: (data: CreateInvoiceForm) => void;
    customerId: number;
}

export function CreateInvoiceModal({ isOpen, onClose, onSubmit, customerId }: CreateInvoiceModalProps) {
    const form = useForm<CreateInvoiceForm>({
        resolver: zodResolver(createInvoiceSchema),
        defaultValues: {
            customerId,
            ipl_invoice: "",
            int_invoice: "",
            kuantitas_ipl: 0,
            kuantitas_internet: 0,
            potongan_ipl: 0,
            potongan_internet: 0,
            total_ipl: 0,
            total_internet: 0,
            denda_ipl: 0,
            denda_internet: 0,
            ppn_ipl: 0,
            ppn_internet: 0,
            ppn_iplnominal: 0,
            ppn_internetnominal: 0,
            diskonipl_persen: 0,
            diskonipl_nominal: 0,
            diskonipl_nominaltopersen: 0,
            diskonipl_persentonominal: 0,
            promo_ipl: 0,
            promo_iplpersen: 0,
            promo_iplnominal: 0,
            diskoninternet_persen: 0,
            diskoninternet_nominal: 0,
            diskoninternet_nominaltopersen: 0,
            diskoninternet_persentonominal: 0,
            promo_internet: 0,
            promo_internetpersen: 0,
            promo_internetnominal: 0,
            potongan_tambahan: 0,
            grandtotal_invoice: 0,
            status_invoice: "pending",
            penalty_invoice: 0,
            ppn_invoice: 0,
            subtotal: 0,
            bulanpromoipl_invoice: 0,
            bulanpromointernet_invoice: 0,
        },
    });

    return (
        <Dialog open={isOpen} onOpenChange={onClose}>
            <DialogContent className="max-w-7xl max-h-[95vh] overflow-y-auto bg-background">
                <DialogHeader>
                    <DialogTitle>Create New Invoice</DialogTitle>
                </DialogHeader>

                <Form {...form}>
                    <form onSubmit={form.handleSubmit((data) => onSubmit({ ...data, customerId }))} className="space-y-6">
                        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
                            {/* Invoice Numbers Section */}
                            <div className="lg:col-span-2 space-y-4">
                                <h3 className="font-semibold text-lg">Invoice Numbers</h3>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="ipl_invoice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>IPL Invoice Number</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="int_invoice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Internet Invoice Number</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* IPL Section */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">IPL Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="kuantitas_ipl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>IPL Quantity</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="potongan_ipl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>IPL Discount</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="ppn_ipl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>IPL Tax (%)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="promo_ipl"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>IPL Promo</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="start_ipl_invoice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>IPL Start Date</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        {...field}
                                                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                                        onChange={e => field.onChange(new Date(e.target.value))}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="end_ipl_invoice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>IPL End Date</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        {...field}
                                                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                                        onChange={e => field.onChange(new Date(e.target.value))}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* Internet Section */}
                            <div className="space-y-4">
                                <h3 className="font-semibold text-lg">Internet Details</h3>
                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="speed_internet"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Internet Speed</FormLabel>
                                                <FormControl>
                                                    <Input {...field} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="kuantitas_internet"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Internet Quantity</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="potongan_internet"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Internet Discount</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="ppn_internet"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Internet Tax (%)</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="startinternet_invoice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Internet Start Date</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        {...field}
                                                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                                        onChange={e => field.onChange(new Date(e.target.value))}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="endinternet_invoice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Internet End Date</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        {...field}
                                                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                                        onChange={e => field.onChange(new Date(e.target.value))}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>

                            {/* General Section */}
                            <div className="lg:col-span-2 space-y-4">
                                <h3 className="font-semibold text-lg">General Information</h3>
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                                    <FormField
                                        control={form.control}
                                        name="status_invoice"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Status</FormLabel>
                                                <FormControl>
                                                    <select {...field} className="w-full rounded-md border border-input bg-background px-3 py-2">
                                                        <option value="pending">Pending</option>
                                                        <option value="paid">Paid</option>
                                                        <option value="overdue">Overdue</option>
                                                    </select>
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="tgl_jatuhtempo"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Due Date</FormLabel>
                                                <FormControl>
                                                    <Input
                                                        type="date"
                                                        {...field}
                                                        value={field.value ? new Date(field.value).toISOString().split('T')[0] : ''}
                                                        onChange={e => field.onChange(new Date(e.target.value))}
                                                    />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                    <FormField
                                        control={form.control}
                                        name="potongan_tambahan"
                                        render={({ field }) => (
                                            <FormItem>
                                                <FormLabel>Additional Discount</FormLabel>
                                                <FormControl>
                                                    <Input type="number" {...field} onChange={e => field.onChange(Number(e.target.value))} />
                                                </FormControl>
                                            </FormItem>
                                        )}
                                    />
                                </div>
                            </div>
                        </div>

                        <div className="flex justify-end gap-4 pt-4">
                            <Button type="button" variant="outline" onClick={onClose}>
                                Cancel
                            </Button>
                            <Button type="submit">
                                Create Invoice
                            </Button>
                        </div>
                    </form>
                </Form>
            </DialogContent>
        </Dialog>
    );
}
