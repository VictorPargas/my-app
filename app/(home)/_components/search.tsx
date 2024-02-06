"use client";

import { Button } from "@/app/_components/ui/button";
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from "@/app/_components/ui/form";
import { Input } from "@/app/_components/ui/input";
import { SearchIcon } from "lucide-react";
import { useForm } from "react-hook-form";
import { zodResolver} from "@hookform/resolvers/zod"

import { z } from "zod"
import { useRouter } from "next/navigation";


const formSchema = z.object({
    Search: z.string({
        required_error: "Campo obrigatório"
    }).trim().min(1, "Campo obrigatório"),
});

interface SearchProps {
    defaultValues?: z.infer<typeof formSchema>;
}

const Search = ({ defaultValues } : SearchProps) => {
    const router = useRouter();
    const form = useForm<z.infer<typeof formSchema>>({
        resolver: zodResolver(formSchema),
    });

    const handleSubmit = (data: z.infer<typeof formSchema>) => {
        router.push(`/barbershops?search=${data.Search}`);
        
    }
    return ( 
        <div className="flex itemns-center gap-2">
            <Form {...form}>
                <form className="flex w-full gap-4" onSubmit={form.handleSubmit(handleSubmit)}>
                    <FormField
                     control={form.control}
                      name="Search"
                       render={({field}) => (
                        <FormItem className="w-full">
                            <FormControl>
                            <Input placeholder="Busque por uma Barbearia..." {...field} />
                               </FormControl>
                            <FormMessage />
                        </FormItem>
                    )}
                    />

                    
                    <Button variant="default" size="icon" type="submit">
                        <SearchIcon size={20} />
                    </Button>
                </form>
            </Form>
        </div>
     );
}
 
export default Search ;