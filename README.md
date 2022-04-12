# marinha-services-project
Repositório para aquisição e persistência de aeronaves ao redor do mundo de maneira automática utilizando filas
# instruções
Para rodar o projeto é necessário rodar cada microserviço e subir o container do docker com o rabbitmq para o gerenciamento das filas
# Subir o container com o rabbitmq
Basta navegar para pasta raiz do repositório e rodar o docker-compose up
# Rodar o serviço do frontend em react
Basta navegar para a pasta do frontend rabbitmq-marinha-react-app, rodar o npm install para instalar as dependências e rodar o app com npm start.
# Rodar o serviço do produtor
O handler que será responsável por pegar da API do OpenSky todos as aeronaves está em rabbitmq-producer-springboot-master, basta abrir o diretório, esperar o pom.xml carregar as dependências e rodar a aplicação
# Rodar o serviço do consumidor/api restful
Neste microserviço teremos um listener que será ativado assim que o produtor enviar as mensagens pra fila, então ele irá pegar todas as mensagens e inserir no banco h2 do serviço da api. Para rodar basta abrir o diretório rabbitmq-consumer-springboot-master, esperar o pom.xml carregar as dependências e rodar a aplicação.
