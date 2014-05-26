var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Events Model
 * ===============
 */

var Publication = new keystone.List('Publication', {
    autokey: { path: 'key', from: 'name', unique: true },
    sortable: true
});

Publication.add({
    name: { type: String, required: true, index: true },
    workflowStatus: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    date: { type: Types.Date, required: true, initial: true, index: true },
    description: {
        short: { type: Types.Html, wysiwyg: true },
        extended: { type: Types.Html, wysiwyg: true }
    },
    author: { type: Types.Relationship, ref: 'Professional', many: true, index: true },
});

/**
 * Registration
 * ============
 */

Publication.addPattern('standard meta');
Publication.defaultColumns = 'name, date, time, place, workflowStatus';
Publication.register();