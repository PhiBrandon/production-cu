import { NextPage } from "next";
import Layout from "../components/layout";
import { getSession } from "next-auth/react";
import { PrismaClient } from "@prisma/client";
import { InferGetServerSidePropsType } from "next";
import { GetServerSideProps } from "next";
import { useSession } from "next-auth/react";

export const getServerSideProps: GetServerSideProps = async (context) => {
    const session = await getSession(context);
    const client = new PrismaClient();
    const email = session?.user?.email
    console.log(email)
    const userInformation = await client.users.findFirst({
        where: {
            email: email != null ? email : undefined,
        }
    })
    const userId = userInformation?.id.toString()
    const loanApplications = await client.loanapplications.findMany({
      where: {
        userid: userId,
      },
    });
    /* const cleanedApplications = loanApplications.map((application) => ({
      ...application,
      creditscore: application.creditscore?.toNumber(),
      postalcode: application.postalcode?.toNumber(),
      appliedat: application.appliedat?.toNumber(),
      amountdue: application.amountdue?.toNumber(),
    })); */
    client.$disconnect();
    return {
      props: {
        data: loanApplications,
      },
    };
  };

const Loans: NextPage = ({
    data,
  }: InferGetServerSidePropsType<typeof getServerSideProps>) => {
    const pagename = "Current Loans"
    const { data: session, status: isLoading } = useSession();
    return (
        <Layout pagename={pagename}>
            {isLoading != "loading" ? (
            data ? (
              /* Loans Modules */
              <>
                <div className="grid col-auto lg:grid-cols-2 p-5 text-center mx-auto ">
                  {/* {props.loans.map((loan:any) => (
                  <div className="py-7 px-12 border-2 rounded-2xl ">
                    <p>Loan Status: {loan.status}</p>
                    <p>{loan.userid}</p>
                  </div>
                ))} */}
                  {data.map((loan: any) => (
                    <>
                      <div className="py-7 px-12 border-2 rounded-2xl lg:max-w-md lg:mr-20 mt-10 " key={loan.id}>
                        <p>Loan Status: {loan.status}</p>
                        <p>Loan Type: {loan.type}</p>
                        <p>Property Address: {loan.streetaddress}</p>
                        {loan.status == "approved" ? <p>Amount Due: ${loan.amountdue}</p> : <p></p>}
                      </div>
                    </>
                  ))}
                </div>
              </>
            ) : (
              <div> No Loans</div>
            )
          ) : (
            <div className="text-center">Loading...</div>
          )}
        </Layout>
    )


}

export default Loans