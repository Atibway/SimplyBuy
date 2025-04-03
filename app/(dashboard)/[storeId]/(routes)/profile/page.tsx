import { currentUser } from "@/lib/auth";
import {ProfileForm} from "./_components/profileForm";
import { db } from "@/lib/prismadb";

const SettingPage1 = async() => {
 const user = await currentUser()
 const userInfo = await db.user.findUnique({
  where:{
    id: user?.id
  }
 })
  return (
    <div>
      <ProfileForm
      userInfo={userInfo}
      />
    </div>
  );
};

export default SettingPage1;
