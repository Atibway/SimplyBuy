import { Copy, Server } from "lucide-react";
import { Alert, AlertDescription, AlertTitle } from "./alert";
import { Badge, BadgeProps } from "./badge";
import { Button } from "./button";
import toast from "react-hot-toast";
import { Card, CardDescription, CardTitle } from "../ui/card";

interface ApiAlertProps{
    title: string;
    description: string;
    variant: "public" | "admin"
}

const textMap: Record<ApiAlertProps["variant"], string> = {
    public: "Public",
    admin: "Admin"
}

const variantMap: Record<ApiAlertProps["variant"], BadgeProps["variant"]> = {
    public: "secondary",
    admin: "destructive"
}

export const ApiAlert: React.FC<ApiAlertProps> = ({
    title,
    description,
    variant
}) => {

    const onCopy = () => {
        navigator.clipboard.writeText(description);
        toast.success("API Route copied to clipboard")
    }

    return(
        <Card className="">
            <CardTitle className="flex items-center gap-x-2 p-2">
            <Server className="h-4 w-4" />
                {title}
                <Badge variant={variantMap[variant]}>
                    {textMap[variant]}
                </Badge>
                <Button
                className=" sm:hidden"
                variant={"outline"} size={"icon"} onClick={onCopy}>
                 <Copy className="h-4 w-4"/>
                </Button>
            </CardTitle>
            <CardDescription className="mt-4 sm:mx-4 sm:my-3  flex items-center justify-between ">
                <code className="relative rounded bg-muted px-[0.rem] py-[0.2rem] font-mono font-semibold">
                    {description}
                </code>
                <Button
                className="hidden sm:block"
                variant={"outline"} size={"icon"} onClick={onCopy}>
                 <Copy className="h-4 w-4"/>
                </Button>
            </CardDescription>
        </Card>
    )
}
