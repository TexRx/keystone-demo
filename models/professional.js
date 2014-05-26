var keystone = require('keystone'),
    Types = keystone.Field.Types;

/**
 * Professionals Model
 * ===================
 */

var Professional = new keystone.List('Professional', {
    sortable: true,
    drilldown: 'offices'
});

Professional.add({
    name: { type: Types.Name, required: true, index: true },
    middleName: { type: String },
    suffix: { type: String },
    createdAt: { type: Date, default: Date.now },
    publishedAt: Date,
    workflowStatus: { type: Types.Select, options: 'draft, published, archived', default: 'draft', index: true },
    type: { type: Types.Relationship, ref: 'ProfessionalType', index: true }
}, 'Profile', {
    photo: { type: Types.CloudinaryImage },
    twitter: { type: String, width: 'short'},
    bio: {
        abstract: { type: Types.Html, wysiwyg: true, height: 150 },
        extended: { type: Types.Html, wysiwyg: true, height: 400 }
    }
}, 'Emails', {
        emails: {
            work: {
                isPrimary: { type: Boolean, label: 'Primary Email Address' },
                address: { type: Types.Email, initial: true, index: true }
            },
            personal: {
                isPrimary: { type: Boolean, label: 'Primary Email Address' },
                address: { type: Types.Email, initial: true, index: true }
            },
            other: {
                isPrimary: { type: Boolean, label: 'Primary Email Address' },
                address: { type: Types.Email, initial: true, index: true }
            }
        }
}, 'Offices', {
        offices: { type: Types.Relationship, ref: 'Location', many: true, index: true, collapse: true }
}, 'Permissions', {
        isAdmin: { type: Boolean, label: 'Can Administer Content' }
});

/**
        Relationships
        =============
*/

// path - How you're going to reference the related model (ex: 'Event') from
//          the model defined in the current file - ex: Professional.events
// ref - the key of the referred to Model ('Event')
// refPath - the path of the relationship being referred to in the referred model
//          so, for events hanging off professional, an event has a speaker
//          speaker property that is a reference to
//Professional.relationship({ path: 'practices', ref: 'Practice', refPath: 'professional' });
Professional.relationship({ path: 'events', ref: 'Event', refPath: 'speaker' });
//Professional.relationship({ path: 'publications', ref: 'Publication', refPath: 'author' });

/**
        Virtuals
        ========
*/
Professional.schema.virtual('canAccessContentManager').get(function() {
    return this.isAdmin;
});

/**
        Methods
        =======
 */
Professional.schema.methods.isPublished = function() {
    return this.workflowStatus == 'published';
}

// automatically set publishedAt value when the workflowStatus is
// changed to publish and hasn't already been set
Professional.schema.pre('save', function(next) {
    if (this.isModified('workflowStatus') && this.isPublished() && !this.publishedAt) {
        this.publishedAt = new Date();
    }
    next();
});

/**
 * Registration
 * ============
 */

Professional.addPattern('standard meta');
Professional.defaultColumns = 'firstName, lastName, type, isAdmin';
Professional.register();