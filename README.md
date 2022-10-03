# Executando aplicação
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
-Agora com o campo "Verified: True", é possível configurar uma senha para o usuário<br>
-Informando User como parâmetro ao endpoint (Post)/auth2fa/addpassword/{User} e também o campo "Password" com a senha desejada, tal senha será configurada ao usuário, a mesma será retornada de forma criptografada e o campo a seguir sofrerá a seguinte alteração:<br>
"Password: {Senha criptografada}"

- Obter ACcessToken:<br>
-aushdasuhd