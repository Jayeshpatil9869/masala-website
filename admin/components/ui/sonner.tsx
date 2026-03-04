import type { NextApiRequest, NextApiResponse } from 'next'
import { Toaster as SonnerToaster } from 'sonner'
export function Toaster(props: React.ComponentProps<typeof SonnerToaster>) {
  return <SonnerToaster {...props} />
}
