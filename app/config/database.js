const databaseHost = process.env.DATABASE_HOST || '127.0.0.1';
const databasePort = process.env.DATABASE_PORT || '27017';
const databaseUser = process.env.DATABASE_USER || 'user';
const databasePassword = process.env.DATABASE_PASSWORD || 'password123';
const databaseName = process.env.DATABASE_NAME || 'todos';

module.exports = {
  // Examples of valid connection strings.
  remoteUrl : `mongodb://${databaseUser}:${databasePassword}@${databaseHost}:${databasePort}/${databaseName}`,
};
