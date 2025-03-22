import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Link } from '@inertiajs/react';

export default function AuthCardLayout({
    children,
    title,
    description,
}: {
    children: React.ReactNode;
    name?: string;
    title?: string;
    description?: string;
}) {
    return (
        <div className="bg-[url('/storage/images/BIO.jpg')] bg-cover bg-center bg-no-repeat flex min-h-svh flex-col items-center justify-center gap-6 p-6 md:p-10">
            <div className="flex w-full max-w-md flex-col gap-6">
                <Link href={route('home')} className="flex items-center gap-2 self-center font-medium">
                    <div className="flex h-9 w-9 items-center justify-center">
                        <img src="/storage/images/logo.png" alt="Logo" className="size-35 mb-10" style={{ maxWidth: 'none' }} />
                    </div>
                </Link>

                <div className="flex flex-col gap-6">
                    <Card className="rounded-xl">
                        <CardHeader className="px-10 pt-8 pb-0 text-center">
                            <CardTitle className="text-xl">{title}</CardTitle>
                            <CardDescription>{description}</CardDescription>
                        </CardHeader>
                        <CardContent className="px-10 py-8">{children}</CardContent>
                    </Card>
                </div>
            </div>
        </div>
    );
}
