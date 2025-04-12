import { HttpContext } from '@adonisjs/core/http'
import ally from '@adonisjs/ally/services/main'

export default class GithubAuthController {
  async redirect({ ally }: HttpContext) {
    return ally.use('github').redirect()
  }

  async callback({ ally, auth, response }: HttpContext) {
    const github = ally.use('github')

    // Gérer les erreurs possibles pendant l'authentification
    if (github.accessDenied()) {
      return response.redirect().toRoute('login')
    }

    if (github.stateMisMatch()) {
      return response.redirect().toRoute('login')
    }

    if (github.hasError()) {
      return response.redirect().toRoute('login')
    }

    // Récupérer le profil utilisateur
    const githubUser = await github.user()

    // Ici, vous devez implémenter la logique pour :
    // 1. Rechercher l'utilisateur dans votre base de données par son githubId
    // 2. Créer un nouvel utilisateur s'il n'existe pas
    // 3. Connecter l'utilisateur avec auth.login()

    // Exemple simplifié :
    /*
    const user = await User.firstOrCreate(
      { github_id: githubUser.id },
      {
        github_id: githubUser.id,
        email: githubUser.email,
        name: githubUser.name,
        avatar: githubUser.avatarUrl,
      }
    )
    
    await auth.login(user)
    */

    return response.redirect().toRoute('dashboard')
  }
}
