import { Sequelize } from "sequelize";
import { ADMIN_ROLE, CLIENT_ROLE } from "src/constants";
import { Role } from "src/roles/role.entity";

export const seedDatabase = async (sequelize: Sequelize) => {
    const roles = [
        { name: ADMIN_ROLE },
        { name: CLIENT_ROLE },
      ];
    
      for (const role of roles) {
        await Role.findOrCreate({ 
          where: { name: role.name },
          defaults: role,
        });
      }
};