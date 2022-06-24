import { NextPage } from "next";
import { useSession } from "next-auth/react";
import { useRouter } from "next/router";
import Layout from "../components/layout";
import { v4 as uuidv4 } from "uuid";

const Application: NextPage = () => {
    const pagename = "Application"
    const { data: session } = useSession()
    const router = useRouter()
    const submitForm = async (e: any) => {
        e.preventDefault()
        const data = {
            property: e.target.property.value,
            creditscore: e.target.creditscore.value,
            type: "mortgage",
            streetaddress: e.target.streetaddress.value,
            city: e.target.city.value,
            postalcode: e.target.postalcode.value,
            propertyuse: e.target.propertyUse.value,
            appliedat: Date.now(),
            id: uuidv4(),
            email: session?.user?.email,
        };
        
        // Send a fetch to the backend
        const res = await fetch("/api/createapplication", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        if (res.status == 200) {
            const result = await res.json()
          //e.target.reset()
            console.log(result);
            router.push('/loans');
        }
    }
    return (
        <Layout pagename={pagename}>
            <form className="space-y-8 divide-y divide-gray-200" onSubmit={submitForm}>
                <div className="space-y-8 divide-y divide-gray-200 sm:space-y-5">
                    <div className="pt-8 pl-8 space-y-6 sm:pt-10 sm:space-y-5">
                        <div>
                            <h3 className="text-lg leading-6 font-medium text-gray-900">
                                Personal Information
                            </h3>
                        </div>
                        <div className="space-y-6 sm:space-y-5">
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                    htmlFor="property"
                                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                    Property Type
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select
                                        id="property"
                                        name="property"
                                        autoComplete="property-type"
                                        required
                                        className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option>Single Family</option>
                                        <option>Condominium</option>
                                        <option>Townhouse</option>
                                    </select>
                                </div>
                            </div>
                            <div className="pt-6 sm:pt-5">
                                <div role="group" aria-labelledby="label-notifications">
                                    <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-baseline">
                                        <div>
                                            <div
                                                className="text-base font-medium text-gray-900 sm:text-sm sm:text-gray-700"
                                                id="label-notifications"
                                            >
                                                Is this property a planned unit development?
                                            </div>
                                        </div>
                                        <div className="sm:col-span-2">
                                            <div className="max-w-lg">
                                                <div className="mt-4 space-y-4">
                                                    <div className="flex items-center">
                                                        <input
                                                            id="pusheverything"
                                                            name="pushnotifications"
                                                            type="radio"
                                                            required
                                                            value='yes'
                                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                        />
                                                        <label
                                                            htmlFor="pusheverything"
                                                            className="ml-3 block text-sm font-medium text-gray-700"
                                                        >
                                                            Yes
                                                        </label>
                                                    </div>
                                                    <div className="flex items-center">
                                                        <input
                                                            id="pusheemail"
                                                            name="pushnotifications"
                                                            type="radio"
                                                            required
                                                            value='no'
                                                            className="focus:ring-indigo-500 h-4 w-4 text-indigo-600 border-gray-300"
                                                        />
                                                        <label
                                                            htmlFor="pushemail"
                                                            className="ml-3 block text-sm font-medium text-gray-700"
                                                        >
                                                            No
                                                        </label>
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                    htmlFor="propertyUse"
                                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                    Property Use
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <select
                                        id="propertyUse"
                                        name="propertyUse"
                                        autoComplete="propertyUse"
                                        required
                                        className="max-w-lg block focus:ring-indigo-500 focus:border-indigo-500 w-full shadow-sm sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    >
                                        <option>Primary Residence</option>
                                        <option>Second/Vacation Home</option>
                                        <option>Investment/Rental Property</option>
                                        <option>FHA Secondary Residence</option>
                                    </select>
                                </div>
                            </div>
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                    htmlFor="creditscore"
                                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                    Estimated Credit Score
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="text"
                                        name="creditscore"
                                        id="creditscore"
                                        required
                                        autoComplete="creditscore"
                                        className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                    htmlFor="streetaddress"
                                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                    Street address
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="text"
                                        name="streetaddress"
                                        id="streetaddress"
                                        required
                                        autoComplete="streetaddress"
                                        className="block max-w-lg w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                    htmlFor="city"
                                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                    City
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="text"
                                        name="city"
                                        id="city"
                                        required
                                        autoComplete="address-level2"
                                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                    htmlFor="region"
                                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                    State / Province
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="text"
                                        name="region"
                                        id="region"
                                        required
                                        autoComplete="address-level1"
                                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>

                            <div className="sm:grid sm:grid-cols-3 sm:gap-4 sm:items-start sm:border-t sm:border-gray-200 sm:pt-5">
                                <label
                                    htmlFor="postalcode"
                                    className="block text-sm font-medium text-gray-700 sm:mt-px sm:pt-2"
                                >
                                    ZIP / Postal code
                                </label>
                                <div className="mt-1 sm:mt-0 sm:col-span-2">
                                    <input
                                        type="text"
                                        name="postalcode"
                                        id="postalcode"
                                        required
                                        autoComplete="postalcode"
                                        className="max-w-lg block w-full shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:max-w-xs sm:text-sm border-gray-300 rounded-md"
                                    />
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="pt-5 pr-8 pb-8">
                    <div className="flex justify-end">
                        <button
                            type="button"
                            className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="ml-3 inline-flex justify-center py-2 px-4 border border-transparent shadow-sm text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                            Save
                        </button>
                    </div>
                </div>
            </form>
        </Layout>
    )


}

export default Application