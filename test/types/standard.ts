// Compile-time checks for standard decorators only: `tsc -p test/standard`. Legacy decorators type getters like
// methods, as `MethodDecorator` does, and throw at runtime. Nothing here runs.
import {debounce} from '../../decorators'

export class StandardOnly {
  // @ts-expect-error getters are not methods
  @debounce(100)
  get value() {
    return 1
  }
}
