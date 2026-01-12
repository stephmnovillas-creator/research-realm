import { createFileRoute } from '@tanstack/react-router'

const About = () => <h2>About Research Realm</h2>

export const Route = createFileRoute('/about')({
  component: About,
})
