"use client";

import { useSession } from "next-auth/react";
import { usePathname, useRouter } from "next/navigation";
import { createContext, useEffect, useState } from "react";
import { PulseLoader } from "react-spinners";

export const GlobalContext = createContext(null);

export default function GlobalState({ children }) {
  const [sideBarOpen, setSideBarOpen] = useState(false);
  const [loader, setLoader] = useState(true);
  const { status } = useSession();
  const pathName = usePathname();
  const router = useRouter();

  useEffect(() => {
    if (status === "loading") setLoader(true);
    if (
      status === "unauthenticated" &&
      pathName.includes("/" || "/products" || "/visitors")
    ) {
      router.push("/unauth-page");
      setLoader(false);
    }

    if (status === "authenticated") setLoader(false);
  }, [status]);

  if (loader) {
    return (
      <div className="w-full min-h-screen flex justify-center items-center">
        <PulseLoader
          color="#000000"
          loading={loader}
          size={35}
          data-textid="Loader"
        />
      </div>
    );
  }

  return (
    <GlobalContext.Provider value={{ sideBarOpen, setSideBarOpen }}>
      {children}
    </GlobalContext.Provider>
  );
}
