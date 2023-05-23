export interface DatabaseConnector<DatabaseConnection> {
  getConnection(): Promise<DatabaseConnection>;
}
