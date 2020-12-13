import { ServiceContext } from '@vtex/api'
import { Overwrite } from 'utility-types'

import { Clients } from './clients'

declare global {
  type Maybe<T> = T | undefined

  type DomainContext<T = unknown> = Overwrite<
    ServiceContext<Clients>,
    { body: T }
  >
}
