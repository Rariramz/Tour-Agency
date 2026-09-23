import { QueryTypes, Sequelize } from 'sequelize';

type UniqueConstraintColumn = {
  name: string;
  column: string;
};

export const migrateDatabase = async (sequelize: Sequelize) => {
  const constraintColumns = await sequelize.query<UniqueConstraintColumn>(
    `SELECT tc.constraint_name AS name,
            kcu.column_name AS column
       FROM information_schema.table_constraints tc
       JOIN information_schema.key_column_usage kcu
         ON tc.constraint_catalog = kcu.constraint_catalog
        AND tc.constraint_schema = kcu.constraint_schema
        AND tc.constraint_name = kcu.constraint_name
        AND tc.table_name = kcu.table_name
      WHERE tc.table_schema = 'public'
        AND tc.table_name = 'user_tours'
        AND tc.constraint_type = 'UNIQUE'`,
    { type: QueryTypes.SELECT },
  );

  const columnsByConstraint = new Map<string, Set<string>>();
  for (const { name, column } of constraintColumns) {
    const columns = columnsByConstraint.get(name) ?? new Set<string>();
    columns.add(column);
    columnsByConstraint.set(name, columns);
  }

  const isReservationKey = (columns: Set<string>) =>
    columns.size === 3 &&
    columns.has('userId') &&
    columns.has('tourId') &&
    columns.has('departureDate');
  const obsoleteConstraints = new Set(
    [...columnsByConstraint]
      .filter(
        ([, columns]) =>
          (columns.has('userId') || columns.has('tourId')) &&
          !isReservationKey(columns),
      )
      .map(([name]) => name),
  );
  for (const name of obsoleteConstraints) {
    await sequelize.getQueryInterface().removeConstraint('user_tours', name);
  }

  if (![...columnsByConstraint.values()].some(isReservationKey)) {
    await sequelize.getQueryInterface().addConstraint('user_tours', {
      fields: ['userId', 'tourId', 'departureDate'],
      type: 'unique',
      name: 'user_tours_user_tour_departure_key',
    });
  }
};
