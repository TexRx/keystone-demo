var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Professional Type Model
 * =======================
 */

var ProfessionalType = new keystone.List('ProfessionalType');

ProfessionalType.add({
    name: { type: String, required: true }
});

/**
 * Registration
 * =============
 */

ProfessionalType.addPattern('standard meta');
ProfessionalType.register();