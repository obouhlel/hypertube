import { PageProps as InertiaPageProps } from '@inertiajs/core'
import { User } from './user'

export interface PageProps extends InertiaPageProps {
  user?: User
  messages?: Record<string, string>
}

export interface PagePropsUser extends InertiaPageProps {
  user: NonNullable<User>
  messages?: Record<string, string>
}

export interface PagePropsOtherUser extends InertiaPageProps {
  user: NonNullable<User>
  otherUser: NonNullable<User>
  messages?: Record<string, string>
}
