const pgQuery = require('pg-query');
module.exports = {
    addTenant(name){
        return pgQuery(`INSERT INTO tenants (tenant_name) 
        VALUES ($1) 
        RETURNING *`, 
        [name]
      );
    },
    createAdminUser(tenant, hash) {
        const email = process.env.EMAIL + tenant.tenant_name + '.com';

        return pgQuery(`INSERT INTO people
            (first_name, last_name, email, password, tenant_id, role)
            VALUES ('Jason', 'Tenbrink', $1, $2, $3, 3)`,
            [email, hash, tenant.tenant_id]
        );
    }
}