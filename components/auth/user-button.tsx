import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
  } from "@/components/ui1/dropdown-menu"
  
  import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { FaUser } from "react-icons/fa"

import { LogoutButton } from "./logout-button"
import {LogOutIcon} from "lucide-react"
import { currentUser } from "@/lib/auth"

  export const UserButton = async( ) => {
    const user = await currentUser();
    return (
      <DropdownMenu>
        <DropdownMenuTrigger>
            <Avatar>
                <AvatarImage src={user?.image || ""}/>
                <AvatarFallback className="bg-sky-500">
                    <FaUser className="text-white"/>
                </AvatarFallback>
            </Avatar>
        </DropdownMenuTrigger>
        <DropdownMenuContent className=" mr-2">
            <LogoutButton>
                <DropdownMenuItem>
                    <LogOutIcon className="h-4 w-4 mr-2"/>
                    Logout
                </DropdownMenuItem>
            </LogoutButton>

        </DropdownMenuContent>
      </DropdownMenu>
    )
  }
  