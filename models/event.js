var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Events Model
 * ===============
 */

var Event = new keystone.List('Event', {
    autokey: { path: 'key', from: 'name', unique: true },
    sortable: true
});

Event.add({
    name: { type: String, required: true, index: true },
    workflowStatus: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    date: { type: Types.Date, required: true, initial: true, index: true },
    time: { type: String, required: true, initial: true, width: 'short', default: '9am - 5pm', note: 'e.g., 9am - 5pm' },
    place: { type: String, required: true, intial: true, width: 'medium', default: '1 N Dearborn St, Suite 650, Chicago, IL 60626', note: 'Enter a friendly place e.g. include floor number and any special notes'},
    description: {
        short: { type: Types.Html, wysiwyg: true },
        extended: { type: Types.Html, wysiwyg: true }
    },
    speaker: { type: Types.Relationship, ref: 'Professional', many: true, index: true },
    maxRSVPs: { type: Number, default: 100 }
});

/**
 * Registration
 * ============
 */

Event.addPattern('standard meta');
Event.defaultColumns = 'name, date, time, place, workflowStatus';
Event.register();