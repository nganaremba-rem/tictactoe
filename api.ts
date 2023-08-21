import axios from 'axios'

export async function getUser(token: string) {
  const googleApiLink = 'https://www.googleapis.com/oauth2/v3/userinfo'
  const { data } = await axios.get(googleApiLink, {
    headers: {
      Authorization: `Bearer ${token}`,
    },
  })
  return data
}
