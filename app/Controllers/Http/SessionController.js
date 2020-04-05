"use strict";

class SessionController {
  async create({ request, auth }) {
    const { email, password } = request.all();

    // Cria autenticação do usuário e gera o token
    const token = await auth.attempt(email, password);

    return token;
  }
}

module.exports = SessionController;
