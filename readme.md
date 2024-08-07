# 03-Find-A-Friend

### Requisitos Funcionais

- [x] Deve ser possível cadastrar um pet
- [x] Deve ser possível listar todos os pets disponíveis para adoção em uma cidade
- [x] Deve ser possível filtrar pets por suas características
- [x] Deve ser possível visualizar detalhes de um pet para adoção
- [x] Deve ser possível se cadastrar como uma ORG
- [x] Deve ser possível realizar login como uma ORG

### Requisitos Não Funcionais 

- [x] Para cadastrar um pet é necessários as seguintes informações: Nome, Sobre o Pet, Idade, Porte, Nível de Energia, Nível de Independência, Ambiente, Fotos e Definir Requisitos para Adoção.
  - Nome e Sobre serão do tipo campo de texto, e o Sobre deverá ter no máximo 300 caracteres.
  - Idade, Porte, Nível de Energia, Nível de Independência e Ambiente serão do tipo Enum com valores pré-definidos.
  - Fotos serão salva como campo Bytes.
  - Requisitos para Adoção serão como campo array de Strings.
- [x] O retorno da listagem dos pets será com um array de objeto onde terá o ID do pet, Nome e uma Imagem. Poderá ter filtros com query params.
  - Os filtros da consulta será: Idade, Nível de Energia, Porte do Animal e Nível de independência.
- [x] O retorno dos dados do pet será com um objeto onde terá o ID do pet, Nome. Idade, Porte, Nível de Energia, Nível de Independência, Ambiente, Requisitos para Adoção e um array com as imagens. Terá também os dados da ONG: Nome do Responsável, Localização, Endereço e Numéro de Contato.
- [x] Para cadastro da ONG terá os seguintes dados requisitados: Nome do Responsável, E-mail, CEP, Endereço, Senha e Numéro de Contato.
- [x] Para login da ONG necessecitará de: E-mail e Senha. Será gerado um Token JWT.

### Regras de negócio

- [x] Uma ORG precisa ter um endereço e um número de WhatsApp
- [x] Um pet deve estar ligado a uma ORG
- [x] O usuário que quer adotar, entrará em contato com a ORG via WhatsApp
- [x] Todos os filtros são opcionais
- [x] Para uma ORG acessar a aplicação como admin, ela precisa estar logada