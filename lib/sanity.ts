import { createClient } from '@sanity/client'

export const sanityClient = createClient({
  projectId: '6kx8anr1',
  dataset: 'production',
  apiVersion: '2023-07-10',
  useCdn: true,
})

export const fetchClients = async () =>
  sanityClient.fetch(`*[_type == "client"]{name, logo}`)

export const fetchReviews = async () =>
  sanityClient.fetch(`*[_type == "review"]{name, text}`)

export const fetchServices = async () =>
  sanityClient.fetch(`*[_type == "service"]{title, description, icon}`)

export const fetchContacts = async () =>
  sanityClient.fetch(`*[_type == "contact"]{title, text, email, phone}`)

export const fetchWorks = async () =>
  sanityClient.fetch(`*[_type == "work"]{title, image, category}`)
