import { DatabaseConnector } from '../../domain/contracts/database-connector';
import { Pool } from 'pg';
import { isNil } from '../../utils/type-checkers';

type PostgresqlConfiguration = {
  user: string;
  password: string;
  host: string;
  port: number;
  database: string;
};

export function postgresqlConnectorBuilder(
  config: PostgresqlConfiguration
): DatabaseConnector<Pool> {
  let pool: Pool;

  function initPostgresqlPool(): void {
    pool = new Pool(config);
  }

  return {
    async getConnection(): Promise<Pool> {
      if (isNil(pool)) {
        initPostgresqlPool();
      }

      return pool;
    }
  };
}
