var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Locations Model
 * ===============
 */

var RelatedOffice = new keystone.List('RelatedOffice');

RelatedOffice.add({
    name: { type: String },
    office: { type: Types.Relationship, ref: 'Location', required: true, initial: false },
    phone: { type: String },
    fax: { type: String }
});

// path - How you're going to reference the related model (ex: 'Event') from
//          the model defined in the current file - ex: Professional.events
// ref - the key of the referred to Model ('Event')
// refPath - the path of the relationship being referred to in the referred model
//          so, for events hanging off professional, an event has a speaker
//          speaker property that is a reference to
//Professional.relationship({ path: 'practices', ref: 'Practice', refPath: 'professional' });
//RelatedOffice.relationship({ path: 'offices', ref: 'Professional', refPath: 'offices'});
RelatedOffice.relationship({ path: 'offices', ref: 'Professional'});

/**
 * Registration
 * ============
 */

RelatedOffice.addPattern('standard meta');
RelatedOffice.register();