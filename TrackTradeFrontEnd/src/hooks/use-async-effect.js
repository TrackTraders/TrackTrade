import { useEffect } from 'react'

/* eslint-disable react-hooks/exhaustive-deps */
/**
 * Uses an effect with an async cancellation signal.
 *
 * @param {function({ isCanceled: function():Boolean })} executor
 * @param {Array}                                        [deps]
 */
export function useAsyncEffect (executor, deps) {
	useEffect(() => {
		let canceled = false

		executor({
			isCanceled () {
				return canceled
			},
		})

		return () => {
			canceled = true
		}
	}, deps)
}
/* eslint-enable react-hooks/exhaustive-deps */
