import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { User } from './user'

export interface PageProps extends InertiaPageProps {
  user?: User
  messages?: Record<string, string>
}
