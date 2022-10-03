# Executando a aplicação
- Criar Usuário: <br>
-O usuário deve ser criado junto ao endpoint (Post)/users; <br>
-Deve-se informar o nome do Usuário(User), um e-mail válido(Email) e também um número de telefone válido, considerando o formato brasileiro(Phone); <br>
-Com isso, o usuário receberá além dos campos informados acima: <br>
"QRCode para verificar a existência do usuário;" <br>
"Verified: false"; <br>
"Logged: false"; <br>
"AccessToken: null"; <br>
"CryptoBalance: null"; <br>
"FiatBalance: null"; <br>
"Id: (Será gerada automaticamente no formato UUID)";<br>
"Password: null"<br>

- Gerando QRCode: <br>
-Informando a Id do usuário como parâmetro ao endpoint (Get)/auth2fa/qrcode/{Id}, um QRCode será exibido, junto de seu secret, anteriormente enviado através do campo "QRCode" <br>
-Ao ler o QRCode junto ao aplicativo de autenticação "Google Authenticator", um token formato por 6 digitos será disponiblizado na tela do dispositivo. <br>

- Verficar Token:<br>
-Informando a Id do usuário como parâmetro ao endpoint (Post)/auth2fa/verifytoken/{Id}, o "secret" disponibilizado junto ao QRCode, junto ao "token" apresentado pelo aplicativo GoogleAuthenticator, caso as informações estejam corretas, o campo a seguir sofrerá a seguinte alteração:<br>
"Verified: True"

- Adicionar Senha:<br>
-Agora com o campo "Verified: True", é possível configurar uma senha para o usuário;<br>
-Informando User como parâmetro ao endpoint (Post)/auth2fa/addpassword/{User} e também o campo "Password" com a senha desejada, tal senha será configurada ao usuário, a mesma será retornada de forma criptografada e o campo a seguir sofrerá a seguinte alteração:<br>
"Password: {Senha criptografada}"

- Obter AccessToken:<br>
-Com a senha configurada, será possível obter o "AccessToken" que será útil nos próximos passos;<br>
-No endpoint (Post)/users/login, preencha os seguintes campos com as informações referentes ao usuário:<br>
-secret:"";<br>
-token:"";<br>
-User:"";<br>
-Password:"{Não criptografada}";<br>
-O campo seguir sofrerá a seguinte alteração:<br>
"AccessToken: {AccessToken obtido}"

- Obter "Balances":<br>
-Em posse do "AccessToken", agora o usuário pode obter suas "balances"(Fiat/Cripto).;<br>
-No endpoint (Post)/balances o usuário deverá preencher o campo "AccessToken" com a respectiva informação.;<br>
-O sistema irá identificar automaticamente o usuário e os campos a seguir sofreram as seguintes alterações:<br>
"FiatWallet: {A carteira irá receber um valor aleatório}";<br>
"CryptoWallet: {A carteira irá receber um valor aleatório}"

- Crypto Transaction:<br>
-Junto ao endpoint (Patch)/transactions/crypto, informe os campos a seguir:<br>
-"fromId": {Id do usuário que irá enviar saldo};<br>
-"toId": {Id do usuário que irá receber saldo};<br>
-"quantityTransafered": {Quantidade a ser transferida entre usuários}


- Fiat Transaction:<br>
-Junto ao endpoint (Patch)/transactions/fiat, informe os campos a seguir:<br>
-"fromId": {Id do usuário que irá enviar saldo};<br>
-"toId": {Id do usuário que irá receber saldo};<br>
-"quantityTransafered": {Quantidade a ser transferida entre usuários}

- Funções gerais da aplicação:
- Endpoint (Get)/users: <br>
-Obtem todos os usuários da aplicação. (Necessita autenticação com o AccessToken)

- Endpoint (Get)/users{User}: <br>
-Obtem um usuário da aplicação, passando o mesmo como parâmetro na URL. (Necessita autenticação com o AccessToken)

- Endpoint (Delete)/users: <br>
-Remove todos os usuários da aplicação. (Necessita autenticação com o AccessToken)

- Endpoint (Delete)/users/{Id}: <br>
-Remove um usuário da aplicação, passando o mesmo como parâmetro na URL, utilizando sua Id. (Necessita autenticação com o AccessToken)

- Endpoint (Patch)/users/{User}:<br>
-Atualiza informações de um usuário da aplicação, passando o mesmo como parâmetro na URL. (Necessita autenticação com o AccessToken)<br>
-Deve ainda ser informado os campos a seguir:<br>
secret: {};<br>
token: {};<br>
Email: {Email o qual deseja identificar o usuário após a atualização(deve ser único)};<br>
Password: {A senha será atualizada conforme o valor que esse campo for preenchido(retornará criptografada também)};<br>
-Note que a API permite somente a atualização dos campos Email e Password, sendo User inalterável.

- Endpoint (Patch)/users/login/refresh: <br>
-O AccessToken possui uma vida útil de apenas 120 segundos, sendo necessário utilizar este endpoint para o atualizar e assim permitir autenticações novamente;<br>
-O campo AccessToken receberá o valor gerado por este endpoint que agora estará ativo para autenticações;<br>
-Devem ser informados os seguintes campos:<br>
secret: <br>
token: <br>
oldToken: {AccessToken expirado}