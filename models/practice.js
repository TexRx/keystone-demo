var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Practices Model
 * ===============
 */

var Practice = new keystone.List('Practice', {
    autokey: { path: 'key', from: 'name', unique: true },
    sortable: true
});

Practice.add({
    name: { type: String, required: true, index: true },
    workflowStatus: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    description: {
        short: { type: Types.Html, wysiwyg: true },
        extended: { type: Types.Html, wysiwyg: true }
    },
    professional: { type: Types.Relationship, ref: 'Professional', many: true, index: true }
});

/**
 * Registration
 * ============
 */

Practice.addPattern('standard meta');
Practice.defaultColumns = 'name, workflowStatus';
Practice.register();
