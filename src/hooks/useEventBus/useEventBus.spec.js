/* global describe, it, expect  */

import { renderHook } from '@testing-library/react-hooks'
import useEventBus from './useEventBus'

describe('the useEventBus hook', () => {
  it('result will be null when rendered outside of BusProvider', () => {
    const { result } = renderHook(useEventBus)
    expect(result.current).toBe(null)
  })
})
