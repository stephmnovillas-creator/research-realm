import { createFileRoute } from '@tanstack/react-router'

const About = () => <h2>uhhh</h2>

export const Route = createFileRoute('/about')({
  component: About,
})
