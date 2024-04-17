import Link from 'next/link'
import { Customer, getCustomers } from '../_utilities/customers'

export default async function Customers() {
  const customers = await getCustomers()

  return (
    <main className="flex min-h-screen flex-col items-center justify-between p-24">
      <h1 className="text-xl py-12">Customers</h1>
      <ul className="mx-auto">
        {customers.map((customer: Customer) => (
          <li key={customer.slug} className="my-8">
            <div className="flex">
              <Link href={`/${customer.slug}`} className="underline my-auto ml-8">
                {customer.name}
              </Link>
            </div>
          </li>
        ))}
      </ul>
    </main>
  )
}