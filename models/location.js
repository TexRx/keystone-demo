var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Locations Model
 * ===============
 */

var Location = new keystone.List('Location', {
    autokey: { path: 'key', from: 'name', unique: true },
    sortable: true,
    sortContext: 'Professional:offices'
});

console.log('in location.js model, Types is: ', Types);

Location.add({
    name: { type: String, required: true, initial: true },
    workflowStatus: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    phone: { type: String },
    description: {
        short: { type: Types.Html, wysiwyg: true },
        extended: { type: Types.Html, wysiwyg: true }
    },
    photo: { type: Types.CloudinaryImage },
    mapUrl: { type: Types.Url },
    address: { type: Types.Location, required: true}
});

Location.relationship({ path: 'offices', ref: 'Professional', refPath: 'address'});

/**
 * Registration
 * ============
 */

Location.addPattern('standard meta');
Location.defaultColumns = 'name, photo, phone';
Location.register();