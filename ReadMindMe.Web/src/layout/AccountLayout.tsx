import Navigation from "@/components/navigation";
import { Outlet } from "react-router-dom";

export default function AccountLayout() {


  return (
    <div>
      {" "}
      <Navigation />
     <Outlet/>
    </div>
  );
}
