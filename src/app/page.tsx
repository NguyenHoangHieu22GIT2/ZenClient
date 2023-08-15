"use client"
import { Header } from '@/components/Layout/Header'
import { Layout } from '@/components/Layout/Layout'
import { CreatePost } from '@/components/Posts/CreatePost'
import { Post } from '@/components/Posts/Post'
import { Posts } from '@/components/Posts/Posts'

export default function Home() {
  return (
    <Layout>
      <CreatePost />
      <Posts />
    </Layout>
  )
}
