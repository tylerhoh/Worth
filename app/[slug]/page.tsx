import Image from 'next/image'
import { notFound } from 'next/navigation'
import {
  Customer,
  findCustomer,
  getCustomers,
  getContent,
  generateSearchDocuments
} from '../_utilities/customers'

interface PageProps {
  params: { slug: string }
}

export async function generateStaticParams() {
  const customers = await getCustomers()
  await generateSearchDocuments(customers)
  return customers.map((customer: Customer) => ({
    slug: customer.slug,
  }))
}

export default async function Page(props: PageProps) {
  const slug = props.params.slug
  const customer = await findCustomer(slug)
  const body = await getContent(slug)

  if (!customer || !body) {
    notFound()
  }

  return (
    <>
      <h1 className="my-10 text-center text-xl">{customer.name}</h1>
      <h1 className="mt-8 text-center text-xl"> {customer.merchant}</h1>
      {body.split('\n').map((text: string, index: number) => (
        <p key={index} className="mx-10 my-8">
          {text}
        </p>
      ))}
    </>
  )
}
