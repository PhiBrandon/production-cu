import { NextPage } from "next";
import { LockClosedIcon } from '@heroicons/react/solid'
import {signIn, SignInResponse} from 'next-auth/react'
import { useRouter } from "next/router";


const Signin: NextPage = () => {
  const router = useRouter()
    const onFormSubmit = async (e:any) => {
        e.preventDefault()
        const password = e.target.password.value
        const res: SignInResponse | undefined = await signIn<'credentials'>('credentials', {
            redirect: false,
            email: e.target.email.value,
            password: password,
            callbackUrl: '/dashboard'
        })
        if(res?.ok){
          router.push('/dashboard')
        } else {
          //console.log(res?.error)
          alert("Improper Credentials, Try again.")
          e.target.password.value = ""
        }
        /* .then(({ok, error}) => {
          if(ok){
            router.push('/dashboard')
          } else {
            console.log(error)
            alert(error)
            e.target.password.value = ""
          }
        })
         */
        
        
    }
    return (
        
          <div className="min-h-full flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8">
              <div>
                <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
                <p className="mt-2 text-center text-sm text-gray-600">
                  Or{' '}
                  <a href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                    creat a new account
                  </a>
                </p>
              </div>
              <form className="mt-8 space-y-6" action="#" method="POST" onSubmit={onFormSubmit}>
                <input type="hidden" name="remember" defaultValue="true" />
                <div className="rounded-md shadow-sm -space-y-px">
                  <div>
                    <label htmlFor="email-address" className="sr-only">
                      Email address
                    </label>
                    <input
                      id="email-address"
                      name="email"
                      type="email"
                      autoComplete="email"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Email address"
                    />
                  </div>
                  <div>
                    <label htmlFor="password" className="sr-only">
                      Password
                    </label>
                    <input
                      id="password"
                      name="password"
                      type="password"
                      autoComplete="current-password"
                      required
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Password"
                    />
                  </div>
                </div>
    
                <div className="flex items-center justify-end">
                  
    
                  <div className="text-sm">
                    <a href="#" className="font-medium text-indigo-600 hover:text-indigo-500">
                      Forgot your password?
                    </a>
                  </div>
                </div>
    
                <div>
                  <button
                    type="submit"
                    className="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  >
                    <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                      <LockClosedIcon className="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" aria-hidden="true" />
                    </span>
                    Sign in
                  </button>
                </div>
              </form>
            </div>
          </div>
        
      )
}

export default Signin