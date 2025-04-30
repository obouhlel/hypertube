import User from '#models/user'

export async function generateUsername(username: string): Promise<string> {
  let userFound = await User.findBy('username', username)
  let index = 1
  while (userFound) {
    index = index + 1
    username = username + index
    userFound = await User.findBy('username', username)
  }
  return username
}
