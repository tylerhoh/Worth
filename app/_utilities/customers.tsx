import path from "path";
import { randomUUID } from "crypto";
import {readFile, writeFile} from 'fs/promises';

export class Customer{
    name: string
    merchant: string
    slug: string

    constructor(name:string, merchant:string, slug:string){
        this.name = name
        this.merchant = merchant
        this.slug = slug
    }
}

export const getCustomers = async (): Promise<Array<Customer>> =>{
    const jsonFile = path.join(process.cwd(), 'app','customers', 'customers.json')
    const data = JSON.parse(await readFile(jsonFile, 'utf8'))
    const customers = (data as Array<any>).map(
        (object:any) => new Customer(object.name, object.merchant, object.slug)
    )
    return customers
}

export const findCustomer = async(slug: string): Promise<Customer | undefined> => {
    return (await getCustomers()).find((customer:Customer)=> customer.slug===slug)
}

export const getContent = async(slug:string): Promise<string> =>{
    const file = path.join(process.cwd(), 'app', 'customers',`${slug}.txt`)
    return await readFile(file, 'utf8')
}

export class Document {
    id: string
    name: string
    slug: string
    text: string
  
    constructor(name: string, slug: string, text: string) {
      this.id = randomUUID()
      this.name = name
      this.slug = slug
      this.text = text
    }
}
  
  export const generateSearchDocuments = async (customers: Customer[]) => {
    const outputPath = `${process.cwd()}/public/documents.json`
  
    const documents = (
      await Promise.all(
        customers.map(async (customer: Customer) =>
          (await getContent(customer.slug))
            .split('\n')
            .map((text: string) => new Document(customer.name, customer.slug, text))
        )
      )
    ).flat()
  
    await writeFile(outputPath, JSON.stringify(documents))
}
  