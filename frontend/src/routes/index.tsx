import { createFileRoute } from '@tanstack/react-router'

const Home = () => <h2>Welcome to Research Realm 🚀</h2>

export const Route = createFileRoute('/')({
  component: Home,
})
