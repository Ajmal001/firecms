# Change Log

## [0.16.2] - 2020-11-12
### Added
- Drag and drop reordering for storage fields
- `group` field in root navigation entries allow to group items into
subcategories.

### Changed
- Adaptive wider size to subcollections seen in the entity side menu, which
allows for a better layout of the table.
- Collection cells fade out if overflowed, instead of allowing scrolling


## [0.16.0] - 2020-11-10
### Added
- Auto values for timestamps. You can now set the `autoValue` property to
timestamps to update the date to the current one either `on_create` (only
when the entity is created) or `on_update` (every time it is saved)
- Markdown field with preview for string properties. Set the flag `markdown` to
true in the CMS field config.
- Drag and drop feature for default arrays, allowing reorder

### Changed
- Reference field do not need to provide a schema or filter or search delegate
of the target collection. All these properties are inferred from the collection
path and the corresponding collection view. So setting an absolute path such as
`products` will look into that path and find the corresponding view.


## [0.15.0] - 2020-11-02
### Added
- The lateral menu now is open on close based on the main navigation and has
specific urls.
- You can now add a custom view to the main AppBar

### Changed
- Clicking on an entity in a collection now opens a lateral menu with an
editable form instead of a preview.


## [0.14.3] - 2020-10-30
### Added
- Dropdown in entity collections to change row height. Added `defaultSize` to
config.

### Changed
- Removed `small` property in collections in favor of `defaultSize`.


## [0.14.2] - 2020-10-27
### Added
- `columnWidth` field in properties to indicate the width of columns

### Changed
- Fix for wrong subcollections url.


## [0.14.0] - 2020-10-25
### Added
- Lateral panel for having entities info in context
- Revamped collection table for allow infinite scrolling and enhanced performance

### Changed
- Big general redesign
- Changed the layout of forms to single column. Removed `forceFullWidth` flag in
 properties.
- Renamed `urlMediaType` to `url` in the string property configuration.
