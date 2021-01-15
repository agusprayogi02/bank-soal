export function apiResult(res) {
  const {data, status} = res
  if (status !== 200) {
    throw data
  }
  return data
}
