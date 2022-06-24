import React, { ReactNode } from "react";
import { useSession } from "next-auth/react";
import DashLayout from "../components/dashlayout";
import Head from 'next/head'

type Props = {
  children: ReactNode;
  pagename: string;
};

const Layout: React.FC<Props> = (props) => {
  const pagename = props.pagename
  const { data: session, status } = useSession()
  if (session && status == "authenticated") {
    return (
      <>
        <Head>
          <title>OcktankCU</title>
          <link rel="icon" href="/ocktankculogo.svg" />
        </Head>
        <DashLayout pagename={pagename} name={session.user?.name ? session.user.name : "User 1"}>
          {props.children}
        </DashLayout>
      </>)

  }

  if (status === "loading") {
    return (
      <>
        <Head>
          <title>OcktankCU</title>
          <link rel="icon" href="/ocktankculogo.svg" />
        </Head>
        <DashLayout pagename={pagename} name={"User 1"}>
          Loading...
        </DashLayout>
      </>
    )
  }

  return (
    <>
      <Head>
        <title>OcktankCU</title>
        <link rel="icon" href="/ocktankculogo.svg" />
      </Head>
      <div className="h-[100vh]">
        <div className=" w-full flex flex-col justify-center items-center min-h-full">
          <p>Not signed in</p>
          <a className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500" href="/signin">
            Sign In
          </a>
        </div>
      </div>
    </>
  )


};

export default Layout;