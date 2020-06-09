# FireCMS

> Awesome Firestore based headless CMS, developed by Camberi

FireCMS is a headless CMS built by developers for developers. It generates CRUD
views based on your configuration.
You define views that are mapped to absolute or relative paths in your Firestore
database, as well as schemas for your entities.

Note that this is a full application, with routing enabled and not a simple
component. It has only been tested as an application and not as part of a
different one.

It is currently in an alpha state, and we continue working to add features
and expose internal APIs, so it is safe to expect breaking changes.

[![NPM](https://img.shields.io/npm/v/@camberi/firecms.svg)](https://www.npmjs.com/package/@camberi/firecms) [![JavaScript Style Guide](https://img.shields.io/badge/code_style-standard-brightgreen.svg)](https://standardjs.com)

### Core technologies

FireCMS is based on this great technologies:
 - Typescript
 - Firebase
 - React + React Router
 - Material UI
 - Formik + Yup

### Demo

Check the demo with all the core functionalities. You can modify the data but it
gets periodically restored.

https://firecms-demo-27150.web.app/

## Install

```bash
npm install --save firecms
```

## Firebase requirements

You need to enable the Firestore database in your Firebase project.
If you have enabled authentication in the CMS config you need to enable Google
authentication in your project.

Also, if you are using storage fields in your string properties, you need to
enable Firebase Storage


### Deployment to Firebase hosting

If you are deploying this project to firebase hosting, you can omit the
firebaseConfig specification, since it gets picked up automatically.

## Current status
- [x] Create, read, update, delete views
- [x] Form for editing entities
- [x] Implementation of fields for every property (except Geopoint)
- [x] Native support for Google Storage references and file upload.
- [ ] Geopoint field
- [x] Real-time Collection view for entities
- [ ] Encoding pagination in URL for improved navigation
- [x] Custom additional views in main navigation
- [x] Custom fields defined by the developer.
- [ ] Improve error handling when unexpected formats come from Firestore
- [x] Subcollection support
- [x] Filters (only for string and numbers)
- [ ] Filters for arrays, dates
- [x] Custom authenticator
- [x] Validation for required fields using yup
- [ ] Additional Validation (all yup supported properties, such as min or max value)
- [ ] Unit testing


## Quick example

```tsx
import React from "react";
import ReactDOM from "react-dom";

import { CMSApp, EntitySchema, EnumValues, Authenticator, EntityCollectionView } from "firecms";
import  firebase from "firebase";

const status = {
    private: "Private",
    public: "Public"
};

const categories: EnumValues<string> = {
    electronics: "Electronics",
    books: "Books",
    furniture: "Furniture",
    clothing: "Clothing",
    food: "Food"
};

const locales = {
    "de-DE": "German",
    "en-US": "English (United States)",
    "es-ES": "Spanish (Spain)",
    "es-419": "Spanish (South America)"
};

export const productSchema: EntitySchema = {
    customId: true,
    name: "Product",
    properties: {
        name: {
            title: "Name",
            includeInListView: true,
            validation: { required: true },
            dataType: "string"
        },
        price: {
            title: "Price",
            includeInListView: true,
            validation: { required: true },
            dataType: "number"
        },
        status: {
            title: "Status",
            includeInListView: true,
            validation: { required: true },
            dataType: "string",
            enumValues: status
        },
        categories: {
            title: "Categories",
            includeInListView: true,
            validation: { required: true },
            dataType: "array",
            of: {
                dataType: "string",
                enumValues: categories
            }
        },
        image: {
            title: "Image",
            dataType: "string",
            includeInListView: true,
            storageMeta: {
                mediaType: "image",
                storagePath: "images",
                acceptedFiles: ["image/*"]
            }
        },
        tags: {
            title: "Tags",
            includeInListView: true,
            description: "Example of generic array",
            validation: { required: true },
            dataType: "array",
            of: {
                dataType: "string"
            }
        },
        description: {
            title: "Description",
            description: "Not mandatory but it'd be awesome if you filled this up",
            includeInListView: false,
            dataType: "string"
        },
        published: {
            title: "Published",
            includeInListView: true,
            dataType: "boolean"
        },
        expires_on: {
            title: "Expires on",
            includeInListView: false,
            dataType: "timestamp"
        },
        publisher: {
            title: "Publisher",
            includeInListView: true,
            description: "This is an example of a map property",
            dataType: "map",
            properties: {
                name: {
                    title: "Name",
                    includeInListView: true,
                    dataType: "string"
                },
                external_id: {
                    title: "External id",
                    includeInListView: true,
                    dataType: "string"
                }
            }
        },
        available_locales: {
            title: "Available locales",
            description:
                "This field is set automatically by Cloud Functions and can't be edited here",
            includeInListView: true,
            dataType: "array",
            disabled: true,
            of: {
                dataType: "string"
            }
        }
    },
    subcollections: [
        {
            name: "Locales",
            relativePath: "locales",
            schema: {
                customId: locales,
                name: "Locale",
                properties: {
                    title: {
                        title: "Title",
                        validation: { required: true },
                        includeInListView: true,
                        dataType: "string"
                    },
                    selectable: {
                        title: "Selectable",
                        description: "Is this locale selectable",
                        includeInListView: true,
                        dataType: "boolean"
                    },
                    video: {
                        title: "Video",
                        dataType: "string",
                        validation: { required: false },
                        includeInListView: true,
                        storageMeta: {
                            mediaType: "video",
                            storagePath: "videos",
                            acceptedFiles: ["video/*"]
                        }
                    }
                }
            }
        }
    ]
};

const navigation: EntityCollectionView<any>[] = [
    {
        relativePath: "products",
        schema: productSchema,
        name: "Products"
    },
];

const myAuthenticator:Authenticator = (user?: firebase.User) => {
    console.log("Allowing access to", user?.email)
    return true;
};

const firebaseConfig = {
    apiKey: "",
    authDomain: "",
    databaseURL: "",
    projectId: "",
    storageBucket: "",
    messagingSenderId: "",
    appId: "",
    measurementId: ""
};

ReactDOM.render(
    <CMSApp
        name={"Test shop CMS"}
        authentication={myAuthenticator}
        navigation={navigation}
        firebaseConfig={firebaseConfig}
    />,
    document.getElementById("root")
);

```

#### Included example

You can access the code for the demo project under `example`. It includes
every feature provided by this CMS.

To get going you just need to set you Firebase config in `firebase_config.ts`
and run `yarn start`


## Entities configuration

The core of the CMS are entities, which are defined by an `EntitySchema`. In the
schema you define the properties, which are related to the Firestore data types.

  - `name`: A singular name of the entity as displayed in an Add button.
        E.g. Product

  - `description`: Description of this entity

  - `customId`: When not specified, Firestore will create a random ID.
        You can set the value to true to allow the users to choose the ID.
        You can also pass a set of values (as an `EnumValues` object) to allow them
        to pick from only those.

  - `properties`: Object defining the properties for the entity schema


Entity properties
-----------------

You can specify the properties of an entity, using the following configuration
fields, common to all data types:

-    `dataType`: Firestore datatype of the property

-    `title`: Property title (e.g. Product)

-    `description`: Property description

-    `validation`: Rules for validating this property

-    `includeInListView`: Is this property displayed in the collection view

-    `includeAsMapPreview`: When the entity is rendered as the target of a reference or as part of a
        map, should this property be included.
        Basically, if it is rendered in second level references.
        e.g: One entity -> Array property -> This property
        If includeAsMapPreview is not specified in any property of an entity, when
        the given entity is rendered, the first 3 properties are displayed.

-    `filterable`: Should this property have a filter entry in the collection view.
        Defaults to false.

-    `disabled`: Is this a read only property

-    `customField`: If you need to render a custom field.

-    `additionalProps`: Additional props that are passed to the default field generated by
        FireCMS or to the customField

#### Property configurations

Besides the common fields, some properties have specific configurations.

##### `string`

-    `storageMeta`: You can specify a `StorageMeta` configuration. It is used to
        indicate that this string refers to a path in Google Cloud Storage.

-    `urlMediaType`: If the value of this property is a URL, we can use the
        urlMediaType to render the content

-    `enumValues`: You can use the enum values providing a map of possible
        exclusive values the property can take, mapped to the label that it is
        displayed in the dropdown.


##### `number`

-    `enumValues`: You can use the enum values providing a map of possible
        exclusive values the property can take, mapped to the label that it is
        displayed in the dropdown.


##### `boolean`


##### `timestamp`


##### `reference`

-    `collectionPath`: Absolute collection path.

-    `schema`: Schema of the entity this reference points to.

-    `filter`?: When the dialog for selecting the value of this reference, should
         a filter be applied to the possible entities.


##### `array`

-    `of`: The property of this array. You can specify any property.


##### `map`

-    `properties`: Record of properties included in this map.

##### `geopoint`
*THIS PROPERTY IS CURRENTLY NOT SUPPORTED*

#### Custom fields

If you need a custom field for your property you can do it by passing a React
component to the `customField` prop of a property. The React component must
accept the props of type `CMSFieldProps`, which you can extend with your own
props. `CMSFieldProps` extends at the same time from `FieldProps` in Formik, so
you can implement a Formik field.

See how it works in this [sample large text field](https://github.com/Camberi/firecms/blob/master/example/src/custom_field/CustomLargeTextField.tsx)



Collection configuration
------------------------
Once you have defined at least one entity schema, you can include it in a
collection. You can find collection views as the first level of navigation in
the main menu, or as subcollections inside other collections, following the
Firestore data schema.

-    `name`: The plural name of the view. E.g. 'products'.

-    `relativePath`: Relative Firestore path of this view to its parent.
        If this view is in the root the path is equal to the absolute one.
        This path also determines the URL in FireCMS

-    `schema`: Schema representing the entities of this view

-    `pagination`: Is pagination enabled in this view. Defaults to true

-    `additionalColumns`: You can add additional columns to the collection view
        by implementing an additional column delegate.

-    `textSearchDelegate`: If a text search delegate is supplied, a search bar
        is displayed on top.

-    `deleteEnabled`: Can the elements in this collection be deleted.
        Defaults to true

-    `subcollections`: Following the Firestore document and collection schema,
        you can add subcollections to your entity in the same way you define
        the root collections.

### Additional columns

If you would like to include a column that does not map directly to a property,
you can use the `additionalColumns` field, providing a
`AdditionalColumnDelegate`, which includes a title and a builder that receives
the corresponding entity.

In the builder you can return any React Component.

If you would like to do some async computation, such as fetching a different
entity, you can use the utility component `AsyncPreviewComponent` to show a
loading indicator.

### Subcollections

Subcollections are collections of entities that are found under another entity.
For example, you can have a collection named "translations" under the entity
"Article". You just need to use the same format as for defining your collection
using the field `subcollections`.

### Filters

Filtering support is currently limited to string and number values, including
enum types. If you want a property to be filterable, you can mark it as such in
the entity schema.

Any comments related to this feature are welcome.

### Text search

Firestore does not support native text search, so we need to rely on external
solutions. If you specify a `textSearchDelegate` to the collection view, you
will see a search bar on top. The delegate is in charge of returning the
matching ids, from the search string.

A delegate using AlgoliaSearch is included, where you need to specify your
credentials and index. For this to work you need to set up an AlgoliaSearch
account and manage the indexing of your documents. There is a full backend
example included in the code, which indexes documents with Cloud Functions.


## License

GPL-3.0 © [camberi](https://github.com/camberi)
