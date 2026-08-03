const normalizeSource = (value: unknown) => {
  const source = Array.isArray(value) ? value[0] : value
  return typeof source === 'string' ? source.trim().slice(0, 100) : ''
}

export const useCampaignSource = () => {
  const route = useRoute()
  const activeSource = ref('')
  const storedSource = useCookie<string | null>('campaign_source', {
    maxAge: 60 * 60 * 24 * 30,
    sameSite: 'lax',
  })

  const syncSource = () => {
    const querySource = normalizeSource(route.query.source)
    if (querySource) storedSource.value = querySource
    activeSource.value = querySource || normalizeSource(storedSource.value)
  }

  onMounted(syncSource)
  watch(() => route.query.source, syncSource)

  return readonly(activeSource)
}

export const getContactRoute = (product?: number, source?: string) => ({
  path: '/contact',
  query: {
    ...(product ? { product: String(product) } : {}),
    ...(source ? { source } : {}),
  },
})
