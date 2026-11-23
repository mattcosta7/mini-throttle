// Compile-time checks, run under both decorator modes: `tsc -p test/types` (experimentalDecorators) and
// `tsc -p test/standard` (standard decorators). Nothing here runs.
import {debounce, throttle} from '../../decorators'

export class Example {
  calls: number[] = []

  @throttle(100)
  onScroll(x: number) {
    this.calls.push(x)
  }

  @debounce(100, {start: true})
  onInput(value: string): string {
    return value
  }

  @throttle(100)
  withReceiver(this: Example, x: number) {
    this.calls.push(x)
  }

  @debounce(100)
  static onResize() {}

  // @ts-expect-error fields are not methods
  @throttle(100)
  field = () => {}
}

// Existing code that assigns the decorators to `MethodDecorator`, or forwards a `MethodDecorator`'s arguments to them,
// keeps compiling.
export const assigned: MethodDecorator = throttle(100)
export const forwarding: MethodDecorator = (target, key, descriptor) => debounce(100)(target, key, descriptor)
