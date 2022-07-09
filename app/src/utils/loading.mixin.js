export default {
  methods: {
    async $try(promiseFn) {
      let response;
      const toggleLoading = typeof this.loading === 'boolean'
      if (toggleLoading) this.loading = true;
      try {
        const fn = typeof promiseFn === 'function' ? promiseFn : () => promiseFn
        response = await fn()
      } catch (err) {
        console.error(err)
      }
      if (toggleLoading) this.loading = false;
      return response
    }
  }
}