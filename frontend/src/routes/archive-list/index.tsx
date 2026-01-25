import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/archive-list/')({
  component: RouteComponent,
})

function RouteComponent() {
  return <div>Hello "/archive-list/"!</div>
}
